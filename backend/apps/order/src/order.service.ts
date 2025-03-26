import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Order } from '@app/common';
import { Menu } from '@app/common';

interface OrderDocument {
  _id: string;
  tableId: string;
  items: OrderItemDocument[];
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderItemDocument {
  _id: string;
  orderId: string;
  dishId: string;
  dishName: string;
  price: number;
  quantity: number;
  note: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class OrderService {
  private menuService: Menu.MenuServiceClient;

  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<OrderDocument>,
    @InjectModel('OrderItem')
    private readonly orderItemModel: Model<OrderItemDocument>,
    @Inject(Menu.MENU_PACKAGE_NAME) private readonly client: ClientGrpc, // Inject gRPC client
  ) {
    // Khởi tạo MenuService từ client gRPC
    this.menuService = this.client.getService<Menu.MenuServiceClient>(
      Menu.MENU_SERVICE_NAME,
    );
  }

  // Order methods
  async createOrder(
    createOrderDto: Order.CreateOrderDto,
  ): Promise<Order.Order> {
    const order = new this.orderModel({
      ...createOrderDto,
      total: 0,
      status: 'in_progress',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await order.save();
    return this.mapToOrder(order);
  }

  async findAllOrders(
    paginationDto: Order.PaginationDto,
  ): Promise<Order.Orders> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;
    const orders = await this.orderModel.find().skip(skip).limit(limit).exec();
    const orderIds = orders.map((order) => order._id);
    const items = await this.orderItemModel
      .find({ orderId: { $in: orderIds } })
      .exec();
    const total = await this.orderModel.countDocuments().exec();
    return {
      orders: orders.map((order) =>
        this.mapToOrder(
          order,
          items
            .filter((item) => item.orderId.toString() === order._id.toString())
            .map(this.mapToOrderItem),
        ),
      ),
      total,
    };
  }

  async findOneOrder(id: string): Promise<Order.Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new RpcException({
        statusCode: 404,
        message: `Không tìm thấy đơn với id ${id}`,
      });
    }
    // Populate items
    const items = await this.orderItemModel.find({ orderId: order._id }).exec();
    return this.mapToOrder(order, items.map(this.mapToOrderItem));
  }

  async findOrdersByTimeRange(FindOrdersByTimeRangeRequest: Order.FindOrdersByTimeRangeRequest): Promise<Order.FindOrdersByTimeRangeResponse> {
    const { startTime, endTime } = FindOrdersByTimeRangeRequest;
    const orders = await this.orderModel.find({
      createdAt: { $gte: new Date(startTime), $lte: new Date(endTime) },
    }).exec();
    const orderIds = orders.map((order) => order._id);
    const items = await this.orderItemModel
      .find({ orderId: { $in: orderIds } })
      .exec();
    const total = await this.orderModel.countDocuments().exec();
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    return {
      orders: orders.map((order) =>
        this.mapToOrder(
          order,
          items
            .filter((item) => item.orderId.toString() === order._id.toString())
            .map(this.mapToOrderItem),
        ),
      ),
      total,
      totalRevenue,
    };
  }

  async updateOrder(
    updateOrderDto: Order.UpdateOrderDto,
  ): Promise<Order.Order> {
    const order = await this.orderModel.findById(updateOrderDto.id).exec();
    if (!order) {
      throw new RpcException({
        statusCode: 404,
        message: `Không tìm thấy đơn với id ${updateOrderDto.id}`,
      });
    }
    Object.assign(order, {
      ...updateOrderDto,
      updatedAt: new Date(),
    });
    await order.save();
    return this.mapToOrder(order);
  }

