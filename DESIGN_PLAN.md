# TRANSPOLEQ — plan de conception (Phase 0)

> Écrit avant la première ligne de code, conformément à la méthode de travail (§11.1).
> Vérifié contre les anti-défauts (§4.2). Ce qui a changé après vérification est en fin de document.

---

## 1. Thèse

**Une entreprise de transport qui peut montrer chaque tonne en mouvement.**

Le site n'illustre pas le transport, il l'affiche. La première chose que voit un acheteur BTP n'est pas
une photo d'ambiance : c'est un tableau de dispatch avec des immatriculations, des tonnages et des
statuts qui avancent. La promesse (« flotte suivie, chaque chargement pesé, chaque livraison tracée »)
est démontrée par la forme même de la page avant d'être affirmée par une phrase.

Vocabulaire visuel emprunté au monde réel de TRANSPOLEQ, dans cet ordre :

| Source réelle | Traduction à l'écran |
|---|---|
| L'enrobé frais | Bandes `--asphalt` pleine largeur, rayon 0, qui traversent la page comme des bandes de roulement |
| Le béton balayé d'une aire de chantier | Fond de page `--concrete`, mat, légèrement chaud-neutre |
| Le marquage routier | Ligne pointillée 2 px `--marking` (tiret 24 / espace 16) : séparateurs, timeline, itinéraires, anneau de focus |
| Le ticket de pesée | Chiffres en mono, alignés sur une colonne, virgule décimale française, unité en `--mist` |
| Le lettrage sur bâche | Archivo `wdth 125` en capitales larges pour les grands nombres et le H1 |
| Le tableau de dispatch | L'élément signature (§4.3) |

Règle de tri appliquée à chaque décision : *est-ce que cet élément dit quelque chose sur le transport ?*
Sinon, il est supprimé.

---

## 2. Système de tokens

### Couleur

Les valeurs de §4.2 sont reprises telles quelles. Aucun token ALEQ n'a été fourni (§14) : on part des
défauts et on isole les neutres pour qu'une palette groupe puisse les remplacer sans toucher aux
composants. Décision consignée dans `DECISIONS.md`.

```
--asphalt   #1B1D1F   bandes sombres : hero, bande suivi, footer            ~30 % de la hauteur de page
--gravel    #2A2E32   surfaces élevées sur sombre, filets de lignes du board
--concrete  #E8E6E1   fond de page par défaut                               ~60 %
--limestone #F7F6F3   cartes, champs de formulaire sur clair
--marking   #F5B800   ligne, contour, puce, anneau de focus, CTA primaire   ~1 % de la surface
--ink       #121315   texte sur clair
--mist      #8E949A   métadonnée, légende, aide
--signal    #C8371F   erreur et urgence uniquement
```

**Trois règles de couleur, non négociables :**

1. `--marking` n'est **jamais** une grande surface pleine et **jamais** du texte sur fond clair.
   Ses seuls emplois : un trait de 2 px, un contour de 1 px, une puce de statut, l'anneau de focus,
   et le CTA primaire — où le texte posé dessus est `--asphalt`, pas blanc (contraste 9,4:1).
2. Le sombre arrive par **bandes**, jamais en fond global. La page respire en clair entre deux bandes.
3. `--signal` ne décore pas. S'il apparaît, quelque chose ne va pas.

Contrastes vérifiés à la conception : `--ink` sur `--concrete` = 15,8:1 · `--mist` sur `--concrete` =
3,1:1 (réservé au texte ≥ 14 px non essentiel, jamais à une information seule) · `--concrete` sur
`--asphalt` = 13,7:1 · `--marking` sur `--asphalt` = 9,7:1.

### Forme

Rayon **4 px** sur les contrôles, **8 px** sur les cartes, **0** sur les bandes et sur le board.
Pas de dégradé, pas de blob, pas de glassmorphisme, pas d'empilement d'ombres. L'élévation se lit par
la valeur (`--limestone` sur `--concrete`, `--gravel` sur `--asphalt`), pas par un flou.

### Espacement

Échelle 4 px : 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128. Rythme vertical des bandes :
96 px mobile, 128 px desktop. Une bande sombre est plus serrée qu'une bande claire (le sombre pèse).

---

## 3. Appariement typographique

