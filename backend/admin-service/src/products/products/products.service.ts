import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  private readonly baseUrl = 'http://localhost:3000/products';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Product[]> {
    const { data } = await firstValueFrom(this.httpService.get(this.baseUrl));
    return data;
  }

  async findOne(id: number): Promise<Product> {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/${id}`),
    );
    return data;
  }

  async create(productData: Omit<Product, 'id'>): Promise<Product> {
    const { data } = await firstValueFrom(
      this.httpService.post(this.baseUrl, productData),
    );
    return data;
  }

  async update(
    id: number,
    updateData: Partial<Product>,
  ): Promise<Product> {
    const { data } = await firstValueFrom(
      this.httpService.put(`${this.baseUrl}/${id}`, updateData),
    );
    return data;
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(this.httpService.delete(`${this.baseUrl}/${id}`));
  }
}
