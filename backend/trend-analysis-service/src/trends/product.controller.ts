import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
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

  @Post()
  create(@Body() productData: Omit<Product, 'id'>): Product {
    return this.productService.create(productData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<Product>,
  ): Product {
    return this.productService.update(+id, updateData);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): void {
    this.productService.delete(+id);
  }
}
