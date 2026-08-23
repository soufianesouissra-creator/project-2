# DECISIONS

Décisions prises faute d'instruction explicite, avec leur raison. Une décision inscrite ici peut
être renversée par TRANSPOLEQ à tout moment — c'est justement pourquoi elle est écrite.

Format : **date · décision · pourquoi · ce qu'il en coûte de changer d'avis.**

---

## Phase 0

### 2026-08-22 · Le site est construit dans `project-2`, pas dans `project-1`

`project-1` contient Revina Factory, une application métier sans rapport. `project-2` était vide et
déjà positionné sur la branche de travail demandée. Rien n'a été touché dans `project-1`.

### 2026-08-22 · Next.js **15.5.23**, pas 16

Le brief fixe Next.js 15 pour rester aligné sur le site corporate ALEQ, en vue d'un monorepo
partagé. Next 16 est sorti ; l'adopter ici ferait diverger les deux bases avant même qu'elles se
rejoignent. On prend la dernière 15.x.
*Changer d'avis :* peu coûteux tant qu'aucune page n'existe, plus coûteux après la Phase 1.

### 2026-08-22 · Jetons ALEQ non fournis → défauts du brief §4.2

Aucun jeton de marque groupe n'a été communiqué. Les valeurs du §4.2 font foi. Les neutres sont
isolés dans un seul bloc `@theme` (`app/globals.css`) et aucun composant n'écrit une couleur en
dur : substituer une palette groupe est une édition d'un fichier.
*Suivi :* `[TOKENS_ALEQ]` dans `CONTENT_TODO.md`.

### 2026-08-22 · Pas de shadcn/ui ni de Radix — primitives natives

Le brief autorise shadcn pour Dialog, Toast et Accordion. On ne s'en sert pas :

- **Accordion** → `<details>` / `<summary>`. Clavier, lecteur d'écran et recherche dans la page
  fonctionnent sans JavaScript, et le contenu reste dans le DOM — ce qui compte pour une FAQ
  indexée en `FAQPage`.
- **Dialog** → élément `<dialog>` natif. Piège de focus, touche Échap, couche d'inertie : c'est le
  navigateur qui les fournit, mieux qu'une réimplémentation.
- **Toast** → contexte React de 40 lignes avec une région `aria-live` présente dès le rendu initial.

Résultat : zéro dépendance d'interface, rien à restyler, moins de JavaScript sur un site que des
gens ouvrent en 4G au bord d'un chantier.
*Changer d'avis :* facile, les API des trois composants sont déjà celles qu'on attendrait de shadcn.

### 2026-08-22 · Une seule langue livrée (`fr`), l'anglais reste une ligne de configuration

`next-intl` est installé et câblé (`app/[locale]`, `localePrefix: 'as-needed'`, middleware). Mais
`routing.locales` ne contient que `fr` : livrer `/en` sans traduction produirait des 404 ou des
pages à moitié françaises. `lib/routing.ts` décrit déjà `en` et `ar` (libellé, `lang`, `dir`) ;
ajouter une langue = l'ajouter au tableau et déposer son `messages/<code>.json`.

Le sélecteur du pied de page affiche `EN` désactivé avec la mention « bientôt » — même principe que
le bouton « Espace client » du brief : on n'offre pas un lien qui renverrait un 404.

### 2026-08-22 · RTL préparé, pas construit

Uniquement des propriétés logiques (`ms-`, `me-`, `ps-`, `pe-`, `text-start`, `inset-inline-*`),
`dir` posé sur `<html>` depuis `LOCALE_META`, flèches des onglets qui suivent `document.dir`, ligne
de marquage en SVG donc symétrisable. Aucun `ml-`/`mr-`/`left-`/`right-` dans le code.

### 2026-08-22 · Les faits manquants sont un registre typé, pas une liste à la main

`content/placeholders.ts` déclare chaque fait attendu (ce qu'on attend, où le trou est visible, qui
le doit, quelle phase le réclame). `ph('CLÉ')` rend `[CLÉ]` et **ne compile pas** sur une clé
inconnue. `CONTENT_TODO.md` est généré depuis ce registre (`pnpm gen:content-todo`), et le
styleguide l'affiche à l'écran.

Motif : une liste tenue à la main diverge du code en une semaine. Ici, un crochet oublié dans un
composant est soit au registre, soit une erreur de compilation.

### 2026-08-22 · GSAP et `PinnedHorizontal` reportés en Phase 1

GSAP + ScrollTrigger ne servent qu'aux deux sections épinglées (mission, convoi), qui sont des
sections de l'accueil. Les installer en Phase 0 alourdirait le dépôt sans qu'aucune page ne les
importe. Ils arrivent avec la page qui les utilise, en import dynamique.

