import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { ShiftModule } from './shift/shift.module';

@Module({
  imports: [AuthModule, MenuModule, OrderModule, ShiftModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
