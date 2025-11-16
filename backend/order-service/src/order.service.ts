import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  private orders: Order[] = [];
  private nextId = 1;

  findAll(): Order[] {
    return this.orders;
  }

  findOne(id: number): Order {
    const order = this.orders.find((order) => order.id === id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  create(orderData: Omit<Order, 'id'>): Order {
    const newOrder: Order = {
      id: this.nextId++,
      ...orderData,
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  update(id: number, updateData: Partial<Order>): Order {
    const orderIndex = this.orders.findIndex((o) => o.id === id);
    if (orderIndex === -1) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    const updatedOrder = { ...this.orders[orderIndex], ...updateData };
    this.orders[orderIndex] = updatedOrder;
    return updatedOrder;
  }

  delete(id: number): void {
    const orderIndex = this.orders.findIndex((o) => o.id === id);
    if (orderIndex === -1) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    this.orders.splice(orderIndex, 1);
  }
}
