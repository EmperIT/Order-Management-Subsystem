import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@app/common';

export class CreateOrderSwaggerDto implements Order.CreateOrderDto {
  @ApiProperty({
    description: 'Tên bàn',
    example: 'B01',
    required: true
  })
  tableName: string;

  @ApiProperty({
    description: 'Tổng tiền đơn hàng',
    example: 120000,
    required: true
  })
  total: number;

  @ApiProperty({
    description: 'Trạng thái đơn hàng',
    example: 'in_progress',
    enum: ['in_progress', 'paid'],
    default: 'in_progress'
  })
  status: string;
}

export class UpdateOrderSwaggerDto implements Partial<Order.UpdateOrderDto> {
  @ApiProperty({
    description: 'ID của đơn hàng',
    required: true
  })
  id: string;

  @ApiProperty({
    description: 'Tên bàn mới',
    example: 'B02',
    required: false
  })
  tableName?: string;

  @ApiProperty({
    description: 'Tổng tiền đơn hàng mới',
    example: 150000,
    required: false
  })
  total?: number;

  @ApiProperty({
    description: 'Trạng thái đơn hàng mới',
    example: 'paid',
    enum: ['in_progress', 'paid'],
    required: false
  })
  status?: string;
}

export class OrderItemSwaggerDto implements Order.OrderItem {
  @ApiProperty({
    description: 'ID của mục đơn hàng'
  })
  id: string;

  @ApiProperty({
    description: 'ID của đơn hàng'
  })
  orderId: string;

  @ApiProperty({
    description: 'ID của món ăn'
  })
  dishId: string;

  @ApiProperty({
    description: 'Tên món ăn'
  })
  dishName: string;

  @ApiProperty({
    description: 'Giá món ăn'
  })
  price: number;

  @ApiProperty({
    description: 'Số lượng'
  })
  quantity: number;

  @ApiProperty({
    description: 'Ghi chú'
  })
  note: string;

  @ApiProperty({
    description: 'Trạng thái mục đơn hàng',
    enum: ['in_progress', 'finalized']
  })
  status: string;

  @ApiProperty({
    description: 'Thời điểm tạo mục đơn hàng',
    format: 'date-time'
  })
  createdAt: string;

  @ApiProperty({
    description: 'Thời điểm cập nhật mục đơn hàng gần nhất',
    format: 'date-time'
  })
  updatedAt: string;
}

export class OrderSwaggerDto implements Order.Order {
  @ApiProperty({
    description: 'ID của đơn hàng'
  })
  id: string;

  @ApiProperty({
    description: 'Tên bàn'
  })
  tableName: string;

  @ApiProperty({
    description: 'Danh sách các mục trong đơn hàng',
    type: [OrderItemSwaggerDto]
  })
  items: OrderItemSwaggerDto[];

  @ApiProperty({
    description: 'Tổng tiền đơn hàng'
  })
  total: number;

  @ApiProperty({
    description: 'Trạng thái đơn hàng',
    enum: ['in_progress', 'paid']
  })
  status: string;

  @ApiProperty({
    description: 'Thời điểm thanh toán',
    format: 'date-time',
    required: false,
    nullable: true
  })
  paidAt: string;

  @ApiProperty({
    description: 'Thời điểm tạo đơn hàng',
    format: 'date-time'
  })
  createdAt: string;

  @ApiProperty({
    description: 'Thời điểm cập nhật đơn hàng gần nhất',
    format: 'date-time'
  })
  updatedAt: string;
}

export class OrdersSwaggerDto implements Order.Orders {
  @ApiProperty({
    description: 'Danh sách đơn hàng',
    type: [OrderSwaggerDto]
  })
  orders: OrderSwaggerDto[];

  @ApiProperty({
    description: 'Tổng số đơn hàng'
  })
  total: number;
}

export class CreateOrderItemSwaggerDto implements Order.CreateOrderItemDto {
  @ApiProperty({
    description: 'ID của đơn hàng',
    required: true
  })
  orderId: string;

  @ApiProperty({
    description: 'ID của món ăn',
    required: true
  })
  dishId: string;

  @ApiProperty({
    description: 'Số lượng',
    example: 2,
    minimum: 1,
    required: true
  })
  quantity: number;

