# Atyantra — landing page

The **locked** landing page for Atyantra / TruVigil. Design rules and the verification
checklist live in [`../DESIGN.md`](../DESIGN.md) — read it before changing anything visual.

## Stack

Vite · React 19 · TypeScript · Tailwind 3.4 · `lucide-react`. Lint with `oxlint`.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint
```

Restart `npm run dev` after editing `tailwind.config.js` (colour tokens).

## Where things are

| Path | What |
|---|---|
| `src/layout.ts` | container, fluid type scale, focus ring, buttons — the design tokens |
| `src/index.css` | colour variables, hero-over white flip, marquee, nav blur |
| `src/components/ContourField.tsx` | fixed contour-line background (canvas) |
| `src/components/HeroVideo.tsx` | hero video: lazy load, scroll fade, skip rules |
| `src/components/Hero.tsx` · `Operations.tsx` · `Control.tsx` · `Closing.tsx` | page sections |
| `src/components/Navbar.tsx` | nav, three-dot active marker, mobile sheet |

## Rules to keep

- Monochrome chrome (ink on ground). No accent colour, no CSS gradients.
- No hover motion on non-interactive elements.
- Everything respects `prefers-reduced-motion` (video skipped, marquee stopped, reveals shown).
- After any visual change, re-run the checks in DESIGN.md → Verification.
