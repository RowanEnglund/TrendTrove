'use client';

import { useEffect, useState } from 'react';

type Trend = {
  id: number;
  name: string;
  trendScore: number;
};

export default function DashboardPage() {
  const [trends, setTrends] = useState<Trend[]>([]);

  useEffect(() => {
    // a-64: In a real app, this would fetch from the trend-analysis-service
    const mockTrends = [
      { id: 1, name: 'Wireless Headphones', trendScore: 95 },
      { id: 2, name: 'Smart Watch', trendScore: 92 },
      { id: 3, name: 'Air Fryer', trendScore: 88 },
    ];
    setTrends(mockTrends);
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-4 border rounded">
          <h2 className="text-2xl font-bold mb-4">Trend Analysis</h2>
          <ul>
            {trends.map((trend) => (
              <li key={trend.id} className="flex justify-between">
                <span>{trend.name}</span>
                <span>{trend.trendScore}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 border rounded">
          <h2 className="text-2xl font-bold mb-4">Sales Analytics</h2>
          <p>Sales data will be displayed here.</p>
        </div>
        <div className="p-4 border rounded">
          <h2 className="text-2xl font-bold mb-4">User Management</h2>
          <p>User data will be displayed here.</p>
        </div>
      </div>
    </main>
  );
}
