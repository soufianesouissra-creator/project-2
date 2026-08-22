# AleqFactory — Phase 0 Design Plan

Status: **awaiting approval — no application code has been written.**
Every value in brackets `[...]` is a default from the master prompt or an assumption; the full
list lives in `TODO.md`.

---

## 1. Palette

Two registers, and the alternation is semantic, not decorative: **froid** grounds carry
documents, quality, administration, legal — everything that is read, filed, verified. **chaud**
grounds carry production, process, delivery — everything that is hot, moving, timed. A section's
register is a typed prop (`register: 'froid' | 'chaud'`), never an ad-hoc class, so the encoding
cannot drift.

| Token | Hex | Role |
|---|---|---|
| `--calcaire` | `#E9E8E4` | page ground (froid) — mineral grey, not cream |
| `--granulat` | `#C9C6BE` | hairlines, secondary surfaces on froid |
| `--bitume` | `#121214` | ink on froid; section ground (chaud) |
| `--fonte` | `#2A2B2F` | surfaces on chaud (cards, placeholder blocks) |
| `--chaud` | `#F24E1E` | the single accent — CTAs, live values, one 1 px rule per screen at most |
| `--chaud-encre` | `#B33A10` | accent for **text and links on `--calcaire`** (see below) |
| `--acier` | `#53616C` | data labels, captions, map strokes (darkened from #5E6B76 — 4.4:1 failed AA on calcaire) |
| `--calcaire-70` | `#E9E8E4` @ 70 % | secondary text on chaud grounds |

**Contrast decision (verified, not assumed):** `#F24E1E` on `#121214` ≈ 5.4:1 — passes AA for
all text. `#F24E1E` on `#E9E8E4` ≈ 2.9:1 — **fails** for text. So `--chaud` is a *graphic*
colour on light grounds (button fills carry `--bitume` ink ≈ 5.4:1 — calcaire ink on the
accent fails at ≈ 2.9:1 — plus rules, marks) and
`--chaud-encre` (≈ 4.9:1 on `--calcaire`) is the *typographic* accent on light grounds. One
accent to the eye, two tokens in the code. This rule goes in `/styleguide` so it survives us.

The **only gradient** on the site: one radial heat glow (`#F24E1E` at 12 % → transparent,
~600 px radius) that travels with the mix inside the ThermalChain. Nowhere else.

Dark sections get a barely-visible grain (2 % noise, CSS `mask` on a data-URI, no request) so
`--bitume` reads as poured asphalt at night, not as a `#000`-ish marketing "dark mode".

## 2. Typography

| Role | Face | Usage |
|---|---|---|
| Display | **Bricolage Grotesque** (variable) | one display line per section. Width axis wide (`wdth` ~110) for headlines; condensed (`wdth` ~80) + optical size up for large standalone numbers (160, 100, 120) so figures read like stencilled tank markings, not blog headings |
| Body | **Archivo** 400 / 500 | paragraphs, navigation, forms |
| Data | **IBM Plex Mono** 400 / 500 | temperatures, tonnages, timestamps, ticket numbers, eyebrows, captions, stat strips — the weighbridge-printout vernacular |
| Arabic (Phase 2 content) | **IBM Plex Sans Arabic** | logical properties everywhere from day one; RTL needs no overrides |

Fluid scale via `clamp()`: 12 / 14 / 16 / 20 / 28 / 40 / 64 / 96. Display leading 0.95, body
1.55. `font-variant-numeric: tabular-nums` on **all** data so counters and readouts never
shift layout. Mono is always uppercase + letter-spaced for eyebrows, mixed-case for captions.

Rule of scarcity: a screen carries at most one 96-size line. If two compete, one is wrong.

## 3. Layout concept

12-column grid, 1440 px max, 24 px gutters. **Froid sections breathe** (whitespace, 2-col
editorial rhythm); **chaud sections are dense instrument panels** (tight rows, mono readouts,
hairline separators — the control-room screen, not the brochure). Surfaces: 2 px radius,
`--granulat` hairlines; a single 1 px `--chaud` rule marks any value that is "live"
(a temperature, an estimator output). No drop shadows, no card soup.

### 3.1 Accueil — wireframe (1440)

```
┌────────────────────────────────────────────────────────────────────┐
│ HEADER — transparent over hero → --calcaire on scroll              │
│ ALEQFACTORY    Produits Services Qualité Réalisations Groupe       │
│                Contact                     [ Demander un devis ]   │
╞════════════════════════════════════════════════════════════════════╡
│ 1 · HERO — chaud · photo plein cadre : tour au crépuscule          │
│                                                                    │
│   CENTRALE D'ENROBAGE — [VILLE], MAROC                (mono, 14)   │
│   Enrobés fabriqués, contrôlés,                                    │
│   livrés à température.                     (Bricolage wide, 96)   │
│   Centrale discontinue de [160] t/h. Formulations NM EN 13108,     │
│   contrôle interne et externe, livraison ≤ [120] km.  (Archivo 20) │
│   [ Demander un devis ]   [ Voir les produits ]                    │
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  │
│  CAPACITÉ [160] t/h · STOCK À CHAUD [100] t ·                      │
│  BITUME 40/50 · 35/50 · LIVRAISON ≤ [120] km      (mono strip, 14) │
╞════════════════════════════════════════════════════════════════════╡
│ 2 · LA LIGNE CHAUDE — chaud · scroll-pinned (spec § 4)             │
│                                                                    │
│   PROCESS                                                (mono)    │
│   Le parcours d'une tonne, de l'ambiant au compactage. (display)   │
│                                                                    │
│   Granulats → Séchage → Malaxage → Stockage → Transport → Pose     │
│      ●━━━━━━━━━◐╌╌╌╌╌╌╌╌○╌╌╌╌╌╌╌╌╌○╌╌╌╌╌╌╌╌╌○╌╌╌╌╌╌╌╌○            │
│                 ▒▒glow▒▒                                           │
│              ┌──────────────┐                                      │
│              │   160 °C     │  (mono condensed, 96, --chaud)       │
│              └──────────────┘                                      │
│   Le tambour sécheur porte les granulats à 160 °C ;                │
│   le filtre à manches capte les fines.               (one line)    │
╞════════════════════════════════════════════════════════════════════╡
│ 3 · PRODUITS — froid                                               │
│   FORMULATIONS                                           (mono)    │
│   Une formulation par usage, une norme par formulation. (display)  │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                  │
│   │ BBSG 0/10   │ │ GB 0/14     │ │ EME 0/14    │   2 rangées × 3  │
│   │ NM EN       │ │ NM EN       │ │ NM EN       │   hover: lignes  │
│   │ 13108-1     │ │ 13108-1     │ │ 13108-1     │   de spec        │
│   │ roulement   │ │ assise      │ │ assise HP   │                  │
│   └─────────────┘ └─────────────┘ └─────────────┘                  │
│                             Toutes les formulations →              │
╞════════════════════════════════════════════════════════════════════╡
│ 4 · CONTRÔLE — froid                                               │
│   LABORATOIRE                                            (mono)    │
│   Chaque lot est contrôlé.                             (display)   │
│   ┌───────────────┐ ┌───────────────┐ ┌───────────────┐            │
│   │ Granulométrie │ │ Teneur en     │ │ Duriez / PCG  │            │
│   │ NM EN 12697-2 │ │ liant         │ │ NM EN 12697   │            │
│   └───────────────┘ └───────────────┘ └───────────────┘            │
│   Contrôle externe : [LPEE].     ↓ Fiches techniques (DownloadList)│
╞════════════════════════════════════════════════════════════════════╡
│ 5 · CHAÎNE INTÉGRÉE — chaud                                        │
│   GROUPE ALEQ                                            (mono)    │
│   De la carrière au chantier, sans rupture de chaîne.  (display)   │
│   [Carrière ALEQ] ─ [Centrale AleqFactory] ─                       │
│                [Transport TRANSPOLEQ · GPS] ─ [Chantier ALEQ]      │
╞════════════════════════════════════════════════════════════════════╡
│ 6 · RÉALISATIONS — froid                                           │
│   RÉFÉRENCES                                             (mono)    │
│   Ce que la centrale a livré.                          (display)   │
│   3 × ProjectCard : chantier · client · produit · tonnage · année  │
╞════════════════════════════════════════════════════════════════════╡
│ 7 · ZONE DE LIVRAISON — froid                                      │
│   [120] kilomètres, deux heures, 145 °C à l'arrivée.   (display)   │
│   ┌──────────── carte MapLibre ────────────┐  L'enrobé se pose     │
│   │      ((( 60 ' | 90 ' | 120 ' )))       │  au-dessus de 135 °C. │
│   │              ▲ centrale                │  Le rayon n'est pas   │
│   └────────────────────────────────────────┘  commercial : il est  │
│                                               thermique.           │
╞════════════════════════════════════════════════════════════════════╡
│ 8 · CTA — chaud                                                    │
│   Dites-nous le tonnage, la date et le lieu.           (display)   │
│   [ Demander un devis ]  [ WhatsApp ]  [ Appeler le planning ]     │
╞════════════════════════════════════════════════════════════════════╡
│ FOOTER — bitume · plan du site · contacts · ICE/RC/IF · FR EN      │
└────────────────────────────────────────────────────────────────────┘
Mobile (390) : une colonne ; MobileCTA collant en bas
[ WhatsApp | Appeler ] ; la carte devient statique + liste des rings.
```

### 3.2 Fiche produit — wireframe (1440), ex. `/produits/bbsg-0-10`

```
┌────────────────────────────────────────────────────────────────────┐
│ HEADER (solide)                                                    │
│ Produits / Couche de roulement / BBSG 0/10        (breadcrumbs)    │
╞════════════════════════════════════════════════════════════════════╡
│ froid — 2 colonnes : 7 / 5                                         │
│                                                                    │
│  NM EN 13108-1 · COUCHE DE ROULEMENT (mono)  ┌──── SpecTable ────┐ │
│  BBSG 0/10                        (display)  │ Granularité  0/10 │ │
│                                              │ Classe       [3]  │ │
│  Béton bitumineux semi-grenu pour            │ Liant   40/50 ou  │ │
│  couches de roulement de 5 à 7 cm.           │         35/50     │ │
│  Trafic [T3 à T1].                           │ T° fabrication    │ │
│                                              │   150–[165] °C ── │ │  ← 1 px --chaud
│  Points forts                                │ T° mise en œuvre  │ │
│  · macrotexture, adhérence                   │   ≥ 135 °C     ── │ │
│  · compacité PCG conforme                    │ Épaisseur 5–7 cm  │ │
│  · formulation étudiée au labo               └───────────────────┘ │
│                                              ↓ Fiche technique PDF │
│  [ Demander un devis pour ce produit ]       (pré-remplit le form) │
╞════════════════════════════════════════════════════════════════════╡
│ chaud — bande : température de ce produit dans la ligne chaude     │
│  FABRICATION 150–165 °C ─── LIVRAISON ≥ 145 °C ─── POSE ≥ 135 °C   │
╞════════════════════════════════════════════════════════════════════╡
│ froid — Autres formulations de la même couche (2–3 ProductCard)    │
│ CTA band · footer                                                  │
└────────────────────────────────────────────────────────────────────┘
```

All product data renders from `content/products.ts`; the page has zero hardcoded values.

## 4. ThermalChain — « La ligne chaude » (signature element)

The one thing the site is remembered by; the only place boldness is spent.

**Content model** (`content/thermal-chain.ts`, Zod-validated):

| # | Stage | Readout | One-liner (FR) |
|---|---|---|---|
| 1 | Granulats | `AMBIANT` | Cinq prédoseurs dosent les fractions issues des carrières du groupe. |
| 2 | Séchage | `160 °C` | Le tambour sécheur porte les granulats à 160 °C ; le filtre à manches capte les fines. |
| 3 | Malaxage | `155 °C` | Granulats, filler et bitume pesés au kilogramme, malaxés gâchée par gâchée. |
| 4 | Stockage à chaud | `[150] °C` | [100] t de trémies calorifugées : les camions chargent sans attendre la fabrication. |
| 5 | Transport | `≥ 145 °C` | Camions bâchés, suivi GPS TRANSPOLEQ ; température relevée au chargement et à la livraison. |
| 6 | Mise en œuvre | `135 °C` | Finisseur et compacteurs ALEQ ; le compactage s'achève au-dessus de 135 °C. |

(Stage 4's 150 °C is interpolated between the prompt's given values — to confirm with the chef
de centrale; flagged in `TODO.md`.)

**Mechanics.** Outer section ~500 vh on a `--bitume` ground; inner viewport-height stage is
`position: sticky`. Scroll progress (Framer Motion `useScroll` on the outer section, mapped
0→1) drives, in lockstep: (a) an SVG chain path drawn left→right via `stroke-dashoffset` with
`pathLength: 1` normalisation; (b) the radial heat glow, translated along the path, its
opacity keyed to the current temperature; (c) the giant mono readout (Bricolage-condensed
digits + Plex Mono unit), which **counts** between stage values rather than cutting; (d) stage
label + one-liner, cross-faded at stage thresholds (0, .18, .36, .54, .74, .9). Direction is
fully reversible — scrolling up cools the line. No autoplay, no loop.

**Progressive enhancement, not degradation.** The server renders the **static stepper** —
a horizontal (vertical on mobile) rail of six stations, each with its mono readout and
one-liner: complete, legible, zero JS. After hydration, the pinned version replaces it only
when *all* hold: `prefers-reduced-motion: no-preference`; viewport ≥ 768 px **or** fine
pointer (touch pinning below that is where sticky+scroll jank lives); JS running. So reduced
motion, small touch screens, crawler, and JS-off all get the same truthful stepper — the
fallback is the baseline, not an afterthought.

**Accessibility.** The animated SVG and glow are `aria-hidden`; the semantic content is a real
`<ol>` of stages (visually hidden in pinned mode, visible in stepper mode). Readout changes
are not announced (decorative repetition); the `<ol>` carries the data once.

**Performance.** Transform/opacity only, no layout writes on scroll; springs with
`restDelta` clamps; glow is a single pre-rasterised radial, GPU-composited. Budgeted inside
the 150 kB home JS envelope; the chain module lazy-hydrates when the section is within 1.5
viewports.

## 5. Motion plan — exactly four moments

| # | Moment | Spec |
|---|---|---|
| 1 | Hero load, once | Photo reveals via `clip-path: inset()` 0.8 s `cubic-bezier(0.16,1,0.3,1)`; headline lines rise 24 px + fade, 80 ms stagger; stat strip types in mono, ≤ 600 ms total. Headline and image are server-rendered and painted at once — the animation is transform-only enhancement, so LCP is untouched. Total ≤ 1.4 s. |
| 2 | ThermalChain | Scroll-bound (§ 4). The site's entire boldness budget. |
| 3 | Counters | Stat values count up on first entry into view, once, 0.9 s ease-out, tabular numerals (zero layout shift). Never re-trigger. |
| 4 | ProductCard hover | Spec rows unfold (`grid-template-rows: 0fr→1fr`, 250 ms). On touch, rows are simply always visible — no hover trap. |

Nothing bounces, nothing loops, no parallax on text. `prefers-reduced-motion` removes 1–3
entirely (content appears in final state) and keeps 4 as an instant toggle. Lenis smooth
scroll: **off** in v1 — it fights native scroll-driven pinning on mid-range Android, and the
ThermalChain matters more (revisit in Phase 5 with profiling).

## 6. FR copy — hero and every section header

Register: factual, short sentences, vouvoiement, sentence case, numbers over adjectives.
Banned-word check done on all lines below.

**Hero** — headline: option 1, « **Enrobés fabriqués, contrôlés, livrés à température.** »
(it *is* the positioning line, states the three verbs the site must prove, and reads at 96 px).
Sub: « Centrale discontinue de [160] t/h à [Ville]. Formulations conformes NM EN 13108,
contrôle interne et externe, livraison dans un rayon de [120] km. »
CTAs: « Demander un devis » · « Voir les produits ».
Stat strip: `CAPACITÉ [160] T/H · STOCK À CHAUD [100] T · BITUME 40/50 · 35/50 · LIVRAISON ≤ [120] KM`

**Accueil, section headers** (eyebrow mono / display line):

| Section | Eyebrow | Display line |
|---|---|---|
| Ligne chaude | PROCESS | Le parcours d'une tonne, de l'ambiant au compactage. |
| Produits | FORMULATIONS | Une formulation par usage, une norme par formulation. |
| Contrôle | LABORATOIRE | Chaque lot est contrôlé. |
| Chaîne intégrée | GROUPE ALEQ | De la carrière au chantier, sans rupture de chaîne. |
| Réalisations | RÉFÉRENCES | Ce que la centrale a livré. |
| Zone | LIVRAISON | [120] kilomètres, deux heures, 145 °C à l'arrivée. |
| CTA | DEVIS | Dites-nous le tonnage, la date et le lieu. |

**Page-level display lines:**

| Page | Display line |
|---|---|
| /centrale | Une tour, cinq prédoseurs, [160] tonnes par heure. |
| /produits | Chaque couche de chaussée a sa formulation. |
| /services | La logistique fait partie du produit. |
| /qualite | Un enrobé conforme est un enrobé mesuré. |
| /environnement | Filtré, mesuré, documenté. |
| /realisations | Ce que la centrale a livré, chantier par chantier. |
| /groupe | Trois entités, une seule chaîne. |
| /carrieres | Travailler à la centrale. |
| /contact | Demander un devis. |

## 7. Self-critique — « would I produce this for any industrial website? »

Taken part by part, with the changes it forced:

- **Palette.** Dark/light alternation *per se* — yes, anyone does that. What rescues it is the
  rule that the register is derived from content type and enforced by a typed prop, plus the
  single travelling heat glow. **Changed:** added `--chaud-encre` after the contrast math
  showed the accent failing on light grounds — an unnamed second orange would have leaked in
  ad hoc otherwise; and added the asphalt grain on `--bitume` so dark sections read as plant,
  not theme.
- **Stat strip under hero.** Every industrial template has one. **Changed:** ours is set as a
  weighbridge line — Plex Mono, interpunct separators, hairline rules above and below, no
  icons, no cards. The restraint *is* the identity; no ticket-shaped skeuomorphism.
- **Six product cards in a grid.** Generic as a pattern. **Changed:** the hover state reveals
  *spec rows* (norme, granularité, couche) instead of a zoom or lift — the card behaves like a
  fiche technique, which no SaaS grid does. On touch the specs are simply printed.
- **"Chaîne intégrée" four-stop diagram.** Risked being a 01/02/03 icon strip — the exact
  banned look. **Changed:** drawn as one continuous line in the same visual language as the
  ThermalChain (its cold echo — no glow, `--acier` strokes), with entity names and one mono
  fact per stop (« TRANSPOLEQ — suivi GPS »). No icons, no numbering: it is a chain, and it
  looks like the other chain.
- **Map with rings.** Standard. **Changed:** the display line above it makes the radius a
  *thermal* fact (« 145 °C à l'arrivée »), and the rings are labelled in minutes, not km —
  because the constraint is time-at-temperature. Copy states it: « Le rayon n'est pas
  commercial : il est thermique. »
- **Hero video.** The prompt allows it; with no footage it would mean stock — banned.
  **Changed:** photo/placeholder hero in v1; the ≤ 2 MB dusk loop enters only when the § 15
  shoot delivers it.
- **One element removed per page (Accueil):** the FAQ accordion stays off the home page
  entirely, and the "Contrôle" section loses its planned third row (equipment photos) — the
  three tests + external-control line + downloads already prove the claim; the lab gets its
  own page.

## 8. Register map (froid / chaud per page)

Accueil: hero **chaud** → ligne chaude **chaud** → produits **froid** → contrôle **froid** →
chaîne intégrée **chaud** → réalisations **froid** → zone **froid** → CTA **chaud**.
/centrale and /services: chaud-dominant with froid spec tables. /produits, /qualite,
/realisations, /groupe, /carrieres, /contact, legal: froid, with at most one chaud band
(product temperature strip; services estimator result row).

---

**Next:** on approval → Phase 1 (scaffold: tokens, fonts, layout, header/footer, i18n,
content schemas, `/styleguide`).
