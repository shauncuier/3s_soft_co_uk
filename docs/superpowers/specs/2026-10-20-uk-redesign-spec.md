# 3s-Soft UK — Website Redesign Specification

**Status:** Draft for owner review · **Date:** 20 October 2026 · **Owner:** Jashedul Islam Shaun · **Prepared by:** design/engineering (Claude Code session)

This document is the single source of truth for the rebuild of https://3s-soft.co.uk. It records what we learned, what we decided, and what will be built. Nothing in it is invented: every claim on the site must trace back to a fact listed in §9 or to a published case study.

---

## 1. Why we are rebuilding

The current site has a strong technical base (Astro, static hosting, structured data) but the front end works against the business:

1. **It talks to the wrong audience.** The copy and visual language ("operating thesis", terminal-style labels, orbiting technology badges) read as an enterprise engineering studio. The buyers are UK small businesses and marketplace sellers who want one team to handle their store, listings and website.
2. **It hides its proof.** Six of eight case studies are labelled "Demo Brief". Real credentials (Amazon Service Provider Network listings, 185+ five-star reviews, a published WordPress.org plugin, live client stores) are not shown at all.
3. **It breaks on phones.** The first screen on a 375px phone is an empty grid; the headline sits below the fold. On desktop, floating badges overlap the headline.
4. **It is inconsistent and hard to maintain.** Design tokens are declared but never wired into Tailwind, so a dozen utility classes do nothing. Five button styles are retyped by hand, labels are 10–11px, and focus states are suppressed on key links.
5. **It carries weight it does not need.** Two infinite orbit animations, a marquee, a scroll-progress script, six unpreloaded font subsets and 400–600KB source images cost speed on the devices our buyers use.

**Goal:** a calm, fast, trustworthy site that a UK shop owner understands in ten seconds, that proves 3s-Soft does this work for real brands, and that makes booking a short call the obvious next step.

---

## 2. Research summary

### 2.1 Who we studied
We Make Websites (London), Swanky (Exeter/global), Charle (London), EcommAdvize (Manchester) — the UK agencies that rank and get referred for Shopify and marketplace work — plus the current 3s-Soft site.

### 2.2 What the strong sites share
- One sentence that says who the agency is for, and one primary button.
- Proof directly under the hero: real client work or logos, not adjectives.
- Services as a short list, each with its own landing page (this is also what ranks).
- A three- or four-step "how it works".
- A footer that behaves like a real company: address, legal line, contact.
- Calm palette, large type, generous whitespace, real product or interface imagery.

### 2.3 Where the gap is
Every strong UK agency speaks to mid-market and enterprise brands ("composable", "internationalisation", "Shopify Plus"). Agencies that do serve small sellers look like templates and lean on stock imagery and animated counters. No one speaks plainly to **a UK small business or Amazon seller who wants one competent team across the store, the marketplace listings and the automation between them**. 3s-Soft already does exactly that work (Tailwater Supply Co., Ivan Troy, the Dropshipzone sync plugin). The site should say so in plain English and show it.

---

## 3. Audience and positioning

### 3.1 Primary audiences
| Segment | Their situation | What they type into Google | What convinces them |
|---|---|---|---|
| UK small retailer / DTC brand | Has or needs a Shopify/WooCommerce store; store is slow, dated or converts poorly | "shopify agency uk", "shopify developer for small business", "woocommerce developer uk" | Live stores they can click, clear process, a price conversation without pressure |
| Amazon / eBay seller (UK or selling into US) | Listings underperform; needs A+ Content, Brand Story, brand store, catalogue clean-up | "amazon a+ content design uk", "amazon listing optimisation uk", "amazon brand store designer" | Amazon SPN listing, real A+ examples (Ivan Troy), understanding of Seller Central |
| Multi-channel seller | Stock and prices drift between supplier, store and marketplaces; manual exports | "shopify amazon inventory sync", "dropshipzone woocommerce", "ebay shopify integration uk" | A published plugin, an automation case study, engineering depth explained simply |
| Small business needing a website | Needs a fast, professional site that brings enquiries | "web design for small business uk" | Speed, search visibility, straightforward pricing and ownership of the site |

### 3.2 Positioning statement
> **One UK team for your website, your online store and your marketplace listings.**
> 3s-Soft UK helps small businesses and e-commerce sellers build, fix and grow their online sales — without juggling three different agencies.

Owner's brand lines, used as supporting copy: **"Build Better. Sell Smarter."** (hero eyebrow) and **"E-commerce Expertise. Exceptional Digital Experiences."** (About page, meta description seed).

