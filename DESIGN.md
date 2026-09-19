# Atyantra — Design System

Status: **locked** for the landing page (`landing/`). Owner-approved 2026-09-19.
Source of truth for tokens is code: `landing/src/layout.ts` (type + layout + button tokens),
`landing/src/index.css` (colour variables, hero-over flip, marquee), `landing/tailwind.config.js`
(colour names). This file explains the *why* and records what was verified.

## Brand

- Company: Atyantra — parent org, builds **AutoNaaS** (AI-native NOC engineering platform).
  The landing page markets the **TruVigil** AI operations platform (owner-supplied copy).
- Tone: **operations-grade**. Technical, precise, quietly confident. The register of a
  NOC console and a change record — not a SaaS pitch. Sentence case, plain verbs, no filler.

## Typography

| Role | Family | Notes |
|---|---|---|
| Display + UI + body | `Inter` 400 / 500 / 600 → `system-ui, sans-serif` | Google Fonts. |
| Labels | `font-mono` (mapped to Inter in Tailwind), uppercase, tracking `0.15em` | Chips, tags, marquee, flows. |

- Scale is fluid `clamp()`, defined once in `layout.ts`:
  H1 `clamp(28px, 6.2vw, 80px)` · H2 `clamp(28px, 4.4vw, 56px)` ·
  subhead `clamp(15.5px, 1.55vw + 2pt, 18.5px)` · nav / CTA `clamp(13px, 1.1vw, 15px)` ·
  labels `clamp(11px, 0.9vw, 12.5px)`. Body copy in cards `clamp(14px, 1.2vw, 16px)`.
- Headline tracking `-0.03em`, line-height `1.05`. H2 `-0.03em` / `1.08`.
- Headline is **solid** — no gradient, no shimmer. White over the video, ink elsewhere.
- Numerals (`01–04`) are ≥ 24px so their lighter ink still meets large-text contrast.

## Colour

Chrome is strictly monochrome: one ink, one ground. Hue comes only from the hero video.

| Token | Value | Use |
|---|---|---|
| `ground` | `#e8edf3` | page ground (cool blue-white), menu sheet |
| `ink` | `rgb(var(--ink))` = `#0b0e14` | all text, borders, fills |
| `inkfg` | `rgb(var(--ink-fg))` = `#e8edf3` | text on an ink-filled pill |
| `panel` | `rgb(var(--panel))` = white | translucent strips (marquee) |

- Text ladder on ground: `ink` headings · `ink/85` hero body · `ink/70` body · `ink/60` labels,
  tags and separators (≥ 4.5:1) · `ink/50` only for ≥ 24px numerals (≥ 3:1). Nothing lighter carries meaning.
- **Over the hero video** the hero + nav flip to white: `html[data-over="true"] .hero-over`
  swaps `--ink` → white, `--ink-fg` → ink, `--panel` → black. Set by `HeroVideo` while the
  video is visible (fade progress < 0.45). The mobile sheet resets to ink (`.nav-sheet`).
- **No chromatic accent.** **No CSS gradients** (verified: zero gradient backgrounds in the DOM).
  The one bold element is the glow on the primary CTA: `0 0 22px / 44px rgb(var(--ink) / .3 / .12)`.

## Background

Two layers, both fixed, both non-interactive:

1. **Contour field** (`ContourField.tsx`) — canvas of slow-drifting topographic isolines, ink hairlines
   (`.10` minor / `.20` major alpha) on ground. Ambient, independent of scroll. One static frame under
   reduced motion.
2. **Hero video** (`HeroVideo.tsx`) — city/park clip, `saturate(0.7)` with a `black/30` tint, on top of the
   contour field. Fades out over `0.9 × viewport` of scroll, pauses when hidden, resumes when back at top.
   Loads only after `window.load`. **Skipped** on viewports < 768px, Data Saver, and reduced motion —
   those get the contour field only.

## Layout

- Everything sits in one `1180px` container (`CONTAINER`), left-aligned, `~62ch` measure for prose.
  Nav, hero, sections and footer share the same left edge.
- **The hero is one viewport** (`100dvh`), left-aligned. Sections scroll below:
  01 How operations change · 02 What TruVigil does · 03 Governed automation · 04 Human control ·
  05 Deployment · closing CTA · footer.
