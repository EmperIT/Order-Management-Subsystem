import { Controller, Get } from '@nestjs/common';
import { ShiftService } from './shift.service';

@Controller()
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Get()
  getHello(): string {
    return this.shiftService.getHello();
  }
}
