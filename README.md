# Agroton — B2B Landing Page

> A corporate landing page for Agroton, one of the largest agricultural producers in Ukraine. Built as a portfolio piece showcasing semantic HTML, accessible UI, and performance-tuned static-site practices.

**Live demo:** https://staskaidash.github.io/Agroton/

| Desktop | Mobile |
|---------|--------|
| _(add `screenshots/desktop.png`)_ | _(add `screenshots/mobile.png`)_ |

---

## Stack

- **HTML5** — semantic landmarks (`header` / `nav` / `main` / `section` / `footer`), `aria-labelledby`, `aria-expanded`, `aria-controls`, `aria-hidden` where needed.
- **CSS3** — custom design, BEM naming, mobile-first media queries (1600 / 1280 / 1048 / 980 / 870 / 790 / 680 / 560 / 510 px), `prefers-reduced-motion` support, CSS variables-free vanilla.
- **Vanilla JS** — burger menu with focus management, sticky header, `IntersectionObserver`-driven scroll-reveal and animated stat counters, "scroll to top" button, dynamic footer year.
- **Self-hosted fonts** — Work Sans + Nunito Sans (variable) as `woff2` with `font-display: swap`, variable font preloaded.
- No frameworks, no build step — pure static.

---

## Project structure

```
agroton-start/
├── index.html
├── css/
│   ├── reset.css
│   └── main.css
├── js/
│   └── main.js
├── img/                  # PNG + SVG assets
├── fonts/                # self-hosted woff2
├── robots.txt
├── sitemap.xml
└── package.json
```

---

## Run locally

```bash
npm start            # opens http://localhost:3000 via `npx serve .`
# or just open index.html in a browser
```

---

## SEO & Performance

### What was done

**Semantic & a11y**
- Clean heading hierarchy: `h1` → `h2` → `h3` with no skipped levels.
- All sections labelled with `aria-labelledby` pointing to their heading.
- Burger button exposes `aria-expanded` / `aria-controls`; menu state mirrored to the body for scroll-lock.
- All decorative SVGs marked `aria-hidden="true"`; all content images carry descriptive `alt` text.
- Focus-visible outlines for keyboard navigation.
- `prefers-reduced-motion` disables transitions and scroll-reveal.

**SEO**
- Unique `<title>` and meta `description`.
- Open Graph (`og:type`, `og:title`, `og:description`, `og:url`, `og:image` + dimensions, `og:locale`).
- Twitter Card (`summary_large_image`).
- `<link rel="canonical">`.
- JSON-LD `Organization` structured data (name, logo, address, contact point).
- `robots.txt` + `sitemap.xml`.
- Semantic landmarks for crawler structure.

**Performance**
- Self-hosted variable font with `font-display: swap` + `<link rel="preload">` for the variable woff2.
- `loading="lazy"` + `decoding="async"` + explicit `width`/`height` on every below-the-fold image (prevents CLS, defers network).
- `fetchpriority="high"` on the above-the-fold logo.
- `IntersectionObserver` instead of scroll listeners for reveal/counter animations; scroll handlers registered `{ passive: true }`.
- `<script defer>` for `main.js`.

### Lighthouse (mobile, throttled)

| Metric | Score |
|--------|-------|
| Performance | _add after measuring_ |
| Accessibility | _add after measuring_ |
| Best Practices | _add after measuring_ |
| SEO | _add after measuring_ |

> Re-run with `npx lighthouse https://<live-url> --view --preset=desktop` and `--form-factor=mobile` to capture the report. Drop screenshots into `screenshots/lighthouse-{desktop,mobile}.png`.

### Known performance ceiling

The hero background `img/about/about-bg.png` (~3.3 MB) and `img/slogan/slogan-img.png` (~1.9 MB) are the dominant performance cost. To unlock 90+ on mobile Performance:

1. Re-export both to WebP/AVIF at the displayed resolution.
2. Serve with `<picture>` + `<source type="image/webp">` fallbacks.
3. Apply the same to the product tile backgrounds (currently inline `background-image: url(...)` per tile).

This was scoped out of this round (no build step / image-tooling); the markup is ready for WebP via `<picture>` swaps.

---

## What I learned

- **Accessibility is structural, not cosmetic.** Getting heading hierarchy right and pairing each `<section>` with `aria-labelledby` does more for the a11y tree than any ARIA bolt-on.
- **`width`/`height` on images is free CLS prevention.** Browsers reserve the intrinsic ratio before the bitmap arrives, so the page stops jumping during load.
- **`IntersectionObserver` over scroll handlers.** Animating with `IntersectionObserver` (counters, reveal) keeps the main thread idle and plays nicely with `prefers-reduced-motion`.
- **`font-display: swap` + variable-font preload** is the cheapest LCP win for self-hosted fonts.
- **Static doesn't mean unstructured.** Adding `sitemap.xml`, `robots.txt`, canonical URL, and JSON-LD costs nothing and turns a static page into a properly crawl-able one.
- **The image budget dictates the Performance score.** No amount of HTML/JS tuning rescues a 3 MB hero PNG — image discipline matters more than micro-optimizations.

---

## License

Portfolio / educational use.
