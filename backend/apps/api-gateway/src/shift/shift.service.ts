import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { SHIFT_SERVICE } from './constants';
import { Shift } from '@app/common';

@Injectable()
export class ShiftService implements OnModuleInit {
  private orderService: Shift.ShiftServiceClient;

  constructor(@Inject(SHIFT_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.orderService = this.client.getService<Shift.ShiftServiceClient>(
      Shift.SHIFT_SERVICE_NAME,
    );
  }

  createShift(createShiftDto: Shift.CreateShiftDto) {
    return this.orderService.createShift(createShiftDto);
  }

  findShiftsByTimeRange(FindShiftsByTimeRangeDto: Shift.FindShiftsByTimeRangeDto) {
    return this.orderService.findShiftsByTimeRange(FindShiftsByTimeRangeDto);
  }

  findOneShift(id: string) {
    return this.orderService.findOneShift({ id });
  }

  updateShift(id: string, updateShiftDto: Shift.UpdateShiftDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...updateData } = updateShiftDto;
    return this.orderService.updateShift({ id, ...updateData });
  }

  validateSecretKey(validateSecretKeyDto: Shift.ValidateSecretKeyDto) {
    return this.orderService.validateSecretKey(validateSecretKeyDto);
  }
}
