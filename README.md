# TRANSPOLEQ — site corporate

Site public de TRANSPOLEQ, transport et logistique de chantier, groupe ALEQ (Maroc).

**État : Phases 0 à 3 livrées.** Le site est complet en français et en anglais. Il reste à le
déployer (accès manquants) et à combler les faits listés dans `CONTENT_TODO.md`.

---

## Démarrer

```bash
pnpm install
cp .env.example .env.local     # aucune clé n'est requise pour le développement
pnpm dev                       # http://localhost:3000
```

Puis ouvrir **http://localhost:3000/styleguide** — c'est le livrable de la Phase 0.

### Scripts

| Commande | Ce qu'elle fait |
|---|---|
| `pnpm dev` | Serveur de développement |
| `pnpm build` | Build de production |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit`, mode strict |
| `pnpm test` | typecheck + lint + régénération de `CONTENT_TODO.md` |
| `pnpm test:e2e` | Suite Playwright (exige un `pnpm build && pnpm start`) |
| `pnpm test:lighthouse` | Lighthouse sur les trois pages du budget |
| `pnpm verify` | build + test + test:e2e, tout d'un coup |
| `pnpm gen:content-todo` | Régénère `CONTENT_TODO.md` depuis le registre de faits |
| `pnpm shots` | Captures de `/styleguide` en 390 px et 1440 px |
| `pnpm format` | Prettier |

---

## Ce qui existe aujourd'hui

```
app/
  layout.tsx          passe-plat : Next exige un layout racine réel, sinon la
                      frontière 404 revient à un layout fantôme
  not-found.tsx       404 hors langue, document autonome
  og/route.tsx        vignettes de partage, une par page
  robots.ts           fermé tant que le domaine n'est pas celui de production
  sitemap.ts          vide hors production, pour ne jamais contredire robots
  globals.css         TOUS les jetons de design (@theme)
  actions/            Server Actions : devis, contact, candidature
  [locale]/
    layout.tsx        en-tête, pied de page, i18n, consentement, mesure
    page.tsx          accueil, onze sections
    services/         index + gabarit de détail (6 pages)
    flotte/ securite/ suivi/ secteurs/ groupe/ references/ carrieres/
    devis/ contact/ mentions-legales/ confidentialite/
    styleguide/       le système visuel, en une page — noindex permanent
    not-found.tsx     404 du site, avec en-tête et pied de page
    [...rest]/        attrape-tout qui fait rendre le 404 dans la bonne langue
    opengraph-image.tsx
components/
  ui/                 15 primitives : Button, Chip, Card, Accordion, Input, Select,
                      Textarea, FileInput, Stepper, Table, StatusBadge, Dialog,
                      Toast, Tabs, Tooltip
  sections/           Header, Footer, Hero, DispatchBoard, KeyFigures, ServicesGrid,
                      MissionProcess, FleetConvoy, FleetGrid, TrackingBand,
                      GroupChain, ReferencesMarquee, CoverageMap, CareersBand,
                      QuoteBand, QuoteForm, ContactForm, ApplicationForm, Faq,
                      PageHero, LegalLayout, CookieBanner, LanguageSwitch…
  motion/             Reveal, Counter, Marquee, MarkingLine, PinnedHorizontal,
                      SmoothScroll, useReducedMotion / useCalmMode
  icons/              14 icônes maison + 7 silhouettes de flotte
content/
  placeholders.ts     registre des faits que TRANSPOLEQ doit fournir
  fr/                 contenu structuré — CANONIQUE, il définit les types
  en/                 traduction ; ce qu'elle omet retombe sur le français
lib/                  i18n, routing, content, fontes, seo, schema, validation,
                      mail, rate-limit, turnstile, cn
