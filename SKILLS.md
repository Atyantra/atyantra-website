# Agent skill guide — Atyantra website

All skills below installed globally (`~/.claude`, symlinked into `.agents/skills` in this repo). Available to Claude Code, Cursor, Antigravity, Gemini CLI, Copilot, OpenCode.

## Process (use first)
- **brainstorming** — before any structure/IA/feature decision. Run before scaffolding pages or picking design direction.
- **frontend-design** — general aesthetic direction, typography, color choices that avoid templated look. Load before building new UI.
- **writing-plans** / **executing-plans** — once brainstorm settles on scope, write plan before multi-step build.

## Design direction (pick 1–2, don't stack all)
- **high-end-visual-design** — agency-grade fonts/spacing/shadow/card rules, blocks generic AI-site defaults. Good default for Atyantra (enterprise/technical brand).
- **design-taste-frontend** (v2, current default) — anti-slop landing pages/portfolios, infers direction from brief, audit-first on redesigns.
- **design-taste-frontend-v1** — only if v2 misbehaves, legacy fallback.
- **industrial-brutalist-ui** — Swiss/military terminal aesthetic, rigid grid, extreme type contrast. Fits if going hard-technical/ops-tool feel.
- **minimalist-ui** — editorial, warm monochrome, flat bento, no gradients/shadows. Fits if going calm/premium-quiet.
- **apple-design** — gesture/spring motion, translucency, depth, typography. Use for interaction feel once static direction locked.
- **emil-design-eng** — UI polish philosophy, invisible details, component/animation decision-making.
- **gpt-taste** — GSAP-heavy motion, strict AIDA structure, editorial type, bento grids. Use only if going motion-heavy marketing site.
- **brandkit** — generate brand-guideline boards / logo system images if Atyantra needs visual identity assets.

## Building
- **image-to-code** — generate reference design image first, then implement to match. Use for hero/key sections before coding blind.
- **imagegen-frontend-web** — generate one reference image per section (landing page comps) before build.
- **pick-ui-library** — decide component library (shadcn, radix, etc.) once.
- **prototype** — quick throwaway interaction prototypes.
- **web-design-guidelines** — audit UI code against Web Interface Guidelines (accessibility, UX). Run after each major section ships.

## Motion (after static design locked)
- **animate** — build one animation from scratch, full decision chain (should it move, which tool, curve, duration, exit).
- **animation-vocabulary** — name an effect you can't describe, to search for it.
- **find-animation-opportunities** — audit built pages for missing motion (read-only, proposes only).
- **improve-animations** — audit + prioritized fix plan for existing motion codebase.
- **review-animations** — critique a specific animation diff.

## Redesign / iteration
- **redesign-existing-projects** — once v1 ships and needs upgrade pass without breaking functionality.
- **impeccable** — full-site design/critique/polish/animate/theming tool. Run `/impeccable init` once in this repo to set up design context (writes DESIGN.md linkage). Subagents available: `impeccable-documenter`, `impeccable-finish-reviewer`, `impeccable-asset-producer`, `impeccable-manual-edit-applier` — used internally by the impeccable skill, don't invoke directly.
- **stitch-design-taste** — if using Google Stitch for design gen, generates agent-readable DESIGN.md.

## Recommended flow
1. `brainstorming` → lock IA, page list, tone.
2. Pick ONE design-direction skill (high-end-visual-design or design-taste-frontend) → fill in `DESIGN.md` TBDs.
3. `imagegen-frontend-web` or `image-to-code` → reference comps for hero + key sections.
4. Scaffold Next.js, build sections per comp.
5. `animate` per interactive element as built, not batched at end.
6. `web-design-guidelines` audit after each section.
7. `impeccable` pass (or `redesign-existing-projects`) for final polish before launch.

## Notes
- Don't stack multiple design-direction skills on the same build — pick one, be consistent.
- `full-output-enforcement` — background skill, forces complete (non-truncated) code gen. No manual invoke needed.
- `write-swift` — irrelevant unless native iOS companion app happens later.
