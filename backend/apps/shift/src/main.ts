import { NestFactory } from '@nestjs/core';
import { ShiftModule } from './shift.module';

async function bootstrap() {
  const app = await NestFactory.create(ShiftModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