### 3.3 Voice
Plain English. Short sentences. British spelling. Say what we did and what happened; never invent numbers. No "leverage", "synergy", "cutting-edge", "world-class". We explain Amazon and Shopify terms the first time we use them.

---

## 4. Conversion design

- **Primary action everywhere:** *Book a 15-minute call* → `https://cal.com/3s-soft-uk/15min` as a plain link (no embed script). Appears in the header, the hero, the end of every page and once in context on service pages.
- **Secondary:** *Chat on WhatsApp* with a prefilled message. Appears in the hero, on the contact page and as the floating button on mobile only.
- **Tertiary:** email and UK phone, in the contact page and footer.
- **Per-page CTA budget:** header + hero + end-of-page, plus at most one contextual CTA. (Today: up to five WhatsApp prompts per page.)
- **Trust placement:** proof strip under the hero; credentials block on About; real case study linked from every service page; founder and UK director named with roles.

---

## 5. Information architecture

| URL | Purpose | Notes |
|---|---|---|
| `/` | Home | Positioning, proof, services, work, process, why us, FAQ, CTA |
| `/services/` | Services hub | Four cards + "not sure where to start" |
| `/services/shopify/` | Shopify & e-commerce stores | New stores, theme fixes, speed, migrations, apps |
| `/services/amazon-marketplaces/` | Amazon & marketplace listings | Listing optimisation, A+ Content, Brand Story, brand store, cataloguing, eBay |
| `/services/automation/` | Automation & integrations | Stock/price sync, order flows, feeds, custom plugins |
| `/services/web-development/` | Websites for small businesses | Fast business sites, WordPress/Astro, search foundations |
| `/work/` | All published work | Category links: `/work/shopify/`, `/work/amazon-marketplaces/`, `/work/automation/`, `/work/web-development/`, `/work/ecommerce/` kept |
| `/case-studies/<id>/` | Case study detail | URLs unchanged (already indexed). Only `placeholder: false` entries are built |
| `/case-studies/` | Listing alias | Same content as `/work/`, canonical → `/work/` |
| `/about/` | Who we are | Story, founder, UK director, credentials, how we work |
| `/contact/` | Contact | Booking first, WhatsApp, phone, email, what to prepare |
| `/privacy/`, `/cookies/` | Legal | Required for GA4; plain-English |
| `/404` | Not found | Links to services and work |
| `/insights/` | Articles | **Post-launch.** Navigation and footer leave room for it |

Navigation: Services · Work · About · Contact · [Book a call]. Footer: services list, work, about, contact, credentials links (Amazon SPN ×2, WordPress.org, Fiverr, Upwork, LinkedIn when set), legal line only once company details are confirmed.

---

## 6. Design system

### 6.1 Principles
Light, editorial, unhurried. The work and the words carry the page; decoration is minimal. One accent colour. Large serif headlines give authority; Manrope keeps the interface friendly and legible.

### 6.2 Colour (Tailwind v4 `@theme` tokens)
| Token | Value | Use |
|---|---|---|
| `paper` | `#f7f6f2` | Page background |
| `paper-2` | `#eeece6` | Alternate section band, code background |
| `surface` | `#ffffff` | Cards |
| `line` | `#dcd9d1` | Borders, dividers |
| `ink` | `#1b1f1d` | Headlines, body |
| `ink-2` | `#474e4a` | Secondary text |
| `ink-3` | `#646b67` | Captions, metadata (≥15px only); 4.6:1 on paper-2 |
| `brand` | `#1e864a` | Buttons, accents; white text on it is 4.6:1 |
| `brand-700` | `#176d3b` | Small links, hover |
| `brand-100` | `#dff1e6` | Soft highlight, tags |
| `brand-50` | `#f0f8f3` | Tinted panels |
| `graphite` | `#161918` | Hero/CTA bands only |
| `graphite-2` | `#212624` | Cards inside graphite bands |
| `on-graphite` | `#f3f4f1` | Text on graphite |
| `on-graphite-2` | `#b7bdb9` | Secondary text on graphite |

Raw hex values are not allowed in components; a grep gate enforces this.

### 6.3 Typography
- **Display:** Instrument Serif (regular, italic), self-hosted via the Astro Fonts API. Used for `h1`, `h2`, and pull-quotes.
- **Text/UI:** Manrope Variable (400–800), self-hosted. Everything else.
- Fluid scale (min → max): display-xl 44→80px / 1.02; display-lg 34→56px / 1.06; display-md 26→36px / 1.15; lede 20px / 1.5; body 17px / 1.65; small 15px / 1.55; label 13px / 0.08em tracking, uppercase, Manrope 600.
- No monospace. Nothing below 13px. Body copy never below 15px.