  @ApiProperty({
    description: 'Ghi chú',
    example: 'Không hành',
    required: false
  })
  note: string;

  @ApiProperty({
    description: 'Trạng thái mục đơn hàng',
    example: 'in_progress',
    enum: ['in_progress', 'finalized'],
    default: 'in_progress'
  })
  status: string;
}

export class UpdateOrderItemSwaggerDto implements Partial<Order.UpdateOrderItemDto> {
  @ApiProperty({
    description: 'ID của mục đơn hàng',
    required: true
  })
  id: string;

  @ApiProperty({
    description: 'ID của đơn hàng',
    required: false
  })
  orderId?: string;

  @ApiProperty({
    description: 'ID của món ăn',
    required: false
  })
  dishId?: string;

  @ApiProperty({
    description: 'Số lượng mới',
    example: 3,
    minimum: 1,
    required: false
  })
  quantity?: number;

  @ApiProperty({
    description: 'Ghi chú mới',
    example: 'Không hành, ít cay',
    required: false
  })
  note?: string;

  @ApiProperty({
    description: 'Trạng thái mục đơn hàng mới',
    example: 'finalized',
    enum: ['in_progress', 'finalized'],
    required: false
  })
  status?: string;
}

export class OrderItemsSwaggerDto implements Order.OrderItems {
  @ApiProperty({
    description: 'Danh sách các mục đơn hàng',
    type: [OrderItemSwaggerDto]
  })
  items: OrderItemSwaggerDto[];

  @ApiProperty({
    description: 'Tổng số mục đơn hàng'
  })
  total: number;
}

export class CreateTableSwaggerDto implements Order.CreateTableDto {
  @ApiProperty({
    description: 'Tên bàn',
    example: 'B01',
    required: true
  })
  name: string;

  @ApiProperty({
    description: 'Trạng thái bàn',
    example: 'available',
    enum: ['available', 'occupied'],
    default: 'available'
  })
  status: string;
}

export class UpdateTableSwaggerDto implements Partial<Order.UpdateTableDto> {
  @ApiProperty({
    description: 'ID của bàn',
    required: true
  })
  id: string;

  @ApiProperty({
    description: 'Tên bàn mới',
    example: 'B02',
    required: false
  })
  name?: string;

  @ApiProperty({
    description: 'Trạng thái bàn mới',
    example: 'occupied',
    enum: ['available', 'occupied'],
    required: false
  })
  status?: string;
}

export class TableSwaggerDto implements Order.Table {
  @ApiProperty({
    description: 'ID của bàn'
  })
  id: string;

  @ApiProperty({
    description: 'Tên bàn'
  })
  name: string;

  @ApiProperty({
    description: 'Trạng thái bàn',
    enum: ['available', 'occupied']
  })
  status: string;

  @ApiProperty({
    description: 'Thời điểm tạo bàn',
    format: 'date-time'
  })
  createdAt: string;

  @ApiProperty({
    description: 'Thời điểm cập nhật bàn gần nhất',
    format: 'date-time'
  })
  updatedAt: string;
}

export class TablesSwaggerDto implements Order.Tables {
  @ApiProperty({
    description: 'Danh sách bàn',
    type: [TableSwaggerDto]
  })
  tables: TableSwaggerDto[];

  @ApiProperty({
    description: 'Tổng số bàn'
  })
  total: number;
}

export class FindOrdersByTimeRangeSwaggerDto implements Order.FindOrdersByTimeRangeRequest {
  @ApiProperty({
    description: 'Thời gian bắt đầu',
    example: '2025-04-15T00:00:00.000Z',
    required: true
  })
  startTime: string;

  @ApiProperty({
    description: 'Thời gian kết thúc',
    example: '2025-04-15T23:59:59.999Z',
    required: true
  })
  endTime: string;
}

export class FindOrdersByTimeRangeResponseSwaggerDto implements Order.FindOrdersByTimeRangeResponse {
  @ApiProperty({
    description: 'Danh sách đơn hàng',
    type: [OrderSwaggerDto]
  })
  orders: OrderSwaggerDto[];

  @ApiProperty({
    description: 'Tổng số đơn hàng'
  })
  total: number;

  @ApiProperty({
    description: 'Tổng doanh thu'
  })
  totalRevenue: number;
}