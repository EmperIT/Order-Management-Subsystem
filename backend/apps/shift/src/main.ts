import { NestFactory } from '@nestjs/core';
import { ShiftModule } from './shift.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Shift } from '@app/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Tạo một ApplicationContext tạm thời để lấy ConfigService
  const appContext = await NestFactory.createApplicationContext(ShiftModule);
  const configService = appContext.get(ConfigService);
  const grpcPort =
    configService.get<number>('SHIFT_SERVICE_URL') || 'localhost:5000';
  console.log('Running Shift Service on port: ', grpcPort);
  await appContext.close(); // Đóng context tạm thời

  // Sử dụng giá trị port lấy được trong cấu hình gRPC
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ShiftModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${grpcPort}`,
        protoPath: join(__dirname, '../shift.proto'),
        package: Shift.SHIFT_PACKAGE_NAME,
      },
    },
  );
  await app.listen();
}
bootstrap();
