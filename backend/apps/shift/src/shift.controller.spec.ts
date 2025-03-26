import { Test, TestingModule } from '@nestjs/testing';
import { ShiftController } from './shift.controller';
import { ShiftService } from './shift.service';

describe('ShiftController', () => {
  let shiftController: ShiftController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ShiftController],
      providers: [ShiftService],
    }).compile();

    shiftController = app.get<ShiftController>(ShiftController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(shiftController.getHello()).toBe('Hello World!');
    });
  });
});
