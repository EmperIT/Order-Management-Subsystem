import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MenuController } from './menu.controller';
import { CloudinaryService } from '../../services/cloudinary.service';
import { MenuService } from './menu.service';
import { MENU_SERVICE } from './constants';
import { Menu } from '@app/common';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: MENU_SERVICE,
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
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [MenuController],
  providers: [MenuService, CloudinaryService],
})
export class MenuModule {}
