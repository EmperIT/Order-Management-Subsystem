import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { catchError } from 'rxjs';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() createOrderDto: any) {
    return this.orderService.createOrder(createOrderDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get()
  findAllOrders(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.orderService.findAllOrders({ page, limit }).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get('time-range')
  findOrdersByTimeRange(@Query('startTime') startTime: string, @Query('endTime') endTime: string) {
    return this.orderService.findOrdersByTimeRange({ startTime, endTime }).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }


  @Get('order-items')
  findAllOrderItemsByOrderId(@Query('orderId') orderId: string) {
    return this.orderService.findAllOrderItemsByOrderId({ orderId }).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get('tables')
  findAllTables(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.orderService.findAllTables({ page, limit }).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }
  
  @Get(':id')
  findOneOrder(@Param('id') id: string) {
    return this.orderService.findOneOrder(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Patch(':id')
  updateOrder(@Param('id') id: string, @Body() updateOrderDto: any) {
    return this.orderService.updateOrder(id, updateOrderDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Post('order-items')
  createOrderItem(@Body() createOrderItemDto: any) {
    return this.orderService.createOrderItem(createOrderItemDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get('order-items/:id')
  findOneOrderItem(@Param('id') id: string) {
    return this.orderService.findOneOrderItem(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Patch('order-items/:id')
  updateOrderItem(@Param('id') id: string, @Body() updateOrderItemDto: any) {
    return this.orderService.updateOrderItem(id, updateOrderItemDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Delete('order-items/:id')
  removeOrderItem(@Param('id') id: string) {
    return this.orderService.removeOrderItem(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Post('tables')
  createTable(@Body() createTableDto: any) {
    return this.orderService.createTable(createTableDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get('tables/:id')
  findOneTable(@Param('id') id: string) {
    return this.orderService.findOneTable(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Patch('tables/:id')
  updateTable(@Param('id') id: string, @Body() updateTableDto: any) {
    return this.orderService.updateTable(id, updateTableDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Delete('tables/:id')
  removeTable(@Param('id') id: string) {
    return this.orderService.removeTable(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }
}

export { OrderService };
