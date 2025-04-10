import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shift } from '@app/common';
import { Order } from '@app/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Logger } from '@nestjs/common';

interface ShiftDocument {
  _id: string;
  shiftName: string;
  startTime: Date;
  endTime: Date;
  secretKey: string;
  isActive: boolean;
  totalRevenue: number;
  orderCount: number;
}

@Injectable()
export class ShiftService {
  private orderService: Order.OrderServiceClient;

  constructor(
    @InjectModel('Shift') private readonly shiftModel: Model<ShiftDocument>,
    @Inject(Order.ORDER_PACKAGE_NAME) private readonly client: ClientGrpc,
  ) {
    this.orderService = this.client.getService<Order.OrderServiceClient>(
      Order.ORDER_SERVICE_NAME,
    );
  }

  async create(createShiftDto: Shift.CreateShiftDto): Promise<Shift.Shift> {
    const conflictShift = await this.shiftModel.findOne({
      startTime: { $lt: createShiftDto.endTime },
      endTime: { $gt: createShiftDto.startTime },
    }).exec();
    if (conflictShift) {
      throw new RpcException({
        statusCode: 409,
        message: 'Ca trực đã tồn tại trong khoảng thời gian này',
      });
    }
    const shift = new this.shiftModel({
      ...createShiftDto,
      isActive: true,
      totalRevenue: 0,
      orderCount: 0,
    });
    await shift.save();
    return this.mapToShift(shift);
  }

  async findByTimeRange(findShiftsByTimeRangeDto: Shift.FindShiftsByTimeRangeDto): Promise<Shift.Shifts> {
    const { startTime, endTime } = findShiftsByTimeRangeDto;
    // Chuyển đổi startTime và endTime thành đối tượng Date
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    // Kiểm tra xem startTime và endTime có hợp lệ không
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new RpcException({
        statusCode: 400,
        message: 'Thời gian không hợp lệ',
      });
    }

    const shifts = await this.shiftModel
      .find({
        startTime: { $gte: startDate },
        endTime: { $lte: endDate },
      })
      .sort({ startTime: 'desc' })
      .exec();
    const total = shifts.length;
    return { shifts: shifts.map(this.mapToShift), total };
  }

  async findOne(id: string): Promise<Shift.Shift> {
    const shift = await this.shiftModel.findById(id).exec();
    if (!shift) {
      throw new RpcException({
        statusCode: 404,
        message: `Ca trực với id ${id} không tồn tại`,
      });
    }
    return this.mapToShift(shift);
  }

  async update(id: string, updateShiftDto: Shift.UpdateShiftDto): Promise<Shift.Shift> {
    const shift = await this.shiftModel.findById(id).exec();
    if (!shift) {
      throw new RpcException({
        statusCode: 404,
        message: `Ca trực với id ${id} không tồn tại`,
      });
    }
    // Kiểm tra nếu isActive được set thành false và trước đó không phải false
    if (updateShiftDto.isActive == false && shift.isActive != false) {
      try {
        // Chuẩn bị dữ liệu để gọi findOrdersByTimeRange
        const findOrdersDto = {
          startTime: shift.startTime.toISOString(),
          endTime: shift.endTime.toISOString(),
        };

        // Gọi gRPC đến OrderService
        const ordersResponse = await lastValueFrom(
          this.orderService.findOrdersByTimeRange(findOrdersDto),
        );

        const totalRevenue = ordersResponse.totalRevenue || 0;
        const orderCount = ordersResponse.total || 0;

        updateShiftDto.totalRevenue = totalRevenue;
        updateShiftDto.orderCount = orderCount;
      } catch (error) {
        throw new RpcException({
          statusCode: 500,
          message: 'Lỗi khi gọi đến OrderService',
        });
      }
    }
    Object.assign(shift, updateShiftDto);
    await shift.save();
    return this.mapToShift(shift); 
  }

  async validateSecretKey(validateSecretKeyDto: Shift.ValidateSecretKeyDto): Promise<Shift.ValidateSecretKeyResponse> {
    const shift = await this.shiftModel.findOne({
      startTime: { $lte: validateSecretKeyDto.currentTime },
      endTime: { $gte: validateSecretKeyDto.currentTime },
      isActive: true,
    }).exec();
  
    if (!shift) {
      throw new RpcException({
        statusCode: 404,
        message: `Không có ca trực nào đang diễn ra tại thời điểm ${validateSecretKeyDto.currentTime}`,
      });
    }
  
    const isValid = shift.secretKey === validateSecretKeyDto.secretKey;
    return { isValid };
  }

  private mapToShift(shift: ShiftDocument): Shift.Shift {
    return {
      id: shift._id.toString(),
      shiftName: shift.shiftName,
      startTime: shift.startTime.toISOString(),
      endTime: shift.endTime.toISOString(),
      secretKey: shift.secretKey,
      isActive: shift.isActive,
      totalRevenue: shift.totalRevenue,
      orderCount: shift.orderCount,
    };
  }
}