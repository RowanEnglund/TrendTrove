import { Injectable, NotFoundException } from '@nestjs/common';
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
      },
    },
  ];
  private nextId = 3;

  findAll(): Product[] {
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
}
