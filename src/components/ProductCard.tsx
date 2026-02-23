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

  return (
    <div
      className="product-card"
      onClick={() => onClick(product)}
    >
      <div className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="no-image">No Image</div>
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
