# Atyantra Website

Marketing/product site for Atyantra (parent org building AutoNaaS).

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript (strict)
- Tailwind CSS v4
- Vitest + Testing Library

## Develop

```
npm install
npm run dev      # local dev server on http://localhost:3000
npm run test     # Vitest unit suite
npm run build    # production build
npm run lint     # ESLint
```

## Routes

| Path          | Page                                     |
| ------------- | ---------------------------------------- |
| `/`           | Home — hero, problem, gap, platform, pillars, CTA |
| `/whitepaper` | Technical whitepaper (coming soon)       |
| `/about`      | About Atyantra                           |
| `/contact`    | Contact — mailto-based form              |

## Environment

Copy `.env.example` to `.env.local`. All vars are optional:

- `NEXT_PUBLIC_HERO_VIDEO_URL` — when set to an MP4 URL, the home hero swaps the
  coded SVG topology graph for the boomerang video.

### MCP

Copy `.mcp.json.example` to `.mcp.json` and fill in the Higgsfield key to enable video generation.

## Deploy

Push to a branch → Vercel auto-builds (framework auto-detected, no `vercel.json`
needed). Set `NEXT_PUBLIC_HERO_VIDEO_URL` in the Vercel project env when the hero
video asset is ready.
