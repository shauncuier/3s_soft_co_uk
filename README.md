# 3s-Soft UK — Corporate Website

Official UK digital presence for **3s-Soft**: Digital Commerce & Technology Partner.

- **Production Domain**: [https://3s-soft.co.uk](https://3s-soft.co.uk)
- **Global Presence**: [https://3s-soft.com](https://3s-soft.com)
- **Hosting Target**: GitHub Pages (Static Site Generation with automated GitHub Actions deployment)

---

## Technology Stack

- **Framework**: [Astro](https://astro.build) (Static Site Generation)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v4 + Custom Design System
- **Typography**: [Manrope Variable](https://fontsource.org/fonts/manrope)
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
├── .github/workflows/
│   └── deploy.yml              # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── CNAME                   # 3s-soft.co.uk custom domain mapping
│   ├── robots.txt              # Search engine directives & sitemap location
│   ├── site.webmanifest        # PWA / web manifest
│   ├── favicon.ico             # 16/32/48 multi-size icon
│   ├── favicon-32.png          # High-DPI browser tab icon
│   ├── apple-touch-icon.png    # iOS bookmark icon
│   └── og-default.png          # 1200×630 Open Graph sharing image
├── scripts/
│   ├── generate-brand-assets.mjs # Derives transparent logo, favicons & OG image
│   └── generate-mockups.mjs      # Generates project preview mockups and crops
├── src/
│   ├── assets/
│   │   ├── brand/              # 3s-Soft official brand assets
│   │   └── projects/           # High-resolution case study and project imagery
│   ├── components/             # Reusable Astro UI components
│   │   ├── Header.astro        # Sticky navigation with mobile menu
│   │   ├── Footer.astro        # Corporate footer with active socials & contacts
│   │   ├── Hero.astro          # Hero section with headline and CTAs
│   │   ├── HeroVisual.astro    # Layered project mockup composition
│   │   ├── SectionHeading.astro# Editorial section titles & subtitles
│   │   ├── ProjectCard.astro   # Portfolio card with hover zoom & tags
│   │   ├── ProjectGrid.astro   # Responsive editorial project grid
│   │   ├── CaseStudyHero.astro # Case study metadata and hero image
│   │   ├── CaseStudySection.astro # Challenge, Approach, Solution, Outcomes
│   │   ├── TechStack.astro     # Platforms grouped by capability
│   │   ├── CTA.astro           # "Let's build something useful" banner
│   │   ├── ContactButtons.astro# WhatsApp, Email, and Phone CTAs
│   │   ├── WhatsAppButton.astro# Floating non-obstructive WhatsApp widget
│   │   └── Breadcrumbs.astro   # Breadcrumb navigation with JSON-LD
│   ├── content/
│   │   └── case-studies/       # Content collection MDX files
│   ├── data/
│   │   ├── site.ts             # Central configuration (contact, socials, UK presence)
│   │   └── content.ts          # Capabilities, categories, and process copy
│   ├── layouts/
│   │   ├── Layout.astro        # Master HTML layout with technical SEO
│   │   └── CaseStudyLayout.astro # Case study layout with Article/CreativeWork schema
│   ├── pages/
│   │   ├── index.astro         # Homepage
│   │   ├── work/
│   │   │   ├── index.astro     # All work with client-side category filters
│   │   │   └── [category].astro# Dedicated category pages (/work/shopify, etc.)
│   │   ├── case-studies/
│   │   │   ├── index.astro     # Case studies index with category tabs
│   │   │   └── [id].astro      # Dynamic case study detail pages
│   │   ├── about.astro         # About 3s-Soft UK & Operating model
│   │   ├── contact.astro       # Contact channels (WhatsApp, Email, Phone)
│   │   └── 404.astro           # Custom 404 error page
│   ├── styles/
│   │   └── global.css          # Design tokens, typography & Tailwind v4
│   └── content.config.ts       # Astro Content Collections schema
└── astro.config.mjs            # Astro configuration with custom domain & sitemap
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

The official 3s-Soft logo is preserved in `brand-source/3s-soft-logo-source.png`. To regenerate all derived web assets:

```bash
node scripts/generate-brand-assets.mjs
```

This updates:
- `src/assets/brand/3s-soft-logo.png` (transparent trimmed header logo)
- `public/favicon.ico`
- `public/favicon-32.png`
- `public/apple-touch-icon.png`
- `public/icon-192.png` & `public/icon-512.png`
- `public/og-default.png` (1200×630 Open Graph sharing image)

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
