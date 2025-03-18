import { Injectable } from '@nestjs/common';

@Injectable()
export class ShiftService {
  getHello(): string {
    return 'Hello World!';
  }
}
