# AutoNaaS — landing page

Single-viewport, full-bleed video-background landing page for AutoNaaS.
Plain **HTML + CSS + vanilla JS**. No framework, no build step.

```
landing/
  index.html
  styles.css
  main.js
  assets/logo.svg        # placeholder — swap for logo.webp
  fonts/GeistPixel-Circle.woff2   # placeholder — display fallback only
```

## Run

Any static server from this directory, e.g.:

```
python -m http.server 3000
# or
npx serve .
```

Then open http://localhost:3000.

## Design

See [`../DESIGN.md`](../DESIGN.md) — the design is **locked**. Tokens live in
`styles.css` `:root`.

- Display font: `BubbledotICG-FinePos` (OnlineWebFonts CDN), dot-matrix.
- UI font: Inter (Google Fonts).
- Icons: Font Awesome 6.5.2 (cdnjs).
- Background: fixed CloudFront MP4, `object-fit: cover`, behind everything.
- One page-load animation sequence; `prefers-reduced-motion` collapses it to the final state.

## Assets to supply

| File | Status | How to swap |
|---|---|---|
| `assets/logo.webp` | using `assets/logo.svg` (cycle mark) | drop in `logo.webp`, change the `<img src>` in `index.html` |
| `fonts/GeistPixel-Circle.woff2` | missing (fallback-only; CDN display font covers it) | drop the file in; `@font-face` in `styles.css` already points at it |

## Deploy

Static hosting — any of Vercel / Netlify / Cloudflare Pages / GitHub Pages / S3+CloudFront.
No config needed; the three files plus `assets/` and `fonts/` are the whole site.
