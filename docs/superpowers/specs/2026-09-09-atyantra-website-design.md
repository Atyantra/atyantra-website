# Atyantra Website — Design Spec

Date: 2026-09-09
Status: approved (brainstorm), pending user spec review
Owner: director@atyantra.io

## 1. Purpose

Marketing/product website for **Atyantra**, the parent company building
**AutoNaaS** — an AI-native NOC engineering platform. The site presents the
problem AutoNaaS solves, what it is, and how it works; hosts a placeholder for
the technical whitepaper; and provides About and Contact pages. This is pure
marketing — no product app, no auth, no backend in v1.

## 2. Audience

Enterprise and managed-service NOC organizations: infrastructure directors, VPs
of Network Operations, and the engineering teams accountable for uptime SLAs
across 100–100,000+ managed devices per tenant.

## 3. Scope

### In scope (v1)
- Four routes: `/`, `/whitepaper`, `/about`, `/contact`.
- Shared nav + footer.
- Coded topology-graph hero with optional Higgsfield video swap.
- All copy in `content/` TypeScript modules.
- Contact form that composes a `mailto:` message (no backend).
- Self-hosted fonts, design tokens, responsive layout, reduced-motion support.
- Vitest unit tests + Playwright route smoke test. `npm run build` green.

### Out of scope (v1)
Backend / database, auth / login ("under works"), CMS, whitepaper PDF or
email gate, analytics, i18n, blog, dark mode.

### Deferred / documented upgrade paths
- Contact: Next.js Route Handler + Resend (or Formspree) instead of `mailto:`.
- Whitepaper: email-capture gate + PDF download.
- Hero: swap coded graph for Higgsfield-generated video via env var (below).

## 4. Stack

- **Next.js** (latest, App Router) — check `node_modules/next/dist/docs/`
  before writing framework code; training data is stale.
- **TypeScript**, **Tailwind CSS v4**.
- `lucide-react` — used sparingly (`ArrowRight` and at most a handful more).
- No other UI component libraries. No shadcn.
- Fonts via `next/font/google`, self-hosted at build: **Newsreader** (display
  serif), **Inter** (UI sans).
- Deploy: **Vercel**. Minimal `vercel.json` only if needed; rely on defaults.
- `.mcp.json`: Higgsfield MCP server entry, commented/stubbed until API key
  supplied.

## 5. Design system

Direction: **high-end-visual-design** (single design-direction skill; do not
stack others). Anti-templated per `DESIGN.md`: no purple/blue gradient blobs,
no default shadcn zinc, no generic 3-card feature grid, no centered-hero-with-
orbs, no stat strips, no floating badges.

### 5.1 Color (committed light design — paint every color explicitly)
| Token | Value | Use |
|---|---|---|
| `--ground` | `#FBFBFA` | page background (warm off-white) |
| `--ink` | `#191919` | primary text, chrome |
| `--ink-muted` | `rgb(25 25 25 / 0.60)` | secondary text |
| `--ink-faint` | `rgb(25 25 25 / 0.40)` | tertiary, numerals |
| `--hairline` | `rgb(25 25 25 / 0.12)` | rules, borders |
| `--accent` | `#1F4B3F` | deep evergreen — links, topology pulse ONLY |
| `--panel` | `rgb(255 255 255 / 0.90)` | glass info panel |

No dark mode in v1. Body background painted explicitly (`--ground`), not
transparent.

### 5.2 Typography
- Display serif: **Newsreader** — H1, H2, large pull-quotes. Tight tracking
  (`tracking-tight` / `tracking-tighter`), `leading-[1.1]`, `font-normal`.
- UI sans: **Inter** (300/400/500/600) — body, nav, buttons, labels.
- Micro-label ("kicker"): Inter 500, 11px, `uppercase`, `tracking-[0.2em]`,
  `--ink-faint`.
- Modular scale ≈ 1.25. Explicit responsive steps, no unstructured
  `text-xl/2xl/3xl` stacking.
- Body: Inter, antialiased (`-webkit-font-smoothing: antialiased`).

### 5.3 Spacing & layout
- 8pt base spacing.
- Section vertical padding: `py-24 md:py-36`.
- Max content width ~1200px; horizontal padding `px-6 sm:px-10 md:px-14`.
- Asymmetric two-column rows (label left / body right), not centered symmetry.
- Hairline dividers between major blocks.

### 5.4 Motion (only these three)
1. Hero topology **discovery pulse** — slow (~6s loop) traversal along graph
   edges. `prefers-reduced-motion: reduce` → static graph, no pulse.
2. Nav link + button color transitions — 200ms.
3. Feature-row hover — background shift + `ArrowRight` nudge
   (`translate-x-0.5`), 200ms.

