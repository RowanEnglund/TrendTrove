import { Controller, Post, Body } from '@nestjs/common';
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
    const cart = this.cartService.findByUserId(body.userId);
    if (!cart || cart.products.length === 0) {
      throw new Error('Cart is empty');
    }

    const totalPrice = await cart.products.reduce(async (accPromise, p) => {
      const acc = await accPromise;
      const { data: product } = await firstValueFrom(
        this.httpService.get(`http://localhost:3000/products/${p.productId}`),
      );
      return acc + p.quantity * product.price;
    }, Promise.resolve(0));

    const newOrder = this.orderService.create({
      userId: body.userId,
      products: cart.products,
      totalPrice,
      status: 'pending',
    });

    // Clear the cart
    this.cartService.update({ ...cart, products: [] });

    return newOrder;
  }
}
