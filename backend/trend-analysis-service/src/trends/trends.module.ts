import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TrendsController } from './trends.controller';
import { TrendsService } from './trends.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [HttpModule],
  controllers: [TrendsController, ProductController],
  providers: [TrendsService, ProductService],
})
export class TrendsModule {}