| Rôle | Fonte | Réglage | Pourquoi celle-ci |
|---|---|---|---|
| Display | **Archivo** variable (axe `wdth`) | `wdth 125`, 600–700, capitales pour les eyebrows | L'axe de chasse est le geste distinctif. Élargi, Archivo *est* du lettrage de bâche et de plaque : dense, sans humanisme, lisible de loin. |
| Titres de section | **Archivo** | `wdth 82`, 600 | Le même caractère resserré : la page a une seule voix qui change de largeur, pas deux polices qui se disputent. |
| Texte | **IBM Plex Sans** | 400/500, 16–18 px, interligne 1,55 | Grotesque technique, dessiné pour de la documentation industrielle. Squelette proche d'Archivo : l'appariement tient. |
| Donnée | **IBM Plex Mono** | 13–14 px | Le registre du ticket de pesée et du terminal télématique. Chasse fixe = les tonnages s'alignent en colonne sans effort. |
| Arabe (plus tard) | IBM Plex Sans Arabic | — | Même famille, cohérence garantie le jour du RTL. |

Échelle : 12 / 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64 / 96, fluide en `clamp()` pour le H1 et les
grands nombres uniquement. Chargement par `next/font` (Google), `display: swap`, sous-ensembles
`latin` + `latin-ext`, préchargement du display seul.

**Discipline typographique :** capitales réservées aux eyebrows et aux puces (≤ 3 mots, interlettrage
+0,08 em). Pas d'italique. Pas de soulignement décoratif — le soulignement signale un lien.
Les nombres utilisent `font-variant-numeric: tabular-nums` partout où ils s'empilent.

---

## 4. Grille et bandes

12 colonnes, `max-w 1440`, gouttières 24 px mobile / 40 px desktop, gap de colonne 24 px.
Les **bandes** sont pleine largeur ; le **contenu** se cale sur la grille à l'intérieur.

Densité assumée, mais localisée : le board, le tableau de flotte et le tableau de références ont le
droit d'être denses parce que la donnée y vit. Partout ailleurs, la mesure de texte ne dépasse pas
68 caractères et les grands nombres occupent leur propre colonne.

RTL dès maintenant : **uniquement des propriétés logiques** (`ms-`/`me-`/`ps-`/`pe-`/`text-start`),
`dir` sur `<html>`. La ligne de marquage est dessinée en SVG, donc symétrisable sans retouche.

---

## 5. Élément signature — le tableau de dispatch

Le seul élément spectaculaire du site. Panneau `--asphalt`, rayon 0, filets `--gravel` 1 px,
IBM Plex Mono 13–14 px, en-têtes `--mist` en capitales.

```
┌──────────────────────────────────────────────────────────────┐
│ DISPATCH                                          ▪ EN LIGNE │  ← puce --marking
├─────┬─────────┬───────────────────────┬──────────┬──────┬────┤
│ N°  │ CAMION  │ TRAJET                │ MATÉRIAU │ TONN.│ ST │  ← --mist, 12 px, capitales
├─────┼─────────┼───────────────────────┼──────────┼──────┼────┤
│M-2308│ TPQ-014│ Carrière [X] → Ch.[Y] │ GNT 0/31,5│ 27,4 t│▭ En route     │
│M-2309│ TPQ-007│ Centrale → Ch. [Z]    │ EB 0/10   │ 26,1 t│▭ En chargement│
│  … 6 à 8 lignes …                                                        │
├──────────────────────────────────────────────────────────────┤
│ Données illustratives                                        │  ← --mist, 12 px
└──────────────────────────────────────────────────────────────┘
```

- **Statuts :** contour `--marking` = actif (`En chargement`, `En route`) · `--mist` = terminé
  (`Livré 14:32`). Jamais de vert/rouge : ce n'est pas un feu tricolore, c'est un tableau de service.
- **Vie :** toutes les ~6 s, un statut avance d'un cran, une mission entre EN TÊTE (c'est la plus
  récente) et la plus ancienne quitte le bas du panneau. Rien d'autre ne bouge sur la page.
- **Largeur :** le board répond à la largeur de son CONTENEUR, pas de la fenêtre. Étroit (colonne du
  hero, ~540 px), il replie camion et matériau dans la colonne trajet plutôt que de laisser le
  statut sortir du cadre.
- **Séquence d'arrivée** (le seul moment orchestré du site) : les lignes s'allument une par une
  (décalage 120 ms) → les mots du H1 → fondu de la vidéo → les chiffres clés comptent.
