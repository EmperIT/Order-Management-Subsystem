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

@Controller('shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createShift(@Body() createDishDto: any) {
    return this.shiftService.createShift(createDishDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.shiftService.findOneShift(id).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  updateShift(@Param('id') id: string, @Body() updateDishDto: any) {
    return this.shiftService.updateShift(id, updateDishDto).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      }),
    );
  }
}

export { ShiftService };
