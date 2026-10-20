// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Production domain (custom domain on GitHub Pages – no `base` subpath needed)
  site: 'https://3s-soft.co.uk',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  image: {
    responsiveStyles: true,
  },
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  // Self-hosted fonts (deterministic builds, automatic fallback metrics, preload support).
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Manrope',
      cssVariable: '--font-manrope',
      fallbacks: ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/manrope-latin-wght-normal.woff2'],
            weight: '200 800',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404') && !/\/case-studies\/$/.test(page),
      lastmod: new Date(),
      serialize: (item) => {
        // Home and service pages are the conversion pages: hint their importance.
        if (item.url.endsWith('3s-soft.co.uk/') || item.url.includes('/services/')) {
          item.priority = 0.9;
          item.changefreq = /** @type {any} */ ('monthly');
        } else if (item.url.includes('/insights/')) {
          item.priority = 0.7;
          item.changefreq = /** @type {any} */ ('monthly');
        }
        return item;
      },
    }),
  ],
});
