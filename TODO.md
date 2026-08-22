# TODO — data to fill and assumptions taken

Every `[TO FILL]` from the master prompt was left empty, so the stated defaults were applied.
Each line below is an assumption until confirmed.

## Repository

- [ ] **Which repo hosts the site.** Both `project-2` and `project-4` were empty; the site was
      started in **`project-2`**. Confirm, or it moves to `project-4` before Phase 1 goes far.

## Company data sheet — defaults applied

- [ ] Legal name / form: **AleqFactory** (default) — legal form unknown.
- [ ] Plant location + GPS: **unknown, no default exists.** Copy uses « [Ville] »; map,
      LocalBusiness schema and isochrone rings are blocked on this. Highest-priority datum.
- [ ] Plant type: **centrale discontinue (batch)** (default); manufacturer + model unknown.
- [ ] Nominal capacity: **160 t/h** (default).
- [ ] Hot storage: **100 t** (default).
- [ ] Bitumen storage tonnage: unknown; grades **40/50 and 35/50** (default).
- [ ] Cold feed: **5 prédoseurs** (default).
- [ ] Annual production: unknown — omitted from copy until provided.
- [ ] Delivery radius: **120 km / 2 h** (default, presented as a temperature constraint).
- [ ] Lab: assumed **on-site lab present** (Section 3 of the brief claims « internal lab ») +
      external control **LPEE** (default). Confirm the on-site lab exists.
- [ ] Certifications: **ISO 9001 in progress** (default) — must be verified before display.
- [ ] Contacts: commercial email, planning phone, lab email, WhatsApp Business — all unknown;
      forms and MobileCTA ship with placeholders until provided.
- [ ] Legal identifiers ICE / RC / IF / Patente / CNSS: unknown; mentions légales blocked.
- [ ] Domain: **aleqfactory.ma** (default).
- [ ] ALEQ brand assets: none provided → **Section 4 default tokens and typefaces used**, flagged.
- [ ] Languages v1: **FR primary + EN; AR architecture-ready, content Phase 2** (default).
- [ ] Photos / video: none → **art-directed placeholders** + `SHOTLIST.md` delivered.

## Product list

- [ ] Default list used (BBSG 0/10 & 0/14, BBME, BBTM 0/6 & 0/10, GB 0/14 & 0/20 cl. 2/3,
      EME 0/14 cl. 2, enrobés tièdes, enrobé à froid stockable).
- [ ] **Emulsion unit assumed absent** → grave émulsion / émulsions cationiques excluded from v1.
- [ ] BBSG product-page defaults to confirm: classe [3], trafic [T3–T1], fabrication 150–[165] °C.

## Design-plan assumptions (DESIGN.md)

- [ ] ThermalChain stage 4 (stockage à chaud) readout set to **[150] °C** — interpolated, to
      confirm with the chef de centrale.
- [ ] Hero ships as **photo/placeholder**, not video, until the shoot delivers footage.
- [ ] Lenis smooth scroll **disabled** in v1 (mid-range Android vs. scroll-pinning); revisit
      in Phase 5 with profiling.
- [ ] `--chaud-encre #B33A10` added as the accessible text-accent on light grounds.

## Section 16 questions — answered with defaults where they exist

1. Plant location + GPS → **missing, no default. Blocking for map + schema.**
2. Capacity / storage / bitumen → defaults 160 t/h, 100 t, 40/50 + 35/50.
3. Emulsion unit → assumed **no**.
4. ALEQ brand files → none; Section 4 defaults used.
5. Domain → **aleqfactory.ma**.
6. Languages v1 → **FR + EN**, AR-ready.
7. Quote mailbox + WhatsApp number → **missing**; Graph mailbox setup blocked until provided.
8. Photos / video → none; shoot to plan (`SHOTLIST.md`).
9. Publicly displayable ISO / Q&C statuses → assumed only « ISO 9001 en cours » — verify.
10. `(portal)` route group → **reserved, not built** (default).

## Deliberate deviations from the master prompt (Phases 1–5)

- [ ] **Native form elements instead of shadcn/ui.** The visual language needs plain
      bordered inputs and a native `<select>`; no Dialog/Accordion exists yet. Revisit if
      one becomes needed.
- [ ] **Réalisations as typed TS, not MDX.** The three entries are placeholders without
      prose; `content/projects.ts` keeps them schema-checked. Switch to MDX when real
      chantiers with narrative and photos arrive.
- [ ] **Lenis smooth scroll off** (fights scroll-pinning on mid-range Android). Re-profile
      in a later pass if wanted.
- [ ] **Coverage map is a schematic time-ring SVG, not MapLibre.** Deliberate while GPS is
      missing — the constraint communicated is thermal, and the diagram needs no
      coordinates. Wire MapLibre + precomputed isochrone GeoJSON once GPS exists.
- [ ] **Réalisations filters (year / client type / product) not built** — three template
      cards filter to nothing useful. Add with real project data.
- [ ] **Cloudflare Turnstile pending** site keys; honeypot + per-IP rate limit are live.
- [ ] **Vercel Blob for attachments not wired** — attachments ride the email itself
      (10 MB cap enforced); Blob storage becomes relevant with the future portal.
- [ ] **Hero stat-strip "typing" replaced by rise/fade** — steps() typing fights wrapping
      at 390 px and delays comprehension.
- [ ] **AR content** is scaffold-quality: nav/UI strings translated, long-form content
      falls back to FR. Professional AR copy is the Phase 2 (content) task from the brief.

## Phase 5 audit results (measured in the build container)

Lighthouse 12, mobile emulation, production build, three pages (Accueil, Produits,
Contact): **accessibility 100 · best-practices 100 · SEO 100** (the only flagged SEO item
is the canonical pointing at aleqfactory.ma while auditing localhost — correct in
production) · **performance 88–93, LCP 3.1–3.6 s** under simulated slow-4G with ~470 ms
local TTFB and a shared-CPU sandbox. The remaining LCP driver is the Bricolage font swap
re-recording the h1 paint; CLS is 0 and TBT ≤ 200 ms everywhere.

- [ ] Re-measure on the Vercel production URL (CDN TTFB ~100 ms) — projected ≥ 95. If it
      still falls short, the lever is the display-font loading strategy (self-hosted
      subset of Bricolage's used axes, or `display: optional` at the cost of first-visit
      brand type). Decide with real numbers, not here.

## Later-phase reminders

- [ ] `« [0] accident avec arrêt depuis [date] »` renders **only if true** — needs data.
- [ ] Fiches techniques PDF (`public/docs`) — no source documents yet.
- [ ] Réalisations: no real projects yet — placeholders must be replaced before launch.
- [ ] DeliveryEstimator truck payload default **28 t** — confirm TRANSPOLEQ fleet.
- [ ] Opening hours default **05:30** for the centrale — confirm.
