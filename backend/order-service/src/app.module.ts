import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckoutController } from './checkout.controller';
import { OrderService } from './order.service';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, CheckoutController, CartController],
  providers: [AppService, OrderService, CartService],
})
export class AppModule {}
