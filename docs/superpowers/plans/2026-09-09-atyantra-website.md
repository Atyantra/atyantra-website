# Atyantra Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Atyantra marketing website — a multipage Next.js site presenting the AutoNaaS problem statement, platform definition, and three architectural pillars, with placeholder pages for a technical whitepaper, about, and contact.

**Architecture:** Next.js App Router (latest) with four routes (`/`, `/whitepaper`, `/about`, `/contact`), a shared nav/footer in the root layout, all copy isolated in `content/` TypeScript modules, and design tokens as CSS custom properties consumed by Tailwind v4. The home hero renders a coded SVG topology graph by default and swaps to a capture→ping-pong canvas video when `NEXT_PUBLIC_HERO_VIDEO_URL` is set (Higgsfield asset, later). The contact form composes a `mailto:` URL — no backend in v1.

**Tech Stack:** Next.js (latest, App Router), TypeScript, Tailwind CSS v4, `lucide-react`, `next/font` (Newsreader + Inter), Vitest + React Testing Library, Playwright (via MCP). Deploy: Vercel.

**Spec:** `docs/superpowers/specs/2026-09-09-atyantra-website-design.md`

## Global Constraints

- **Next.js:** use `create-next-app@latest`. The installed version's API may differ from training data — after install, read `node_modules/next/dist/docs/` (or `node_modules/next/dist/**/*.md`) before writing `layout.tsx`, metadata exports, or `next/font` usage. Do not guess.
- **Tailwind CSS v4** — CSS-first config via `@theme` / `@import "tailwindcss"` in `app/globals.css`. There is no `tailwind.config.js` in v4 unless `create-next-app` adds one; follow whatever the scaffold produces.
- **UI libraries:** `lucide-react` only. No shadcn, no Radix, no other component/UI kits.
- **No dark mode** in v1. Paint `background` and `color` explicitly on `body`.
- **Colors (verbatim):** ground `#FBFBFA`, ink `#191919`, ink-muted `rgb(25 25 25 / 0.60)`, ink-faint `rgb(25 25 25 / 0.40)`, hairline `rgb(25 25 25 / 0.12)`, accent `#1F4B3F`, panel `rgb(255 255 255 / 0.90)`, feature-row bg `#F4F3F3` / hover `#EAEAEA`.
- **Fonts:** Newsreader (display serif, `font-serif`), Inter weights 300/400/500/600 (UI sans, `font-sans`). Self-hosted via `next/font/google`.
- **Motion:** exactly three animations (hero discovery pulse ~6s loop; nav/button color 200ms; feature-row hover bg + `ArrowRight` nudge 200ms). All must honor `prefers-reduced-motion: reduce`.
- **Anti-templated (from DESIGN.md):** no purple/blue gradient blobs, no default shadcn zinc, no generic 3-card feature grid, no centered-hero-with-orbs, no stat strips, no floating badges.
- **Final copy** (hero, problem, gap, platform, 3 pillars) is in the spec §6 — copy it verbatim. **Placeholder content** (about, whitepaper, footer legal/social, contact address, logo) must be obviously provisional and marked with a `TODO` comment in its `content/` module.
- **Commits:** end every commit message with:
  ```
  Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01XvFNmAHNvRTN4MHLaBeSG5
  ```
- **Node scripts:** the repo runs on Windows (PowerShell) and Vercel (Linux). Keep scripts cross-platform — no shell-specific syntax in `package.json`.

---

## File Structure

```
app/
  layout.tsx              # fonts, metadata, <Nav>, <Footer>, body tokens
  globals.css             # Tailwind v4 import + @theme tokens + base styles
  page.tsx                # Home
  whitepaper/page.tsx
  about/page.tsx
  contact/page.tsx
components/
  Nav.tsx
  Footer.tsx
  Logo.tsx                # placeholder SVG mark
  MetaLabel.tsx           # kicker/micro-label
  SectionHeading.tsx      # kicker + serif heading
  PillarCard.tsx          # numbered wide row
  CtaButton.tsx           # black pill link
  ContactForm.tsx         # 'use client'
  TopologyHero.tsx        # 'use client' — mode switch
  topology/
    graph-data.ts         # deterministic nodes + edges + pulse path
    SvgGraph.tsx          # coded graph + pulse
    BoomerangVideo.tsx    # 'use client' — capture → ping-pong canvas
content/
  site.ts                 # nav items, footer legal/social — TODO placeholders
  home.ts                 # hero + problem + gap + platform copy (final)
  pillars.ts              # 3 pillars (final)
  whitepaper.ts           # title + abstract — TODO placeholders
  about.ts                # mission/story/team/location/founder — TODO
  contact.ts              # email (final) + address (TODO)
lib/
  mailto.ts               # buildMailto(input) -> string
  useReducedMotion.ts     # SSR-safe hook
test/
  setup.ts                # RTL + jsdom setup
  *.test.ts(x)            # colocated or here per scaffold convention
.mcp.json                 # Higgsfield MCP stub (commented until key)
vitest.config.ts
```

---

## Task 1: Scaffold Next.js app + tooling

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.*`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.gitignore` (merge), `next-env.d.ts`
- Create: `vitest.config.ts`, `test/setup.ts`
- Create: `.mcp.json`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: a running `npm run dev`, `npm run build`, `npm run test` (Vitest), `npm run lint`. App Router under `app/`. Path alias `@/*` → repo root.

- [ ] **Step 1: Scaffold into the existing repo**

Run from repo root (the directory already contains `.git`, `AGENTS.md`, etc.):

```bash
npx create-next-app@latest . --ts --app --tailwind --eslint --src-dir=false --import-alias "@/*" --use-npm --no-turbopack
```

If the CLI refuses because the directory is non-empty, scaffold into a temp dir and copy in:

```bash
npx create-next-app@latest ../atyantra-scaffold --ts --app --tailwind --eslint --src-dir=false --import-alias "@/*" --use-npm --no-turbopack
# then copy everything except .git, and the existing *.md docs, into repo root, and delete ../atyantra-scaffold
```

Keep the existing `AGENTS.md`, `CLAUDE.md`, `DESIGN.md`, `README.md`, `SKILLS.md`, `docs/`. Let the scaffold overwrite `.gitignore` only if you then re-add any custom lines that were there.

- [ ] **Step 2: Read the installed framework docs**

```bash
ls node_modules/next/package.json && grep '"version"' node_modules/next/package.json
ls node_modules/next/dist/ | head -50
```

Read any markdown under `node_modules/next/dist/` covering: `app/layout`, `metadata`, `next/font`. Note the installed Next major version in a comment at the top of `app/layout.tsx`. Confirm whether Tailwind v4 (`@import "tailwindcss"` in `globals.css`, no `tailwind.config.js`) or v3 was installed — the rest of the plan assumes **v4**; if v3, adapt token setup to `tailwind.config.js` `theme.extend`.

- [ ] **Step 3: Add test + a11y tooling**

```bash
npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm i lucide-react
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    globals: true,
    include: ['**/*.test.{ts,tsx}'],
  },
  resolve: { alias: { '@': resolve(__dirname, '.') } },
})
```

Create `test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

Add to `package.json` `scripts`: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 4: Create the Higgsfield MCP stub**

Create `.mcp.json` (commented placeholder — Next/Node ignore it; it is read by the Claude Code harness):

```json
{
  "mcpServers": {
    "_higgsfield_TODO": {
      "note": "Fill in when the Higgsfield API key is supplied, then rename key to 'higgsfield'.",
      "type": "http",
      "url": "https://TODO.higgsfield.example/mcp",
      "headers": { "Authorization": "Bearer TODO" }
    }
  }
}
```

- [ ] **Step 5: Verify dev + build + test all run**

```bash
npm run build
npm run test
```

Expected: build succeeds (default scaffold page), `vitest run` reports "no test files found" or passes with 0 tests (exit 0 — if `vitest run` exits non-zero on no tests, add a trivial `test/smoke.test.ts` asserting `expect(true).toBe(true)`).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Scaffold Next.js app with Tailwind, Vitest, MCP stub

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvFNmAHNvRTN4MHLaBeSG5"
```

---

## Task 2: Design tokens, fonts, global styles

