import { Logger, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderSchema } from './schemas/orders.schema';
import { OrderItemSchema } from './schemas/order-items.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Menu } from '@app/common';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'OrderItem', schema: OrderItemSchema },
    ]),
    // Đăng ký ClientsModule cho gRPC client
    ClientsModule.registerAsync([
      {
        name: Menu.MENU_PACKAGE_NAME,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url:
              configService.get<string>('MENU_SERVICE_URL') || 'localhost:5000',
            package: Menu.MENU_PACKAGE_NAME,
            protoPath: join(__dirname, '../menu.proto'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_ORDER_URI');
        Logger.log(`MONGO_ORDER_URI:: ${uri}`, 'DatabaseModule');
        return { uri };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
