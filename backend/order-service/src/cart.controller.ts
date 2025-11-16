import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  getCart(@Param('userId') userId: string): Cart {
    return this.cartService.getCart(+userId);
  }

  @Post(':userId/products')
  addProduct(
    @Param('userId') userId: string,
    @Body() body: { productId: number; quantity: number },
  ): Cart {
    return this.cartService.addProduct(+userId, body.productId, body.quantity);
  }

  @Delete(':userId/products/:productId')
  removeProduct(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ): Cart {
    return this.cartService.removeProduct(+userId, +productId);
  }

  @Delete(':userId')
  @HttpCode(204)
  clearCart(@Param('userId') userId: string): void {
    this.cartService.clearCart(+userId);
  }
}
