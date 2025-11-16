'use client';

import { useEffect, useState } from 'react';
import ShoppingCart from '@/components/ShoppingCart';

type CartProduct = {
  productId: number;
  name: string;
  quantity: number;
  price: number;
};

type Cart = {
  products: {
    productId: number;
    quantity: number;
  }[];
};

export default function CheckoutPage() {
  const [hydratedCart, setHydratedCart] = useState<{ products: CartProduct[] }>({ products: [] });

  useEffect(() => {
    async function fetchAndHydrateCart() {
      // Assuming a userId of 1 for now
      try {
        const cartRes = await fetch('http://localhost:3001/cart/1');
        if (!cartRes.ok) {
          console.error('Failed to fetch cart');
          return;
        }
        const cart: Cart = await cartRes.json();

        const hydratedProducts = await Promise.all(
          cart.products.map(async (item) => {
            const productRes = await fetch(`http://localhost:3000/products/${item.productId}`);
            if (!productRes.ok) {
              console.error(`Failed to fetch product ${item.productId}`);
              return null;
            }
            const product = await productRes.json();
            return { ...item, name: product.name, price: product.price };
          })
        );

        setHydratedCart({ products: hydratedProducts.filter(p => p !== null) as CartProduct[] });

      } catch (error) {
        console.error('An error occurred while fetching the cart:', error);
      }
    }

    fetchAndHydrateCart();
  }, []);

  async function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Assuming a userId of 1 for now
    try {
      const response = await fetch('http://localhost:3001/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: 1 }),
      });

      if (response.ok) {
        const order = await response.json();
        alert(`Order created successfully! Order ID: ${order.id}`);
        // Clear the cart on successful checkout
        setHydratedCart({ products: [] });
      } else {
        alert('Failed to create order');
      }
    } catch (error) {
      alert('An error occurred while creating the order');
    }
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
          <form onSubmit={handleCheckout}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Name</label>
              <input type="text" id="name" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block mb-2">Address</label>
              <input type="text" id="address" className="w-full p-2 border rounded" />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Place Order
            </button>
          </form>
        </div>
        <ShoppingCart products={hydratedCart.products} />
      </div>
    </div>
  );
}
