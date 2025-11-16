'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('http://localhost:3002/products');
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-4xl font-bold">Admin - Product Management</h1>
        <Link
          href="/admin/products/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Product
        </Link>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.id}</td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