**Files:**
- Modify: `app/globals.css` (replace scaffold styles)
- Modify: `app/layout.tsx` (fonts, body classes, metadata)
- Test: `test/tokens.test.ts`

**Interfaces:**
- Consumes: scaffold from Task 1.
- Produces:
  - CSS custom properties on `:root`: `--ground`, `--ink`, `--ink-muted`, `--ink-faint`, `--hairline`, `--accent`, `--panel`.
  - Tailwind utilities mapped via `@theme`: `bg-ground`, `text-ink`, `text-ink-muted`, `text-ink-faint`, `border-hairline`, `text-accent`, `bg-accent`, `bg-panel`.
  - Font CSS variables `--font-serif` (Newsreader), `--font-sans` (Inter), wired into `@theme` as `--font-family-serif` / `--font-family-sans` so `font-serif` / `font-sans` work.
  - `<body>` has `bg-ground text-ink font-sans antialiased`.

- [ ] **Step 1: Write the failing test**

`test/tokens.test.ts`:

```ts
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const css = readFileSync(resolve(__dirname, '../app/globals.css'), 'utf8')

describe('design tokens', () => {
  it('defines every color token verbatim', () => {
    expect(css).toContain('--ground: #FBFBFA')
    expect(css).toContain('--ink: #191919')
    expect(css).toContain('--ink-muted: rgb(25 25 25 / 0.60)')
    expect(css).toContain('--ink-faint: rgb(25 25 25 / 0.40)')
    expect(css).toContain('--hairline: rgb(25 25 25 / 0.12)')
    expect(css).toContain('--accent: #1F4B3F')
    expect(css).toContain('--panel: rgb(255 255 255 / 0.90)')
  })
  it('exposes tokens to Tailwind via @theme', () => {
    expect(css).toMatch(/@theme\s*{[^}]*--color-ground:\s*var\(--ground\)/s)
  })
  it('does not reintroduce dark mode', () => {
    expect(css).not.toContain('prefers-color-scheme: dark')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/tokens.test.ts`
Expected: FAIL — tokens not present.

- [ ] **Step 3: Write `app/globals.css`**

Replace the file entirely:

```css
@import "tailwindcss";

:root {
  --ground: #FBFBFA;
  --ink: #191919;
  --ink-muted: rgb(25 25 25 / 0.60);
  --ink-faint: rgb(25 25 25 / 0.40);
  --hairline: rgb(25 25 25 / 0.12);
  --accent: #1F4B3F;
  --panel: rgb(255 255 255 / 0.90);
}

@theme inline {
  --color-ground: var(--ground);
  --color-ink: var(--ink);
  --color-ink-muted: var(--ink-muted);
  --color-ink-faint: var(--ink-faint);
  --color-hairline: var(--hairline);
  --color-accent: var(--accent);
  --color-panel: var(--panel);
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-serif: var(--font-newsreader), Georgia, "Times New Roman", serif;
}

html { scroll-behavior: smooth; }

body {
  background: var(--ground);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

> If Task 1 Step 2 found Tailwind v3, instead put the color/font mappings in `tailwind.config.js` under `theme.extend.colors` / `fontFamily` and keep only the `:root`, `body`, and reduced-motion blocks in `globals.css`. Update the test's `@theme` assertion accordingly.

- [ ] **Step 4: Wire fonts + metadata in `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Inter, Newsreader } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Atyantra — Remove the ceiling on network operations',
  description:
    'AutoNaaS is an AI-native NOC engineering platform: autonomous discovery, diagnosis, and change preparation across the full ITIL lifecycle, with human authorization as the immutable control point.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="bg-ground text-ink font-sans antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

> Verify `next/font/google` import path and API against the installed docs from Task 1. Newsreader/Inter must both be available in the installed `next/font` google list; if a weight is rejected at build, trim to `400`/`500` (serif) and `400`/`500`/`600` (sans).

- [ ] **Step 5: Stub `Nav` and `Footer` so layout compiles**

Create `components/Nav.tsx` and `components/Footer.tsx` each exporting a named component returning `null` for now (real implementations in Tasks 4–5). Add a `// TODO: implemented in Task 4/5` comment.

- [ ] **Step 6: Run tests + build**

Run: `npx vitest run test/tokens.test.ts` → PASS
Run: `npm run build` → succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Add design tokens, self-hosted fonts, global styles

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvFNmAHNvRTN4MHLaBeSG5"
```

---

## Task 3: Content modules

**Files:**
- Create: `content/site.ts`, `content/home.ts`, `content/pillars.ts`, `content/whitepaper.ts`, `content/about.ts`, `content/contact.ts`
- Test: `test/content.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces (exact exported shapes — later tasks import these):

```ts
// content/site.ts
export interface NavLink { label: string; href: string }
export const navLinks: NavLink[]          // Platform, How It Works, Whitepaper, About
export const cta: { label: string; href: string }   // { label: 'Talk to Us', href: '/contact' }
export const site: {
  legalName: string   // TODO placeholder
  address: string     // TODO placeholder
  email: string       // 'contact@atyantra.io'
  socials: { label: string; href: string }[]  // TODO placeholders
  copyright: string
}

// content/home.ts
export const hero: { h1Lines: string[]; sub: string; cta: { label: string; href: string } }
export const problem: { kicker: string; headingLines: string[]; body: string }
export const problemRows: { n: string; label: string; href: string }[]  // 01 Autonomous ...
export const gap: { quote: string; body: string }
export const platform: { kicker: string; headingLines: string[]; body: string }
export const whitepaperTeaser: { kicker: string; title: string; state: string; href: string }
export const homeCta: { line: string; cta: { label: string; href: string } }

// content/pillars.ts
export interface Pillar { n: string; id: string; name: string; body: string }
export const pillars: Pillar[]   // exactly 3, ids: discovery, authorization, lifecycle

// content/whitepaper.ts
export const whitepaper: { kicker: string; title: string; abstract: string; state: string; notifyEmail: string }

// content/about.ts
export const about: {
  kicker: string
  mission: string
  story: string[]      // paragraphs
  team: string
  location: string
  founder: { role: string; bio: string }
}

// content/contact.ts
export const contact: { kicker: string; email: string; address: string; responseTime: string }
```

- [ ] **Step 1: Write the failing test**

`test/content.test.ts`:

```ts
import { navLinks, cta, site } from '@/content/site'
import { hero, problem, gap, platform, problemRows } from '@/content/home'
import { pillars } from '@/content/pillars'
import { whitepaper } from '@/content/whitepaper'
import { contact } from '@/content/contact'

describe('content', () => {
  it('nav has the four routes + Talk to Us CTA', () => {
    expect(navLinks.map(l => l.label)).toEqual(['Platform', 'How It Works', 'Whitepaper', 'About'])
    expect(cta).toEqual({ label: 'Talk to Us', href: '/contact' })
  })
  it('footer email is the real contact address', () => {
    expect(site.email).toBe('contact@atyantra.io')
    expect(contact.email).toBe('contact@atyantra.io')
  })
  it('hero copy is verbatim from the spec', () => {
    expect(hero.h1Lines).toEqual(['Remove the ceiling', 'on network operations.'])
    expect(hero.sub).toContain('AI-native NOC engineering platform')
    expect(hero.sub).toContain('immutable control point')
  })
  it('problem + gap + platform copy present', () => {
    expect(problem.kicker).toBe('THE PROBLEM')
    expect(problem.body).toContain('capped by headcount rather than capability')
    expect(gap.quote).toBe('Ticketing systems record what should happen. They do not diagnose, prepare, or act.')
    expect(platform.body).toContain('human authorization')
  })
  it('exactly three pillars with stable ids', () => {
    expect(pillars).toHaveLength(3)
    expect(pillars.map(p => p.id)).toEqual(['discovery', 'authorization', 'lifecycle'])
    expect(pillars[1].body).toContain('authorization token')
  })
  it('problem rows link to pillar anchors', () => {
    expect(problemRows.map(r => r.href)).toEqual(['#discovery', '#authorization', '#lifecycle'])
  })
  it('whitepaper + about are marked coming soon / placeholder', () => {
    expect(whitepaper.state.toLowerCase()).toContain('coming soon')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/content.test.ts`