- **Dégradations :** `prefers-reduced-motion` ou `navigator.connection.saveData` → tout est statique,
  lignes rendues d'emblée, aucun intervalle armé. Le composant reste lisible et complet.
- **API :** `<DispatchBoard rows={...} live={boolean} />`. Les lignes sont une donnée typée, pas du JSX :
  la Phase 3 branchera des données réelles anonymisées de la plateforme de suivi du groupe sans
  toucher au composant.
- **Honnêteté :** la mention « Données illustratives » est dans le composant, pas à côté. On ne peut
  pas afficher le board sans elle.

---

## 6. Dispositif structurel discret — la ligne de marquage

Un trait pointillé 2 px `--marking`, tiret 24 / espace 16. C'est le **seul** motif décoratif récurrent,
et il travaille partout :

séparateur de section · timeline de la mission (les 5 étapes sont posées dessus) · itinéraires sur la
carte de couverture · indicateur de nav active · barre de progression au scroll · stepper du formulaire
de devis · séparateurs verticaux entre les chiffres clés.

Il encode « route » sans jamais l'écrire. Animé, il se dessine dans le sens de la lecture
(`stroke-dashoffset`), ce qui en fait une progression et pas un ornement.

---

## 7. Fils de fer — Accueil

### Desktop (1440)

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│ ▌TRANSPOLEQ / Groupe ALEQ   Services Flotte Suivi Groupe Carrières  ☎ [Demander…] │ transparent → --asphalt après 80 px
├────────────────────────────────────────────────────────────────────────────────────┤
│▓▓▓▓▓▓▓▓ BANDE --asphalt ▓ vidéo en fond, opacité basse, coupée à droite ▓▓▓▓▓▓▓▓▓▓▓│
│                                                                                    │
│  TRANSPORT & LOGISTIQUE DE CHANTIER · GROUPE ALEQ    ┌────────────────────────────┐│
│                                                      │ DISPATCH        ● EN LIGNE ││
│  Du gisement au chantier,                            ├──┬────┬──────┬─────┬──┬────┤│
│  chaque tonne à l'heure.          ← Archivo wdth 125 │N°│CAM │TRAJET│MAT. │T │ ST ││
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─                           ├──┼────┼──────┼─────┼──┼────┤│
│                                                      │  6 à 8 lignes, Plex Mono   ││
│  TRANSPOLEQ transporte matériaux, enrobés            │  statuts en contour        ││
│  et engins pour les chantiers d'infrastructure       │                            ││
│  au Maroc. Flotte suivie en temps réel…              ├────────────────────────────┤│
│                                                      │ Données illustratives      ││
│  [ Demander un devis ]   [ Voir la flotte ]          └────────────────────────────┘│
│   ↑ --marking, texte --asphalt   ↑ ghost                                           │
│  colonnes 1 → 6                                                    colonnes 8 → 12 │
└────────────────────────────────────────────────────────────────────────────────────┘
   ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
