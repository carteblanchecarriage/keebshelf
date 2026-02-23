import { Product } from '../types/product';

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/data.json');
  const data = await response.json();
  return data.allProducts || [];
}