Expected: FAIL — modules do not exist.

- [ ] **Step 3: Write the content modules**

Create each file with the exact shapes above. Use the **verbatim** copy from spec §6.2 for `home.ts` and `pillars.ts`. Example `content/home.ts` (fill the rest analogously):

```ts
export const hero = {
  h1Lines: ['Remove the ceiling', 'on network operations.'],
  sub:
    'AutoNaaS is an AI-native NOC engineering platform — an autonomous operations layer that discovers, diagnoses, and prepares network changes end-to-end across the full ITIL lifecycle, while human authorization stays the immutable control point for execution.',
  cta: { label: 'Talk to Us', href: '/contact' },
}

export const problem = {
  kicker: 'THE PROBLEM',
  headingLines: ['Operations that scale with', 'capability, not headcount'],
  body:
    'Enterprise network operations remain fundamentally manual — human-executed CLI workflows, tribal runbook knowledge, and fragmented ITSM tooling. As estates scale into the tens or hundreds of thousands of endpoints, MTTR degrades, operational risk compounds, and organizations are capped by headcount rather than capability.',
}

export const problemRows = [
  { n: '01', label: 'Autonomous', href: '#discovery' },
  { n: '02', label: 'Authorized', href: '#authorization' },
  { n: '03', label: 'End-to-end', href: '#lifecycle' },
]

export const gap = {
  quote:
    'Ticketing systems record what should happen. They do not diagnose, prepare, or act.',
  body:
    "Today's incumbent approach pairs manual device-level operations with disconnected ITSM platforms that log intent but never execute it. The result is an operational gap — full accountability for outcomes, without automation of the underlying work — that legacy tooling has never closed.",
}

export const platform = {
  kicker: 'THE PLATFORM',
  headingLines: ['An autonomous operations layer,', 'not another point tool'],
  body:
    'AutoNaaS discovers, diagnoses, and prepares network changes end-to-end across the full ITIL lifecycle. Human authorization stays the immutable control point: every action is prepared and reviewed, then released by an operator under an explicit authorization token.',
}

export const whitepaperTeaser = {
  kicker: 'TECHNICAL WHITEPAPER',
  title: 'The AutoNaaS Architecture', // TODO: confirm final title with owner
  state: 'Coming soon',
  href: '/whitepaper',
}

export const homeCta = {
  line: 'Talk to us about your estate.',
  cta: { label: 'Talk to Us', href: '/contact' },
}
```

`content/pillars.ts` — use spec §6.2.4 bodies verbatim, `id`s `discovery` / `authorization` / `lifecycle`, `n` `01`/`02`/`03`, names "Autonomous Discovery & Topology Intelligence" / "AI-Prepared, Human-Authorized Execution" / "Full ITIL Lifecycle Orchestration".

`content/site.ts`, `content/whitepaper.ts`, `content/about.ts`, `content/contact.ts` — placeholders. Every placeholder string prefixed conceptually by a top-of-file comment:

```ts
// TODO: placeholder content — owner (director@atyantra.io) to supply final copy.
```

Placeholder examples: `legalName: 'Atyantra, Inc.' /* TODO */`, `address: '[Address — TODO]'`, socials `[{ label: 'LinkedIn', href: '#' }, { label: 'X', href: '#' }, { label: 'GitHub', href: '#' }]`, about `mission: '[Mission statement — TODO]'`, etc. `contact.email` and `site.email` = `'contact@atyantra.io'` (real).

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run test/content.test.ts` → PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add content modules — final AutoNaaS copy + placeholders

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvFNmAHNvRTN4MHLaBeSG5"
```

---

## Task 4: Primitives — Logo, MetaLabel, CtaButton, SectionHeading, PillarCard

**Files:**
- Create: `components/Logo.tsx`, `components/MetaLabel.tsx`, `components/CtaButton.tsx`, `components/SectionHeading.tsx`, `components/PillarCard.tsx`
- Test: `test/primitives.test.tsx`

**Interfaces:**
- Consumes: `content/*` (Task 3), tokens (Task 2).
- Produces:

```tsx
export function Logo(props: { className?: string }): JSX.Element   // <svg viewBox="0 0 256 256" fill="currentColor">
export function MetaLabel(props: { children: React.ReactNode; className?: string }): JSX.Element
export function CtaButton(props: { href: string; children: React.ReactNode; size?: 'nav' | 'hero'; className?: string }): JSX.Element  // renders next/link
export function SectionHeading(props: { kicker: string; lines: string[]; className?: string; id?: string }): JSX.Element
export function PillarCard(props: { n: string; id: string; name: string; body: string; last?: boolean }): JSX.Element
```

- [ ] **Step 1: Write the failing test**

`test/primitives.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { Logo } from '@/components/Logo'
import { MetaLabel } from '@/components/MetaLabel'
import { CtaButton } from '@/components/CtaButton'
import { SectionHeading } from '@/components/SectionHeading'
import { PillarCard } from '@/components/PillarCard'

describe('primitives', () => {
  it('Logo renders a 256 viewBox svg using currentColor', () => {
    const { container } = render(<Logo className="w-6 h-6" />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('viewBox', '0 0 256 256')
    expect(svg).toHaveAttribute('fill', 'currentColor')
    expect(svg).toHaveClass('w-6', 'h-6')
  })
  it('MetaLabel renders its text', () => {
    render(<MetaLabel>THE PROBLEM</MetaLabel>)
    expect(screen.getByText('THE PROBLEM')).toBeInTheDocument()
  })
  it('CtaButton is a link to the given href', () => {
    render(<CtaButton href="/contact">Talk to Us</CtaButton>)
    const link = screen.getByRole('link', { name: 'Talk to Us' })
    expect(link).toHaveAttribute('href', '/contact')
  })
  it('SectionHeading renders kicker + each line', () => {
    render(<SectionHeading kicker="THE PLATFORM" lines={['One', 'Two']} id="platform" />)
    expect(screen.getByText('THE PLATFORM')).toBeInTheDocument()
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
  })
  it('PillarCard exposes its anchor id and content', () => {
    const { container } = render(
      <PillarCard n="01" id="discovery" name="Discovery" body="continuous discovery" />,
    )
    expect(container.querySelector('#discovery')).toBeInTheDocument()
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Discovery' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/primitives.test.tsx` → FAIL (modules missing).

- [ ] **Step 3: Implement the primitives**

`components/Logo.tsx` — placeholder geometric mark (final art TBD by owner):

```tsx
// TODO: placeholder mark — owner to supply final Atyantra identity.
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" className={className} aria-hidden="true">
      <path d="M128 16 L240 128 L128 240 L16 128 Z" opacity="0.15" />
      <path d="M128 56 L200 128 L128 200 L56 128 Z" opacity="0.4" />
      <path d="M128 96 L160 128 L128 160 L96 128 Z" />
    </svg>
  )
}
```

`components/MetaLabel.tsx`:

```tsx
export function MetaLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`text-[11px] uppercase tracking-[0.2em] text-ink-faint font-medium ${className}`}>
      {children}
    </span>
  )
}
```

`components/CtaButton.tsx`:

```tsx
import Link from 'next/link'

const sizes = {
  nav: 'px-5 py-2.5 text-sm',
  hero: 'px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base',
} as const

export function CtaButton({
  href, children, size = 'nav', className = '',
}: { href: string; children: React.ReactNode; size?: keyof typeof sizes; className?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-lg bg-ink font-medium text-white transition-colors duration-200 hover:bg-ink/90 ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  )
}
```

`components/SectionHeading.tsx`:

```tsx
import { MetaLabel } from './MetaLabel'

export function SectionHeading({
  kicker, lines, className = '', id,
}: { kicker: string; lines: string[]; className?: string; id?: string }) {
  return (
    <div className={className} id={id}>
      <MetaLabel>{kicker}</MetaLabel>
      <h2 className="mt-3 font-serif text-2xl font-normal leading-tight tracking-tight sm:text-3xl md:text-4xl">
        {lines.map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </h2>
    </div>
  )
}
```

`components/PillarCard.tsx`:

