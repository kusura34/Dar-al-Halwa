export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'cake' | 'cupcake';
  imageUrl: string;
  weight: number;
  isAvailable: boolean;
  createdAt: Date;
}