import { ApiProperty } from '@nestjs/swagger';
import { Shift } from '@app/common';

export class CreateShiftSwaggerDto implements Shift.CreateShiftDto {
  @ApiProperty({
    description: 'Tên ca trực',
    example: 'Ca sáng',
    required: true
  })
  shiftName: string;

  @ApiProperty({
    description: 'Thời gian bắt đầu ca trực',
    example: '2025-04-15T08:00:00.000Z',
    required: true,
    format: 'date-time'
  })
  startTime: string;

  @ApiProperty({
    description: 'Thời gian kết thúc ca trực',
    example: '2025-04-15T14:00:00.000Z',
    required: true,
    format: 'date-time'
  })
  endTime: string;

  @ApiProperty({
    description: 'Mã bí mật của ca trực',
    example: 'SHIFT-123',
    required: true
  })
  secretKey: string;

  @ApiProperty({
    description: 'Trạng thái hoạt động của ca trực',
    example: true,
    default: true
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Tổng doanh thu của ca trực',
    example: 0,
    default: 0
  })
  totalRevenue: number;

  @ApiProperty({
    description: 'Số lượng đơn hàng trong ca trực',
    example: 0,
    default: 0
  })
  orderCount: number;
}

export class UpdateShiftSwaggerDto implements Partial<Shift.UpdateShiftDto> {
  @ApiProperty({
    description: 'ID của ca trực',
    required: true
  })
  id: string;

  @ApiProperty({
    description: 'Tên ca trực mới',
    example: 'Ca sáng đặc biệt',
    required: false
  })
  shiftName?: string;

  @ApiProperty({
    description: 'Thời gian bắt đầu ca trực mới',
    example: '2025-04-15T07:00:00.000Z',
    required: false,
    format: 'date-time'
  })
  startTime?: string;

  @ApiProperty({
    description: 'Thời gian kết thúc ca trực mới',
    example: '2025-04-15T13:00:00.000Z',
    required: false,
    format: 'date-time'
  })
  endTime?: string;

  @ApiProperty({
    description: 'Mã bí mật mới của ca trực',
    example: 'SHIFT-456',
    required: false
  })
  secretKey?: string;

  @ApiProperty({
    description: 'Trạng thái hoạt động mới của ca trực',
    example: false,
    required: false
  })
  isActive?: boolean;

  @ApiProperty({
    description: 'Tổng doanh thu mới của ca trực',
    example: 500000,
    required: false
  })
  totalRevenue?: number;

  @ApiProperty({
    description: 'Số lượng đơn hàng mới trong ca trực',
    example: 10,
    required: false
  })
  orderCount?: number;
}

export class ShiftSwaggerDto implements Shift.Shift {
  @ApiProperty({
    description: 'ID của ca trực'
  })
  id: string;

  @ApiProperty({
    description: 'Tên ca trực'
  })
  shiftName: string;

  @ApiProperty({
    description: 'Thời gian bắt đầu ca trực',
    format: 'date-time'
  })
  startTime: string;

  @ApiProperty({
    description: 'Thời gian kết thúc ca trực',
    format: 'date-time'
  })
  endTime: string;

  @ApiProperty({
    description: 'Mã bí mật của ca trực'
  })
  secretKey: string;

  @ApiProperty({
    description: 'Trạng thái hoạt động của ca trực'
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Tổng doanh thu của ca trực'
  })
  totalRevenue: number;

  @ApiProperty({
    description: 'Số lượng đơn hàng trong ca trực'
  })
  orderCount: number;
}

export class ShiftsSwaggerDto implements Shift.Shifts {
  @ApiProperty({
    description: 'Danh sách ca trực',
    type: [ShiftSwaggerDto]
  })
  shifts: ShiftSwaggerDto[];

  @ApiProperty({
    description: 'Tổng số ca trực'
  })
  total: number;
}

export class FindShiftsByTimeRangeSwaggerDto implements Shift.FindShiftsByTimeRangeDto {
  @ApiProperty({
    description: 'Thời gian bắt đầu',
    example: '2025-04-01T00:00:00.000Z',
    required: true,
    format: 'date-time'
  })
  startTime: string;

  @ApiProperty({
    description: 'Thời gian kết thúc',
    example: '2025-04-30T23:59:59.999Z',
    required: true,
    format: 'date-time'
  })
  endTime: string;
}

export class ValidateSecretKeySwaggerDto implements Shift.ValidateSecretKeyDto {
  @ApiProperty({
    description: 'Thời gian hiện tại',
    example: '2025-04-15T10:30:00.000Z',
    required: true,
    format: 'date-time'
  })
  currentTime: string;

  @ApiProperty({
    description: 'Mã bí mật cần xác thực',
    example: 'SHIFT-123',
    required: true
  })
  secretKey: string;
}

export class ValidateSecretKeyResponseSwaggerDto implements Shift.ValidateSecretKeyResponse {
  @ApiProperty({
    description: 'Kết quả xác thực mã bí mật',
    example: true
  })
  isValid: boolean;
}