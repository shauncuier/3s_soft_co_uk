# Google Analytics Tag Design

## Goal

Add the supplied Google Analytics 4 tag for measurement property `G-KFB5J47T55` to the website so it runs on every page.

## Approach

Place the official Google tag snippet directly in the shared Astro layout, [`src/layouts/Layout.astro`](../../../src/layouts/Layout.astro), inside the document `<head>`. The layout is the common shell used by the site's pages, making it the single source of truth for site-wide analytics.

The tag will be inserted immediately before the existing structured-data script. It will:

1. Load `https://www.googletagmanager.com/gtag/js?id=G-KFB5J47T55` asynchronously.
2. Initialize `window.dataLayer`.
3. Define the `gtag` helper.
4. Send the current timestamp and configure `G-KFB5J47T55`.

## Scope and behavior

- Analytics runs on all pages rendered through the shared layout, including case-study pages.
- The supplied snippet is preserved without adding a package or changing page content, routing, styling, or metadata.
- No custom events, consent banner, cookie policy, or additional tracking behavior is introduced by this change.
- The external script remains asynchronous so it does not block initial document parsing.

## Validation

- Run the production Astro build.
- Confirm the layout contains both Google tag scripts and the exact measurement ID.