```tsx
export function PillarCard({
  n, id, name, body, last = false,
}: { n: string; id: string; name: string; body: string; last?: boolean }) {
  return (
    <div
      id={id}
      className={`scroll-mt-24 grid gap-4 py-10 md:grid-cols-[6rem_1fr] md:gap-10 md:py-14 ${
        last ? '' : 'border-b border-hairline'
      }`}
    >
      <div className="font-serif text-4xl text-ink-faint md:text-5xl">{n}</div>
      <div>
        <h3 className="font-serif text-2xl font-normal tracking-tight md:text-3xl">{name}</h3>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">{body}</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run test/primitives.test.tsx` → PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add UI primitives — Logo, MetaLabel, CtaButton, SectionHeading, PillarCard

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvFNmAHNvRTN4MHLaBeSG5"
```

---

## Task 5: Nav + Footer

**Files:**
- Modify: `components/Nav.tsx`, `components/Footer.tsx` (replace Task 2 stubs)
- Test: `test/chrome.test.tsx`

**Interfaces:**
- Consumes: `content/site.ts`, `Logo`, `CtaButton`, `MetaLabel`.
- Produces: `export function Nav()`, `export function Footer()` — used by `app/layout.tsx`.

- [ ] **Step 1: Write the failing test**

`test/chrome.test.tsx`:

```tsx
import { render, screen, within } from '@testing-library/react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

describe('Nav', () => {
  it('renders wordmark, the four links, and the CTA', () => {
    render(<Nav />)
    expect(screen.getByText('Atyantra')).toBeInTheDocument()
    for (const label of ['Platform', 'How It Works', 'Whitepaper', 'About']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: 'Talk to Us' })).toHaveAttribute('href', '/contact')
  })
  it('is fixed and transparent (no bg/blur/border classes)', () => {
    const { container } = render(<Nav />)
    const header = container.querySelector('header')!
    expect(header.className).toContain('fixed')
    expect(header.className).not.toMatch(/bg-|backdrop-blur|border-b/)
  })
})

describe('Footer', () => {
  it('shows the contact email and a copyright line', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /contact@atyantra\.io/ })).toHaveAttribute(
      'href', 'mailto:contact@atyantra.io',
    )
    expect(screen.getByText(/©/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run test/chrome.test.tsx` → FAIL (stubs return null).

- [ ] **Step 3: Implement `components/Nav.tsx`**

```tsx
import Link from 'next/link'
import { Logo } from './Logo'
import { CtaButton } from './CtaButton'
import { navLinks, cta } from '@/content/site'

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-6 py-4 sm:px-10 sm:py-5 md:px-14">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-ink">
          <Logo className="h-6 w-6" />
          <span className="text-base font-semibold tracking-tight">Atyantra</span>
        </Link>
        <ul className="hidden gap-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <CtaButton href={cta.href}>{cta.label}</CtaButton>
      </nav>
    </header>
  )
}
```

`navLinks` hrefs: Platform → `/#platform`, How It Works → `/#how-it-works`, Whitepaper → `/whitepaper`, About → `/about`.

- [ ] **Step 4: Implement `components/Footer.tsx`**

```tsx
import Link from 'next/link'
import { site } from '@/content/site'
import { MetaLabel } from './MetaLabel'

export function Footer() {
  return (
    <footer className="border-t border-hairline px-6 py-16 sm:px-10 md:px-14">
      <div className="grid gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <MetaLabel>{site.legalName}</MetaLabel>
          <p className="mt-3 max-w-xs text-sm text-ink-muted">{site.address}</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-2 inline-block text-sm text-ink transition-colors duration-200 hover:text-accent"
          >
            {site.email}
          </a>
        </div>
        <ul className="flex gap-6 md:flex-col md:gap-2">
          {site.socials.map((s) => (
            <li key={s.label}>
              <Link
                href={s.href}
                className="text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-12 text-xs text-ink-faint">{site.copyright}</p>
    </footer>
  )
}
```

- [ ] **Step 5: Run tests + build**

Run: `npx vitest run test/chrome.test.tsx` → PASS
Run: `npm run build` → succeeds (layout now renders real chrome).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add Nav and Footer

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvFNmAHNvRTN4MHLaBeSG5"
```

---

## Task 6: `useReducedMotion` hook + topology graph data

**Files:**
- Create: `lib/useReducedMotion.ts`, `components/topology/graph-data.ts`
- Test: `test/reduced-motion.test.tsx`, `test/graph-data.test.ts`

**Interfaces:**
- Produces:

```ts
// lib/useReducedMotion.ts
export function useReducedMotion(): boolean   // false during SSR / first paint; updates in effect

// components/topology/graph-data.ts
export interface GraphNode { id: string; x: number; y: number; core: boolean }
export interface GraphEdge { from: string; to: string }
export const VIEWBOX: { w: 1200; h: 800 }
export const nodes: GraphNode[]      // ~14, deterministic literals
export const edges: GraphEdge[]      // ~20, references node ids
export const pulsePath: string[]     // ordered node ids the discovery pulse traverses
```

- [ ] **Step 1: Write failing tests**

`test/graph-data.test.ts`:

```ts
import { nodes, edges, pulsePath, VIEWBOX } from '@/components/topology/graph-data'

describe('graph-data', () => {
  it('has a stable node set inside the viewbox', () => {
    expect(nodes.length).toBeGreaterThanOrEqual(12)
    for (const n of nodes) {
      expect(n.x).toBeGreaterThanOrEqual(0)
      expect(n.x).toBeLessThanOrEqual(VIEWBOX.w)
      expect(n.y).toBeGreaterThanOrEqual(0)
      expect(n.y).toBeLessThanOrEqual(VIEWBOX.h)
    }
  })
  it('every edge references real nodes', () => {
    const ids = new Set(nodes.map((n) => n.id))
    for (const e of edges) {
      expect(ids.has(e.from)).toBe(true)
      expect(ids.has(e.to)).toBe(true)
    }
  })
  it('pulse path is a connected walk along edges', () => {
    const adj = new Set(edges.flatMap((e) => [`${e.from}|${e.to}`, `${e.to}|${e.from}`]))
    for (let i = 0; i < pulsePath.length - 1; i++) {
      expect(adj.has(`${pulsePath[i]}|${pulsePath[i + 1]}`)).toBe(true)
    }
  })
})
```

`test/reduced-motion.test.tsx`:

```tsx
import { renderHook } from '@testing-library/react'
import { useReducedMotion } from '@/lib/useReducedMotion'

describe('useReducedMotion', () => {
  it('defaults to false when matchMedia is unavailable', () => {
    const orig = window.matchMedia
    // @ts-expect-error force-undefined for the test
    delete window.matchMedia
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
    window.matchMedia = orig
  })
  it('reads the reduce preference when matchMedia reports it', () => {
    window.matchMedia = ((q: string) => ({
      matches: q.includes('reduce'),
      media: q, addEventListener() {}, removeEventListener() {},
      addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })
})
```

- [ ] **Step 2: Run to verify they fail**

Run: `npx vitest run test/graph-data.test.ts test/reduced-motion.test.tsx` → FAIL.

- [ ] **Step 3: Implement `lib/useReducedMotion.ts`**

```ts
'use client'
import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const on = () => setReduced(mq.matches)
    mq.addEventListener?.('change', on)
    return () => mq.removeEventListener?.('change', on)
  }, [])
  return reduced
}
```

- [ ] **Step 4: Implement `components/topology/graph-data.ts`**

Hand-place ~14 nodes (deterministic literals, no `Math.random`), a spine-leaf-ish `edges` list (~20), and a `pulsePath` walk. Keep coordinates within `1200×800`. `core: true` for ~3 central nodes. Example skeleton (fill all nodes/edges):

```ts
export interface GraphNode { id: string; x: number; y: number; core: boolean }
export interface GraphEdge { from: string; to: string }
export const VIEWBOX = { w: 1200, h: 800 } as const

