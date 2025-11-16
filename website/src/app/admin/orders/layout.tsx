import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Order Management',
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
