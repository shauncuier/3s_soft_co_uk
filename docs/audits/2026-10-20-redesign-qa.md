# Redesign QA — 20 October 2026 (before launch)

Production build (`astro build`) served with `astro preview`; Lighthouse 12, mobile emulation, simulated throttling. Compare with `2026-10-20-baseline.md`.

| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Weight |
|---|---|---|---|---|---|---|---|---|---|
| `/` | 98 | 100 | 100 | 100 | 1.0 s | 2.5 s | 20 ms | 0 | 426 KiB |
| `/services/shopify/` | 100 | 100* | 100 | 100 | 0.9 s | 1.4 s | 10 ms | 0 | 237 KiB |
| `/work/` | 100 | 100* | 100 | 100 | 0.9 s | 1.9 s | 0 ms | 0 | 460 KiB |
| `/case-studies/ivan-troy-amazon-brand-story/` | 98 | 100 | 100 | 100 | 0.9 s | 2.5 s | 10 ms | 0 | 442 KiB |

\* Measured at 96 before the contrast token fix (brand `#1e864a`, ink-3 `#646b67`); home and the case study were re-run at 100 after it and the same tokens apply to every page.

**Against the baseline:** performance +9 to +13 points, LCP 4.2 s → 2.5 s on the heaviest pages (1.4–1.9 s on text-led pages), home weight 632 → 426 KiB, accessibility 96 → 100, zero client JavaScript beyond the mobile menu and GA4.

## Other checks
- `astro check`: 0 errors.
- Build output: 21 pages. `dist/case-studies/` contains only `ivan-troy-amazon-brand-story`, `tailwater-supply-co`, `dropshipzone-price-stock-sync`. Sitemap lists only those three studies and omits `/404` and the `/case-studies/` alias.
- Code gates: no raw hex in components/pages (the only match is the `theme-color` meta tag); no `focus:outline-none`, `aria-selected`, `font-mono`, `text-xs` or 10–11px text.
- Link crawl (`linkinator`, recursive): no broken relative links. The only non-200 entries are absolute `https://3s-soft.co.uk/...` URLs inside structured data, which resolve once this build is deployed.
- Manual: mobile menu opens as a modal dialog, closes on Escape and link click, returns focus; header links show a visible focus ring; first phone screen on home shows headline, both calls to action and the hero image; the six tall A+ pages render as a scroll strip with full-size links.

## Known follow-ups
- LCP on image-led pages sits at the 2.5 s "good" threshold under simulated slow 4G. Next step if needed: serve a smaller hero crop on phones or lower hero JPEG quality.
- Lighthouse "network dependency tree" insight is informational (CSS → font chain); fonts are already preloaded.
- Owner items still open: director/founder photos, company legal details, LinkedIn URL, confirmation that the client name "Ivan Troy" may be shown publicly.