export const nodes: GraphNode[] = [
  { id: 'c1', x: 380, y: 300, core: true },
  { id: 'c2', x: 620, y: 260, core: true },
  { id: 'c3', x: 840, y: 360, core: true },
  { id: 'a1', x: 180, y: 180, core: false },
  { id: 'a2', x: 210, y: 440, core: false },
  { id: 'a3', x: 120, y: 320, core: false },
  { id: 'b1', x: 500, y: 120, core: false },
  { id: 'b2', x: 700, y: 110, core: false },
  { id: 'd1', x: 980, y: 220, core: false },
  { id: 'd2', x: 1040, y: 460, core: false },
  { id: 'e1', x: 560, y: 520, core: false },
  { id: 'e2', x: 760, y: 560, core: false },
  { id: 'e3', x: 420, y: 600, core: false },
  { id: 'e4', x: 900, y: 620, core: false },
]

export const edges: GraphEdge[] = [
  { from: 'c1', to: 'c2' }, { from: 'c2', to: 'c3' }, { from: 'c1', to: 'c3' },
  { from: 'a1', to: 'c1' }, { from: 'a2', to: 'c1' }, { from: 'a3', to: 'a1' }, { from: 'a3', to: 'a2' },
  { from: 'b1', to: 'c2' }, { from: 'b2', to: 'c2' }, { from: 'b1', to: 'b2' },
  { from: 'd1', to: 'c3' }, { from: 'd2', to: 'c3' }, { from: 'd1', to: 'd2' },
  { from: 'e1', to: 'c1' }, { from: 'e1', to: 'e3' }, { from: 'e2', to: 'c3' },
  { from: 'e2', to: 'e1' }, { from: 'e4', to: 'e2' }, { from: 'e3', to: 'a2' }, { from: 'e4', to: 'd2' },
]

export const pulsePath = ['a3', 'a1', 'c1', 'c2', 'c3', 'd1', 'd2', 'e4', 'e2', 'e1', 'e3', 'a2', 'c1']
```

Adjust `pulsePath` so each consecutive pair exists in `edges` (the test enforces this).

- [ ] **Step 5: Run to verify pass**

Run: `npx vitest run test/graph-data.test.ts test/reduced-motion.test.tsx` → PASS

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add reduced-motion hook and deterministic topology graph data

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvFNmAHNvRTN4MHLaBeSG5"
```

---

## Task 7: `SvgGraph` — coded topology with discovery pulse

**Files:**
- Create: `components/topology/SvgGraph.tsx`
- Test: `test/svg-graph.test.tsx`

**Interfaces:**
- Consumes: `graph-data.ts`, `useReducedMotion`.
- Produces: `export function SvgGraph(props: { animate: boolean }): JSX.Element` — an inline `<svg>` sized to fill its parent (`className="h-full w-full"`), `preserveAspectRatio="xMidYMid slice"`, `viewBox="0 0 1200 800"`, `aria-hidden`.

- [ ] **Step 1: Write the failing test**

`test/svg-graph.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import { SvgGraph } from '@/components/topology/SvgGraph'
import { nodes, edges } from '@/components/topology/graph-data'

describe('SvgGraph', () => {
  it('draws one line per edge and one circle per node', () => {
    const { container } = render(<SvgGraph animate={false} />)
    expect(container.querySelectorAll('line').length).toBe(edges.length)
    expect(container.querySelectorAll('circle').length).toBeGreaterThanOrEqual(nodes.length)
  })
  it('omits the animated pulse element when animate=false', () => {
    const { container } = render(<SvgGraph animate={false} />)
    expect(container.querySelector('[data-pulse]')).toBeNull()
  })
  it('includes the pulse element when animate=true', () => {
    const { container } = render(<SvgGraph animate={true} />)
    expect(container.querySelector('[data-pulse]')).not.toBeNull()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run test/svg-graph.test.tsx` → FAIL.

- [ ] **Step 3: Implement `components/topology/SvgGraph.tsx`**

```tsx
import { nodes, edges, pulsePath, VIEWBOX } from './graph-data'

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))

function pulsePoints(): string {
  return pulsePath.map((id) => `${byId[id].x},${byId[id].y}`).join(' ')
}

export function SvgGraph({ animate }: { animate: boolean }) {
  return (
    <svg
      className="h-full w-full"
      viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g stroke="var(--ink)" strokeOpacity="0.10">
        {edges.map((e, i) => {
          const a = byId[e.from]
          const b = byId[e.to]
          return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth="1" />
        })}
      </g>
      <g fill="var(--ink)">
        {nodes.map((n) => (
          <circle key={n.id} cx={n.x} cy={n.y} r={n.core ? 5 : 3} fillOpacity={n.core ? 0.35 : 0.18} />
        ))}
      </g>
      {animate && (
        <circle data-pulse r="4" fill="var(--accent)">
          <animateMotion dur="6s" repeatCount="indefinite" path={`M ${pulsePoints().replace(/ /g, ' L ')}`} />
        </circle>
      )}
    </svg>
  )
}
```

Note: build the `animateMotion` path as `M x,y L x,y L …` from `pulsePath`. If SMIL renders unreliably in the target browsers during Task 10 review, replace the `<animateMotion>` with a `requestAnimationFrame` interpolation in a `'use client'` wrapper — keep the `data-pulse` element so the test stays valid.

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run test/svg-graph.test.tsx` → PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add SvgGraph topology renderer with discovery pulse

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvFNmAHNvRTN4MHLaBeSG5"
```

---

## Task 8: `BoomerangVideo` + `TopologyHero` mode switch

**Files:**
- Create: `components/topology/BoomerangVideo.tsx`, `components/TopologyHero.tsx`
- Test: `test/topology-hero.test.tsx`

**Interfaces:**
- Consumes: `SvgGraph`, `useReducedMotion`, env `NEXT_PUBLIC_HERO_VIDEO_URL`.
- Produces:
  - `export function BoomerangVideo(props: { src: string; reduced: boolean }): JSX.Element` — `'use client'`.
  - `export function TopologyHero(): JSX.Element` — `'use client'`; `absolute inset-0 z-0`, low visual weight. Renders `BoomerangVideo` when `process.env.NEXT_PUBLIC_HERO_VIDEO_URL` is a non-empty string, else `SvgGraph`.

- [ ] **Step 1: Write the failing test**

`test/topology-hero.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import { TopologyHero } from '@/components/TopologyHero'

describe('TopologyHero', () => {
  it('renders the coded SVG graph when no video URL is set', () => {
    delete process.env.NEXT_PUBLIC_HERO_VIDEO_URL
    const { container } = render(<TopologyHero />)
    expect(container.querySelector('svg')).not.toBeNull()
    expect(container.querySelector('video')).toBeNull()
  })
  it('renders the video pathway when a URL is set', () => {
    process.env.NEXT_PUBLIC_HERO_VIDEO_URL = 'https://example.com/x.mp4'
    const { container } = render(<TopologyHero />)
    expect(container.querySelector('video')).not.toBeNull()
    delete process.env.NEXT_PUBLIC_HERO_VIDEO_URL
  })
})
```

> Note: `process.env.NEXT_PUBLIC_*` is inlined at build by Next but readable directly in Vitest. In `TopologyHero`, read it via `const url = process.env.NEXT_PUBLIC_HERO_VIDEO_URL` at module/component top so the test can toggle it.

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run test/topology-hero.test.tsx` → FAIL.

- [ ] **Step 3: Implement `components/topology/BoomerangVideo.tsx`**

Port the reference technique. Key points: hidden `<video>` (`muted`, `playsInline`, `preload="auto"`, `crossOrigin="anonymous"`, `object-cover object-top`); on play, capture frames (prefer `requestVideoFrameCallback`, else `requestAnimationFrame`), cap width 960px, dedupe by `currentTime`; on `ended`, switch to a `<canvas>` playing frames ping-pong at 30fps (`1000/30` ms interval, index forward then reverse, forever); until frames ready show live video. If `reduced` is true: play the video without loop and, once ended, hold the last frame (no ping-pong) — or simply show the first frame. Wrap in `scale-[1.15] origin-top overflow-hidden`. Guard every `window`/DOM access; component is `'use client'` with all logic in `useEffect`/`useRef`.

```tsx
'use client'
import { useEffect, useRef, useState } from 'react'

