/**
 * Central site configuration for 3s-Soft UK.
 *
 * Every fact here traces back to §9 of docs/superpowers/specs/2026-10-20-uk-redesign-spec.md.
 * Never hard-code these values elsewhere – import `site` instead.
 *
 * Empty strings are treated as "not configured" and the related links/buttons
 * are hidden automatically. Never invent a value to fill a gap.
 */

/** Minhajul Abedin Toyon – the UK-based point of contact. */
const ukDirector = {
  name: 'Minhajul Abedin Toyon',
  role: 'UK Director',
  summary: 'Your UK-based point of contact from the first call to launch and beyond.',
  /** Photo not yet supplied – text card until then (spec §7.5). */
  hasPhoto: false,
} as const;

/**
 * Credentials the site may show. Wording for the Amazon entries is fixed:
 * "Listed on Amazon's Service Provider Network" – never "partner", never "endorsed".
 * The two Amazon URLs are the public provider pages confirmed by the owner (20 Oct 2026).
 */
const credentials = [
  {
    key: 'amazonSpnAplus',
    label: "Listed on Amazon's Service Provider Network",
    detail: 'A+ Content',
    href: 'https://sellercentral.amazon.com/gspn/provider-details/Enhanced%20Brand%20Content/d0034058-2c31-4502-87f9-c29514841f24?localeSelection=en_US&sellFrom=US&sellIn=US',
  },
  {
    key: 'amazonSpnCataloguing',
    label: "Listed on Amazon's Service Provider Network",
    detail: 'Cataloguing',
    href: 'https://sellercentral.amazon.com/gspn/provider-details/Cataloguing/d0034058-2c31-4502-87f9-c29514841f24?localeSelection=en_US&sellFrom=US&sellIn=US',
  },
  {
    key: 'wordpressPlugin',
    label: 'Published on WordPress.org',
    detail: '3S Soft Price & Stock Sync for Dropshipzone',
    href: 'https://wordpress.org/plugins/3s-soft-price-stock-sync-for-dropshipzone/',
  },
  {
    key: 'fiverr',
    label: '5.0 rating from 185+ client reviews',
    detail: 'Fiverr',
    href: 'https://www.fiverr.com/jashedulislam',
  },
  {
    key: 'upwork',
    label: 'Top Rated · 100% job success · 2,300+ hours',
    detail: 'Upwork',
    href: 'https://www.upwork.com/freelancers/~01c75e88b6540d813f',
  },
] as const;

export type CredentialKey = (typeof credentials)[number]['key'];
export type Credential = (typeof credentials)[number];

const credentialByKey = Object.fromEntries(credentials.map((c) => [c.key, c])) as Record<
  CredentialKey,
  Credential
>;

export const site = {
  name: '3s-Soft',
  ukName: '3s-Soft UK',
  url: 'https://3s-soft.co.uk',
  mainSiteUrl: 'https://3s-soft.com/',

  /** Hero eyebrow (owner brand line). */
  tagline: 'Build Better. Sell Smarter.',
  /** About page / meta description seed (owner brand line). */
  positioning: 'E-commerce Expertise. Exceptional Digital Experiences.',
  /** Home H1. */
  headline: 'One UK team for your website, your online store and your marketplace listings.',
  description:
    '3s-Soft UK helps small businesses and e-commerce sellers build, fix and grow their online sales. One UK team for your website, your online store and your marketplace listings.',
  locale: 'en_GB',
  lang: 'en-GB',

  /** Primary call to action everywhere. Plain link, no embed script. */
  booking: {
    url: 'https://cal.com/3s-soft-uk/15min',
    label: 'Book a 15-minute call',
  },

  contact: {
    /** UK phone – international format without spaces. */
    phone: '+447523759901',
    phoneDisplay: '+44 7523 759901',
    /** WhatsApp number: digits only, international format, no "+" or spaces (used in https://wa.me/<number>). */
    whatsapp: '447523759901',
    /** Prefilled text for every WhatsApp link (spec §9). */
    whatsappMessage: "Hello 3s-Soft UK, I'd like to discuss an e-commerce or website development project.",
    whatsappLabel: 'Chat on WhatsApp',
    /** Primary contact email. */
    email: 'info@3s-soft.co.uk',
    /** Secondary / friendly contact email. */
    emailSecondary: 'hello@3s-soft.co.uk',
    /** Response promise shown on the contact page. */
    responsePromise: 'We reply within one UK business day.',
  },

  social: {
    linkedin: 'https://www.linkedin.com/company/3s-soft/',
    facebook: 'https://www.facebook.com/3s.soft.bd',
    instagram: 'https://www.instagram.com/3ssoft/',
    youtube: '',
  },

  founder: {
    name: 'Jashedul Islam Shaun',
    role: 'Founder & Lead Developer',
    url: 'https://jashedulislamshaun.com',
  },

  ukDirector,

  /** @deprecated Use `site.ukDirector`. Kept so existing pages keep compiling. */
  ukPresence: ukDirector,

  credentials,

  /** Owner-stated reach. No source URL exists beyond the owner's word, so it links to About. */
  reach: 'Clients in 30+ countries',

  /** Proof strip under the hero (spec §7.1 step 3). Each fact links to its source. */
  proof: [
    {
      key: 'amazonSpn',
      label: "Listed on Amazon's Service Provider Network",
      href: credentialByKey.amazonSpnAplus.href,
      external: true,
    },
    {
      key: 'reviews',
      label: '5.0 from 185+ client reviews',
      href: credentialByKey.fiverr.href,
      external: true,
    },
    {
      key: 'reach',
      label: 'Clients in 30+ countries',
      href: '/about/',
      external: false,
    },
    {
      key: 'ukContact',
      label: 'UK-based point of contact',
      href: '/contact/',
      external: false,
    },
  ],

  /** Legal details – leave empty until confirmed. Never invent these. */
  legal: {
    companyName: '',
    companyNumber: '',
    registeredAddress: '',
    vatNumber: '',
    lastUpdated: '2026-10-20',
  },
} as const;

export type SocialKey = keyof typeof site.social;

/** Look up one credential by key. */
export function getCredential(key: CredentialKey): Credential {
  return credentialByKey[key];
}

/** Credentials that have a public URL – for the footer and schema `sameAs`. */
export const credentialLinks = credentials.filter((c) => c.href);

export const navigation = [
  { label: 'Services', href: '/services/' },
  { label: 'Work', href: '/work/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const;

/** Footer Company column uses the same links; Contact is already included. */
export const footerNavigation = [...navigation] as const;

/* ------------------------------------------------------------------ */
/* Derived contact links                                               */
/* ------------------------------------------------------------------ */

const whatsappDigits = site.contact.whatsapp.replace(/\D/g, '');

export const contactLinks = {
  whatsapp: whatsappDigits
    ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(site.contact.whatsappMessage)}`
    : '',
  email: site.contact.email ? `mailto:${site.contact.email}` : '',
  emailSecondary: site.contact.emailSecondary ? `mailto:${site.contact.emailSecondary}` : '',
  phone: site.contact.phone ? `tel:${site.contact.phone.replace(/\s/g, '')}` : '',
  booking: site.booking.url,
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
