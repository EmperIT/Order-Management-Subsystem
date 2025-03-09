import { Logger, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_AUTH_URI');
        Logger.log(`MONGO_AUTH_URI: ${uri}`, 'MongooseModule');
        return { uri };
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
