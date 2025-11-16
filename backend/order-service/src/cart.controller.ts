import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  findByUserId(@Param('userId') userId: string): Cart {
    return this.cartService.findByUserId(+userId);
  }

  @Put()
  update(@Body() cart: Cart): Cart {
    return this.cartService.update(cart);
  }
}
