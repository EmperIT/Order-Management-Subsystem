import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MENU_SERVICE } from './constants';
import { MENU_PACKAGE_NAME } from './menu';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ClientsModule.registerAsync([
      {
        name: MENU_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('MENU_SERVICE_URL') || 'localhost:5000',
            package: MENU_PACKAGE_NAME,
            protoPath: join(__dirname, '../menu.proto'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}

