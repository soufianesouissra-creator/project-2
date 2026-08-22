# AleqFactory — public website

Public site of **AleqFactory**, the industrial entity of the ALEQ group (Morocco): hot-mix
asphalt plant (centrale d'enrobage), delivery and paving services.

## Status

**Phase 1 delivered — scaffold.** Design plan (Phase 0) approved. The app builds and
serves FR (root), EN (`/en`) and the AR RTL scaffold (`/ar`); design tokens, fonts,
header/footer, typed content schemas and the dev styleguide are in place. Phase 2
(full Accueil + ThermalChain) is next.

## Run

```bash
npm install
npm run dev        # http://localhost:3000 — /styleguide is visible in dev
npm run build      # production build (SSG for all locales)
npm run typecheck
```

No environment variables are needed yet; `.env.example` documents the ones coming in
later phases (Graph mailbox, Turnstile, Blob).

| File | Contents |
|---|---|
| `DESIGN.md` | Phase 0 deliverable: palette, type roles, wireframes (Accueil + fiche produit), ThermalChain spec, motion plan, FR copy, self-critique |
| `CONTENT.md` | How to edit content: add a product, a job; plant data sheet |
| `TODO.md` | Every `[TO FILL]` default applied and every assumption taken |
| `SHOTLIST.md` | One-day photo/video shoot brief (no assets exist yet) |

## Phases

0. Design plan (this) → 1. Scaffold (Next.js 15, tokens, i18n, `/styleguide`) → 2. Accueil +
ThermalChain → 3. Centrale / Produits / Services / Qualité / Environnement → 4. Réalisations /
Groupe / Carrières / Contact / legal → 5. SEO, perf, a11y, RTL, deploy, handover.

Stack (fixed by the brief): Next.js 15 App Router, React 19, TypeScript strict, Tailwind v4,
next-intl (FR default, EN, AR-ready), MapLibre GL, server actions + Zod, Microsoft Graph
sendMail, Vercel.
