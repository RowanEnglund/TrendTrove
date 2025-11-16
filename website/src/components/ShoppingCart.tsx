'use client';

import { useState } from 'react';

type CartProduct = {
  productId: number;
  name: string;
  quantity: number;
  price: number;
};

type ShoppingCartProps = {
  products: CartProduct[];
};

export default function ShoppingCart({ products: initialProducts }: ShoppingCartProps) {
  const [products, setProducts] = useState(initialProducts);

  const totalPrice = products.reduce((acc, p) => acc + p.quantity * p.price, 0);

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <ul>
        {products.map((product) => (
          <li key={product.productId} className="flex justify-between items-center mb-2">
            <span>
              {product.name} (x{product.quantity})
            </span>
            <span>${(product.price * product.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="text-right font-bold mt-4">
        Total: ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
}