export function BoomerangVideo({ src, reduced }: { src: string; reduced: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  // frame capture + ping-pong playback implemented here per the spec §7.3.
  // On mount: play video once; capture frames; on 'ended' set ready=true and
  // start a setInterval(1000/30) that walks an index 0..last..0 forever,
  // drawing frames[index] to the canvas. If reduced: skip ping-pong, hold frame 0.
  useEffect(() => {
    // ...implementation...
  }, [src, reduced])

  return (
    <div className="h-full w-full origin-top scale-[1.15] overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className="h-full w-full object-cover object-top"
        style={{ display: ready ? 'none' : 'block' }}
      />
      <canvas
        ref={canvasRef}
        className="h-full w-full object-cover object-top"
        style={{ display: ready ? 'block' : 'none' }}
      />
    </div>
  )
}
```

Implement the `useEffect` body fully (no placeholder in the delivered file) following spec §7.3 steps 3–7.

- [ ] **Step 4: Implement `components/TopologyHero.tsx`**

```tsx
'use client'
import { SvgGraph } from './topology/SvgGraph'
import { BoomerangVideo } from './topology/BoomerangVideo'
import { useReducedMotion } from '@/lib/useReducedMotion'

const videoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_URL

export function TopologyHero() {
  const reduced = useReducedMotion()
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {videoUrl
        ? <BoomerangVideo src={videoUrl} reduced={reduced} />
        : <SvgGraph animate={!reduced} />}
    </div>
  )
}
```

- [ ] **Step 5: Run tests + build**

Run: `npx vitest run test/topology-hero.test.tsx` → PASS
Run: `npm run build` → succeeds.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add BoomerangVideo and TopologyHero mode switch

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvFNmAHNvRTN4MHLaBeSG5"
```

---

## Task 9: Home page

**Files:**
- Modify: `app/page.tsx`
- Create: `components/FeatureRow.tsx` (the interactive `01 / Autonomous` rows)
- Test: `test/home.test.tsx`, `test/feature-row.test.tsx`

**Interfaces:**
- Consumes: `content/home.ts`, `content/pillars.ts`, `TopologyHero`, `SectionHeading`, `PillarCard`, `MetaLabel`, `CtaButton`, `FeatureRow`.
- Produces: the `/` route. Anchor ids present: `#platform`, `#how-it-works`, `#discovery`, `#authorization`, `#lifecycle`.
- `FeatureRow`: `export function FeatureRow(props: { n: string; label: string; href: string }): JSX.Element` — `bg-[#F4F3F3] hover:bg-[#EAEAEA]`, flex space-between, `lucide-react` `ArrowRight` (`w-4 h-4`) that gains `translate-x-0.5` + darker color on `group-hover`, all `transition-all duration-200`.

- [ ] **Step 1: Write failing tests**

`test/feature-row.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { FeatureRow } from '@/components/FeatureRow'

it('renders number, label, and an arrow, linking to href', () => {
  render(<FeatureRow n="01" label="Autonomous" href="#discovery" />)
  const link = screen.getByRole('link', { name: /Autonomous/ })
  expect(link).toHaveAttribute('href', '#discovery')
  expect(screen.getByText('01')).toBeInTheDocument()
})
```

