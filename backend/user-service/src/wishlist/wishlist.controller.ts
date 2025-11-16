import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { Wishlist } from './wishlist.entity';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get(':userId')
  getWishlist(@Param('userId') userId: string): Wishlist {
    return this.wishlistService.getWishlist(+userId);
  }

  @Post(':userId/products')
  addProduct(
    @Param('userId') userId: string,
    @Body() body: { productId: number },
  ): Wishlist {
    return this.wishlistService.addProduct(+userId, body.productId);
  }

  @Delete(':userId/products/:productId')
  removeProduct(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ): Wishlist {
    return this.wishlistService.removeProduct(+userId, +productId);
  }
}
