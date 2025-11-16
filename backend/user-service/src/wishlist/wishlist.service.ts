import { Injectable, NotFoundException } from '@nestjs/common';
import { Wishlist } from './wishlist.entity';

@Injectable()
export class WishlistService {
  private wishlists: Wishlist[] = [];
  private nextId = 1;

  getWishlist(userId: number): Wishlist {
    let wishlist = this.wishlists.find((w) => w.userId === userId);
    if (!wishlist) {
      wishlist = { id: this.nextId++, userId, productIds: [] };
      this.wishlists.push(wishlist);
    }
    return wishlist;
  }

  addProduct(userId: number, productId: number): Wishlist {
    const wishlist = this.getWishlist(userId);
    if (!wishlist.productIds.includes(productId)) {
      wishlist.productIds.push(productId);
    }
    return wishlist;
  }

  removeProduct(userId: number, productId: number): Wishlist {
    const wishlist = this.getWishlist(userId);
    const productIndex = wishlist.productIds.indexOf(productId);
    if (productIndex === -1) {
      throw new NotFoundException(
        `Product with ID ${productId} not found in wishlist`,
      );
    }
    wishlist.productIds.splice(productIndex, 1);
    return wishlist;
  }
}