### 2026-08-22 · Lenis : desktop uniquement, import dynamique

Le défilement natif d'iOS et d'Android est déjà bon et le lissage entre en conflit avec les gestes
tactiles. Le lecteur type est sur un téléphone. Lenis est chargé après le montage, seulement sur
pointeur fin, et jamais sous `prefers-reduced-motion`.

### 2026-08-22 · Rien n'est indexable en Phase 0

`app/robots.ts` interdit tout, et le layout pose `robots: { index: false }`. Un déploiement de
prévisualisation ne doit pas se retrouver dans un moteur de recherche. `/styleguide` porte en plus
son propre `noindex`, qui survivra à l'ouverture de la Phase 1.

### 2026-08-22 · L'accueil est une page d'attente, pas une ébauche de hero

Le brief impose un arrêt après la Phase 0. Poser une ébauche d'accueil donnerait à valider une page
qui n'a pas encore été conçue — précisément ce que la porte de phase existe pour éviter. `/` affiche
l'état de la phase et renvoie au styleguide.

### 2026-08-22 · Le board rend son horodatage côté client uniquement

`deliveredAt()` n'est appelée que dans un gestionnaire d'intervalle. Une heure calculée au rendu
divergerait entre le serveur et le client et casserait l'hydratation. Les heures de livraison
initiales sont des données, pas un calcul.

### 2026-08-22 · Le poids JavaScript est à surveiller dès la Phase 1

Mesuré en fin de Phase 0 : 102 kB partagés (Next + React), 171 kB sur `/styleguide`. Le budget du
brief est de **180 kB sur l'accueil**. `motion` pèse l'essentiel de la marge restante.

