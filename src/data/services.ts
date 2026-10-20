/**
 * Service pages – one entry per /services/<slug>/.
 * Copy follows docs/superpowers/specs/2026-10-20-uk-redesign-spec.md §3, §7.2 and §9.
 * Plain English, British spelling, no invented numbers. Amazon and Shopify terms
 * are explained the first time they appear on each page.
 */

import type { CategoryKey } from './content';
import type { Faq } from './faq';

export type ServiceSlug = 'shopify' | 'amazon-marketplaces' | 'automation' | 'web-development';

/** Published case studies a service may link to. Must match a file in src/content/case-studies/. */
export type PublishedCaseStudyId =
  | 'ivan-troy-amazon-brand-story'
  | 'tailwater-supply-co'
  | 'dropshipzone-price-stock-sync';

export interface Service {
  slug: ServiceSlug;
  /** Card and hub title. */
  title: string;
  /** Short label for navigation, footer and breadcrumbs. */
  navLabel: string;
  /** Page H1 – includes the service term and the audience. */
  h1: string;
  /** <title> – "{Service} for UK Small Businesses | 3s-Soft UK" or "…for Amazon Sellers". */
  metaTitle: string;
  /** ≤155 characters. */
  metaDescription: string;
  /** Lede under the H1. */
  lede: string;
  /** "Who this is for" – exactly three. */
  forWho: readonly [string, string, string];
  /** "What's included" – six to eight items. */
  included: readonly string[];
  /** What the client receives at the end. */
  deliverables: readonly string[];
  /** Three or four questions, rendered with FAQPage schema. */
  faqs: readonly Faq[];
  /** Work category this service links to (/work/<categories[key].workSlug>/). */
  relatedCategory: CategoryKey;
  /** One published case study shown under "Related work". */
  relatedCaseStudyId: PublishedCaseStudyId;
  href: string;
}

