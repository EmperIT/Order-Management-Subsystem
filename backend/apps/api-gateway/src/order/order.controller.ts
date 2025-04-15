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
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import {
  CreateOrderSwaggerDto,
  UpdateOrderSwaggerDto,
  OrderSwaggerDto,
  OrdersSwaggerDto,
  CreateOrderItemSwaggerDto,
  UpdateOrderItemSwaggerDto,
  OrderItemSwaggerDto,
  OrderItemsSwaggerDto,
  CreateTableSwaggerDto,
  UpdateTableSwaggerDto,
  TableSwaggerDto,
  TablesSwaggerDto,
  FindOrdersByTimeRangeSwaggerDto,
  FindOrdersByTimeRangeResponseSwaggerDto
} from '../dto/order.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo đơn hàng mới' })
  @ApiBody({ type: CreateOrderSwaggerDto })
  @ApiResponse({ status: 201, description: 'Đơn hàng đã được tạo thành công', type: OrderSwaggerDto })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  createOrder(@Body() createOrderDto: any) {
    return this.orderService.createOrder(createOrderDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách đơn hàng' })
  @ApiQuery({ name: 'page', required: false, description: 'Số trang', type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Số lượng đơn hàng trên mỗi trang', type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Danh sách đơn hàng', type: OrdersSwaggerDto })
  findAllOrders(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.orderService.findAllOrders({ page, limit }).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get('time-range')
  @ApiOperation({ summary: 'Lấy đơn hàng theo khoảng thời gian' })
  @ApiQuery({ name: 'startTime', required: true, description: 'Thời gian bắt đầu', example: '2025-04-15T00:00:00.000Z' })
  @ApiQuery({ name: 'endTime', required: true, description: 'Thời gian kết thúc', example: '2025-04-15T23:59:59.999Z' })
  @ApiResponse({ status: 200, description: 'Danh sách đơn hàng trong khoảng thời gian', type: FindOrdersByTimeRangeResponseSwaggerDto })
  findOrdersByTimeRange(@Query('startTime') startTime: string, @Query('endTime') endTime: string) {
    return this.orderService.findOrdersByTimeRange({ startTime, endTime }).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get('order-items')
  @ApiOperation({ summary: 'Lấy danh sách mục đơn hàng theo ID đơn hàng' })
  @ApiQuery({ name: 'orderId', required: true, description: 'ID của đơn hàng', example: '6458af3e1d2c17a3e5a28123' })
  @ApiResponse({ status: 200, description: 'Danh sách mục đơn hàng', type: OrderItemsSwaggerDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy đơn hàng' })
  findAllOrderItemsByOrderId(@Query('orderId') orderId: string) {
    return this.orderService.findAllOrderItemsByOrderId({ orderId }).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get('tables')
  @ApiOperation({ summary: 'Lấy danh sách bàn' })
  @ApiQuery({ name: 'page', required: false, description: 'Số trang', type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Số lượng bàn trên mỗi trang', type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Danh sách bàn', type: TablesSwaggerDto })
  findAllTables(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.orderService.findAllTables({ page, limit }).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin đơn hàng theo ID' })
  @ApiParam({ name: 'id', description: 'ID của đơn hàng' })
  @ApiResponse({ status: 200, description: 'Thông tin đơn hàng', type: OrderSwaggerDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy đơn hàng' })
  findOneOrder(@Param('id') id: string) {
    return this.orderService.findOneOrder(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin đơn hàng' })
  @ApiParam({ name: 'id', description: 'ID của đơn hàng' })
  @ApiBody({ type: UpdateOrderSwaggerDto })
  @ApiResponse({ status: 200, description: 'Đơn hàng đã được cập nhật', type: OrderSwaggerDto })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy đơn hàng' })
  updateOrder(@Param('id') id: string, @Body() updateOrderDto: any) {
    return this.orderService.updateOrder(id, updateOrderDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa đơn hàng' })
  @ApiParam({ name: 'id', description: 'ID của đơn hàng' })
  @ApiResponse({ status: 200, description: 'Đơn hàng đã được xóa', type: OrderSwaggerDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy đơn hàng' })
  removeOrder(@Param('id') id: string) {
    return this.orderService.removeOrder(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Post('order-items')
  @ApiOperation({ summary: 'Tạo mục đơn hàng mới' })
  @ApiBody({ type: CreateOrderItemSwaggerDto })
  @ApiResponse({ status: 201, description: 'Mục đơn hàng đã được tạo thành công', type: OrderItemSwaggerDto })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  createOrderItem(@Body() createOrderItemDto: any) {
    return this.orderService.createOrderItem(createOrderItemDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get('order-items/:id')
  @ApiOperation({ summary: 'Lấy thông tin mục đơn hàng theo ID' })
  @ApiParam({ name: 'id', description: 'ID của mục đơn hàng' })
  @ApiResponse({ status: 200, description: 'Thông tin mục đơn hàng', type: OrderItemSwaggerDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy mục đơn hàng' })
  findOneOrderItem(@Param('id') id: string) {
    return this.orderService.findOneOrderItem(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Patch('order-items/:id')
  @ApiOperation({ summary: 'Cập nhật thông tin mục đơn hàng' })
  @ApiParam({ name: 'id', description: 'ID của mục đơn hàng' })
  @ApiBody({ type: UpdateOrderItemSwaggerDto })
  @ApiResponse({ status: 200, description: 'Mục đơn hàng đã được cập nhật', type: OrderItemSwaggerDto })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy mục đơn hàng' })
  updateOrderItem(@Param('id') id: string, @Body() updateOrderItemDto: any) {
    return this.orderService.updateOrderItem(id, updateOrderItemDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Delete('order-items/:id')
  @ApiOperation({ summary: 'Xóa mục đơn hàng' })
  @ApiParam({ name: 'id', description: 'ID của mục đơn hàng' })
  @ApiResponse({ status: 200, description: 'Mục đơn hàng đã được xóa', type: OrderItemSwaggerDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy mục đơn hàng' })
  removeOrderItem(@Param('id') id: string) {
    return this.orderService.removeOrderItem(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Post('tables')
  @ApiOperation({ summary: 'Tạo bàn mới' })
  @ApiBody({ type: CreateTableSwaggerDto })
  @ApiResponse({ status: 201, description: 'Bàn đã được tạo thành công', type: TableSwaggerDto })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  createTable(@Body() createTableDto: any) {
    return this.orderService.createTable(createTableDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get('tables/:id')
  @ApiOperation({ summary: 'Lấy thông tin bàn theo ID' })
  @ApiParam({ name: 'id', description: 'ID của bàn' })
  @ApiResponse({ status: 200, description: 'Thông tin bàn', type: TableSwaggerDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bàn' })
  findOneTable(@Param('id') id: string) {
    return this.orderService.findOneTable(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Patch('tables/:id')
  @ApiOperation({ summary: 'Cập nhật thông tin bàn' })
  @ApiParam({ name: 'id', description: 'ID của bàn' })
  @ApiBody({ type: UpdateTableSwaggerDto })
  @ApiResponse({ status: 200, description: 'Bàn đã được cập nhật', type: TableSwaggerDto })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bàn' })
  updateTable(@Param('id') id: string, @Body() updateTableDto: any) {
    return this.orderService.updateTable(id, updateTableDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Delete('tables/:id')
  @ApiOperation({ summary: 'Xóa bàn' })
  @ApiParam({ name: 'id', description: 'ID của bàn' })
  @ApiResponse({ status: 200, description: 'Bàn đã được xóa', type: TableSwaggerDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bàn' })
  removeTable(@Param('id') id: string) {
    return this.orderService.removeTable(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }
}

export { OrderService };
