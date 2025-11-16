export type Order = {
  id: number;
  userId: number;
  products: { productId: number; quantity: number }[];
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
};
