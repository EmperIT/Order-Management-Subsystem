import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Order } from '@app/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Tạo một ApplicationContext tạm thời để lấy ConfigService
  const appContext = await NestFactory.createApplicationContext(OrderModule);
  const configService = appContext.get(ConfigService);
  const grpcPort =
    configService.get<number>('ORDER_SERVICE_URL') || 'localhost:5000';
  console.log('Running Order Service on port: ', grpcPort);
  await appContext.close(); // Đóng context tạm thời

  // Sử dụng giá trị port lấy được trong cấu hình gRPC
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${grpcPort}`,
        protoPath: join(__dirname, '../order.proto'),
        package: Order.ORDER_PACKAGE_NAME,
      },
    },
  );
  await app.listen();
}
bootstrap();