  // Order item methods
  async createOrderItem(
    createOrderItemDto: Order.CreateOrderItemDto,
  ): Promise<Order.OrderItem> {
    try {
      // Gọi gRPC đến MenuService để lấy thông tin món ăn
      const dish = await lastValueFrom(
        this.menuService.findOneDish({ id: createOrderItemDto.dishId }),
      );

      const orderItem = new this.orderItemModel({
        ...createOrderItemDto,
        dishName: dish.name,
        price: dish.price,
        status: 'in_progress',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await orderItem.save();
      // Cập nhật total của Order
      await this.updateOrderTotal(orderItem.orderId);

      return this.mapToOrderItem(orderItem);
    } catch (error) {
      // Nếu lỗi là RpcException từ MenuService, ném lại lỗi đó
      if (error instanceof RpcException) {
        throw error;
      }
      // Nếu là lỗi khác, ném RpcException chung
      throw new RpcException({
        statusCode: 500,
        message: 'Lỗi khi tạo order item',
      });
    }
  }

  async findAllOrderItemsByOrderId(
    findAllOrderItemsByOrderIdDto: Order.FindAllOrderItemsByOrderIdDto,
  ): Promise<Order.OrderItems> {
    const orderId = findAllOrderItemsByOrderIdDto.orderId;
    const items = await this.orderItemModel.find({ orderId }).sort({ createdAt: -1 }).exec();
    const total = await this.orderItemModel.countDocuments({ orderId }).exec();
    return { items: items.map(this.mapToOrderItem), total };
  }

  async findOneOrderItem(
    findOneOrderItemDto: Order.FindOneOrderItemDto,
  ): Promise<Order.OrderItem> {
    const orderItem = await this.orderItemModel
      .findById(findOneOrderItemDto.id)
      .exec();
    if (!orderItem) {
      throw new RpcException({
        statusCode: 404,
        message: `Không tìm thấy order item với id ${findOneOrderItemDto.id}`,
      });
    }
    return this.mapToOrderItem(orderItem);
  }

  async updateOrderItem(
    updateOrderItemDto: Order.UpdateOrderItemDto,
  ): Promise<Order.OrderItem> {
    const orderItem = await this.orderItemModel
      .findById(updateOrderItemDto.id)
      .exec();
    if (!orderItem) {
      throw new RpcException({
        statusCode: 404,
        message: `Không tìm thấy order item với id ${updateOrderItemDto.id}`,
      });
    }
    Object.assign(orderItem, updateOrderItemDto);
    await orderItem.save();
    // Cập nhật total của Order
    await this.updateOrderTotal(orderItem.orderId);

    return this.mapToOrderItem(orderItem);
  }

  async removeOrderItem(
    findOneOrderItemDto: Order.FindOneOrderItemDto,
  ): Promise<Order.OrderItem> {
    const orderItem = await this.orderItemModel
      .findByIdAndDelete(findOneOrderItemDto.id)
      .exec();
    if (!orderItem) {
      throw new RpcException({
        statusCode: 404,
        message: `Không tìm thấy order item với id ${findOneOrderItemDto.id}`,
      });
    }
    // Cập nhật total của Order
    await this.updateOrderTotal(orderItem.orderId);

    return this.mapToOrderItem(orderItem);
  }

  private async updateOrderTotal(orderId: string): Promise<void> {
    // Lấy tất cả OrderItem của Order
    const items = await this.orderItemModel.find({ orderId }).exec();

    // Tính tổng = sum(price * quantity)
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Cập nhật total vào Order
    await this.orderModel.updateOne({ _id: orderId }, { total });
  }

  private mapToOrder(
    order: OrderDocument,
    items: Order.OrderItem[] = [],
  ): Order.Order {
    return {
      id: order._id.toString(),
      tableId: order.tableId,
      items,
      total: order.total || 0,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
    };
  }

  private mapToOrderItem(orderItem: OrderItemDocument): Order.OrderItem {
    return {
      id: orderItem._id.toString(),
      orderId: orderItem.orderId,
      dishId: orderItem.dishId,
      dishName: orderItem.dishName,
      price: orderItem.price,
      quantity: orderItem.quantity,
      note: orderItem.note,
      status: orderItem.status,
      createdAt: orderItem.createdAt.toISOString(),
      updatedAt: orderItem.updatedAt.toISOString(),
    };
  }
}
