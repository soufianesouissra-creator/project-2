# CONTENT.md — editing the site's content

All content lives in `/content` as typed TypeScript, validated with Zod **at build
time**: a value that does not match its schema fails `next build`, never the visitor.
Components only consume the exported types, so a headless CMS (Sanity or Payload) can
replace these files later without touching a single component.

UI strings (navigation, buttons, form labels) are separate, in `/messages/{fr,en,ar}.json`.

## Languages

Content strings are `{ fr, en, ar? }` objects (`localizedSchema`). FR and EN are
required; `ar` is optional until Phase 2 and falls back to FR when absent.

## Add a product

Edit `content/products.ts` and append an object to the array:

```ts
{
  slug: "bbsg-0-6",              // lowercase, hyphenated — becomes /produits/bbsg-0-6
  name: "BBSG 0/6",              // technical designation, identical in all languages
  norm: "NM EN 13108-1",
  layer: "roulement",            // roulement | liaison | assise | entretien
  granularity: "0/6",
  classes: "classe 3",           // optional
  binder: "40/50",
  tempManufacture: "150–165 °C",
  tempLaying: "≥ 135 °C",
  thickness: "3–4 cm",           // optional
  usage: { fr: "…", en: "…" },
  strengths: [{ fr: "…", en: "…" }],
  featured: false,               // true → one of the six Accueil cards
  datasheet: "/docs/bbsg-0-6.pdf" // optional, once the PDF is in public/docs
}
```

The index page groups by `layer` automatically; the product page is generated from
the entry (Phase 3). Adding a product changes no component.

## Update the plant data sheet

`content/plant.ts` — capacity, storage, radius, contacts, identifiers. Unknown
values are `null` or a visible `[…]` placeholder; they are tracked in `TODO.md`.
Filling `gps` unblocks the coverage map and the LocalBusiness schema.

## Other files

| File | Contents |
|---|---|
| `content/thermal-chain.ts` | the six stages of « la ligne chaude » (label, readout, one-liner) |
| `content/tests.ts` | lab tests: name, norm, frequency; `featured` → Accueil cards |
| `content/services.ts` | the five services with summaries |
| `content/team.ts` | roles shown on /centrale (empty until real data) |
| `content/jobs.ts` | open roles on /carrieres (empty until real data) |
| `content/faq.ts` | FAQ entries (Phase 4) |
| `content/projects/*.mdx` | réalisations (Phase 4) — one MDX file per project |

## Add a job / a project

Jobs: append to `content/jobs.ts` (`slug`, localized `title`, `location`,
`description`, `open`). Projects: Phase 4 — one MDX file under `content/projects/`
with frontmatter (client, product, tonnage, year); documented here when the loader
lands.
