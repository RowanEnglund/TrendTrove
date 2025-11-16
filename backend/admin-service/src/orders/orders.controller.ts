import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOne(+id);
  }

  @Post()
  create(@Body() orderData: Omit<Order, 'id'>): Promise<Order> {
    return this.ordersService.create(orderData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<Order>,
  ): Promise<Order> {
    return this.ordersService.update(+id, updateData);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string): Promise<void> {
    return this.ordersService.delete(+id);
  }
}
