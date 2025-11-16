import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <nav>
          <ul>
            <li className="mb-2">
              <Link href="/admin/dashboard" className="hover:text-gray-400">
                Dashboard
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/admin/products" className="hover:text-gray-400">
                Products
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/admin/orders" className="hover:text-gray-400">
                Orders
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
