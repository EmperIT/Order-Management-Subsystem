import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { ShiftService } from './shift.service';
import { AuthGuard } from '@nestjs/passport';
import { catchError } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import {
  CreateShiftSwaggerDto,
  UpdateShiftSwaggerDto,
  ShiftSwaggerDto,
  ShiftsSwaggerDto,
  FindShiftsByTimeRangeSwaggerDto,
  ValidateSecretKeySwaggerDto,
  ValidateSecretKeyResponseSwaggerDto
} from '../dto/shift.dto';

@ApiTags('shift')
@Controller('shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tạo ca trực mới', description: 'Yêu cầu xác thực JWT' })
  @ApiBody({ type: CreateShiftSwaggerDto })
  @ApiResponse({ status: 201, description: 'Ca trực đã được tạo thành công', type: ShiftSwaggerDto })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 409, description: 'Ca trực đã tồn tại trong khoảng thời gian này' })
  createShift(@Body() createShiftDto: any) {
    return this.shiftService.createShift(createShiftDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy danh sách ca trực theo khoảng thời gian', description: 'Yêu cầu xác thực JWT' })
  @ApiQuery({ name: 'startTime', required: true, description: 'Thời gian bắt đầu', example: '2025-04-01T00:00:00.000Z' })
  @ApiQuery({ name: 'endTime', required: true, description: 'Thời gian kết thúc', example: '2025-04-30T23:59:59.999Z' })
  @ApiResponse({ status: 200, description: 'Danh sách ca trực', type: ShiftsSwaggerDto })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  findShiftsByTimeRange(@Query('startTime') startTime: string, @Query('endTime') endTime: string) {
    return this.shiftService.findShiftsByTimeRange({ startTime, endTime }).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get('validate-secret-key')
  @ApiOperation({ summary: 'Xác thực mã bí mật ca trực' })
  @ApiQuery({ name: 'currentTime', required: true, description: 'Thời gian hiện tại', example: '2025-04-15T10:30:00.000Z' })
  @ApiQuery({ name: 'secretKey', required: true, description: 'Mã bí mật cần xác thực', example: 'SHIFT-123' })
  @ApiResponse({ status: 200, description: 'Kết quả xác thực mã bí mật', type: ValidateSecretKeyResponseSwaggerDto })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Không có ca trực nào đang diễn ra tại thời điểm này' })
  validateSecretKey(@Query('currentTime') currentTime: string, @Query('secretKey') secretKey: string) {
    return this.shiftService.validateSecretKey({ currentTime, secretKey }).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy thông tin ca trực theo ID', description: 'Yêu cầu xác thực JWT' })
  @ApiParam({ name: 'id', description: 'ID của ca trực' })
  @ApiResponse({ status: 200, description: 'Thông tin ca trực', type: ShiftSwaggerDto })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy ca trực' })
  findOne(@Param('id') id: string) {
    return this.shiftService.findOneShift(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cập nhật thông tin ca trực', description: 'Yêu cầu xác thực JWT' })
  @ApiParam({ name: 'id', description: 'ID của ca trực' })
  @ApiBody({ type: UpdateShiftSwaggerDto })
  @ApiResponse({ status: 200, description: 'Ca trực đã được cập nhật', type: ShiftSwaggerDto })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy ca trực' })
  updateShift(@Param('id') id: string, @Body() updateShiftDto: any) {
    return this.shiftService.updateShift(id, updateShiftDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }
}

export { ShiftService };
