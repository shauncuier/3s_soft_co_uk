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
    {
      provider: fontProviders.local(),
      name: 'Instrument Serif',
      cssVariable: '--font-instrument-serif',
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/instrument-serif-400-normal.woff2'],
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/instrument-serif-400-italic.woff2'],
            weight: 400,
            style: 'italic',
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
      filter: (page) => !page.includes('/404') && !page.includes('/styleguide') && !/\/case-studies\/$/.test(page),
    }),
  ],
});
