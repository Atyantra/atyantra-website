# Atyantra website — agent entry

New marketing/product website for Atyantra (parent org building AutoNaaS). Fresh repo, not part of autonaas-dev_v1 platform repo.

## Read before building
1. [DESIGN.md](DESIGN.md) — design system, typography, color, motion rules
2. [SKILLS.md](SKILLS.md) — installed skill roster, when to use each, recommended build flow
3. [README.md](README.md) — stack, setup, deploy

## Stack (default — confirm before deviating)
Next.js (latest, breaking changes vs training data — check `node_modules/next/dist/docs/` before writing framework code), TypeScript, Tailwind.

**Exception:** `landing/` is the **locked** landing page — Vite + React + TypeScript + Tailwind,
a video-over-contour-field background with a light blue-white scheme (owner-directed). Its design is
frozen; see [DESIGN.md](DESIGN.md) → "Deviations" and "Verification". Do not re-architect it or
"correct" its light theme / video hero back toward the general guidance below — that is the ask.
Re-run the DESIGN.md verification list after any visual change to it.

## Process
Use `brainstorming` skill before first-pass structure/IA decisions. Use `frontend-design` / installed taste skills (`high-end-visual-design`, `design-taste-frontend`, `emil-design-eng`, `apple-design`) for visual direction — avoid generic AI-site look (no default shadcn hero, no purple gradient blobs, no generic 3-card feature grid unless justified). These apply to the Next.js site; `landing/` is exempt (locked).

## Owner
director@atyantra.io — Atyantra founder/director.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