┌────────────────────────────────────────────────────────────────────────────────────┐
│ CHIFFRES CLÉS — fond --concrete, aucune carte, aucune bordure                       │
│                                                                                    │
│   [N]      ¦     [N]      ¦    [N]      ¦    [N] %     ¦   24/7                    │
│  camions   ¦  t transp.   ¦  km / an    ¦  à l'heure   ¦  dispatch                 │
│   ↑ Archivo wdth 125, alignés sur la ligne de base ; ¦ = pointillé vertical         │
│   Période et source, Plex Mono 12, --mist                                           │
└────────────────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────────────────┐
│ SERVICES — 6 cartes --limestone, r 8, 3 × 2                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                                            │
│  │ ⌇ icône  │ │          │ │          │   icône = trait 2 px, dessinée maison       │
│  │ Titre    │ │          │ │          │   1 ligne de texte, 1 lien                  │
│  │ une ligne│ │          │ │          │   pas de « 01 / 02 / 03 »                   │
│  └──────────┘ └──────────┘ └──────────┘                                            │
└────────────────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────────────────┐
│ UNE MISSION TRANSPOLEQ — épinglée horizontale (desktop), 5 étapes sur le pointillé  │
│  ①────────②────────③────────④────────⑤   ← numérotées : l'ordre est réel            │
│  Demande  Planif.  Pesée   Transport Preuve                                         │
└────────────────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────────────────┐
│ FLOTTE (teaser) — convoi horizontal épinglé : silhouettes SVG + capacité + nombre   │
│  ▭▭▭─▭  →  ▭▭▭▭─▭  →  ▭▭─▭   [ Voir toute la flotte ]                              │
└────────────────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────────────────┐
│▓▓ BANDE --asphalt — SUIVI & SÉCURITÉ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│  Vous voyez ce que notre dispatch voit.                                             │
│  Position temps réel │ Pesée & preuve │ Chauffeurs suivis   + maquette UI en code    │
└────────────────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────────────────┐
│ LE GROUPE — triptyque + chaîne dessinée sur le pointillé                            │
│  ALEQ construit ─ ─ AleqFactory produit ─ ─ TRANSPOLEQ transporte                    │
│  carrière ─ ─ ─ ─ centrale ─ ─ ─ ─ chantier                                         │
└────────────────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────────────────┐
│ RÉFÉRENCES — logos gris (couleur au survol) + 2 témoignages courts [placeholders]   │
├────────────────────────────────────────────────────────────────────────────────────┤
│ COUVERTURE — carte SVG maison du Maroc, hubs en points, itinéraires pointillés      │
├────────────────────────────────────────────────────────────────────────────────────┤
│ CARRIÈRES (bande) — « Prenez le volant. »            [ Voir les postes ]            │
├────────────────────────────────────────────────────────────────────────────────────┤
│ DEVIS (bande finale) — mini formulaire : matériau / trajet / téléphone → /devis     │
├────────────────────────────────────────────────────────────────────────────────────┤
│▓▓ FOOTER --asphalt ▓ 4 colonnes ▓ ALEQ · AleqFactory · TRANSPOLEQ ▓ ICE/RC ▓ FR|EN ▓│
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Mobile (390)

```
┌──────────────────────────┐
│ ▌TRANSPOLEQ      ☎   ☰   │  header 56 px
├──────────────────────────┤
│▓ BANDE --asphalt ▓▓▓▓▓▓▓▓│
│ TRANSPORT & LOG. ·       │  eyebrow 12 px
│ GROUPE ALEQ              │
│                          │
│ Du gisement au           │  clamp() → ~34 px
│ chantier, chaque         │
│ tonne à l'heure.         │
│ ─ ─ ─ ─ ─ ─ ─            │
│ TRANSPOLEQ transporte…   │  16 px, 1,55
│                          │
│ [ Demander un devis ]    │  pleine largeur, 48 px de haut
│ [ Voir la flotte ]       │
│ ┌──────────────────────┐ │
│ │ DISPATCH  ● EN LIGNE │ │  ← sous le titre, jamais masqué
│ ├────┬────────┬───┬────┤ │
│ │ N° │ TRAJET │ T │ ST │ │  ← 4 colonnes : CAMION et MATÉRIAU
│ │ …  │ …      │ … │ ▭  │ │     passent en 2ᵉ ligne de cellule
│ ├──────────────────────┤ │
│ │ Données illustratives│ │
│ └──────────────────────┘ │
├──────────────────────────┤
│ CHIFFRES — 2 par rangée  │
│  [N]        ¦   [N]      │
│  camions    ¦   t         │
├──────────────────────────┤
│ SERVICES — 1 colonne     │
│ MISSION — vertical, le   │
│   pointillé devient une  │
│   ligne verticale        │
│ FLOTTE — liste verticale │
│   (pas d'épinglage)      │
│ … puis l'ordre desktop   │
├──────────────────────────┤
│ FOOTER — accordéons      │
└──────────────────────────┘
```

**Ce que le mobile ne perd pas :** le board (il est la preuve), les deux CTA, le téléphone en un tap.
**Ce que le mobile perd :** les épinglages horizontaux (mission, convoi) deviennent des listes
verticales ; la vidéo du hero est remplacée par le poster tant que la connexion n'est pas confirmée.

---

## 8. Mouvement — budget

Une règle : *si un mouvement n'encode rien du transport (déplacement, séquence, progression), il est
supprimé.* Ce qui reste, exhaustivement :