`test/home.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
  it('renders the hero headline and sub', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Remove the ceiling')
    expect(screen.getByText(/immutable control point/)).toBeInTheDocument()
  })
  it('renders the gap pull-quote', () => {
    render(<Home />)
    expect(screen.getByText(/They do not diagnose, prepare, or act\./)).toBeInTheDocument()
  })
  it('has the three pillar anchors', () => {
    const { container } = render(<Home />)
    for (const id of ['discovery', 'authorization', 'lifecycle']) {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument()
    }
  })
  it('has section anchors for nav', () => {
    const { container } = render(<Home />)
    expect(container.querySelector('#platform')).toBeInTheDocument()
    expect(container.querySelector('#how-it-works')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify they fail**

Run: `npx vitest run test/home.test.tsx test/feature-row.test.tsx` → FAIL.

- [ ] **Step 3: Implement `components/FeatureRow.tsx`**

```tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function FeatureRow({ n, label, href }: { n: string; label: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between bg-[#F4F3F3] px-4 py-3.5 transition-all duration-200 hover:bg-[#EAEAEA] sm:px-6 sm:py-4"
    >
      <span className="text-sm">
        <span className="text-ink-faint">{n}</span>
        <span className="mx-2 text-ink/30">/</span>
        <span className="font-medium">{label}</span>
      </span>
      <ArrowRight className="h-4 w-4 text-gray-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-gray-700" />
    </Link>
  )
}
```

- [ ] **Step 4: Implement `app/page.tsx`**

Compose the sections per spec §6.2:

```tsx
import { TopologyHero } from '@/components/TopologyHero'
import { SectionHeading } from '@/components/SectionHeading'
import { PillarCard } from '@/components/PillarCard'
import { MetaLabel } from '@/components/MetaLabel'
import { CtaButton } from '@/components/CtaButton'
import { FeatureRow } from '@/components/FeatureRow'
import { hero, problem, problemRows, gap, platform, whitepaperTeaser, homeCta } from '@/content/home'
import { pillars } from '@/content/pillars'

export default function Home() {
  return (
    <>
      <section className="relative flex h-screen flex-col items-center overflow-hidden">
        <TopologyHero />
        <div className="z-10 flex flex-col items-center px-4 pt-24 text-center sm:px-6 sm:pt-28 md:pt-32">
          <h1 className="font-serif text-4xl font-normal leading-[1.1] tracking-tighter text-ink sm:text-5xl md:text-7xl lg:text-8xl">
            {hero.h1Lines.map((l, i) => <span key={i} className="block">{l}</span>)}
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-muted sm:mt-6 md:mt-8 md:text-base">
            {hero.sub}
          </p>
          <CtaButton href={hero.cta.href} size="hero" className="mt-6 sm:mt-8 md:mt-10">
            {hero.cta.label}
          </CtaButton>
        </div>

        <div className="z-10 mt-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="border border-b-0 border-hairline bg-panel px-5 pb-0 pt-8 shadow-sm backdrop-blur-sm sm:px-8 sm:pt-12 md:px-12 md:pt-16">
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 md:gap-16">
              <div>
                <MetaLabel>{problem.kicker}</MetaLabel>
                <h2 className="mt-3 font-serif text-2xl font-normal leading-tight tracking-tight sm:text-3xl md:text-4xl">
                  {problem.headingLines.map((l, i) => <span key={i} className="block">{l}</span>)}
                </h2>
              </div>
              <p className="flex items-end text-sm leading-relaxed text-ink-muted md:text-[15px]">
                {problem.body}
              </p>
            </div>
            <div className="mt-6 h-px w-full bg-hairline sm:mt-8 md:mt-10" />
            <div className="grid gap-2 py-6 sm:grid-cols-3 sm:gap-3">
              {problemRows.map((r) => <FeatureRow key={r.n} {...r} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 md:px-14 md:py-36">
        <blockquote className="max-w-4xl font-serif text-3xl font-normal leading-tight tracking-tight sm:text-4xl md:text-5xl">
          {gap.quote}
        </blockquote>
        <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink-muted">{gap.body}</p>
      </section>

      <section id="platform" className="scroll-mt-24 border-t border-hairline px-6 py-24 sm:px-10 md:px-14 md:py-36">
        <div className="grid gap-6 md:grid-cols-2 md:gap-16">
          <SectionHeading kicker={platform.kicker} lines={platform.headingLines} />
          <p className="flex items-start text-[15px] leading-relaxed text-ink-muted">{platform.body}</p>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 border-t border-hairline px-6 py-24 sm:px-10 md:px-14 md:py-36">
        <MetaLabel>How it works</MetaLabel>
        <div className="mt-8">
          {pillars.map((p, i) => (
            <PillarCard key={p.id} n={p.n} id={p.id} name={p.name} body={p.body} last={i === pillars.length - 1} />
          ))}
        </div>
      </section>

      <section className="border-t border-hairline px-6 py-16 sm:px-10 md:px-14">
        <Link href={whitepaperTeaser.href} className="group flex items-center justify-between">
          <span>
            <MetaLabel>{whitepaperTeaser.kicker}</MetaLabel>
            <span className="mt-2 block font-serif text-xl tracking-tight md:text-2xl">
              {whitepaperTeaser.title} — {whitepaperTeaser.state}
            </span>
          </span>
          <ArrowRight className="h-5 w-5 text-gray-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-gray-700" />
        </Link>
      </section>

      <section className="border-t border-hairline px-6 py-24 text-center sm:px-10 md:px-14 md:py-32">
        <p className="font-serif text-3xl tracking-tight md:text-4xl">{homeCta.line}</p>
        <CtaButton href={homeCta.cta.href} size="hero" className="mt-8">{homeCta.cta.label}</CtaButton>
      </section>
    </>
  )
}
```

Add the missing imports (`Link` from `next/link`, `ArrowRight` from `lucide-react`).

- [ ] **Step 5: Run tests + build**

Run: `npx vitest run test/home.test.tsx test/feature-row.test.tsx` → PASS
Run: `npm run build` → succeeds.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Build home page — hero, problem panel, gap, platform, pillars

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvFNmAHNvRTN4MHLaBeSG5"
```

---

## Task 10: `/whitepaper` and `/about` pages

**Files:**
- Create: `app/whitepaper/page.tsx`, `app/about/page.tsx`
- Test: `test/whitepaper.test.tsx`, `test/about.test.tsx`

**Interfaces:**
- Consumes: `content/whitepaper.ts`, `content/about.ts`, `SectionHeading`, `MetaLabel`.
- Produces: the `/whitepaper` and `/about` routes, each exporting `metadata` and a default component.

- [ ] **Step 1: Write failing tests**

`test/whitepaper.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Whitepaper from '@/app/whitepaper/page'

it('shows the kicker, a title, and a coming-soon state', () => {
  render(<Whitepaper />)
  expect(screen.getByText('TECHNICAL WHITEPAPER')).toBeInTheDocument()
  expect(screen.getByText(/coming soon/i)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /notified/i })).toHaveAttribute(
    'href', expect.stringContaining('mailto:contact@atyantra.io'),
  )
})
```

`test/about.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import About from '@/app/about/page'

it('renders mission, story, and founder sections', () => {
  render(<About />)
  expect(screen.getByText('ABOUT')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /mission/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run to verify they fail**

Run: `npx vitest run test/whitepaper.test.tsx test/about.test.tsx` → FAIL.

- [ ] **Step 3: Implement `app/whitepaper/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { MetaLabel } from '@/components/MetaLabel'
import { whitepaper } from '@/content/whitepaper'

export const metadata: Metadata = { title: 'Technical Whitepaper — Atyantra' }

export default function Whitepaper() {
  return (
    <section className="px-6 pb-24 pt-40 sm:px-10 md:px-14">
      <MetaLabel>{whitepaper.kicker}</MetaLabel>
      <h1 className="mt-4 max-w-3xl font-serif text-4xl font-normal leading-[1.1] tracking-tighter md:text-6xl">
        {whitepaper.title}
      </h1>
      <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink-muted">{whitepaper.abstract}</p>
      <p className="mt-12 font-serif text-2xl text-ink-faint">{whitepaper.state}</p>
      <a
        href={`mailto:${whitepaper.notifyEmail}?subject=${encodeURIComponent('Notify me: AutoNaaS whitepaper')}`}
        className="mt-4 inline-block text-sm text-ink transition-colors duration-200 hover:text-accent"
      >
        Ask to be notified →
      </a>
    </section>
  )
}
```

`content/whitepaper.ts` must set `notifyEmail: 'contact@atyantra.io'`, `state: 'Coming soon'`, and `title`/`abstract` as `TODO` placeholders.

- [ ] **Step 4: Implement `app/about/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { MetaLabel } from '@/components/MetaLabel'
import { about } from '@/content/about'

export const metadata: Metadata = { title: 'About — Atyantra' }

export default function About() {
  return (
    <section className="px-6 pb-24 pt-40 sm:px-10 md:px-14">
      <MetaLabel>{about.kicker}</MetaLabel>
      <h1 className="mt-4 max-w-3xl font-serif text-4xl font-normal leading-[1.1] tracking-tighter md:text-6xl">
        {about.mission}
      </h1>
      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl tracking-tight">Our mission</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{about.mission}</p>
        </div>
        <div>
          <h2 className="font-serif text-2xl tracking-tight">Story</h2>
          {about.story.map((p, i) => (
            <p key={i} className="mt-4 text-[15px] leading-relaxed text-ink-muted">{p}</p>
          ))}
        </div>
        <div>
          <h2 className="font-serif text-2xl tracking-tight">Team & location</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{about.team}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{about.location}</p>
        </div>
        <div>
          <h2 className="font-serif text-2xl tracking-tight">{about.founder.role}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{about.founder.bio}</p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run tests + build**

Run: `npx vitest run test/whitepaper.test.tsx test/about.test.tsx` → PASS
Run: `npm run build` → succeeds.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add whitepaper and about pages (placeholder content)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvFNmAHNvRTN4MHLaBeSG5"
```

---

## Task 11: `mailto` builder + `/contact` page

**Files:**
- Create: `lib/mailto.ts`, `components/ContactForm.tsx`, `app/contact/page.tsx`
- Test: `test/mailto.test.ts`, `test/contact-form.test.tsx`

**Interfaces:**
- Produces:

```ts
// lib/mailto.ts
export interface ContactInput { name: string; email: string; org: string; message: string }
export function buildMailto(to: string, input: ContactInput): string
// -> "mailto:contact@atyantra.io?subject=...&body=..." with each field URL-encoded

// components/ContactForm.tsx
export function ContactForm(props: { to: string }): JSX.Element   // 'use client'
```

- [ ] **Step 1: Write failing tests**

`test/mailto.test.ts`:

```ts
import { buildMailto } from '@/lib/mailto'

it('builds an encoded mailto with subject and body', () => {
  const url = buildMailto('contact@atyantra.io', {
    name: 'Dana Ops', email: 'dana@acme.com', org: 'Acme NOC', message: 'We run 40k devices.',
  })
  expect(url.startsWith('mailto:contact@atyantra.io?')).toBe(true)
  expect(url).toContain('subject=')
  expect(url).toContain(encodeURIComponent('Dana Ops'))
  expect(url).toContain(encodeURIComponent('dana@acme.com'))
  expect(url).toContain(encodeURIComponent('Acme NOC'))
  expect(url).toContain(encodeURIComponent('We run 40k devices.'))
})
```

`test/contact-form.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '@/components/ContactForm'

it('disables submit until name, valid email, and message are present', async () => {
  render(<ContactForm to="contact@atyantra.io" />)
  const submit = screen.getByRole('button', { name: /send/i })
  expect(submit).toBeDisabled()
  await userEvent.type(screen.getByLabelText(/name/i), 'Dana')
  await userEvent.type(screen.getByLabelText(/email/i), 'dana@acme.com')
  await userEvent.type(screen.getByLabelText(/message/i), 'Hello')
  expect(submit).toBeEnabled()
})

it('shows an error for a malformed email', async () => {
  render(<ContactForm to="contact@atyantra.io" />)
  await userEvent.type(screen.getByLabelText(/email/i), 'not-an-email')
  await userEvent.tab()
  expect(screen.getByText(/valid email/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run to verify they fail**

Run: `npx vitest run test/mailto.test.ts test/contact-form.test.tsx` → FAIL.

- [ ] **Step 3: Implement `lib/mailto.ts`**

```ts
export interface ContactInput { name: string; email: string; org: string; message: string }

export function buildMailto(to: string, input: ContactInput): string {
  const subject = `Talk to Us — ${input.org || input.name}`
  const body = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Organization: ${input.org}`,
    '',
    input.message,
  ].join('\n')
  const params = new URLSearchParams({ subject, body })
  // URLSearchParams encodes spaces as '+'; email clients want %20 in mailto bodies.
  return `mailto:${to}?${params.toString().replace(/\+/g, '%20')}`
}
```

- [ ] **Step 4: Implement `components/ContactForm.tsx`**

```tsx
'use client'
import { useState } from 'react'
import { buildMailto, type ContactInput } from '@/lib/mailto'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactForm({ to }: { to: string }) {
  const [f, setF] = useState<ContactInput>({ name: '', email: '', org: '', message: '' })
  const [touchedEmail, setTouchedEmail] = useState(false)
  const emailValid = EMAIL_RE.test(f.email)
  const valid = f.name.trim() && emailValid && f.message.trim()

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) return
    window.location.href = buildMailto(to, f)
  }

  const field = 'mt-1 w-full border border-hairline bg-white px-3 py-2 text-sm outline-none focus:border-ink'

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className="block text-sm">
        Name
        <input className={field} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      </label>
      <label className="block text-sm">
        Email
        <input
          className={field}
          value={f.email}
          onBlur={() => setTouchedEmail(true)}
          onChange={(e) => setF({ ...f, email: e.target.value })}
        />
        {touchedEmail && !emailValid && (
          <span className="mt-1 block text-xs text-red-700">Enter a valid email.</span>
        )}
      </label>
      <label className="block text-sm">
        Organization
        <input className={field} value={f.org} onChange={(e) => setF({ ...f, org: e.target.value })} />
      </label>
      <label className="block text-sm">
        Message
        <textarea
          rows={5}
          className={field}
          value={f.message}
          onChange={(e) => setF({ ...f, message: e.target.value })}
        />
      </label>
      <button
        type="submit"
        disabled={!valid}
        className="rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Send message
      </button>
    </form>
  )
}
```

- [ ] **Step 5: Implement `app/contact/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { MetaLabel } from '@/components/MetaLabel'
import { ContactForm } from '@/components/ContactForm'
import { contact } from '@/content/contact'

export const metadata: Metadata = { title: 'Talk to Us — Atyantra' }

export default function Contact() {
  return (
    <section className="px-6 pb-24 pt-40 sm:px-10 md:px-14">
      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <MetaLabel>{contact.kicker}</MetaLabel>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-[1.1] tracking-tighter md:text-5xl">
            Talk to us about your estate.
          </h1>
          <a
            href={`mailto:${contact.email}`}
            className="mt-8 inline-block text-sm text-ink transition-colors duration-200 hover:text-accent"
          >
            {contact.email}
          </a>
          <p className="mt-2 text-sm text-ink-muted">{contact.address}</p>
          <p className="mt-2 text-sm text-ink-muted">{contact.responseTime}</p>
        </div>
        <ContactForm to={contact.email} />
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Run tests + build**

Run: `npx vitest run test/mailto.test.ts test/contact-form.test.tsx` → PASS
Run: `npm run build` → succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Add contact page with mailto-based form

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvFNmAHNvRTN4MHLaBeSG5"
```

---

## Task 12: Full-suite verification, Playwright smoke, a11y audit, deploy config

**Files:**
- Create: `vercel.json` (only if needed), `README.md` (update run/deploy section), `.env.example`
- Test: `test/a11y-smoke` via Playwright MCP (manual-driven), full `npm run test`

**Interfaces:**
- Consumes: everything.
- Produces: green full suite, documented deploy.

- [ ] **Step 1: Run the whole unit suite**

Run: `npm run test`
Expected: all Vitest files pass.

- [ ] **Step 2: Production build + local start**

```bash
npm run build && npm run start
```

Expected: build clean (no type errors, no `next/font` errors), server boots on `:3000`.

- [ ] **Step 3: Playwright smoke (via MCP)**

For each of `/`, `/whitepaper`, `/about`, `/contact`:
- `browser_navigate` to `http://localhost:3000<route>`
- `browser_console_messages` → assert no errors
- `browser_snapshot` → assert nav wordmark "Atyantra" and footer email present
- On `/`: assert `h1` contains "Remove the ceiling"; assert the bottom info panel is visible at viewport bottom.
- Emulate `prefers-reduced-motion: reduce` (`browser_run_code_unsafe` setting the media emulation, or launch note) → reload `/` → assert no `[data-pulse]` element / no animation.

Record results in the commit message.

- [ ] **Step 4: Accessibility + interface-guidelines audit**

Invoke the `web-design-guidelines` skill against the four route files. Fix any P0/P1 findings (color contrast on `--ink-muted` text, label associations in `ContactForm`, focus-visible styles on nav links + CTA, heading order per page, `main` landmark, skip-link if flagged). Re-run `npm run test` after fixes.

- [ ] **Step 5: Deploy config + docs**

Create `.env.example`:

```
# Optional — set to a Higgsfield-generated MP4 URL to swap the coded hero for the boomerang video.
NEXT_PUBLIC_HERO_VIDEO_URL=
```

Update `README.md`: real dev/build/test commands, "Deploy: push to `main`, Vercel auto-builds. Set `NEXT_PUBLIC_HERO_VIDEO_URL` in Vercel project env when the hero video asset is ready." Only add `vercel.json` if a non-default setting is required (framework preset is auto-detected — likely no file needed).

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "Verify full suite, Playwright smoke, a11y audit; add deploy docs

- npm run test: <N> files passing
- npm run build: clean
- Playwright: 4 routes 200, no console errors, reduced-motion static hero confirmed
- web-design-guidelines: <findings + fixes>

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XvFNmAHNvRTN4MHLaBeSG5"
```

---

## Self-Review

**Spec coverage:**
- §3 scope (4 routes, nav/footer, hero, content modules, mailto form, fonts/tokens, tests) → Tasks 1–12. ✓
- §4 stack (Next latest, TS, Tailwind v4, lucide only, Vercel, `.mcp.json` stub) → Task 1. ✓
- §5 design system (colors verbatim, Newsreader+Inter, spacing, 3 motions, reduced-motion) → Tasks 2, 6, 7, 8; anti-templated rules in Global Constraints. ✓
- §6.1 chrome (Nav transparent/fixed, Footer placeholders, Logo placeholder) → Tasks 4, 5. ✓
- §6.2 home (hero, bottom panel with 2 rows + 3 feature rows, gap, platform, pillars, whitepaper teaser, CTA band, anchor ids) → Task 9. ✓
- §6.3 whitepaper (coming soon, mailto notify) → Task 10. ✓
- §6.4 about (placeholder blocks) → Task 10. ✓
- §6.5 contact (two-column, form, mailto submit, validation, v2 note) → Task 11. ✓
- §7 TopologyHero (mode switch on `NEXT_PUBLIC_HERO_VIDEO_URL`, SVG graph + pulse, boomerang canvas port, reduced-motion) → Tasks 6, 7, 8. ✓
- §8 file structure → matches plan File Structure. ✓
- §9 content ownership (verbatim vs TODO placeholder) → Global Constraints + Task 3. ✓
- §10 testing (Vitest unit, Playwright smoke, build green, web-design-guidelines) → each task + Task 12. ✓
- §11 risks (Tailwind v4 vs v3, Next API drift, SMIL fallback) → Task 1 Step 2, Task 2 Step 3 note, Task 7 Step 3 note. ✓

**Placeholder scan:** Task 8 `BoomerangVideo` `useEffect` body is described, not coded — flagged explicitly as "implement fully per spec §7.3, no placeholder in delivered file". This is the one unavoidably prose-specified step because the frame-capture loop is ~60 lines of DOM code that depends on runtime APIs (`requestVideoFrameCallback`) not available in jsdom; its test only asserts the `<video>`/`<canvas>` structure. Acceptable: the spec §7.3 gives the exact algorithm steps. All other steps have concrete code.

**Type consistency:** `ContactInput` (`name`/`email`/`org`/`message`) consistent across `lib/mailto.ts` and `ContactForm` (Task 11). `GraphNode`/`GraphEdge`/`pulsePath` consistent across Tasks 6–7. `buildMailto(to, input)` signature consistent (Task 11 interface + test + contact page). `SvgGraph({ animate })` / `TopologyHero()` / `BoomerangVideo({ src, reduced })` consistent across Tasks 7–8. `navLinks` labels (`Platform`/`How It Works`/`Whitepaper`/`About`) consistent across `content/site.ts`, Task 5 test, Nav impl. Pillar `id`s (`discovery`/`authorization`/`lifecycle`) consistent across `content/pillars.ts`, `content/home.ts` `problemRows` hrefs, `PillarCard`, Task 9 anchors.