### 6.4 Space, shape, elevation
- 8pt grid. Content width 72rem; prose width 44rem. Section padding `clamp(4rem, 8vw, 7.5rem)`.
- Radii: 6px (tags), 10px (buttons, inputs), 16px (cards), 24px (feature panels).
- One card shadow: `0 1px 2px rgb(27 31 29 / .06), 0 10px 30px -14px rgb(27 31 29 / .14)`. Flat borders elsewhere.

### 6.5 Motion
Hover/focus transitions 150–200ms. Optional entrance fade + 12px rise on sections, 250ms, once, respecting `prefers-reduced-motion`. No infinite animation, no parallax, no scroll-progress bar, no header compression, no live clock.

### 6.6 Logo
Source: `brand-source/3s-soft-logo-source.png` (512px, graphite "3S" with green stroke, "SOFT" wordmark). A build script produces: trimmed transparent PNG (header/footer, rendered ≤160px wide), white variant for graphite bands, favicon 32/180/192/512, and `og-default.png` (1200×630 on paper with the mark and the positioning line). The mark is never recoloured on light surfaces, never stretched, never placed on a busy image.

### 6.7 Iconography and imagery
Lucide icons at 1.5px stroke, 20–24px, only where they aid scanning (contact methods, process steps). Imagery is real project output only: storefront screenshots, Amazon A+ modules, plugin screens. No stock photography, no abstract 3D.

### 6.8 Component inventory
`Button` (primary / secondary / ghost / link; sm / md / lg; `<a>` or `<button>`), `Eyebrow`, `SectionHeading` (eyebrow + title + lede), `Section` (tone: paper / paper-2 / graphite), `Container`, `Card`, `Tag`, `Logo`, `Faq` (`<details>`), `Header`, `MobileNav`, `Footer`, `WhatsAppButton` (mobile), `ProjectCard`, `ProjectGrid`, `CategoryNav`, case-study `Hero / Meta / Narrative / Outcomes / Gallery / Related`, services `ServiceHero / FitFor / Deliverables / ServiceFaq`, home `Hero / Proof / ServicesGrid / FeaturedWork / ProcessSteps / WhyUs / UkContactCard / Cta`.

---

## 7. Page specifications

