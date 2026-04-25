import { Category } from "./category-model";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category['slug'];
  imageUrl: string;
  weight: number;
  isAvailable: boolean;
  createdAt: Date;
}