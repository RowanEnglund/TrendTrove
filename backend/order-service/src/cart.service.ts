import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
  private carts: Cart[] = [
    {
      id: 1,
      userId: 1,
      products: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 2 },
      ],
    },
  ];
  private nextId = 2;

  getCart(userId: number): Cart {
    let cart = this.carts.find((cart) => cart.userId === userId);
    if (!cart) {
      cart = { id: this.nextId++, userId, products: [] };
      this.carts.push(cart);
    }
    return cart;
  }

  addProduct(
    userId: number,
    productId: number,
    quantity: number,
  ): Cart {
    const cart = this.getCart(userId);
    const productIndex = cart.products.findIndex(
      (p) => p.productId === productId,
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
    return cart;
  }

  removeProduct(userId: number, productId: number): Cart {
    const cart = this.getCart(userId);
    const productIndex = cart.products.findIndex(
      (p) => p.productId === productId,
    );
    if (productIndex === -1) {
      throw new NotFoundException(
        `Product with ID ${productId} not found in cart`,
      );
    }
    cart.products.splice(productIndex, 1);
    return cart;
  }

  clearCart(userId: number): Cart {
    const cart = this.getCart(userId);
    cart.products = [];
    return cart;
  }
}
