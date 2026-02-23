import React from 'react';
import './FilterChips.css';

interface FilterChipsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterChips({ categories, activeCategory, onCategoryChange }: FilterChipsProps) {
  const categoryLabels: Record<string, string> = {
    'all': 'All Products',
    'keyboard': 'Keyboards',
    'switches': 'Switches',
    'keycaps': 'Keycaps',
    'artisan': 'Artisan',
    'case': 'Cases',
  };

  return (
    <div className="filter-chips">
      {categories.map(category => (
        <button
          key={category}
          className={`filter-chip ${activeCategory === category ? 'active' : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          {categoryLabels[category] || category}
        </button>
      ))}
    </div>
  );
}
