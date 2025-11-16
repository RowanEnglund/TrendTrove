import { Injectable } from '@nestjs/common';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
  private readonly carts: Cart[] = [
    {
      id: 1,
      userId: 1,
      products: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 2 },
      ],
    },
  ];

  findByUserId(userId: number): Cart {
    return this.carts.find((cart) => cart.userId === userId);
  }

  update(cart: Cart): Cart {
    const index = this.carts.findIndex((c) => c.id === cart.id);
    if (index > -1) {
      this.carts[index] = cart;
      return cart;
    }
    // If cart doesn't exist, create it
    const newCart = { ...cart, id: this.carts.length + 1 };
    this.carts.push(newCart);
    return newCart;
  }
}