Reduced-motion fallback is required for all three.

## 6. Information architecture

### 6.1 Shared chrome

**Nav** (`components/Nav.tsx`)
- `fixed top-0 inset-x-0 z-50`, transparent (no blur/border/bg).
- Padding `px-6 sm:px-10 md:px-14`, `py-4 sm:py-5`.
- Left: Atyantra logo mark + wordmark "Atyantra"
  (`font-semibold text-base tracking-tight`).
- Center (hidden `< md`): links — **Platform**, **How It Works**, **Whitepaper**,
  **About**. `text-sm`, `--ink-muted` → `--ink` on hover, `transition-colors
  duration-200`. Home-section links scroll to `#how-it-works` etc.;
  Whitepaper/About are route links.
- Right: CTA pill "Talk to Us" → `/contact` —
  `px-5 py-2.5 bg-[--ink] text-white text-sm font-medium rounded-lg
  hover:bg-[--ink]/90 transition-colors duration-200`.
- Login/product link intentionally omitted (v1).

**Footer** (`components/Footer.tsx`)
- Legal name, address, email `contact@atyantra.io`, social links
  (LinkedIn / X / GitHub) — all placeholder values in `content/site.ts`,
  clearly marked `TODO`.
- Copyright line. Privacy/terms links as placeholder routes (not built v1).

**Logo** (`components/Logo.tsx`)
- Placeholder custom SVG mark, `viewBox="0 0 256 256"`, `fill="currentColor"`,
  `w-6 h-6 text-[--ink]`. Geometric, abstract (interlocking forms suggesting
  topology/authorization). Final mark TBD by owner — component isolates it so
  the swap is one file. Marked `TODO` in code.

### 6.2 `/` — Home

Page wrapper: `min-h-screen bg-[--ground] overflow-x-hidden`.

1. **Hero** (`h-screen`, `relative flex flex-col items-center overflow-hidden`)
   - `<TopologyHero>` at `z-0` (see §7); content at `z-10`.
   - Kicker: none (hero leads with headline).
   - H1 (serif): **"Remove the ceiling on network operations."**
     `font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1]
     tracking-tighter text-[--ink] font-normal`.
   - Sub (Inter, `--ink-muted`, `max-w-md`): "AutoNaaS is an AI-native NOC
     engineering platform — an autonomous operations layer that discovers,
     diagnoses, and prepares network changes end-to-end across the full ITIL
     lifecycle, while human authorization stays the immutable control point
     for execution."
   - CTA pill "Talk to Us" → `/contact`.
   - **Bottom info panel** (`mt-auto`, flush to viewport bottom):
     glass panel `bg-[--panel] backdrop-blur-sm border border-[--hairline]
     border-b-0 shadow-sm`, `max-w-5xl`.
     - Row 1 (`md:grid-cols-2`): left — kicker "THE PROBLEM" + serif H2
       "Operations that scale with / capability, not headcount"; right —
       bottom-aligned body: "Enterprise network operations remain
       fundamentally manual — human-executed CLI workflows, tribal runbook
       knowledge, and fragmented ITSM tooling. As estates scale into the tens
       or hundreds of thousands of endpoints, MTTR degrades, operational risk
       compounds, and organizations are capped by headcount rather than
       capability."
     - Hairline divider.
     - Row 2 (`sm:grid-cols-3`): three interactive rows —
       `01 / Autonomous` · `02 / Authorized` · `03 / End-to-end`.
       `bg-[#F4F3F3] hover:bg-[#EAEAEA] transition-all duration-200
       cursor-pointer`, flex space-between, `ArrowRight w-4 h-4` nudging on
       hover. Each links to its pillar anchor in §6.2.4.

2. **The Gap** (`#the-gap`) — full-width statement block on `--ground`.
   - Large serif pull-quote: **"Ticketing systems record what should happen.
     They do not diagnose, prepare, or act."**
   - Supporting para (`--ink-muted`, `max-w-2xl`): "Today's incumbent approach
     pairs manual device-level operations with disconnected ITSM platforms
     that log intent but never execute it. The result is an operational gap —
     full accountability for outcomes, without automation of the underlying
     work — that legacy tooling has never closed."

3. **What AutoNaaS Is** (`#platform`) — two-column: kicker "THE PLATFORM" +
   serif H2 "An autonomous operations layer, not another point tool" / body
   restating the platform definition and the human-authorization control point.

