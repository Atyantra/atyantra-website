# Atyantra — Design System

Status: **locked** for the landing page (`landing/`). Owner-approved 2026-09-10.
Source of truth for tokens is `landing/styles.css` `:root`; this file explains the *why*.

## Brand

- Company: Atyantra — parent org, builds **AutoNaaS** (AI-native NOC engineering platform).
- Tone: **operations-grade**. Technical, precise, quietly confident. The register of a
  NOC console and a change record — not a SaaS pitch. Sentence case, plain verbs, no filler.

## Typography

| Role | Family | Notes |
|---|---|---|
| Display | `BubbledotICG-FinePos` (retro dot-matrix) | H1 + stat symbol glyphs only. Evokes terminal readouts / telemetry instrumentation. Loaded from OnlineWebFonts CDN. |
| Display fallback | `Geist Pixel Circle` (local `@font-face`) → `monospace` | |
| UI / body | `Inter` 400 / 500 / 600 → `Segoe UI, system-ui, sans-serif` | Loaded from Google Fonts. |
| Data | Inter + `font-variant-numeric: tabular-nums`, tracking `-0.025em` | Stat values. |

- Scale: fluid `clamp()`. Headline `clamp(28px, 6.2vw, 80px)`; subhead `clamp(~15.5px, 1.55vw + 2pt, ~18.5px)`;
  nav / CTA `clamp(13–15px)`; stat value `clamp(18–26px)`; labels `clamp(11–12.5px)`.
- Headline tracking: `-0.04em` desktop, `-0.08em` ≤720px, `-0.09em` ≤420px. Line-height `1.12 → 1.05 → 1.04`.
- Headline is **solid white** — no gradient, no shimmer, no LED-scan.

## Color

The background video supplies all hue. The chrome stays strictly monochrome so it never competes.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#000000` | page ground |
| `--text` | `#ffffff` | primary text |
| `--muted` | `#8e8e8e` | stat labels |
| `--nav-text` | `#2e2e2e` | links on the white nav pill |
| `--sign-in-text` | `#c8c8c8` | dark pill text |
| `--pill-dark` | `#28282a` | dark pills, burger, avatar rings |
| `--trust-border` | `rgba(255,255,255,0.4)` | avatar / pill hairline |
| `--trust-text` | `#c4c2c3` | trust-pill label |

- **No chromatic accent.** The one bold element is the white glow on the CTA
  (`0 0 22px / 44px rgba(255,255,255,.32 / .12)`).
- **No CSS gradients.** The purple/amber field is the background video only.

## Layout

- **Single viewport** (`100dvh`), `overflow: hidden`. The page never scrolls.
- One centered composition, three stacked regions: header (max 720) / hero (max 900) / stats (max 920).
  The group centers vertically with `vh`-scaled gaps that tighten under `@media (max-height: 760px)`.
- Alignment: **centered** (deliberate — see Deviations).
- **No cards, no panels, no sub-sections.** One hero.
- Structural devices, each encoding real information: the three-dot active-nav marker (current page),
  the overlapping avatar rings (multiple named customers). Nothing else is decorative.

## Motion

One orchestrated page-load sequence, once:
`slideDown` header → headline lines `headlineFade` (0.12s, 0.30s) → `.anim` stagger
(`reveal`; CTA uses `revealPulse`; delays 0.05–0.74s) → stat count-up
(easeOutCubic, IntersectionObserver threshold 0.25, `1500 + i·80` ms).

- Hover only: `opacity` / color / `translateY` / `scale(≤1.04)`. No hover motion on non-interactive elements.
- No scroll-triggered animation (there is no scroll).
- Keyboard focus: one treatment — `2px solid #fff` outline, `3px` offset.
- **Reduced motion** (`prefers-reduced-motion: reduce`): all animation collapses to the final state,
  headline solid white, count-up jumps to target. Required — implemented.

## Components / tokens

- Tokens are CSS custom properties on `:root` in `landing/styles.css`.
- Shadows — three, each scoped: `--nav-shadow: 0 4px 14px rgba(0,0,0,.16)` (pills),
  the CTA white glow, the mobile sheet `0 20px 60px rgba(0,0,0,.45)`. (The three-dot
  active-nav marker also uses `box-shadow` — as a drawing trick to place two extra dots
  from one element, not as a shadow effect.)
- Radii scaled to the element: `999px` pills, `50%` logo/avatars, `28px` mobile sheet,
  `4–6px` focus ring. No single global radius.

## Stack

Plain **HTML + CSS + vanilla JS**, no framework/build. Files:
`landing/{index.html, styles.css, main.js}`, `landing/assets/logo.{svg|webp}`,
`landing/fonts/GeistPixel-Circle.woff2`.
External: Google Fonts (Inter), OnlineWebFonts CDN (BubbledotICG-FinePos), cdnjs (Font Awesome 6.5.2),
fixed CloudFront MP4 for the background video.

## Deviations from earlier guidance — all owner-directed, recorded so they are not "corrected" back

1. **Stack** — plain static files instead of Next.js + TS + Tailwind. Owner supplied a pixel-exact static spec.
2. **Centered / symmetric hero over full-bleed video** — earlier text said avoid
   "centered-hero-with-gradient-orbs" and "symmetric everything". Owner specified this composition directly.
3. **Warm purple/amber background field** — earlier said "no purple/blue gradient blobs". It is the
   owner's chosen video asset (exact CloudFront URL), not a CSS default.
4. **Dot-matrix display type** — a subject-grounded choice (NOC instrumentation), replacing the earlier serif.

## Reference

- Owner's supplied spec + the "Intelligence Designed To Evolve" reference render (the shell this is built from).
- motion.dev — Motion library API (if motion work resumes).
- 21st.dev — component pattern gallery.
