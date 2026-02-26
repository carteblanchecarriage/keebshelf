#!/usr/bin/env node
// Auto-generate sitemap.xml for Switchyard
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://switchyard.app';
const today = new Date().toISOString().split('T')[0];

const pages = [
    // Core pages
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/switch-guide', priority: '0.9', changefreq: 'weekly' },
    { path: '/glossary', priority: '0.8', changefreq: 'monthly' },
    
    // Learn hub
    { path: '/learn', priority: '0.9', changefreq: 'weekly' },
    
    // Getting Started guides
    { path: '/learn/beginners-guide', priority: '0.85', changefreq: 'monthly' },
    { path: '/learn/layout-sizes', priority: '0.85', changefreq: 'monthly' },
    { path: '/learn/faq', priority: '0.8', changefreq: 'monthly' },
    
    // Deep Dive guides
    { path: '/learn/switch-guide', priority: '0.9', changefreq: 'monthly' },
    { path: '/learn/keycap-profiles', priority: '0.85', changefreq: 'monthly' },
    { path: '/learn/artisan-guide', priority: '0.8', changefreq: 'monthly' },
    { path: '/learn/group-buys', priority: '0.8', changefreq: 'weekly' },
    
    // Recommendation guides
    { path: '/learn/best-budget', priority: '0.85', changefreq: 'weekly' },
    { path: '/learn/best-gaming', priority: '0.85', changefreq: 'weekly' },
    { path: '/learn/best-60-percent', priority: '0.85', changefreq: 'weekly' },
    { path: '/learn/best-75-percent', priority: '0.85', changefreq: 'weekly' },
    { path: '/learn/best-tkl', priority: '0.85', changefreq: 'weekly' },
    { path: '/learn/best-programming', priority: '0.85', changefreq: 'weekly' },
    
    // Legal pages
    { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

pages.forEach(page => {
    sitemap += `    <url>
`;
    sitemap += `        <loc>${baseUrl}${page.path}</loc>
`;
    sitemap += `        <lastmod>${today}</lastmod>
`;
    sitemap += `        <changefreq>${page.changefreq}</changefreq>
`;
    sitemap += `        <priority>${page.priority}</priority>
`;
    sitemap += `    </url>
`;
});

sitemap += `</urlset>
`;

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap);
console.log('✅ sitemap.xml generated at', sitemapPath);
console.log(`📄 Generated ${pages.length} URLs`);
