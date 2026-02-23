export interface Product {
  id: string;
  name: string;
  url: string;
  image?: string;
  images?: string[];
  price?: string;
  vendor?: string;
  category?: string;
  description?: string;
  scrapedAt?: string;
}

export interface ProductWithScore extends Product {
  isNew?: boolean;
}

export type ProductCategory = 'all' | 'keyboard' | 'keycaps' | 'switches' | 'artisan' | 'case';
export type SortOption = 'featured' | 'price-low' | 'price-high' | 'name-az' | 'name-za' | 'vendor-az' | 'newest';

export interface FilterState {
  category: ProductCategory;
  searchQuery: string;
  sort: SortOption;
}
