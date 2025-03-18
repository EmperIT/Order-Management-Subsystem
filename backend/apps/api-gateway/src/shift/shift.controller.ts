import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  HttpException,
} from '@nestjs/common';
import { ShiftService } from './shift.service';
import { catchError } from 'rxjs';

@Controller('shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  createShift(@Body() createDishDto: any) {
    return this.shiftService.createShift(createDishDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get()
  findShiftsByTimeRange(@Query('startTime') startTime: string, @Query('endTime') endTime: string) {
    return this.shiftService.findShiftsByTimeRange({ startTime, endTime }).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get('validate-secret-key')
  validateSecretKey(@Query('currentTime') currentTime: string, @Query('secretKey') secretKey: string) {
    return this.shiftService.validateSecretKey({ currentTime, secretKey }).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shiftService.findOneShift(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Patch(':id')
  updateShift(@Param('id') id: string, @Body() updateDishDto: any) {
    return this.shiftService.updateShift(id, updateDishDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }
}

export { ShiftService };