### 7.1 Home
1. **Header** — logo, Services, Work, About, Contact, *Book a 15-minute call*. Solid paper background, 1px line below. Mobile: logo + menu button; menu is a disclosure panel with the same links and both CTAs.
2. **Hero** — Eyebrow "Build Better. Sell Smarter." · H1 "One UK team for your website, your online store and your marketplace listings." · Lede (positioning sentence) · *Book a 15-minute call* + *Chat on WhatsApp* · Right (desktop) / below (mobile): one real project image (Tailwater storefront) as the LCP image. Nothing overlaps text at any width.
3. **Proof strip** — four facts: *Listed on Amazon's Service Provider Network* · *5.0 from 185+ client reviews* · *Clients in 30+ countries* · *UK-based point of contact*. Each links to its source.
4. **What we do** — four service cards: title, one-line "for…", three bullets, link. Fifth tile: "Not sure where to start? Book a call and we'll tell you honestly what you need."
5. **Selected work** — three published case studies (Ivan Troy, Tailwater, Dropshipzone) with image, category, title, one-line outcome.
6. **How it works** — 1 *A 15-minute call* (you tell us what's not working) · 2 *A plain-English plan* (fixed scope, clear price, no jargon) · 3 *Build, launch, support* (one team from start to finish).
7. **Why small businesses choose us** — UK contact + full engineering team; one team across store, marketplaces and website; verified reviews; honest about results. Card: Minhajul Abedin Toyon, UK Director, phone, booking link.
8. **FAQ** — five questions (cost ranges and how we quote; do you work with very small businesses; Amazon UK and US; how long a Shopify store takes; ongoing support). `FAQPage` schema.
9. **CTA band** (graphite) — "Tell us what's not working. We'll tell you what it takes to fix it." + both CTAs.
10. **Footer**.

### 7.2 Services hub and service pages
Hub: heading, lede, four cards, consultation tile, CTA.
Each service page: H1 (service + "for UK small businesses"/"for Amazon sellers"), lede, **Who this is for** (3 bullets), **What's included** (6–8 items), **How it works** (reuse steps), **Related work** (one case study card), **FAQ** (3–4 Qs, `FAQPage`), CTA. Content lives in `src/data/services.ts`.

### 7.3 Work listing and category pages
Heading, lede, category links as real anchors (current page marked `aria-current="page"`), grid of `ProjectCard` (image 4:3, category tag, title, outcome line). Only published studies. Empty category → short message + link to contact.

### 7.4 Case study detail
Hero (eyebrow category, H1 title, tagline, hero image with `priority`), **Facts rail** (client, market, year, platforms, services, live link), **Challenge / Approach / Solution**, **Implementation** (MDX body, `.prose-editorial`), **Gallery** (grid; tall Amazon A+ pages shown as top-cropped 3:4 tiles in a horizontal strip, each linking to the full image), **Outcomes** (qualitative list), **Next steps**, **Related work**, CTA. No "Demo Brief" badge anywhere.

### 7.5 About
Story (why 3s-Soft exists, who it serves), **People**: Jashedul Islam Shaun — Founder & Lead Developer (link to personal site); Minhajul Abedin Toyon — UK Director (photos when supplied; text cards until then). **Credentials**: Amazon SPN (A+ Content), Amazon SPN (Cataloguing), WordPress.org plugin, Fiverr 5.0 / 185+ reviews, Upwork Top Rated / 100% job success / 2,300+ hours, clients in 30+ countries. **How we work**. CTA.

### 7.6 Contact
**Book a call** card first (Cal.com link, what the call covers, what to have ready). Then WhatsApp (prefilled), UK phone, email. Response promise: "We reply within one UK business day." No form at launch.

### 7.7 Legal and 404
Privacy (GA4 disclosure, contact data handling), Cookies (what GA4 sets; how to opt out), 404 with links to services and work.

---

## 8. Case study: Ivan Troy (new)

- **File:** `src/content/case-studies/ivan-troy-amazon-brand-story.mdx`
- **Images:** `src/assets/projects/ivan-troy/brand-story-preview.jpg` (hero) and `ivo-{black,blue,coffee,cognac,green,red}-aplus.jpg` (gallery), moved and renamed from `public/images/Ivo_Black_A+_Preview/`.
- **Facts:** Client Ivan Troy (Italian leather belts, shoes and bags; designed in Los Angeles, made in Italy). Market: Amazon.com (United States). Live: Ivo Black Croco, ASIN B0DQ3P7237 (Brand Story + A+ live). Other five colourways: A+ in progress. Year 2026.
- **Scope:** Brand Story module (shows on every brand listing: "Designed in LA. Made in Italy.", three category cards, brand Q&A) and per-colour A+ Content: hero with model shot, four numbered feature callouts (croc-embossed pattern, polished silver buckle, 35mm dress width, made in Italy by hand), "Handmade in Italy" detail, two styling pairs, "One belt, six shades" range module, "Find your size" chart, comparison table across six variants.
- **Categories:** `["marketplaces", "ecommerce"]`; label "Amazon · Brand Story & A+ Content"; platforms Amazon Seller Central, A+ Content, Brand Registry.
- **Outcomes:** qualitative only (consistent brand presentation across the range; buyer questions answered on-page; size guidance reducing wrong-size risk; template system that scales to new colourways). No sales figures.
- **Order:** Ivan Troy 1, Tailwater 2, Dropshipzone 3 (fixes current duplicate `order` values).

Placeholder studies remain in the repository with `placeholder: true` and are never built, listed, linked, included in the sitemap or in structured data.

---

## 9. Facts the site may state (source: owner, 20 Oct 2026)

| Fact | Value | Where used |
|---|---|---|
| Email | info@3s-soft.co.uk | Footer, contact |
| UK phone | +44 7523 759901 | Footer, contact, UK director card |
| WhatsApp | **To confirm:** UK +44 7523 759901 (repo) vs +880 1835 927634 (config). Default: UK number | Hero, contact, floating button |
| WhatsApp prefilled message | "Hello 3s-Soft UK, I'd like to discuss an e-commerce or website development project." | All WhatsApp links |
| Booking | https://cal.com/3s-soft-uk/15min — "Book a 15-minute call" | Primary CTA |
| Founder | Jashedul Islam Shaun, Founder & Lead Developer, https://jashedulislamshaun.com | About, schema `founder` |
| UK Director | Minhajul Abedin Toyon, UK Director | Home card, About |
| Amazon SPN — A+ Content | public provider page (Enhanced Brand Content) | Proof strip, About, footer. Wording: "Listed on Amazon's Service Provider Network". Never "partner", never "endorsed" |
| Amazon SPN — Cataloguing | public provider page (Cataloguing) | About, footer |
| Fiverr | 5.0 rating, 185+ reviews, https://www.fiverr.com/jashedulislam | Proof strip ("185+ five-star client reviews"), About |
| Upwork | Top Rated, 100% job success, 2,300+ hours, profile URL | About |
| Reach | Clients in 30+ countries | Proof strip, About |
| WordPress.org plugin | 3S Soft Price & Stock Sync for Dropshipzone | Automation service, Dropshipzone case study, footer |
| Socials | LinkedIn company (existing), Facebook, Instagram | Footer |
| Legal | Company name / number / registered office / VAT: **not confirmed** → hidden | Footer, schema |

---

## 10. SEO plan (UK)

- `lang="en-GB"`, British spelling, prices in GBP where mentioned.
- Title pattern: `{Service} for UK Small Businesses | 3s-Soft UK`; home: `E-commerce, Shopify & Amazon Support for UK Small Businesses | 3s-Soft UK`.
- One H1 per page containing the service term; H2s answer the questions buyers ask.
- Structured data (single `@graph`): `Organization` + `ProfessionalService` (areaServed GB; founder; sameAs = credential + social URLs; logo = regenerated 512px icon), `WebSite`, `WebPage`/`CollectionPage`/`AboutPage`/`ContactPage`, `BreadcrumbList`, `Service` on each service page, `FAQPage` only where FAQs render, `Article` on case studies. No `PostalAddress` until confirmed.
- Internal links: every service ↔ its category work page ↔ at least one case study; home links to all four services; footer lists services.
- Sitemap: only built pages (placeholders are not built). `robots.txt` unchanged. OG image regenerated with the real mark.
- Owner actions outside the codebase: Google Business Profile (UK), Search Console sitemap resubmission after launch, company LinkedIn URL.
- Post-launch: `/insights/` with one article per audience question (e.g. "What Amazon A+ Content costs in the UK and what it changes", "Shopify vs WooCommerce for a UK shop with 200 products").

---

## 11. Performance and accessibility budgets

| Budget | Target |
|---|---|
| Lighthouse (mobile, simulated) | ≥95 Performance, Accessibility, Best Practices, SEO on home, a service page, work, a case study |
| LCP | ≤2.0s simulated mobile; LCP image `priority` + preload |
| CLS | 0 (explicit image dimensions, font fallback metrics via Fonts API) |
| Client JavaScript | ≤15KB total excluding GA4 (mobile menu only) |
| Home page weight | ≤600KB on first load |
| Fonts | 2 preloaded files above the fold; Latin subsets only |
| Images | Astro `<Image>` everywhere; source JPEGs ≤250KB; AVIF/WebP output |
| Contrast | ≥4.5:1 text, ≥3:1 UI |
| Keyboard | Visible focus on every interactive element; menu returns focus on close; skip link works |
| Screen reader | Landmarks, one H1, labelled nav, `aria-current` on active links, meaningful alt text, no `aria-hidden` wrappers around links |

---

## 12. Delivery plan

| Phase | Deliverable | Gate |
|---|---|---|
| 0 | Sync, baseline audit (`docs/audits/2026-10-20-baseline.md`), this spec | **Owner approves spec** |
| 1 | Foundation: tokens, fonts, base styles, UI primitives, brand asset build, styleguide page | Browser check at 375/1280 |
| 2 | Header, mobile nav, footer, 404 | Keyboard pass |
| 3 | Data: site facts, services, FAQ, published-case-study helper, schema | `astro check` |
| 4 | Work + case studies · Services · About/Contact/Legal (parallel) | Each route reviewed |
| 5 | Home | Mobile first screen correct, LCP preloaded |
| 6 | Ivan Troy case study and images | Renders in work and featured |
| 7 | Remove old components, motion CSS, unused assets; grep gates | Build green |
| 8 | Lighthouse, axe, link check, Rich Results, screenshots | **Owner sign-off → push to `main`** |

---

## 13. Open questions for the owner
1. WhatsApp number for the UK site: UK or Bangladesh number?
2. May "Ivan Troy" be named publicly, and is 2026 the right year?
3. Photos for the founder and UK director?
4. Company legal details for the footer, when confirmed.
5. Company LinkedIn URL.
6. Any Shopify Partner status to show (only if true).
