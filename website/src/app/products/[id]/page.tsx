'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  specs: Record<string, string>;
};

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    async function fetchProduct() {
      if (id) {
        try {
          const response = await fetch(`http://localhost:3000/products/${id}`);
          if (response.ok) {
            const data = await response.json();
            setProduct(data);
          } else {
            console.error(`Failed to fetch product with id ${id}`);
          }
        } catch (error) {
          console.error('An error occurred while fetching the product:', error);
        }
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row my-8">
        <div className="md:w-1/2">
          {product.images && product.images.length > 0 && (
            <img
              src={`/images/${product.images[0]}`}
              alt={product.name}
              className="w-full rounded-lg"
            />
          )}
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-600 text-2xl my-4">${product.price}</p>
          <p className="my-4">{product.description}</p>
          <h2 className="text-2xl font-bold my-4">Specifications</h2>
          <ul className="list-disc list-inside">
            {Object.entries(product.specs).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