Si le vrai accueil dépasse le budget, deux leviers dans cet ordre : `LazyMotion` + `motion/react-m`
pour ne charger que les fonctionnalités utilisées, puis bascule de `Reveal` et `MarkingLine` en CSS
pur (les deux animations sont assez simples pour s'en passer). À trancher sur mesure, pas par
anticipation.

---

## Pièges vérifiés pendant la Phase 0

Chacun vient d'un défaut RÉEL trouvé en regardant les captures à 390 px et 1440 px, pas d'une
relecture de code. Ils sont ici parce qu'ils se reproduisent tout seuls.

### `cn()` concatène, il n'arbitre pas — `hidden` perdait contre `inline-flex`

`<ButtonLink className="hidden sm:inline-flex">` laissait le CTA visible à 390 px. `hidden` et le
`inline-flex` de la variante sont deux utilitaires d'affichage : c'est l'ordre de la FEUILLE DE
STYLE qui tranche, pas l'ordre des classes. Pour masquer un composant, on enveloppe l'appel
(`<span class="hidden sm:block">`), on ne lui passe pas la classe. Noté dans `lib/cn.ts`.

### Un utilitaire qui impose sa taille se bat avec les utilitaires de taille

`marking-line-x` déclarait `inline-size: 100%`. Dans la rangée du groupe au pied de page, il gagnait
contre `w-6` et **barrait le nom qu'il devait séparer** — « AleqFactory » s'affichait rayé.
L'utilitaire ne fixe plus que l'épaisseur ; la longueur revient à l'appelant.

### Un en-tête rendu par le layout ne sait pas sur quoi il est posé

L'accueil ouvre sur une bande `--asphalt`, l'en-tête est rendu par le layout : sa navigation
s'affichait en `--ink` sur de l'enrobé, c'est-à-dire invisible. Une page qui ouvre sur une bande
sombre est maintenant déclarée dans `DARK_HERO_ROUTES`.

### Points de rupture de FENÊTRE dans un composant de largeur variable

Le board vit dans une colonne étroite du hero (~540 px) autant qu'en pleine largeur. Calé sur la
fenêtre, il affichait six colonnes dans un panneau qui n'en tient que quatre : la colonne **Statut**
— la seule qui dit ce qui se passe — sortait du cadre, sans barre de défilement visible. Il est
passé en **requêtes de conteneur** (`@container`), et le styleguide montre les deux largeurs côte à
côte pour que la régression se voie.

### Un `not-found.tsx` de segment ne sert à rien sans layout racine RÉEL

`app/[locale]/not-found.tsx` n'était jamais rendu — pas même sur un `notFound()` levé depuis une
vraie page. Sans `app/layout.tsx`, Next en synthétise un, et c'est ce layout fantôme qui possède la
frontière 404 : le site répondait le 404 par défaut de Next, en anglais, sans styles, alors que la
page française existait et compilait. Il faut trois pièces ensemble :
`app/layout.tsx` (passe-plat), `app/[locale]/[...rest]/page.tsx` (qui appelle `setRequestLocale`
puis `notFound()`), et `app/not-found.tsx` pour ce qui n'atteint aucune langue.

**Une intention non vérifiée à l'écran n'est pas un résultat.** Les cinq défauts ci-dessus
compilaient, passaient le typecheck et le lint.

### `overflow-x-auto` ne contient rien si le parent ne peut pas rétrécir

Le board et le Marquee faisaient défiler la PAGE horizontalement à 390 px, alors que tous deux
déclarent leur propre conteneur de défilement. Dans une grille ou un flex, un élément ne descend pas
sous la largeur de son contenu par défaut : la largeur minimale du tableau remontait toute la chaîne
jusqu'au `body`. `min-w-0` sur le composant — et sur ses enveloppes de grille — le corrige.

Le contrôle vit dans `scripts/screenshots.mjs` et se refait à chaque section : `scrollWidth` du
document doit rester égal à `clientWidth`, de 360 à 1920 px. Une capture pleine page qui revient plus
large que la fenêtre demandée est le symptôme — c'est ainsi que celui-ci a été trouvé.

### 2026-08-22 · Une capture d'écran se prend sur un serveur relancé

Deux séries de captures ont été prises contre un serveur `next start` démarré AVANT un `pnpm build`.
Le serveur servait un HTML référençant des feuilles de style d'une compilation disparue : pages sans
styles et exception côté client, sur un code parfaitement sain. `scripts/screenshots.mjs` exige un
serveur relancé après la compilation.

---

## Phase 1

### 2026-08-23 · Les formulaires sont entièrement CONTRÔLÉS par React

Découvert en testant les deux formulaires dans un vrai navigateur, pas en relisant le code.

Avec des champs non contrôlés, la saisie disparaissait :

- **Devis** — passer à l'étape suivante remettait à zéro les champs des étapes précédentes. Les
  nœuds du DOM restaient les mêmes, seules leurs valeurs étaient effacées. Le serveur recevait une
  demande sans trajet ni fréquence, et l'utilisateur voyait « certains champs doivent être corrigés »
  sur des champs qu'il avait remplis.
- **Contact** — React remet un formulaire à zéro quand son action se termine, y compris quand elle se
  termine par un REFUS. Un visiteur dont le numéro était rejeté perdait le message qu'il venait
  d'écrire. Personne ne le réécrit.

Un état React unique par formulaire rend les deux pannes impossibles, et c'est ce que le brief
demandait déjà (« state kept in React, no localStorage »).

### 2026-08-23 · `noValidate` sur les deux formulaires

La validation native du navigateur REFUSE d'envoyer un formulaire dont un champ requis est masqué —
nos étapes inactives le sont — et échoue en silence avec « invalid form control is not focusable ».
Le formulaire de devis ne partait jamais. Et ses messages s'affichent dans la langue du navigateur,
pas dans celle du site.

Toute la validation passe donc par le **même schéma zod** : `quoteSchema.pick(...)` par étape côté
client pour le confort, le schéma entier côté serveur pour de vrai. Une seule définition par donnée.

### 2026-08-23 · Un média absent n'est pas demandé

`HeroVideo` produisait trois 404 à chaque chargement de page (poster, mp4, webm), pour des fichiers
qui n'ont pas encore été tournés. Un drapeau `HERO_MEDIA_AVAILABLE` les coupe jusqu'à livraison.
Même principe pour `MediaFrame` : un emplacement réservé, pas une image cassée. Un journal d'erreurs
qui contient du bruit permanent est un journal qu'on cesse de lire.

### 2026-08-23 · Indexation conditionnée au domaine, pas à la phase

`robots.ts` et `sitemap.ts` lisent tous deux `isProductionSite()` : tant que `NEXT_PUBLIC_SITE_URL`
ne pointe pas sur `transpoleq.ma`, robots interdit tout et le sitemap est vide. Les deux fichiers
disent forcément la même chose, et aucune prévisualisation ne peut être indexée par oubli.
`/styleguide` reste exclu même en production.

### 2026-08-23 · Le tableau de dispatch de l'accueil affiche des données illustratives

Le brief prévoit d'y brancher un flux réel en Phase 3. Tant que ce n'est pas fait, les lignes sont
anonymisées (« Carrière A », « Chantier RN9 ») et la mention « Données illustratives » est dans le
composant. Les mentions légales le répètent : le board ne reflète aucune mission réelle et n'expose
aucune donnée client.

### 2026-08-23 · Aucun client, aucun témoignage, aucune certification

`content/fr/references.ts` est livré VIDE et les composants gèrent l'état vide avec une phrase qui
dit pourquoi : rien n'est publié sans autorisation écrite. C'est plus crédible qu'une rangée de
logos gris, et cela évite d'avoir à retirer un nom en urgence.
