
import { useEffect } from 'react';

// Canonical domain for Switchyard
const DOMAIN = 'https://switchyard.app';

interface SEOConfig {
  title: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

const defaultConfig: SEOConfig = {
  title: 'Switchyard | Mechanical Keyboard Tracker',
  description: 'Track mechanical keyboard group buys, in-stock drops, and vendors. Find your perfect keyboard with Switchyard.',
  keywords: 'mechanical keyboards, keyboard tracker, group buys, keycaps, switches, keyboard vendors, custom keyboards',
  ogType: 'website',
  ogImage: `${DOMAIN}/og-image.png`
};

export function usePageSEO(config: Partial<SEOConfig> = {}) {
  const { title, description, keywords, canonical, ogImage, ogType, noIndex } = { ...defaultConfig, ...config };

  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description || defaultConfig.description!);

    // Update or create meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Update or create robots meta
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Update or create canonical link
    if (canonical) {
      const canonicalUrl = canonical.startsWith('http') ? canonical : `${DOMAIN}${canonical}`;
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    // Update Open Graph tags
    updateOrCreateMeta('og:title', title, 'property');
    updateOrCreateMeta('og:description', description || defaultConfig.description!, 'property');
    updateOrCreateMeta('og:type', ogType || defaultConfig.ogType!, 'property');
    updateOrCreateMeta('og:image', ogImage || defaultConfig.ogImage!, 'property');
    if (canonical) {
      updateOrCreateMeta('og:url', canonical.startsWith('http') ? canonical : `${DOMAIN}${canonical}`, 'property');
    }

    // Update Twitter Card tags (using name, not property)
    updateOrCreateMeta('twitter:title', title, 'name');
    updateOrCreateMeta('twitter:description', description || defaultConfig.description!, 'name');
    updateOrCreateMeta('twitter:image', ogImage || defaultConfig.ogImage!, 'name');
    updateOrCreateMeta('twitter:card', 'summary_large_image', 'name');

    // Cleanup function to reset meta tags to defaults when component unmounts
    return () => {
      document.title = defaultConfig.title;
    };
  }, [title, description, keywords, canonical, ogImage, ogType, noIndex]);
}

// Helper to update or create meta tags
function updateOrCreateMeta(property: string, content: string, attrType: 'name' | 'property') {
  let tag = document.querySelector(`meta[${attrType}="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrType, property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export default usePageSEO;
