# TRANSPOLEQ — site corporate

Site public de TRANSPOLEQ, transport et logistique de chantier, groupe ALEQ (Maroc).

**État : Phase 0 livrée — fondations et système visuel.** Les pages publiques se construisent en
Phase 1, après validation de `/styleguide`.

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
  [locale]/
    layout.tsx        en-tête, pied de page, i18n, toasts, défilement lissé
    page.tsx          page d'attente de la Phase 0
    styleguide/       le système visuel, en une page — noindex
    not-found.tsx     404 du site, avec en-tête et pied de page
    [...rest]/        attrape-tout qui fait rendre le 404 français
  globals.css         TOUS les jetons de design (@theme)
  robots.ts           tout fermé tant que le site n'est pas public
components/
  ui/                 15 primitives : Button, Chip, Card, Accordion, Input, Select,
                      Textarea, FileInput, Stepper, Table, StatusBadge, Dialog,
                      Toast, Tabs, Tooltip
  sections/           Header, Footer, Wordmark, DispatchBoard
  motion/             Reveal, Counter, Marquee, MarkingLine, SmoothScroll,
                      useReducedMotion / useCalmMode
  icons/              14 icônes maison + 7 silhouettes de flotte
content/
  placeholders.ts     registre des faits que TRANSPOLEQ doit fournir
  fr/                 contenu structuré, une arborescence par langue
lib/                  i18n, routing, fontes, cn
messages/fr.json      libellés d'interface et microcopie
public/media/         cahier des médias à produire
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

### Ajouter une langue (Phase 3)

1. Ajouter le code à `routing.locales` dans `lib/routing.ts`.
2. Déposer `messages/<code>.json`.
3. Dupliquer `content/fr/` en `content/<code>/`.

`LOCALE_META` contient déjà `en` et `ar` avec leur `lang` et leur `dir`. Le CSS n'emploie que des
propriétés logiques : l'arabe basculera en RTL sans retouche de composant.

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

## Déploiement

Vercel, DNS Cloudflare, domaine `transpoleq.ma`. Une prévisualisation par pull request.

Variables d'environnement : voir `.env.example`. Aucune n'est nécessaire au développement ; les
formulaires passent en mode test tant que les clés Turnstile et Resend sont absentes.

**Rien n'est indexable pour l'instant** : `app/robots.ts` interdit tout et le layout pose
`robots: { index: false }`. À ouvrir en Phase 1, page par page. `/styleguide` reste `noindex` en
permanence.

---

## Phases

| Phase | Portée | État |
|---|---|---|
| 0 | Dépôt, jetons, fontes, grille, en-tête et pied de page, `/styleguide`, cahier des médias | **Livrée** |
| 1 | Accueil, services (index + 6 détails), devis, contact, mentions, 404, SEO, formulaires | À venir |
| 2 | Flotte, sécurité, suivi, secteurs, groupe, références, carrières | À venir |
| 3 | Anglais, images OG, JSON-LD, mesure d'audience, Playwright, Lighthouse CI, mise en production | À venir |

On ne démarre pas la phase suivante sans validation explicite.
