import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Product[] {
    return this.productService.findAll();
  }

  @Post('batch')
  findBatch(@Body() body: { ids: number[] }): Product[] {
    return this.productService.findBatch(body.ids);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Product {
    return this.productService.findOne(+id);
  }
}
