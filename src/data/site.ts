/**
 * Central site configuration for 3s-Soft UK.
 *
 * All contact details, social links and UK presence information live here.
 * Never hard-code these values elsewhere – import `site` instead.
 *
 * Empty strings are treated as "not configured" and the related links/buttons
 * are hidden automatically.
 */

export const site = {
  name: '3s-Soft',
  ukName: '3s-Soft UK',
  url: 'https://3s-soft.co.uk',
  mainSiteUrl: 'https://3s-soft.com/',
  positioning: 'Digital Commerce & Technology Partner',
  tagline: 'We build, improve and manage digital experiences for modern businesses.',
  description:
    '3s-Soft UK is the UK-facing team of 3s-Soft, a digital commerce and technology partner delivering e-commerce, Shopify, marketplace operations, web development and custom technology for businesses.',
  locale: 'en_GB',
  lang: 'en-GB',

  contact: {
    /**
     * TODO: Replace with the real UK number.
     * The placeholder +44 7700 900000 is from Ofcom's reserved drama range and is never assigned.
     * Use international format without spaces for `phone`.
     */
    phone: '+447700900000',
    phoneDisplay: '+44 7700 900000',
    /** WhatsApp number: digits only, international format, no "+" or spaces (used in https://wa.me/<number>). TODO: replace. */
    whatsapp: '447700900000',
    /** TODO: Replace with the dedicated UK mailbox when available. */
    email: 'contact@3s-soft.com',
  },

  social: {
    linkedin: 'https://www.linkedin.com/company/3s-soft/',
    facebook: 'https://www.facebook.com/3s.soft.bd',
    instagram: 'https://www.instagram.com/3ssoft/',
    youtube: '',
  },

  /** UK presence – replace placeholders once details are confirmed. */
  ukPresence: {
    name: "Minhazul Abedin",
    role: 'UK Director / Business Development',
    summary: 'UK-based client relationship and business development.',
    /** Optional: import a photo in src/pages/about.astro & index.astro when available. */
    hasPhoto: false,
  },

  /** Legal details – leave empty until confirmed. Never invent these. */
  legal: {
    companyName: '',
    companyNumber: '',
    registeredAddress: '',
    lastUpdated: '2026-10-03',
  },
} as const;

export type SocialKey = keyof typeof site.social;

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work/' },
  { label: 'Case Studies', href: '/case-studies/' },
  { label: 'About', href: '/about/' },
] as const;

export const footerNavigation = [...navigation, { label: 'Contact', href: '/contact/' }] as const;

/* ------------------------------------------------------------------ */
/* Derived contact links                                               */
/* ------------------------------------------------------------------ */

export const contactLinks = {
  whatsapp: site.contact.whatsapp ? `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}` : '',
  email: site.contact.email ? `mailto:${site.contact.email}` : '',
  phone: site.contact.phone ? `tel:${site.contact.phone.replace(/\s/g, '')}` : '',
};

const socialLabels: Record<SocialKey, string> = {
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
};

/** Only social profiles that are actually configured. */
export const activeSocials = (Object.keys(site.social) as SocialKey[])
  .filter((key) => site.social[key])
  .map((key) => ({ key, label: socialLabels[key], href: site.social[key] }));
