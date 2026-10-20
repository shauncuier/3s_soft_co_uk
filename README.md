# 3s-Soft UK — Corporate Website

Official UK digital presence for **3s-Soft**: one UK team for small businesses' websites, online stores and marketplace listings.

Design and content follow the research-led specification in `docs/superpowers/specs/2026-10-20-uk-redesign-spec.md`. Read it before changing copy, colours or page structure.

- **Production Domain**: [https://3s-soft.co.uk](https://3s-soft.co.uk)
- **Global Presence**: [https://3s-soft.com](https://3s-soft.com)
- **Hosting Target**: GitHub Pages (Static Site Generation with automated GitHub Actions deployment)

---

## Technology Stack

- **Framework**: [Astro](https://astro.build) (Static Site Generation)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v4 with design tokens in an `@theme` block (`src/styles/global.css`)
- **Typography**: Instrument Serif (headlines) + Manrope Variable (text), self-hosted via the Astro Fonts API (`src/assets/fonts/`)
- **Content**: Astro Content Collections with MDX
- **Icons**: [@lucide/astro](https://lucide.dev)
- **SEO**: Structured Data (Schema.org JSON-LD), Open Graph, Twitter Cards, Sitemap, Canonical URLs

---

## Getting Started

### Prerequisites

- Node.js `22.x` or later
- npm `10.x` or later

### Installation

```bash
# Clone the repository
git clone https://github.com/<org>/3s_soft_co_uk.git
cd 3s_soft_co_uk

# Install dependencies
npm install
```

### Local Development

Per the project rules, when running the dev server you can start it in background mode or standard mode:

```bash
# Standard dev server
npm run dev

# Or using Astro background mode
npx astro dev --background

# Manage background server
npx astro dev status
npx astro dev logs
npx astro dev stop
```

The site will be available at `http://localhost:4321/`.

### Production Build & Preview

```bash
# Build static production bundle into ./dist
npm run build

# Preview the production output locally
npm run preview
```

---

## Project Structure

```text
3s_soft_co_uk/
├── .github/workflows/deploy.yml   # GitHub Pages deployment on push to main
├── brand-source/                  # Official logo artwork (source of truth)
├── docs/
│   ├── audits/                    # Lighthouse baselines and QA notes
│   └── superpowers/specs/         # Design specifications (read first)
├── public/                        # CNAME, robots.txt, manifest, icons, og-default.png
├── scripts/build-brand-logos.mjs  # Regenerates logo, favicons, 512 icon and OG image
├── src/
│   ├── assets/
│   │   ├── brand/                 # logo.png, logo-white.png (generated)
│   │   ├── fonts/                 # woff2 files served by the Fonts API
│   │   └── projects/              # Case study imagery (ivan-troy/, *.jpg)
│   ├── components/
│   │   ├── ui/                    # Primitives: Button, Section, Container, Card, Tag, Eyebrow, SectionHeading, Logo, Faq
│   │   ├── site/                  # Header, MobileNav (dialog), Footer, CtaBand, ProcessSteps, PersonCard, CredentialList
│   │   ├── home/                  # Hero, Proof, ServicesGrid, FeaturedWork, WhyUs, HomeFaq
│   │   ├── services/              # ServiceCard, ConsultationTile
│   │   ├── work/                  # ProjectCard, ProjectGrid, CategoryNav, WorkListing
│   │   ├── case-study/            # Hero, Meta, Narrative, Outcomes, Gallery, Related
│   │   ├── icons/WhatsAppIcon.astro
│   │   ├── Breadcrumbs.astro
│   │   └── WhatsAppButton.astro   # Floating button, phones only
│   ├── content/case-studies/      # One MDX per project; `placeholder: true` entries are never built
│   ├── data/
│   │   ├── site.ts                # Contact, booking, credentials, proof, people, legal
│   │   ├── content.ts             # Categories, work category pages, capabilities, process, why-us
│   │   ├── services.ts            # Copy for the four /services/ pages
│   │   └── faq.ts                 # Home FAQ
│   ├── layouts/                   # Layout.astro (SEO, fonts, GA4, schema), CaseStudyLayout.astro
│   ├── pages/                     # index, services/, work/, case-studies/, about, contact, privacy, cookies, 404
│   ├── styles/                    # global.css (tokens + base), prose.css (MDX bodies)
│   ├── utils/                     # caseStudies.ts (published-only queries), schema.ts (JSON-LD @graph)
│   └── content.config.ts          # Case study schema
└── astro.config.mjs               # Site URL, fonts, prefetch, sitemap filter
```

---

## Configuration & Customisation

### 1. How to Change Contact Information

All contact details are managed centrally in [`src/data/site.ts`](src/data/site.ts). Never hard-code phone numbers or emails across components.

```typescript
// src/data/site.ts
export const site = {
  // ...
  contact: {
    // UK phone number (international format for tel: link)
    phone: '+447700900000',
    phoneDisplay: '+44 7700 900000',

    // WhatsApp number in digits-only international format (used in https://wa.me/<number>)
    whatsapp: '447700900000',

    // UK enquiry email mailbox
    email: 'contact@3s-soft.com',
  },
};
```

*Note: Leaving any contact field empty (`""`) automatically hides the corresponding button and link across the site.*

### 2. How to Update the UK Presence Information

In [`src/data/site.ts`](src/data/site.ts), update the `ukPresence` object:

```typescript
// src/data/site.ts
ukPresence: {
  name: "Brother's Real Name",
  role: "UK Director / Business Development",
  summary: "UK-based client relationship and business development.",
  hasPhoto: false,
}
```

### 3. How to Change Social Links

In [`src/data/site.ts`](src/data/site.ts):

```typescript
social: {
  linkedin: "https://www.linkedin.com/company/3s-soft/",
  facebook: "https://www.facebook.com/3s.soft.bd",
  instagram: "https://www.instagram.com/3ssoft/",
  youtube: "", // Leave empty to hide
}
```

Only active, non-empty social profiles are displayed in the footer and contact sections.

### 4. How to Add or Edit Case Studies

Case studies are powered by Astro Content Collections in [`src/content/case-studies/`](src/content/case-studies/).

To add a new project, create a new `.mdx` file (e.g. `src/content/case-studies/my-new-project.mdx`):

```yaml
---
title: "Project Name"
tagline: "One-line summary for the hero header."
summary: "Short description (under 160 chars) for cards and meta tags."
categories: ["shopify", "ecommerce"] # options: "ecommerce", "shopify", "web", "technology"
categoryLabel: "Shopify · E-commerce"
client: "[Client Name or Industry]"
industry: "Retail & Commerce"
year: "2025"
platforms: ["Shopify", "Tailwind CSS"]
services: ["Storefront Architecture", "Custom Theme Development"]
heroImage: "../../assets/projects/my-new-project.jpg"
heroAlt: "Accessible description of the hero image"
featured: true # true displays the project prominently on the homepage
order: 1 # integer display order
placeholder: false # set to false for real client work
challenge: "What the business needed..."
approach: "How 3s-Soft approached the problem..."
solution: "What was built or improved..."
outcome:
  - "Qualitative outcome 1 (no unverified fake statistics)"
  - "Qualitative outcome 2"
gallery:
  - image: "../../assets/projects/my-detail-image.jpg"
    alt: "Detail caption"
    caption: "Optional caption"
---

### Project Execution

Write custom editorial narrative or implementation notes here in standard Markdown or MDX.
```

### 5. How to Replace Project Images

1. Place your high-resolution screenshot or mockup into [`src/assets/projects/`](src/assets/projects/).
2. Recommended dimensions:
   - **Hero Images**: 1600×1000px or 1600×1200px (JPEG or WebP, under 400KB).
   - **Gallery Details**: 1200×800px.
3. Update the `heroImage` and `gallery` paths in the corresponding case-study MDX frontmatter.
4. Astro will automatically generate responsive WebP and AVIF formats at build time.

### 6. How to Re-generate Brand Assets

The official artwork lives in `brand-source/3s-soft-logo-source.png`. One script derives everything else:

```bash
node scripts/build-brand-logos.mjs
```

It writes `src/assets/brand/logo.png` (trimmed, original colours), `src/assets/brand/logo-white.png` (for dark bands), `public/favicon-32.png`, `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png` and `public/og-default.png`. Commit the outputs; the script is not run in CI.

### 7. Design rules that are enforced

- Colours, radii and type sizes come from the `@theme` tokens in `src/styles/global.css`. Raw hex values are not used in components or pages.
- No text below 13px; body copy is 17px.
- Every page ends with `CtaBand`; the primary action everywhere is the Cal.com booking link from `site.booking`.
- Amazon credentials are always worded "Listed on Amazon's Service Provider Network".
- Case studies with `placeholder: true` are excluded everywhere by `src/utils/caseStudies.ts`.

---

## Deployment to GitHub Pages

The repository is configured for zero-configuration continuous deployment to GitHub Pages via GitHub Actions.

1. **Push to `main` branch**:
   Every push to `main` automatically triggers `.github/workflows/deploy.yml`.
2. **GitHub Repository Settings**:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment**, set **Source** to **GitHub Actions**.
   - Under **Custom domain**, enter: `3s-soft.co.uk`.
   - Ensure **Enforce HTTPS** is checked.
3. **DNS Configuration for `3s-soft.co.uk`**:
   - Apex domain (`3s-soft.co.uk`):
     - `A` records pointing to GitHub Pages IPs:
       - `185.199.108.153`
       - `185.199.109.153`
       - `185.199.110.153`
       - `185.199.111.153`
   - Subdomain (`www.3s-soft.co.uk`):
     - `CNAME` pointing to `<username>.github.io`