4. **How It Works** (`#how-it-works`) — three stacked **wide rows** (NOT a
   3-card grid), each `PillarCard`:
   - `01` — **Autonomous Discovery & Topology Intelligence** (`#discovery`):
     "Continuous, protocol-native discovery (SNMP, CDP/LLDP) builds and
     maintains a living topology and device-health model at enterprise scale —
     eliminating manual CMDB maintenance as an operational dependency."
   - `02` — **AI-Prepared, Human-Authorized Execution** (`#authorization`):
     "The platform performs end-to-end diagnosis, risk assessment, and change
     preparation; execution authority remains exclusively with the human
     operator. AI never acts autonomously — every action is prepared,
     reviewed, and released under an explicit authorization token."
   - `03` — **Full ITIL Lifecycle Orchestration** (`#lifecycle`): "AutoNaaS
     spans pre-work (ticketing, risk scoring, CAB alignment), in-process
     execution, and post-work closure (documentation, CMDB reconciliation,
     root-cause analysis) as a single automated continuum — not a point tool
     bolted onto existing process."
   - Each row: large `--ink-faint` numeral, serif pillar name, Inter body,
     hairline divider between rows.

5. **Whitepaper teaser** (`#whitepaper-teaser`) — single row: kicker
   "TECHNICAL WHITEPAPER", title placeholder, "Coming soon", `ArrowRight` →
   `/whitepaper`.

6. **CTA band** — serif line "Talk to us about your estate." + "Talk to Us"
   pill → `/contact`. Above footer.

### 6.3 `/whitepaper`

- Nav + footer.
- Kicker "TECHNICAL WHITEPAPER".
- Title: placeholder (`content/whitepaper.ts`, marked `TODO`).
- Abstract: 2–3 sentence placeholder, marked `TODO`.
- State: **"Coming soon."** No gate, no form. A single `mailto:contact@atyantra.io?subject=Whitepaper`
  text link ("Ask to be notified").

### 6.4 `/about`

- Nav + footer.
- All content placeholder in `content/about.ts`, every block marked `TODO`:
  - Mission statement (1 paragraph).
  - Story / origin (1–2 paragraphs).
  - Team (size, roles — placeholder).
  - Location (placeholder).
  - Founder bio slot for director@atyantra.io (placeholder, no name/photo
    until supplied).
- Real layout and typography; obviously-placeholder prose so it is not
  mistaken for final copy.

### 6.5 `/contact`

- Nav + footer.
- Two-column:
  - Left: kicker "CONTACT", email `contact@atyantra.io` (mailto link),
    address placeholder (`TODO`), response-time line (placeholder).
  - Right: `<ContactForm>` — fields: **name**, **email**, **organization**,
    **message**. All client-side.
- Submit: builds a `mailto:contact@atyantra.io` URL with `subject` and
  `body` (form fields URL-encoded, line-broken) and navigates to it
  (`window.location.href`). No network request, no backend.
- Client-side validation: required name + valid-looking email + non-empty
  message; inline error text; submit disabled until valid.
- Spec note: v2 replaces the `mailto:` handler with a Route Handler
  (`app/api/contact/route.ts`) posting to Resend. `<ContactForm>` isolates
  the submit strategy so only that function changes.

## 7. `<TopologyHero>` component

Full-bleed hero background, `absolute inset-0 z-0`, very low visual weight so
the headline dominates (graph strokes at `--ink` 6–12% opacity; pulse at
`--accent` ~30%).

### 7.1 Mode switch
- Env var `NEXT_PUBLIC_HERO_VIDEO_URL`.
- **Unset (default, v1):** render the **coded SVG topology graph**.
- **Set (Higgsfield output later):** render the **capture → boomerang canvas
  video** treatment (below) using that URL. One `heroMode` branch.

### 7.2 Coded SVG graph (default)
- ~14 nodes at fixed, hand-tuned pseudo-random coordinates (deterministic —
  seeded array in the component, not `Math.random()` at runtime, to avoid
  hydration mismatch).
- Edges: a fixed adjacency list (~20 links) forming a plausible spine-leaf-ish
  topology.
- Nodes: small circles; a few larger "core" nodes.
- **Discovery pulse:** an animated dot / gradient stroke traverses a path
  through the edges on a ~6s loop (SMIL `animateMotion` or a JS
  `requestAnimationFrame` interpolator — choose SMIL if it renders reliably,
  else RAF). Subtle.
- Slight parallax/scale (`scale-[1.15] origin-top`) optional, static.
- `prefers-reduced-motion: reduce` → render graph with no pulse, no
  animation. Detected via `window.matchMedia`, SSR-safe (default to static,
  enable motion in `useEffect`).

