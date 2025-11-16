'use client';

import { useEffect, useState } from 'react';
import { Order } from '@/types/order';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch('http://localhost:3002/orders');
      const data = await res.json();
      setOrders(data);
    }
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Admin - Order Management</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Total Price</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">{order.userId}</td>
              <td className="border px-4 py-2">{order.totalPrice}</td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
