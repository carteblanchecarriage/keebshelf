// Switchyard Configuration

// Vendors with active affiliate programs (sorted by priority)
export const AFFILIATE_VENDORS = [
  'Keychron',    // 8% commission, high volume
  'Epomaker',    // 6% commission, Shopify partner
  'Qwerkywriter' // Unique products
] as const;

// All configured vendors (for reference)
export const ALL_AFFILIATE_VENDORS = [
  'Epomaker',
  'KBDfans',
  'NovelKeys', 
  'Keychron',
  'Drop',
  'Qwerkywriter',
  'CannonKeys',
  'DiviniKey',
  'Glorious',
  'Boardsource',
  'Kono.store'
] as const;

// Vendor display order (affiliate vendors first)
export const VENDOR_SORT_ORDER: Record<string, number> = {
  // Affiliate vendors (priority 0-99)
  'Keychron': 0,
  'Epomaker': 1,
  'Qwerkywriter': 2,
  'KBDfans': 10,
  'NovelKeys': 11,
  'Drop': 12,
  
  // Other vendors (priority 100+)
  'CannonKeys': 100,
  'DiviniKey': 101,
  'Glorious': 102,
  'Boardsource': 103,
  'Kono.store': 104
};

// Default vendor filter (none set)
export const DEFAULT_VENDOR: string | null = null;

// Default sort - prioritize affiliate vendors
export const sortByAffiliatePriority = (products: any[]) => {
  return [...products].sort((a, b) => {
    const aPriority = VENDOR_SORT_ORDER[a.vendor] ?? 999;
    const bPriority = VENDOR_SORT_ORDER[b.vendor] ?? 999;
    
    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }
    
    // Secondary sort by name
    return a.name.localeCompare(b.name);
  });
};

// Get vendor priority label
export const getVendorPriority = (vendor: string): 'affiliate' | 'standard' => {
  return AFFILIATE_VENDORS.includes(vendor as any) ? 'affiliate' : 'standard';
};