| Mouvement | Ce qu'il encode | Coût |
|---|---|---|
| Séquence d'arrivée du hero | mise en service d'un dispatch | une fois, ~1,4 s |
| Rotation des lignes du board | des camions qui avancent | 240 ms / ~6 s |
| Compteurs des chiffres clés | accumulation | une fois |
| Révélation de section (12 px + opacité, 400 ms) | arrivée dans le champ | une fois par section |
| Tracé de la ligne de marquage | progression sur la route | au scroll, une fois |
| Mission et convoi épinglés (desktop) | séquence, convoi | GSAP, importé dynamiquement, seulement sur les pages qui épinglent |

Survol = changement de couleur ou de soulignement, rien d'autre. `prefers-reduced-motion` coupe tout,
y compris la vie du board ; aucune information n'est portée par le mouvement seul.

---

## 9. Vérification contre les anti-défauts (§4.2)

| Anti-défaut rejeté | Où on en est | Verdict |
|---|---|---|
| Crème chaud + serif contrasté + terracotta | Aucun serif nulle part. `--concrete #E8E6E1` est un gris-béton neutre-froid, pas un crème. L'accent est un jaune de signalisation employé en trait, pas une terre cuite en aplat. | Écarté |
| Presque-noir partout + un accent acide | La page est **majoritairement claire**. Le sombre n'apparaît qu'en trois bandes (hero, suivi, footer), ~30 % de la hauteur. Le jaune ne fait jamais de halo ni de grand aplat : trait 2 px, contour 1 px, un seul bouton. | Écarté — c'est le point qui demandait le plus de vigilance |
| Filets façon journal + rayon 0 partout | Rayons réels : 4 px contrôles, 8 px cartes. Les séparateurs sont des **pointillés 2 px** de marquage, pas des filets 1 px. Le rayon 0 est réservé aux bandes et au board, où il veut dire « surface de route » et « panneau ». | Écarté |

**Test final :** si on retire le logo, reste-t-il quelque chose qui ne pourrait appartenir qu'à
TRANSPOLEQ ? Oui — le board, l'axe de chasse d'Archivo sur les tonnages, et le pointillé de marquage
comme système de séparation. Aucun des trois n'est un réglage de thème.

---

## 10. Ce qui a changé après cette vérification

Trois éléments du premier jet ont été révisés, pour la raison indiquée :

1. **Le hero était une photo pleine page avec voile sombre et titre centré.** C'est le défaut, et il
   fait mentir la thèse : on montrait une ambiance, pas une preuve. Le titre est repassé à gauche sur
   la bande d'enrobé, la vidéo est devenue un fond de faible opacité recadré derrière la colonne de
   texte, et le board a pris les colonnes 8 → 12. Le premier objet lisible de la page est de la donnée.
2. **Les cartes de services portaient des numéros « 01 / 02 / 03 ».** Ils n'encodaient rien : les six
   services n'ont pas d'ordre. Supprimés. La numérotation ne survit que sur la mission, où la séquence
   est réelle et où le chiffre aide à s'y retrouver.
3. **Les chiffres clés étaient cinq cartes bordées.** Un cadre par nombre est le réflexe de gabarit, et
   il ajoutait cinq bordures là où il fallait de l'air. Les nombres sont maintenant posés directement
   sur le béton, alignés sur leur ligne de base, séparés par un pointillé vertical — la lecture d'un
   ticket de pesée plutôt qu'une rangée de tuiles.

Une quatrième révision, plus petite : les puces de statut du board étaient vertes et rouges. Un feu
tricolore raconte le succès et l'échec ; un tableau de service raconte l'avancement. Elles sont
passées en contour `--marking` (actif) et `--mist` (terminé), et `--signal` reste disponible pour ce
qui est réellement anormal.

---

## 11. Ce que la Phase 0 livre

Fondations, pas de pages publiques : dépôt, tokens, fontes, grille, `Header`, `Footer`, les primitives
`ui/` et `motion/`, le `DispatchBoard`, la `MarkingLine`, les icônes maison, `/styleguide` en
`noindex`, `public/media/README.md`, `.env.example`, `CONTENT_TODO.md`, `DECISIONS.md`.

Aucun chiffre, aucune certification, aucun client n'est inventé : tout ce qui manque est entre
crochets et listé dans `CONTENT_TODO.md` avec son emplacement et son propriétaire.

**Arrêt attendu après cette phase**, validation de `/styleguide` avant de construire les pages.
