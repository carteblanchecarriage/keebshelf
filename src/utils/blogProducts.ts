import { useState, useEffect } from 'react';
import { KeyboardProduct } from '../types/keyboard';

// Product data cache
let productsCache: KeyboardProduct[] | null = null;

/**
 * Find the best matching product from data.json
 * Uses fuzzy matching to handle slight name variations
 * 
 * @param searchTerm - Product name or partial match (e.g., "Wooting 60HE")
 * @returns Best matching product or null if no good match found
 */
export function findProductByName(searchTerm: string): KeyboardProduct | null {
  // Load products once
  if (!productsCache) {
    try {
      const data = require('../data.json');
      productsCache = data.allProducts || [];
    } catch {
      return null;
    }
  }
  
  if (!productsCache) return null;
  
  const term = searchTerm.toLowerCase().replace(/[^a-z0-9 ]/g, '');
  
  // Exact ID match (highest priority)
  const exactIdMatch = productsCache.find(p => 
    p.id?.toLowerCase() === term.replace(/\s+/g, '-')
  );
  if (exactIdMatch) return exactIdMatch;
  
  // Exact name match
  const exactMatch = productsCache.find(p => 
    p.name?.toLowerCase() === term
  );
  if (exactMatch) return exactMatch;
  
  // Contains match
  const containsMatch = productsCache.find(p =>
    p.name?.toLowerCase().includes(term) ||
    term.split(' ').every(word => p.name?.toLowerCase().includes(word))
  );
  if (containsMatch) return containsMatch;
  
  // Partial word match (at least 2 words match)
  const words = term.split(' ').filter(w => w.length > 2);
  const partialMatches = productsCache.filter(p => {
    const nameWords = (p.name || '').toLowerCase().split(/\s+/);
    const matchCount = words.filter(w => nameWords.some(nw => nw.includes(w))).length;
    return matchCount >= 2;
  });
  
  if (partialMatches.length > 0) {
    // Return the one with most matching words
    return partialMatches.sort((a, b) => {
      const aMatches = words.filter(w => (a.name || '').toLowerCase().includes(w)).length;
      const bMatches = words.filter(w => (b.name || '').toLowerCase().includes(w)).length;
      return bMatches - aMatches;
    })[0];
  }
  
  return null;
}

/**
 * Create an affiliate link for a product reference in blog
 * If no exact match found, creates a search link or vendor homepage
 * 
 * @param productName - Name of product to link to
 * @param vendor - Optional vendor hint (keychron, epomaker, etc.)
 * @returns URL with affiliate tracking
 */
export function getBlogProductLink(productName: string, vendor?: string): string {
  // First try exact match in data.json
  const product = findProductByName(productName);
  
  if (product?.affiliateUrl) {
    return product.affiliateUrl;
  }
  
  if (product?.url) {
    return product.affiliateUrl || product.url;
  }
  
  // No exact match - create vendor search or homepage link
  const vendorName = (vendor || extractVendorFromName(productName)).toLowerCase();
  
  const vendorLinks: Record<string, string> = {
    keychron: 'https://keychron.com?ref=switchyard',
    epomaker: 'https://epomaker.com?sca_ref=10691179.cOO0hJ6jvi',
    novelkeys: 'https://novelkeys.com?ref=switchyard',
    kbd: 'https://kbdfans.com?ref=switchyard',
    kbdfans: 'https://kbdfans.com?ref=switchyard',
    drop: 'https://drop.com?referer=switchyard',
    glorious: 'https://www.pcgamingrace.com?ref=switchyard',
    cannonkeys: 'https://cannonkeys.com?ref=switchyard',
    divinikey: 'https://divinikey.com?ref=switchyard',
    boardsource: 'https://boardsource.xyz?ref=switchyard',
    qwerkywriter: 'https://qwerkywriter.com?sca_ref=10713146.AiDf5cQpby'
  };
  
  if (vendorLinks[vendorName]) {
    return vendorLinks[vendorName];
  }
  
  // Fallback: create internal search link
  const searchQuery = encodeURIComponent(productName.replace(/\s+/g, '+'));
  return `https://switchyard.club/?search=${searchQuery}`;
}

function extractVendorFromName(name: string): string {
  const nameLower = name.toLowerCase();
  if (nameLower.includes('keychron')) return 'keychron';
  if (nameLower.includes('epomaker')) return 'epomaker';
  if (nameLower.includes('novelkeys')) return 'novelkeys';
  if (nameLower.includes('kbd')) return 'kbdfans';
  if (nameLower.includes('wooting')) return 'wooting'; // No affiliate yet
  if (nameLower.includes('drop')) return 'drop';
  return 'unknown';
}

/**
 * Hook to load products for blog product matching
 * Returns loading state and product finder function
 */
export function useBlogProducts() {
  const [products, setProducts] = useState<KeyboardProduct[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load products from data.json
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data.allProducts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  
  const findProduct = (name: string): KeyboardProduct | null => {
    if (!products.length) return null;
    
    const term = name.toLowerCase();
    
    // Exact-ish match
    return products.find(p => 
      p.name?.toLowerCase().includes(term) ||
      term.split(' ').every(w => p.name?.toLowerCase().includes(w))
    ) || null;
  };
  
  return { products, loading, findProduct };
}