export const services: readonly Service[] = [
  {
    slug: 'shopify',
    title: 'Shopify & e-commerce stores',
    navLabel: 'Shopify stores',
    h1: 'Shopify stores for UK small businesses',
    metaTitle: 'Shopify Development for UK Small Businesses | 3s-Soft UK',
    metaDescription:
      'New Shopify stores, theme fixes, speed work and migrations for UK small retailers. One team, a fixed price and plain-English advice. Book a 15-minute call.',
    lede:
      'Shopify is the platform most UK small retailers use to sell online. We build new stores, fix the ones that are slow or dated, and move stores over from other platforms, as one team you can call.',
    forWho: [
      'UK retailers and direct-to-consumer brands who need a new Shopify store that looks professional and works on phones.',
      'Shop owners whose current store is slow, hard to update or not turning visitors into orders.',
      'Businesses moving to Shopify from WooCommerce, Wix, Squarespace or an older platform without losing products, customers or search rankings.',
    ],
    included: [
      'New store set-up: products, collections, payments, shipping rates and UK VAT settings.',
      'Theme design and customisation, built mobile-first so the store works on the phones your customers use.',
      'Speed work: image optimisation, unused app clean-up and theme code fixes.',
      'Migrations from WooCommerce, Wix, Squarespace and other platforms, with redirects so you keep your Google rankings.',
      'App selection and set-up for reviews, subscriptions, bundles and email marketing, with honest advice on what you do not need.',
      'Conversion fixes: clearer product pages, simpler checkout, trust signals and better navigation.',
      'Search foundations: page titles, descriptions, structured data and a clean sitemap.',
      'Training so your team can add products and run promotions without calling us.',
    ],
    deliverables: [
      'A live Shopify store you own, on your own Shopify account and domain.',
      'A theme that passes Shopify’s mobile checks and loads quickly on 4G.',
      'A written handover: how to add products, change pages and run sales.',
      'Post-launch fixes and ongoing support, as agreed in the plan.',
    ],
    faqs: [
      {
        q: 'Do I need to pay for Shopify separately?',
        a: 'Yes. Shopify charges a monthly subscription directly to you, and you own the account. Our fee covers the design, build and set-up. We will tell you which Shopify plan fits your size so you do not pay for more than you need.',
      },
      {
        q: 'Can you fix my existing Shopify theme rather than rebuild it?',
        a: 'Often, yes. If the theme is sound we fix the specific problems, such as speed, layout on phones or a broken checkout step, and leave the rest alone. If a rebuild is the cheaper option in the long run, we will say so and explain why.',
      },
      {
        q: 'Will I lose my Google rankings if I move to Shopify?',
        a: 'Not if the move is done carefully. We map every old page to its new address, set up redirects, keep your page titles and descriptions, and check Google Search Console after launch. Rankings normally settle within a few weeks.',
      },
      {
        q: 'Do you work with WooCommerce as well as Shopify?',
        a: 'Yes. We build and maintain WooCommerce stores on WordPress too, and we have published a WooCommerce plugin on WordPress.org. On the call we will recommend whichever platform fits your products, budget and team.',
      },
    ],
    relatedCategory: 'shopify',
    relatedCaseStudyId: 'tailwater-supply-co',
    href: '/services/shopify/',
  },
  {
    slug: 'amazon-marketplaces',
    title: 'Amazon & marketplace listings',
    navLabel: 'Amazon & marketplaces',
    h1: 'Amazon listing optimisation and A+ Content for Amazon sellers',
    metaTitle: 'Amazon A+ Content & Listing Optimisation for Amazon Sellers | 3s-Soft UK',
    metaDescription:
      "Amazon A+ Content, Brand Story, brand store design and cataloguing for UK sellers on Amazon UK and US. Listed on Amazon's Service Provider Network.",
    lede:
      "Your listings are your shop window on Amazon. We write and design them properly: titles and bullet points that match how people search, A+ Content that answers buyer questions on the page, and a catalogue that is clean enough to stop suppressions. We are listed on Amazon's Service Provider Network for A+ Content and Cataloguing.",
    forWho: [
      'UK brands selling on amazon.co.uk, or selling into the US on amazon.com, whose listings are not converting.',
      'Brand-registered sellers who want A+ Content, a Brand Story module and a brand store that look like a real brand.',
      'Sellers with a messy catalogue: duplicate listings, missing variations, suppressed products or attributes that stop them appearing in search filters.',
    ],
    included: [
      'Listing optimisation: titles, bullet points, descriptions and back-end search terms written for how buyers search.',
      'A+ Content (Amazon’s enhanced product description modules) designed and uploaded for each product or colourway.',
      'Brand Story, the module that appears across all your brand’s listings, with your story, category cards and brand Q&A.',
      'Amazon brand store design: a multi-page storefront under your own brand URL on Amazon.',
      'Cataloguing and clean-up: variations, attributes, images and category fixes so products appear in the right filters.',
      'Suppressed and stranded listing fixes, with the Seller Central cases handled for you.',
      'eBay listings and templates for sellers trading on more than one marketplace.',
      'Image and infographic design to Amazon’s requirements, from your product photography.',
    ],
    deliverables: [
      'Live A+ Content and Brand Story on your listings, with source files you keep.',
      'Optimised listing copy delivered as a flat file or uploaded for you in Seller Central.',
      'A clean catalogue with variations and attributes fixed and documented.',
      'A template system so new products and colourways can be added in the same style.',
    ],
    faqs: [
      {
        q: 'What is Amazon A+ Content and do I qualify for it?',
        a: 'A+ Content replaces the plain text description on a listing with designed modules: images, comparison tables, feature callouts and more. You need to be enrolled in Amazon Brand Registry, which requires a registered trademark. If you are not registered yet, we can tell you what the process involves.',
      },
      {
        q: 'Can you guarantee more sales?',
        a: 'No, and you should be wary of anyone who does. Better listings remove the reasons buyers hesitate, but price, reviews, stock and advertising matter too. We show you the work we have done for other brands and we are honest about what listings can and cannot change.',
      },
      {
        q: 'Do you work on Amazon UK, Amazon US or both?',
        a: 'Both. Our published Amazon work is for a brand on amazon.com, and we work in Seller Central for amazon.co.uk as well. We adapt spelling, sizing and compliance details for each marketplace.',
      },
      {
        q: 'Are you an Amazon partner?',
        a: "We are listed on Amazon's Service Provider Network, Amazon's directory of third-party providers, for A+ Content and Cataloguing. That is a listing, not a partnership or an endorsement, and we never describe it as one.",
      },
    ],
    relatedCategory: 'marketplaces',
    relatedCaseStudyId: 'ivan-troy-amazon-brand-story',
    href: '/services/amazon-marketplaces/',
  },
  {
    slug: 'automation',
    title: 'Automation & integrations',
    navLabel: 'Automation',
    h1: 'E-commerce automation and integrations for UK small businesses',
    metaTitle: 'E-commerce Automation & Integrations for UK Small Businesses | 3s-Soft UK',
    metaDescription:
      'Stock and price sync, order flows, feeds and custom plugins that connect your supplier, store and marketplaces. From the team behind a WordPress.org plugin.',
    lede:
      'When stock and prices live in three places they drift, and you find out when a customer orders something you no longer have. We connect your supplier, your store and your marketplaces so the numbers stay in step without manual exports.',
    forWho: [
      'Sellers whose stock and prices drift between a supplier feed, a Shopify or WooCommerce store and Amazon or eBay.',
      'Dropshippers and wholesalers who re-key orders, tracking numbers or price changes by hand.',
      'Businesses that have outgrown spreadsheets and copy-paste but do not want an expensive enterprise system.',
    ],
    included: [
      'Stock and price synchronisation between suppliers, stores and marketplaces, on a schedule or in near real time.',
      'Order flows: new orders sent to the supplier or warehouse, tracking numbers sent back to the store and the marketplace.',
      'Product feeds for Google Shopping, Amazon, eBay and comparison sites, kept up to date automatically.',
      'Custom WordPress and WooCommerce plugins when an off-the-shelf app does not fit.',
      'Shopify app and API integrations for data that Shopify does not handle on its own.',
      'Supplier and wholesaler API connections, including rate limiting so the connection stays reliable.',
      'Monitoring and alerts so you hear about a failed sync before your customers do.',
    ],
    deliverables: [
      'A working integration you own, documented so another developer could maintain it.',
      'A clear record of what syncs, how often and what happens when the supplier is unavailable.',
      'Admin screens or reports so you can see sync status without asking us.',
      'Support as agreed, from the team that built it.',
    ],
    faqs: [
      {
        q: 'Can you connect my specific supplier?',
        a: 'If the supplier offers an API, a regularly updated file or a feed, almost certainly. We have published a WordPress.org plugin that connects WooCommerce stores to the Dropshipzone supplier, and we build private connections for others. Tell us the supplier on the call and we will check before quoting.',
      },
      {
        q: 'Is a custom plugin better than an off-the-shelf app?',
        a: 'Not always. If an existing app does the job reliably we will recommend it and set it up for you. We build custom when the app does not exist, costs more over time than building, or cannot handle your catalogue size.',
      },
      {
        q: 'What happens if the sync breaks?',
        a: 'Every integration we build logs what it does and alerts you, and us if you want, when something fails. We design them to retry safely and never to oversell. Support after launch is agreed in the plan.',
      },
    ],
    relatedCategory: 'automation',
    relatedCaseStudyId: 'dropshipzone-price-stock-sync',
    href: '/services/automation/',
  },
  {
    slug: 'web-development',
    title: 'Websites for small businesses',
    navLabel: 'Websites',
    h1: 'Web design and development for UK small businesses',
    metaTitle: 'Web Design & Development for UK Small Businesses | 3s-Soft UK',
    metaDescription:
      'Fast, professional websites for UK small businesses, built on WordPress or Astro with search foundations in place. You own the site. Book a 15-minute call.',
    lede:
      'A small business website has one job: bring you enquiries. We build fast, clear sites on WordPress or Astro that load quickly on phones, rank for the searches your customers make and are yours to keep.',
    forWho: [
      'UK small businesses and trades whose website is slow, dated or does not show up on Google.',
      'Brands that sell on Amazon or other marketplaces and want a home of their own that sends buyers to their listings.',
      'New businesses that need a professional site quickly without a long agency process.',
    ],
    included: [
      'Design and build on WordPress or Astro, chosen to fit how often you will update the site.',
      'Mobile-first pages that load quickly on 4G, with image optimisation and clean code.',
      'Search foundations: page titles, descriptions, structured data, a sitemap and Google Search Console set-up.',
      'Contact, booking and enquiry routes that are easy to find on every page.',
      'Google Analytics set-up with a plain-English privacy and cookie page.',
      'Accessibility basics: readable text, keyboard navigation and alt text on images.',
      'Hosting and domain advice, set up in your name so you own everything.',
      'Training and a written handover so you can edit the site yourself.',
    ],
    deliverables: [
      'A live website on your domain and hosting account, owned by you.',
      'Pages that pass Google’s Core Web Vitals checks for speed and stability.',
      'A short guide to editing pages, adding posts and reading your analytics.',
      'Post-launch fixes and ongoing support, as agreed in the plan.',
    ],
    faqs: [
      {
        q: 'WordPress or Astro: which do I need?',
        a: 'WordPress suits businesses that will update pages, posts and products themselves and want a familiar editor. Astro suits sites that change less often and need to be as fast as possible. We recommend one on the call based on how you will use the site, not on what we prefer to build.',
      },
      {
        q: 'Will I own the website?',
        a: 'Yes. The domain, hosting and site are all set up in your name. You can take the site to another developer at any time, and we hand over the files and logins when we finish.',
      },
      {
        q: 'Can you help my site show up on Google?',
        a: 'We build in the foundations Google looks for: fast pages, clear titles and descriptions, structured data and a sitemap, and we set up Search Console so you can see how you rank. Ongoing search marketing is a separate conversation, and we will be honest about what a new site can and cannot do on its own.',
      },
    ],
    relatedCategory: 'web',
    relatedCaseStudyId: 'tailwater-supply-co',
    href: '/services/web-development/',
  },
] as const;

export const serviceSlugs = services.map((s) => s.slug) as [ServiceSlug, ...ServiceSlug[]];

/** One service by slug, or undefined for an unknown slug. */
export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Services hub page copy (/services/). */
export const servicesHub = {
  title: 'Services for UK Small Businesses & E-commerce Sellers',
  heading: 'What we do',
  lede:
    'Four things, done properly, by one team: Shopify stores, Amazon and marketplace listings, the automation between them, and websites that bring enquiries.',
  metaDescription:
    'Shopify stores, Amazon listings and A+ Content, e-commerce automation and small business websites from one UK team. Book a 15-minute call.',
} as const;
