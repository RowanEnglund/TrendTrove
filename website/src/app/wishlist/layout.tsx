import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Wishlist',
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
