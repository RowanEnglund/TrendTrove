import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation.',
      price: 199.99,
      images: ['image1.jpg', 'image2.jpg'],
      specs: {
        color: 'Black',
        brand: 'TrendTrove',
        category: 'Electronics',
      },
    },
    {
      id: 2,
      name: 'Smart Watch',
      description: 'A stylish smart watch with a variety of features.',
      price: 249.99,
      images: ['image3.jpg', 'image4.jpg'],
      specs: {
        color: 'Silver',
        brand: 'TrendTrove',
        category: 'Electronics',
      },
    },
    {
      id: 3,
      name: 'T-Shirt',
      description: 'A comfortable and stylish t-shirt.',
      price: 29.99,
      images: [],
      specs: {
        color: 'White',
        brand: 'TrendTrove',
        category: 'Apparel',
      },
    },
  ];
  private nextId = 4;

  constructor(private readonly httpService: HttpService) {}

  async findAll(userId?: number): Promise<Product[]> {
    if (userId) {
      try {
        const { data: preferences } = await firstValueFrom(
          this.httpService.get(`http://localhost:3004/preferences/${userId}`),
        );
        if (preferences && preferences.categories.length > 0) {
          return this.products.filter((p) =>
            preferences.categories.includes(p.specs.category),
          );
        }
      } catch (error) {
        // If the user service is down or the user has no preferences, return all products
        return this.products;
      }
    }
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  findBatch(ids: number[]): Product[] {
    return this.products.filter((product) => ids.includes(product.id));
  }

  create(productData: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      id: this.nextId++,
      ...productData,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, updateData: Partial<Product>): Product {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const updatedProduct = { ...this.products[productIndex], ...updateData };
    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  delete(id: number): void {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    this.products.splice(productIndex, 1);
  }

  @Cron('0 * * * *') // Run every hour
  handleCron() {
    console.log('Fetching trending products...');
    // In a real application, you would fetch data from an external API here.
    // For this mock, we'll just add a new product.
    const newProduct: Product = {
      id: this.nextId++,
      name: `Trending Product #${this.nextId}`,
      description: 'This is a hot new product.',
      price: Math.floor(Math.random() * 1000),
      images: [],
      specs: {
        category: ['Electronics', 'Apparel'][Math.floor(Math.random() * 2)],
      },
    };
    this.products.push(newProduct);
    console.log('Trending products updated.');
  }
}
