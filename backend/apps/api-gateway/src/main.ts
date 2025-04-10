import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '../filter/grpc-exception.filter';
import { NotFoundFilter } from '../filter/not-found.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const gateway = configService.get<number>('GATEWAY') || 3000;
  
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  console.log('Running API-Gateway on port: ', gateway);
  app.useGlobalFilters(new HttpExceptionFilter(), new NotFoundFilter());
  await app.listen(gateway);
}
bootstrap();
