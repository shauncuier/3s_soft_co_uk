/**
 * Shared editorial content and taxonomy used across pages.
 */

/* ------------------------------------------------------------------ */
/* Project categories (used by case-study frontmatter & filters)      */
/* ------------------------------------------------------------------ */

export const categories = {
  ecommerce: { label: 'E-commerce', workSlug: 'ecommerce' },
  shopify: { label: 'Shopify', workSlug: 'shopify' },
  web: { label: 'Web', workSlug: 'web-development' },
  technology: { label: 'Technology', workSlug: null },
} as const;

export type CategoryKey = keyof typeof categories;
export const categoryKeys = Object.keys(categories) as [CategoryKey, ...CategoryKey[]];

/** Category landing pages under /work/<slug>/ */
export const workCategoryPages = [
  {
    slug: 'shopify',
    category: 'shopify' as CategoryKey,
    title: 'Shopify Work',
    heading: 'Shopify, built with care.',
    description:
      'Shopify storefronts, theme improvements and store operations delivered by 3s-Soft for growing commerce brands.',
  },
  {
    slug: 'ecommerce',
    category: 'ecommerce' as CategoryKey,
    title: 'E-commerce Work',
    heading: 'Digital commerce, thoughtfully delivered.',
    description:
      'E-commerce projects spanning storefronts, marketplace operations and product data, delivered by 3s-Soft.',
  },
  {
    slug: 'web-development',
    category: 'web' as CategoryKey,
    title: 'Web Development Work',
    heading: 'Websites built for real business needs.',
    description:
      'Corporate websites and web platforms designed and developed by 3s-Soft for organisations that need clarity and performance.',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Capabilities                                                        */
/* ------------------------------------------------------------------ */

export const capabilities = [
  {
    title: 'E-commerce',
    text: 'Storefronts, catalogues and day-to-day commerce operations, set up to scale without adding complexity.',
  },
  {
    title: 'Shopify',
    text: 'Store builds, theme customisation, apps and ongoing improvements for Shopify brands of every size.',
  },
  {
    title: 'Marketplace Operations',
    text: 'Listing management and channel operations across Amazon, eBay, Etsy and Walmart.',
  },
  {
    title: 'Web Development',
    text: 'Fast, accessible websites and web applications built on modern, maintainable foundations.',
  },
  {
    title: 'Product Data',
    text: 'Structured, consistent product information — titles, attributes, imagery and feeds — that every channel can rely on.',
  },
  {
    title: 'Automation',
    text: 'Integrations and workflows that remove repetitive manual work between systems.',
  },
  {
    title: 'Digital Technology',
    text: 'Custom tools, dashboards and APIs designed around how your organisation actually works.',
  },
] as const;

/* ------------------------------------------------------------------ */
/* How we work                                                         */
/* ------------------------------------------------------------------ */

export const process = [
  { number: '01', title: 'Understand', text: 'We understand the business, technology and problem.' },
  { number: '02', title: 'Build', text: 'We design and implement the appropriate solution.' },
  { number: '03', title: 'Improve', text: 'We refine, maintain and improve the digital experience.' },
] as const;

/* ------------------------------------------------------------------ */
/* Technology & platforms                                              */
/* ------------------------------------------------------------------ */

export const technologyGroups = [
  {
    title: 'Commerce & Marketplaces',
    items: ['Shopify', 'Amazon', 'eBay', 'Etsy', 'Walmart'],
  },
  {
    title: 'Web & Applications',
    items: ['WordPress', 'React', 'Next.js', 'Astro', 'Node.js'],
  },
  {
    title: 'Data & Automation',
    items: ['MySQL', 'MongoDB', 'Python', 'APIs', 'Automation'],
  },
] as const;
