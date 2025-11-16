import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  private readonly products: Product[] = [
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

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    return this.products.find((product) => product.id === id);
  }
}
