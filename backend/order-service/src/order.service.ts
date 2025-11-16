import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  private readonly orders: Order[] = [];

  findAll(): Order[] {
    return this.orders;
  }

  findOne(id: number): Order {
    return this.orders.find((order) => order.id === id);
  }

  create(order: Omit<Order, 'id'>): Order {
    const newOrder = { ...order, id: this.orders.length + 1 };
    this.orders.push(newOrder);
    return newOrder;
  }
}
