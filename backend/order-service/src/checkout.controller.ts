import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { OrderService } from './order.service';
import { CartService } from './cart.service';
import { Order } from './order.entity';
import { firstValueFrom } from 'rxjs';

@Controller('checkout')
export class CheckoutController {
  constructor(
    private readonly orderService: OrderService,
    private readonly cartService: CartService,
    private readonly httpService: HttpService,
  ) {}

  @Post()
  async checkout(@Body() body: { userId: number }): Promise<Order> {
    const cart = this.cartService.getCart(body.userId);
    if (!cart || cart.products.length === 0) {
      throw new NotFoundException('Cart is empty');
    }

    const productIds = cart.products.map((p) => p.productId);
    const { data: products } = await firstValueFrom(
      this.httpService.post('http://localhost:3000/products/batch', {
        ids: productIds,
      }),
    );

    const totalPrice = cart.products.reduce((acc, p) => {
      const product = products.find((prod) => prod.id === p.productId);
      return acc + p.quantity * (product?.price || 0);
    }, 0);

    const newOrder = this.orderService.create({
      userId: body.userId,
      products: cart.products,
      totalPrice,
      status: 'pending',
    });

    // Clear the cart
    this.cartService.clearCart(body.userId);

    return newOrder;
  }
}
