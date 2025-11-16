'use client';

import { useEffect, useState } from 'react';
import ShoppingCart from '@/components/ShoppingCart';

const LOGGED_IN_USER_ID = 1;

type Product = {
  id: number;
  name: string;
  price: number;
};

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
      try {
        const cartRes = await fetch(`http://localhost:3001/cart/${LOGGED_IN_USER_ID}`);
        if (!cartRes.ok) {
          console.error('Failed to fetch cart');
          return;
        }
        const cart: Cart = await cartRes.json();

        const productIds = cart.products.map((p) => p.productId);
        const productRes = await fetch('http://localhost:3000/products/batch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ids: productIds }),
        });
        if (!productRes.ok) {
          console.error('Failed to fetch products');
          return;
        }
        const products: Product[] = await productRes.json();

        const hydratedProducts = cart.products.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return { ...item, name: product?.name || 'Unknown', price: product?.price || 0 };
        });

        setHydratedCart({ products: hydratedProducts });

      } catch (error) {
        console.error('An error occurred while fetching the cart:', error);
      }
    }

    fetchAndHydrateCart();
  }, []);

  async function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: LOGGED_IN_USER_ID }),
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
