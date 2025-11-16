export class Cart {
  id: number;
  userId: number;
  products: { productId: number; quantity: number }[];
}
