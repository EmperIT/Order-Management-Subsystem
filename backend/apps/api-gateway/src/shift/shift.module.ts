import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ShiftController } from './shift.controller';
import { ShiftService } from './shift.service';
import { SHIFT_SERVICE } from './constants';
import { Shift } from '@app/common';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: SHIFT_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url:
              configService.get<string>('SHIFT_SERVICE_URL') ||
              'localhost:5000',
            package: Shift.SHIFT_PACKAGE_NAME,
            protoPath: join(__dirname, '../shift.proto'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ShiftController],
  providers: [ShiftService],
})
export class ShiftModule {}
