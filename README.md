# AleqFactory — public website

Public site of **AleqFactory**, the industrial entity of the ALEQ group (Morocco): hot-mix
asphalt plant (centrale d'enrobage), delivery and paving services.

**Status: Phases 0–5 delivered.** All pages exist in FR (root), EN (`/en`) and an AR RTL
scaffold (`/ar`, content falls back to FR until Phase-2-AR copy is written). The site is
fully static (78 SSG pages) except the two form actions. Every unfilled datum renders as a
visible `[…]` placeholder and is tracked in `TODO.md` — filling `content/plant.ts` and the
message files is the launch checklist.

## Run

```bash
npm install
npm run dev        # http://localhost:3000 — /styleguide is visible in dev
npm run build      # production build (SSG, all locales)
npm run typecheck
```

No environment variables are required to build or browse. The forms work end to end once
email is configured (below); until then they show an explicit "not wired" message and point
to the direct contacts.

## Stack

Next.js 15 (App Router, RSC) · React 19 · TypeScript strict · Tailwind CSS v4 (tokens in
`@theme`, see `app/globals.css`) · next-intl (FR default without prefix) · motion (lazy
chunk, ThermalChain only) · Zod-validated typed content in `/content` (see `CONTENT.md`).

| File | Contents |
|---|---|
| `DESIGN.md` | Phase 0 design plan: palette, type, wireframes, ThermalChain spec, motion plan, copy, self-critique |
| `CONTENT.md` | How to edit content: products, plant data, projects, jobs |
| `TODO.md` | Every default applied, every `[TO FILL]`, deliberate deviations |
| `SHOTLIST.md` | One-day photo/video shoot brief; placeholders on the site carry the shot numbers |

## Deploy (Vercel + Cloudflare DNS)

1. Import the repo in Vercel (framework: Next.js, no special settings). Every branch gets a
   preview; production tracks the default branch.
2. In Cloudflare DNS for `aleqfactory.ma`: `CNAME @ → cname.vercel-dns.com`, **"DNS only"**
   (grey cloud) on that record; add the domain in Vercel → Project → Domains.
3. Set the environment variables below in Vercel (Production + Preview as appropriate).
4. Analytics and Speed Insights activate automatically on Vercel (cookieless, no banner
   needed). Security headers (CSP, HSTS, frame-ancestors) ship from `next.config.ts`.

## Email — Microsoft Graph shared mailbox (quote + application forms)

The forms send via Graph `sendMail` from a shared mailbox in the aleq.ma tenant:

1. Create a shared mailbox, e.g. `devis@aleq.ma` (Exchange admin center).
2. Entra ID → App registrations → New: single-tenant app, no redirect URI.
3. API permissions → Microsoft Graph → **Application** → `Mail.Send` → grant admin consent.
4. Scope the permission to that one mailbox (Exchange Online PowerShell):
   ```powershell
   New-ApplicationAccessPolicy -AppId <client-id> -PolicyScopeGroupId devis@aleq.ma `
     -AccessRight RestrictAccess -Description "site web - devis uniquement"
   ```
5. Certificates & secrets → new client secret, then set in Vercel:
   ```
   GRAPH_TENANT_ID, GRAPH_CLIENT_ID, GRAPH_CLIENT_SECRET, QUOTE_MAILBOX=devis@aleq.ma
   ```

Fallback: set `RESEND_API_KEY` (+ optional `RESEND_FROM`) instead — the transport picks
Graph first, then Resend. With neither, submissions return a visible "use the direct
contacts" message rather than pretending to send. Visitors get a confirmation email on
success. Anti-spam: honeypot + per-IP rate limit are active; Cloudflare Turnstile is
planned once site keys exist (`TODO.md`).

## Content editing

See `CONTENT.md`. Short version: products, plant data sheet, thermal chain, tests,
services, projects, jobs are typed TS in `/content`, validated at build; UI strings live in
`/messages/{fr,en,ar}.json`. Adding a product changes no component.
