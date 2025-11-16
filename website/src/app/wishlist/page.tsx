'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types/product';

// Mock user ID for now
const USER_ID = 1;

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchWishlist() {
      const res = await fetch(`http://localhost:3004/wishlist/${USER_ID}`);
      const { productIds } = await res.json();

      if (productIds.length > 0) {
        const productRes = await fetch('http://localhost:3000/products/batch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: productIds }),
        });
        const productData = await productRes.json();
        setWishlist(productData);
      }
    }
    fetchWishlist();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Your Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {wishlist.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