- Sections use a translucent `white/25` wash, cards `white/50` + `backdrop-blur`. No opaque panels.
- Structural devices, each encoding real information: the three-dot active-nav marker (follows the section
  in view), the `01–04` numbers (a real sequence), the mode level bars (autonomy 1–3 of 3), the
  bordered `APPROVAL` step (the human control point). Nothing else is decorative.
- **Nav:** transparent at top; after 24px scroll it gets a blurred wash (`ground/70`, or `black/30` over the
  video). Under 768px links move into a burger → sheet.

## Motion

Page load, once: hero blocks `Reveal` in staggered (0.12–0.48s delays).
On scroll: every block reveals **once** (`translateY(28px)` + fade, 0.7s, IntersectionObserver 0.15).

- Hover only on interactive elements: opacity / colour / `scale(≤1.03)`. **No hover motion on
  non-interactive elements** (discipline rows, cards).
- Keyboard focus: one treatment — `2px solid` ink (white over video), `3px` offset (`FOCUS`).
- **Reduced motion:** reveals shown immediately, marquee stopped, contour field static, video not loaded,
  smooth scroll off. Required — verified.

## Components / tokens

- Shadows — two, each scoped: the CTA glow, and the mobile sheet `0 20px 60px rgba(0,0,0,.45)`.
  (Text-shadow `0 1px 14px rgb(0 0 0 / .35)` is used only on hero text while over the video, for legibility.)
- Radii scaled to the element: `999px` pills and dots, `16px` cards, `28px` mobile sheet, `6px` nav button.
  No single global radius.
- Buttons: `BTN_PRIMARY` (ink pill + glow), `BTN_SECONDARY` (hairline pill). Both in `layout.ts`.

## Stack

**Vite + React 19 + TypeScript + Tailwind 3.4** in `landing/` (`npm run dev` / `build`; `tsc -b` + `oxlint` clean).
External: Google Fonts (Inter), one CloudFront MP4 (hero video). Icons: `lucide-react`.
`landing/` is separate from the Next.js site described in `AGENTS.md`.

## Deviations from the original locked spec — all owner-directed, recorded so they are not "corrected" back

1. **Stack** — Vite/React/Tailwind instead of plain HTML/CSS/JS.
2. **Light theme** — cool blue-white ground with ink text instead of a black ground with white text.
   (Hero over the video is white-on-photo, as originally specified.)
3. **Left-aligned hero** — instead of the centered composition.
4. **Background** — contour field + a desaturated city/park video in the hero only, instead of a fixed,
   looping purple/amber video behind the whole page. The video keeps the rule that hue comes from the
   video, not the chrome.
5. **Inter headlines** — the dot-matrix display face (`BubbledotICG-FinePos`) is not loaded, so the
   original headline tracking (`-0.04em` → `-0.09em`) is replaced by `-0.03em`. Loading it later means
   re-tuning tracking.
6. **Content** — TruVigil copy, `@atyantra.tech` emails and the WV / Bengaluru addresses come from the
   owner's HTML and are used as written. No stats row, trust pill or avatars.

## Verification (2026-09-19)

Checked in a browser at 1440, 768 and 390px, plus `prefers-reduced-motion`:

- H1 80px solid white over video, no gradient backgrounds anywhere, no horizontal overflow at any width.
- Only the two scoped box-shadows exist; radii limited to `9999 / 16 / 6 / 28px`.
- Focus ring `2px solid` / `3px` offset on links and buttons.
- Reduced motion: no video, marquee `animation: none`, 40 / 40 reveal blocks visible, `scroll-behavior: auto`.
- Mobile: burger + sheet (28px radius, scoped shadow, ink links), closes on link tap and `Esc`.
- Contrast sweep of all light-section text ≥ 4.5:1 (≥ 3:1 large). Decorative `/` separators are `aria-hidden` and `ink/60`.

Re-run this list after any visual change before treating the page as still locked.

## Reference

- Owner's supplied HTML (content + information design) and the video URLs used in `HeroVideo.tsx`.
- motion.dev — Motion library API (if motion work resumes).
- 21st.dev — component pattern gallery.
