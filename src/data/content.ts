/**
 * Shared editorial content and taxonomy used across pages.
 * Copy follows docs/superpowers/specs/2026-10-20-uk-redesign-spec.md §7.1.
 */

/* ------------------------------------------------------------------ */
/* Project categories (used by case-study frontmatter & filters)      */
/* ------------------------------------------------------------------ */

export const categories = {
  ecommerce: { label: 'E-commerce', workSlug: 'ecommerce' },
  shopify: { label: 'Shopify', workSlug: 'shopify' },
  marketplaces: { label: 'Amazon & Marketplaces', workSlug: 'amazon-marketplaces' },
  automation: { label: 'Automation', workSlug: 'automation' },
  web: { label: 'Web', workSlug: 'web-development' },
  technology: { label: 'Technology', workSlug: null },
} as const;

export type CategoryKey = keyof typeof categories;
export const categoryKeys = Object.keys(categories) as [CategoryKey, ...CategoryKey[]];

export interface WorkCategoryPage {
  /** URL segment under /work/<slug>/ */
  slug: string;
  category: CategoryKey;
  /** <title> text (site name is appended by the layout). */
  title: string;
  /** H1 on the category page. */
  heading: string;
  /** Lede under the heading; also the meta description. */
  description: string;
}

/** Category landing pages under /work/<slug>/ – five, in nav order. */
export const workCategoryPages: readonly WorkCategoryPage[] = [
  {
    slug: 'shopify',
    category: 'shopify',
    title: 'Shopify Work',
    heading: 'Shopify stores we have built and fixed',
    description:
      'Shopify stores, theme fixes and speed work for UK small retailers who want one team to call.',
  },
  {
    slug: 'amazon-marketplaces',
    category: 'marketplaces',
    title: 'Amazon & Marketplace Work',
    heading: 'Amazon listings, A+ Content and Brand Stories',
    description:
      'Listing optimisation, A+ Content, Brand Story modules and catalogue clean-up for sellers on Amazon and eBay.',
  },
  {
    slug: 'web-development',
    category: 'web',
    title: 'Web Development Work',
    heading: 'Websites that bring small businesses enquiries',
    description:
      'Fast, professional websites built for UK small businesses, with search foundations in place from day one.',
  },
  {
    slug: 'automation',
    category: 'automation',
    title: 'Automation Work',
    heading: 'Automation that keeps stock, prices and orders in step',
    description:
      'Stock and price sync, order flows and custom plugins that remove manual exports between suppliers, stores and marketplaces.',
  },
  {
    slug: 'ecommerce',
    category: 'ecommerce',
    title: 'E-commerce Work',
    heading: 'E-commerce projects across stores and marketplaces',
    description:
      'Online stores, marketplace listings and the automation between them, delivered for small businesses and sellers.',
  },
] as const;

/* ------------------------------------------------------------------ */
/* What we do (home "What we do" cards, spec §7.1 step 4)              */
/* ------------------------------------------------------------------ */

export interface Capability {
  /** Matches a `Service.slug` in src/data/services.ts. */
  slug: 'shopify' | 'amazon-marketplaces' | 'automation' | 'web-development';
  title: string;
  /** One-line "for…" */
  forWho: string;
  /** Kept for existing pages that read `cap.text`. Same as `forWho`. */
  text: string;
  bullets: readonly [string, string, string];
  href: string;
}

export const capabilities: readonly Capability[] = [
  {
    slug: 'shopify',
    title: 'Shopify & e-commerce stores',
    forWho: 'For UK retailers whose store is slow, dated or not converting.',
    text: 'For UK retailers whose store is slow, dated or not converting.',
    bullets: ['New stores and redesigns', 'Theme fixes and speed work', 'Migrations and app set-up'],
    href: '/services/shopify/',
  },
  {
    slug: 'amazon-marketplaces',
    title: 'Amazon & marketplace listings',
    forWho: 'For Amazon and eBay sellers whose listings are not pulling their weight.',
    text: 'For Amazon and eBay sellers whose listings are not pulling their weight.',
    bullets: ['Listing optimisation and cataloguing', 'A+ Content and Brand Story', 'Amazon brand store design'],
    href: '/services/amazon-marketplaces/',
  },
  {
    slug: 'automation',
    title: 'Automation & integrations',
    forWho: 'For sellers whose stock and prices drift between supplier, store and marketplaces.',
    text: 'For sellers whose stock and prices drift between supplier, store and marketplaces.',
    bullets: ['Stock and price sync', 'Order and tracking flows', 'Custom plugins and feeds'],
    href: '/services/automation/',
  },
  {
    slug: 'web-development',
    title: 'Websites for small businesses',
    forWho: 'For businesses that need a fast, professional site that brings enquiries.',
    text: 'For businesses that need a fast, professional site that brings enquiries.',
    bullets: ['Fast business websites', 'WordPress and Astro builds', 'Search foundations built in'],
    href: '/services/web-development/',
  },
] as const;

/** Fifth tile on the home services grid and the services hub. */
export const consultationTile = {
  title: 'Not sure where to start?',
  text: "Book a call and we'll tell you honestly what you need.",
} as const;

/* ------------------------------------------------------------------ */
/* How it works (spec §7.1 step 6)                                      */
/* ------------------------------------------------------------------ */

export const process = [
  {
    number: '01',
    title: 'A 15-minute call',
    text: "You tell us what's not working. We ask the questions that matter and say whether we can help.",
  },
  {
    number: '02',
    title: 'A plain-English plan',
    text: 'Fixed scope, a clear price and a date. No jargon, no hidden extras.',
  },
  {
    number: '03',
    title: 'Build, launch, support',
    text: 'One team from start to finish, and the same people to call once you are live.',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Why small businesses choose us (spec §7.1 step 7)                    */
/* ------------------------------------------------------------------ */

export const whyUs = [
  {
    title: 'A UK contact and a full engineering team',
    text: 'You deal with one person in the UK, backed by developers who do the work.',
  },
  {
    title: 'One team across store, marketplaces and website',
    text: 'No juggling three agencies. The same people build your store, your listings and the automation between them.',
  },
  {
    title: 'Verified reviews',
    text: '5.0 from 185+ client reviews on Fiverr, and Top Rated on Upwork with a 100% job success score.',
  },
  {
    title: 'Honest about results',
    text: 'We say what we did and what happened. We do not quote numbers we cannot back up.',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Technology & platforms (kept for TechStack.astro)                    */
/* ------------------------------------------------------------------ */

export const technologyGroups = [
  {
    title: 'Stores & marketplaces',
    items: ['Shopify', 'WooCommerce', 'Amazon', 'eBay', 'Etsy', 'Walmart'],
  },
  {
    title: 'Websites',
    items: ['WordPress', 'Astro', 'React', 'Next.js', 'Node.js'],
  },
  {
    title: 'Data & automation',
    items: ['REST APIs', 'MySQL', 'MongoDB', 'Python', 'WordPress plugins'],
  },
] as const;
