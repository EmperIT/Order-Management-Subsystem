import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '@app/common';

@Controller()
@Order.OrderServiceControllerMethods()
export class OrderController implements Order.OrderServiceController {
  constructor(private readonly orderService: OrderService) {}

  /** --- ORDER endpoints --- **/
  createOrder(createOrderDto: Order.CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  findAllOrders(paginationDto: Order.PaginationDto) {
    return this.orderService.findAllOrders(paginationDto);
  }

  findOneOrder(findOneOrderDto: Order.FindOneOrderDto) {
    return this.orderService.findOneOrder(findOneOrderDto.id);
  }

  findOrdersByTimeRange(FindOrdersByTimeRangeRequest: Order.FindOrdersByTimeRangeRequest) {
    return this.orderService.findOrdersByTimeRange(FindOrdersByTimeRangeRequest);
  }

  updateOrder(updateOrderDto: Order.UpdateOrderDto) {
    return this.orderService.updateOrder(updateOrderDto);
  }

  removeOrder(findOneOrderDto: Order.FindOneOrderDto) {
    return this.orderService.removeOrder(findOneOrderDto);
  }

  /** --- ORDER ITEM endpoints --- **/
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

  findOneOrderItem(findOneOrderItemDto: Order.FindOneOrderItemDto) {
    return this.orderService.findOneOrderItem(findOneOrderItemDto);
  }

  updateOrderItem(updateOrderItemDto: Order.UpdateOrderItemDto) {
    return this.orderService.updateOrderItem(updateOrderItemDto);
  }

  removeOrderItem(findOneOrderItemDto: Order.FindOneOrderItemDto) {
    return this.orderService.removeOrderItem(findOneOrderItemDto);
  }

  /** --- TABLE endpoints --- **/
  createTable(createTableDto: Order.CreateTableDto) {
    return this.orderService.createTable(createTableDto);
  }

  findAllTables(paginationDto: Order.PaginationDto) {
    return this.orderService.findAllTables(paginationDto);
  }

  findOneTable(findOneTableDto: Order.FindOneTableDto) {
    return this.orderService.findOneTable(findOneTableDto);
  }

  updateTable(updateTableDto: Order.UpdateTableDto) {
    return this.orderService.updateTable(updateTableDto);
  }

  removeTable(findOneTableDto: Order.FindOneTableDto) {
    return this.orderService.removeTable(findOneTableDto);
  }
}
