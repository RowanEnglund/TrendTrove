import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  private readonly baseUrl = 'http://localhost:3001/orders';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Order[]> {
    const { data } = await firstValueFrom(this.httpService.get(this.baseUrl));
    return data;
  }

  async findOne(id: number): Promise<Order> {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/${id}`),
    );
    return data;
  }

  async create(orderData: Omit<Order, 'id'>): Promise<Order> {
    const { data } = await firstValueFrom(
      this.httpService.post(this.baseUrl, orderData),
    );
    return data;
  }

  async update(id: number, updateData: Partial<Order>): Promise<Order> {
    const { data } = await firstValueFrom(
      this.httpService.put(`${this.baseUrl}/${id}`, updateData),
    );
    return data;
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(this.httpService.delete(`${this.baseUrl}/${id}`));
  }
}
