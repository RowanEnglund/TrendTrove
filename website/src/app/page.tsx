import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">TrendTrove</h1>
      <Link href="/login" className="text-blue-500 hover:underline">
        Login
      </Link>
      <Link href="/admin/dashboard" className="text-red-500 hover:underline mt-4">
        Admin Dashboard
      </Link>
    </main>
  );
}
