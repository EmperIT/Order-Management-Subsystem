import { NestFactory } from '@nestjs/core';
import { MenuModule } from './menu.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MENU_PACKAGE_NAME } from './menu';
import { ConfigService} from '@nestjs/config';

async function bootstrap() {
  // Tạo một ApplicationContext tạm thời để lấy ConfigService
  const appContext = await NestFactory.createApplicationContext(MenuModule);
  const configService = appContext.get(ConfigService);
  const grpcPort = configService.get<number>('MENU_SERVICE_URL') || "localhost:5000";
  console.log("Running Menu Service on port: ", grpcPort);
  await appContext.close(); // Đóng context tạm thời

  // Sử dụng giá trị port lấy được trong cấu hình gRPC
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MenuModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${grpcPort}`,
        protoPath: join(__dirname, '../menu.proto'),
        package: MENU_PACKAGE_NAME,
      },
    },
  );
  await app.listen();
}
bootstrap();
