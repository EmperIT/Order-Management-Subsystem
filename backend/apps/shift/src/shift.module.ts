import { Logger, Module } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { ShiftController } from './shift.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ShiftSchema } from './schemas/shifts.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Order } from '@app/common';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature([
      { name: 'Shift', schema: ShiftSchema }
    ]),
    // Đăng ký ClientsModule cho gRPC client
    ClientsModule.registerAsync([
      {
        name: Order.ORDER_PACKAGE_NAME,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url:
              configService.get<string>('ORDER_SERVICE_URL') || 'localhost:5000',
            package: Order.ORDER_PACKAGE_NAME,
            protoPath: join(__dirname, '../order.proto'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_SHIFT_URI');
        Logger.log(`MONGO_SHIFT_URI:: ${uri}`, 'DatabaseModule');
        return { uri };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [ShiftController],
  providers: [ShiftService],
})
export class ShiftModule {}
