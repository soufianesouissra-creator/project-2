# AleqFactory — public website

Public site of **AleqFactory**, the industrial entity of the ALEQ group (Morocco): hot-mix
asphalt plant (centrale d'enrobage), delivery and paving services.

## Status

**Phase 0 — design plan, awaiting approval.** No application code yet, by design: the working
method (master prompt, § 13) gates all code on approval of the design plan.

| File | Contents |
|---|---|
| `DESIGN.md` | Phase 0 deliverable: palette, type roles, wireframes (Accueil + fiche produit), ThermalChain spec, motion plan, FR copy, self-critique |
| `TODO.md` | Every `[TO FILL]` default applied and every assumption taken |
| `SHOTLIST.md` | One-day photo/video shoot brief (no assets exist yet) |

## Phases

0. Design plan (this) → 1. Scaffold (Next.js 15, tokens, i18n, `/styleguide`) → 2. Accueil +
ThermalChain → 3. Centrale / Produits / Services / Qualité / Environnement → 4. Réalisations /
Groupe / Carrières / Contact / legal → 5. SEO, perf, a11y, RTL, deploy, handover.

Stack (fixed by the brief): Next.js 15 App Router, React 19, TypeScript strict, Tailwind v4,
next-intl (FR default, EN, AR-ready), MapLibre GL, server actions + Zod, Microsoft Graph
sendMail, Vercel.
