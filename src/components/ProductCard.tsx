import React from 'react';
import './ProductCard.css';
import { KeyboardProduct } from '../types/keyboard';

interface ProductCardProps {
  product: KeyboardProduct;
  onClick: (product: KeyboardProduct) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const formatPrice = (price?: string) => {
    if (!price || price === 'N/A') return 'Check Price';
    return price.startsWith('$') ? price : `$${price}`;
  };

  // Generate descriptive alt text for accessibility and SEO
  const getImageAltText = (): string => {
    const parts = [product.name];
    if (product.vendor) parts.push(product.vendor);
    if (product.category && product.category !== 'keyboard') parts.push(product.category);
    parts.push('mechanical keyboard product image');
    return parts.join(' - ');
  };

  return (
    <div
      className="product-card"
      onClick={() => onClick(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(product)}
      aria-label={`View details for ${product.name} by ${product.vendor || 'unknown vendor'}`}
    >
      <div className="product-image">
        {product.image ? (
          <img 
            src={product.image} 
            alt={getImageAltText()}
            loading="lazy"
          />
        ) : (
          <div className="no-image" role="img" aria-label="No product image available">No Image</div>
        )}
      </div>

      <div className="product-info">
        <span className="vendor">{product.vendor}</span>
        <h3 className="name">{product.name}</h3>
        <span className="price">{formatPrice(product.price)}</span>
        <span className="category">{product.category}</span>
      </div>
    </div>
  );
}
