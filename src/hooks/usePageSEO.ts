import { useEffect } from 'react';

interface SEOConfig {
  title: string;
  description?: string;
  keywords?: string;
}

const defaultConfig: SEOConfig = {
  title: 'Switchyard | Mechanical Keyboard Tracker',
  description: 'Track mechanical keyboard group buys, in-stock drops, and vendors. Find your perfect keyboard with Switchyard.',
  keywords: 'mechanical keyboards, keyboard tracker, group buys, keycaps, switches, keyboard vendors, custom keyboards'
};

export function usePageSEO(config: Partial<SEOConfig> = {}) {
  const { title, description, keywords } = { ...defaultConfig, ...config };

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

    // Update Open Graph title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    // Update Open Graph description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description || defaultConfig.description!);
    }

    // Update Twitter title
    let twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }

    // Update Twitter description
    let twitterDesc = document.querySelector('meta[property="twitter:description"]');
    if (twitterDesc) {
      twitterDesc.setAttribute('content', description || defaultConfig.description!);
    }
  }, [title, description, keywords]);
}

export default usePageSEO;