messages/             libellés d'interface et microcopie, fr et en
public/fonts/         Archivo TTF, pour les vignettes de partage uniquement
public/media/         cahier des médias à produire
tests/e2e/            74 tests : parcours, formulaires, langues, accessibilité
```

---

## Modifier le contenu

### Changer un chiffre, une coordonnée, un intitulé

Tout le contenu structuré est dans `content/fr/`. Ce sont des fichiers TypeScript typés : une
faute de forme ne compile pas.

- Coordonnées, navigation, entités du groupe → `content/fr/site.ts`
- Lignes du tableau de dispatch → `content/fr/dispatch-board.ts`

Les libellés d'interface (boutons, erreurs, confirmations) sont dans `messages/fr.json`.

### Combler un fait manquant

Les faits que TRANSPOLEQ doit encore fournir s'affichent entre crochets — `[N_CAMIONS]`, `[TEL]` —
sur le site comme dans `CONTENT_TODO.md`.

1. Remplacer `ph('N_CAMIONS')` par la vraie valeur dans le fichier de contenu concerné.
2. Supprimer l'entrée correspondante de `content/placeholders.ts`.
3. `pnpm gen:content-todo`.

`CONTENT_TODO.md` étant généré, la liste ne peut pas diverger du code.

### Ajouter un poste (Phase 2)

Les offres vivront dans `content/fr/jobs.ts`. Un objet par poste ; la page Carrières et le balisage
`JobPosting` se mettent à jour seuls.

### Ajouter une langue

Le français et l'anglais sont livrés. Pour une troisième — l'arabe est le prochain candidat :

1. Ajouter le code à `routing.locales` dans `lib/routing.ts`, et le retirer de `PLANNED_LOCALES`.
2. Déposer `messages/<code>.json`.
3. Créer `content/<code>/` et le brancher dans `lib/content.ts`.

`LOCALE_META` porte déjà `ar` avec `dir: 'rtl'`, et le CSS n'emploie que des propriétés logiques :
la bascule RTL ne demandera aucune retouche de composant. Une clé oubliée dans une traduction
retombe sur le français plutôt que de laisser un blanc.

**Les slugs d'URL ne changent pas d'une langue à l'autre** (`/en/services/citernes`). C'est
volontaire : une URL désigne une page, quelle que soit la langue qui l'habille.

---

## Règles du dépôt

- **Aucun fait inventé.** Un nombre de camions, une certification, un client, une date qui n'a pas
  été fournie reste un crochet. Voir `CONTENT_TODO.md`.
- **Aucune couleur en dur.** Tous les jetons sont dans le bloc `@theme` de `app/globals.css`.
- **Aucun secret versionné.** Tout par variables d'environnement, `.env.example` à jour.
- **Propriétés logiques uniquement** (`ms-`, `me-`, `ps-`, `pe-`) — jamais `ml-`, `mr-`, `left-`,
  `right-`.
- **`--marking` n'est jamais du texte sur fond clair** et jamais un grand aplat.
- **Mouvement :** s'il n'encode rien du transport (déplacement, séquence, progression), il n'existe
  pas. Tout respecte `prefers-reduced-motion`.

`DESIGN_PLAN.md` explique le parti pris visuel. `DECISIONS.md` liste les arbitrages pris faute
d'instruction, avec leur raison.

---

## Déploiement — À FAIRE

**Le site n'est pas déployé.** Ni compte Vercel, ni accès DNS, ni clés Resend / Turnstile /
Vercel Blob n'ont été fournis. Tout ce qui en dépend est prêt et paramétré ; rien n'a été deviné.

Marche à suivre, dans cet ordre :

1. **Importer le dépôt sur Vercel.** Aucun réglage particulier : `pnpm build` suffit.
2. **Renseigner les variables** de `.env.example` dans le projet Vercel.
   `NEXT_PUBLIC_SITE_URL=https://transpoleq.ma` est la plus importante — voir ci-dessous.
3. **Pointer le domaine** `transpoleq.ma` sur Vercel (DNS Cloudflare).
4. **Vérifier** : `pnpm verify` en local, puis Lighthouse sur l'URL de production
   (`BASE_URL=https://transpoleq.ma THROTTLING=devtools pnpm test:lighthouse`).

### L'indexation dépend du DOMAINE, pas d'un réglage

`robots.ts` et `sitemap.ts` lisent tous deux `isProductionSite()` :

- tant que `NEXT_PUBLIC_SITE_URL` ne pointe pas sur `transpoleq.ma`, **robots interdit tout** et le
  sitemap est vide — une prévisualisation ne peut pas être indexée par oubli ;
- une fois le domaine en place, les deux s'ouvrent ensemble et ne peuvent pas se contredire.

`/styleguide` reste `noindex` en permanence, dans les deux cas.

**Avant d'ouvrir l'indexation**, remplir au minimum les mentions légales (`[RAISON_SOCIALE]`,
`[RC]`, `[ICE]`, `[IF]`, `[DIRECTEUR_PUBLICATION]`, `[HEBERGEUR]`) : elles sont opposables.

### Sans clés, le site fonctionne quand même

- Sans `RESEND_API_KEY` : les formulaires vont jusqu'au bout, journalisent le message côté serveur,
  et l'écran de confirmation **dit** qu'aucun e-mail n'est parti. On ne fait pas croire à un envoi.
- Sans clés Turnstile : le formulaire reste protégé par le champ piège et la limitation de débit, et
  l'absence de vérification anti-robot est écrite à l'écran.
- Sans `BLOB_READ_WRITE_TOKEN` : le CV n'est pas stocké et l'e-mail RH le signale, avec le nom et la
  taille du fichier, pour qu'on rappelle le candidat.

---

## Ce qui a été mesuré

Lighthouse mobile, bridage RÉEL (`THROTTLING=devtools`), build de production, domaine de production :

| Page | Perf. | Access. | Bonnes pratiques | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | 94 | 97 | 96 | 92 | 1 797 ms | 0,022 |
| `/services/materiaux-vrac` | 97 | 97 | 96 | 92 | 1 714 ms | 0,000 |
| `/devis` | 97 | 97 | 96 | 92 | 1 642 ms | 0,000 |

Budget du brief : ≥ 90 partout, LCP ≤ 2 500 ms, CLS < 0,05. **Tenu.**

Attention en local : sans domaine de production, le score SEO tombe à 66 — c'est notre propre
`robots.txt` qui refuse l'indexation, et c'est le comportement voulu.

Le mode `simulate` de Lighthouse surestime lourdement le LCP contre `localhost` (3,3 s annoncées
contre 948 ms mesurées dans un vrai navigateur bridé). Utiliser `THROTTLING=devtools`, ou mesurer
le site déployé.

Suite de navigateur : **74 tests** (parcours des 19 pages publiques × 2 formats, formulaires,
langues, accessibilité). `pnpm test:e2e`.

---

## Phases

| Phase | Portée | État |
|---|---|---|
| 0 | Dépôt, jetons, fontes, grille, en-tête et pied de page, `/styleguide`, cahier des médias | **Livrée** |
| 1 | Accueil, services (index + 6 détails), devis, contact, mentions, 404, SEO, formulaires | À venir |
| 2 | Flotte, sécurité, suivi, secteurs, groupe, références, carrières | À venir |
| 3 | Anglais, images OG, JSON-LD, mesure d'audience, Playwright, Lighthouse CI, mise en production | À venir |

On ne démarre pas la phase suivante sans validation explicite.
