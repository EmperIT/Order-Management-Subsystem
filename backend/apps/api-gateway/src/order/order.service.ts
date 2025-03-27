import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ORDER_SERVICE } from './constants';
import { Order } from '@app/common';

@Injectable()
export class OrderService implements OnModuleInit {
  private orderService: Order.OrderServiceClient;

  constructor(@Inject(ORDER_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.orderService = this.client.getService<Order.OrderServiceClient>(
      Order.ORDER_SERVICE_NAME,
    );
  }

  createOrder(createOrderDto: Order.CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  findAllOrders(paginationDto: Order.PaginationDto) {
    return this.orderService.findAllOrders(paginationDto);
  }

  findOneOrder(id: string) {
    return this.orderService.findOneOrder({ id });
  }

  findOrdersByTimeRange(findOrdersByTimeRangeRequest: Order.FindOrdersByTimeRangeRequest) {
    return this.orderService.findOrdersByTimeRange(findOrdersByTimeRangeRequest);
  }

  updateOrder(id: string, updateOrderDto: Order.UpdateOrderDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...updateData } = updateOrderDto;
    return this.orderService.updateOrder({ id, ...updateData });
  }

  createOrderItem(createOrderItemDto: Order.CreateOrderItemDto) {
    return this.orderService.createOrderItem(createOrderItemDto);
  }

  findAllOrderItemsByOrderId(
    findAllOrderItemsByOrderIdDto: Order.FindAllOrderItemsByOrderIdDto,
  ) {
    return this.orderService.findAllOrderItemsByOrderId(
      findAllOrderItemsByOrderIdDto,
    );
  }

  findOneOrderItem(id: string) {
    return this.orderService.findOneOrderItem({ id });
  }

  updateOrderItem(id: string, updateOrderItemDto: Order.UpdateOrderItemDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...updateData } = updateOrderItemDto;
    return this.orderService.updateOrderItem({ id, ...updateData });
  }

  removeOrderItem(id: string) {
    return this.orderService.removeOrderItem({ id });
  }

  createTable(createTableDto: Order.CreateTableDto) {
    return this.orderService.createTable(createTableDto);
  }

  findAllTables(paginationDto: Order.PaginationDto) {
    return this.orderService.findAllTables(paginationDto);
  }

  findOneTable(name: string) {
    return this.orderService.findOneTable({ name });
  }

  updateTable(id: string, updateTableDto: Order.UpdateTableDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...updateData } = updateTableDto;
    return this.orderService.updateTable({ id, ...updateData });
  }

  removeTable(name: string) {
    return this.orderService.removeTable({ name });
  }
}