### 7.3 Boomerang canvas video (when env var set)
Port of the reference technique:
1. Wrapper `scale-[1.15] origin-top overflow-hidden`.
2. Hidden `<video>`: `src` = `NEXT_PUBLIC_HERO_VIDEO_URL`, `muted`,
   `playsInline`, `preload="auto"`, `crossOrigin="anonymous"`,
   `className="w-full h-full object-cover object-top"`.
3. On load: play once (no native loop). Capture every frame to offscreen
   canvases — prefer `requestVideoFrameCallback`, else `requestAnimationFrame`.
   Cap capture width at **960px**, scale height proportionally. Deduplicate by
   `currentTime`.
4. On `ended`: stop capture, store frames, switch to a display `<canvas>`
   (`w-full h-full object-cover object-top`).
5. Canvas playback: ping-pong at **30fps** (`interval = 1000/30`) — index
   forward to last frame, then reverse to first, forever.
6. Until frames ready: show live video; once ready hide video
   (`display:none`) and show canvas.
7. `prefers-reduced-motion: reduce` → hold a single frame (first frame),
   no ping-pong.
- `'use client'` component; guard all DOM/`window` access.

## 8. File structure

```
app/
  layout.tsx            # fonts, <Nav>, <Footer>, <html>/<body> tokens
  globals.css           # Tailwind v4 import, CSS custom properties (tokens)
  page.tsx              # Home — composes hero + sections
  whitepaper/page.tsx
  about/page.tsx
  contact/page.tsx
components/
  Nav.tsx
  Footer.tsx
  Logo.tsx              # placeholder SVG mark — TODO
  TopologyHero.tsx      # 'use client' — mode switch
  topology/
    SvgGraph.tsx        # coded graph + pulse
    BoomerangVideo.tsx  # capture → ping-pong canvas
    graph-data.ts       # deterministic node/edge arrays
  SectionHeading.tsx    # kicker + serif heading, two-column helper
  PillarCard.tsx        # numbered wide row
  WhitepaperCard.tsx
  ContactForm.tsx       # 'use client'
  MetaLabel.tsx         # kicker style
content/
  site.ts               # nav items, footer, legal/social placeholders — TODO
  home.ts               # all home copy (final, from owner)
  pillars.ts            # 3 pillars (final, from owner)
  whitepaper.ts         # placeholders — TODO
  about.ts              # placeholders — TODO
  contact.ts            # email, address placeholder
lib/
  mailto.ts             # buildMailto({name,email,org,message}) -> string
  reduced-motion.ts     # useReducedMotion() hook, SSR-safe
tailwind config         # per Tailwind v4 (CSS-first @theme in globals.css)
.mcp.json               # Higgsfield MCP stub (commented until key)
```

## 9. Content ownership

- **Final copy (supplied by owner, in this spec):** problem statement, the
  gap, platform definition, three pillars, hero headline + sub.
- **Placeholders (marked `TODO`, owner to supply later):** About (all),
  whitepaper title + abstract, footer legal name / address / socials, logo
  mark, contact address + response-time line.
- Placeholder prose must read as obviously provisional.

## 10. Testing & verification

- **Vitest + React Testing Library:**
  - each route renders its key headings / copy;
  - `<Nav>` and `<Footer>` links resolve to valid hrefs;
  - `lib/mailto.ts` builds a correctly-encoded `mailto:` string from sample
    input;
  - `<ContactForm>` validation: blocks empty/invalid, enables on valid,
    calls the mailto builder on submit;
  - `useReducedMotion` returns static default under SSR / no-match.
- **Playwright smoke** (MCP already in env): load `/`, `/whitepaper`,
  `/about`, `/contact` — 200, no console errors, nav present.
- `npm run build` must pass with no type errors.
- Post-build: `web-design-guidelines` audit for a11y/UX on each route.
- Manual: `prefers-reduced-motion` emulation shows static hero.

## 11. Risks / open items

- **Tailwind v4** config is CSS-first (`@theme` in `globals.css`) — differs
  from v3 `tailwind.config.js`. Confirm against installed version during
  scaffold.
- **Next.js latest** App Router API drift — read
  `node_modules/next/dist/docs/` before writing `layout.tsx` / metadata /
  `next/font` usage.
- **SMIL animation** support is fine in modern browsers but if the pulse
  renders poorly, fall back to a RAF interpolator — decided at implementation.
- **Higgsfield MCP** not yet connected; hero ships with coded graph. Video
  path is built but untested against a real asset until the env var + file
  exist.
- Logo is a placeholder; final identity may shift color/type decisions
  slightly.

## 12. Deferred (explicitly not v1)

Backend, auth/login, CMS, whitepaper PDF + email gate, analytics, i18n,
blog, dark mode, cookie/consent banner, sitemap beyond default.
