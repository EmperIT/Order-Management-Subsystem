import { Logger, Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DishSchema } from './schemas/dishes.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature([{ name: 'Dish', schema: DishSchema }]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_MENU_URI');
        Logger.log(`MONGO_MENU_URI: ${uri}`, 'MongooseModule');
        return { uri };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
