// Switchyard Configuration

// Vendors with active affiliate programs (sorted by display priority)
export const AFFILIATE_VENDORS = [
  'Keychron',     // 8% commission, 405 products
  'Epomaker',     // 6% commission, 88 products
  'Qwerkywriter'  // Unique products, 9 products
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

// Vendor display order (affiliate vendors first - sorted by confirmed referral value)
export const VENDOR_SORT_ORDER: Record<string, number> = {
  // Top priority - confirmed working affiliate programs
  'Keychron': 0,      // 8% commission, 405 products, prioritized
  'Epomaker': 1,      // 6% commission, 88 products, promoted
  'Qwerkywriter': 2,  // Unique products, 9 products, specialty
  
  // Secondary priority - has affiliates but lower volume/commission
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
