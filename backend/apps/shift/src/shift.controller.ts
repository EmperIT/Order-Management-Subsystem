import { Controller } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { Shift } from '@app/common';

@Controller()
@Shift.ShiftServiceControllerMethods()
export class ShiftController implements Shift.ShiftServiceController {
  constructor(private readonly shiftService: ShiftService) {}

  createShift(createShiftDto: Shift.CreateShiftDto) {
    return this.shiftService.create(createShiftDto);
  }

  findShiftsByTimeRange(findShiftsByTimeRangeDto: Shift.FindShiftsByTimeRangeDto) {
    return this.shiftService.findByTimeRange(findShiftsByTimeRangeDto);
  }

  findOneShift(findOneShiftDto: Shift.FindOneShiftDto) {
    return this.shiftService.findOne(findOneShiftDto.id);
  }

  updateShift(updateShiftDto: Shift.UpdateShiftDto) {
    return this.shiftService.update(updateShiftDto.id, updateShiftDto);
  }

  validateSecretKey(validateSecretKeyDto: Shift.ValidateSecretKeyDto) {
    return this.shiftService.validateSecretKey(validateSecretKeyDto);
  }
}
