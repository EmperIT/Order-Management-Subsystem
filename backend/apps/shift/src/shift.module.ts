import { Module } from '@nestjs/common';
import { ShiftController } from './shift.controller';
import { ShiftService } from './shift.service';

@Module({
  imports: [],
  controllers: [ShiftController],
  providers: [ShiftService],
})
export class ShiftModule {}
