# Médias à fournir

> Photos et vidéos réelles uniquement (§4.5). Pas de banque d'images, pas de rendu 3D, pas de
> poignée de main. Un camion générique européen sur une autoroute allemande se voit, et il détruit
> exactement la crédibilité que le site cherche à établir.

Tant qu'un fichier manque, la page affiche un espace réservé aux bonnes proportions : la mise en
page ne bouge pas quand la vraie image arrive, et le trou reste visible.

## Traitement commun

Toutes les images sont étalonnées de la même façon, sinon la page se lit comme un assemblage :

- Hautes lumières chaudes, ombres neutres, légère désaturation.
- Lumière d'aube ou de fin d'après-midi. Pas de plein midi écrasé.
- Pas de filtre marqué, pas de vignettage, pas de HDR.
- Les visages identifiables exigent une autorisation écrite (chauffeurs compris).
- Aucune plaque d'immatriculation lisible sur une photo publiée, sauf accord.

## Formats de livraison

- **Photos** : JPEG ou PNG d'origine, qualité maximale, non recadrées.
  `next/image` produit l'AVIF et le WebP — ne pas pré-compresser.
- **Nommage** : `zone-sujet-variante.jpg`, en minuscules, sans accent
  (ex. `hero-carriere-chargement-01.jpg`).
- **Vidéo** : MP4 (H.264) + WebM, 1080p, muette, ≤ 4 Mo, plus une image d'affiche au premier plan
  utile.

---

## 1. Vidéo du hero — `hero/`

| Fichier | Spéc. | Cadrage et lumière |
|---|---|---|
| `hero-loop.mp4` | 1920 × 1080, 12–20 s, boucle sans coupure visible, muette, ≤ 4 Mo, H.264 | Un ou deux camions en mouvement sur une route marocaine, caméra fixe ou travelling lent. Le mouvement doit être lisible en arrière-plan à faible opacité : préférer un plan large et calme à un plan serré agité. |
| `hero-loop.webm` | Même source, VP9 | — |
| `hero-poster.jpg` | 1920 × 1080 | Première image utile de la boucle. C'est elle qui s'affiche tant que la vidéo n'est pas chargée, et sur mobile en mode économiseur de données — elle doit tenir toute seule. |

La vidéo est chargée après le LCP, en `preload="none"`. Elle ne doit jamais être le seul porteur
d'une information.

## 2. Photos de section — `sections/`

| Fichier | Dimensions min. | Sujet, cadrage, lumière |
|---|---|---|
| `chargement-carriere.jpg` | 2400 × 1600 | Chargement d'une benne à la carrière, chargeuse dans le champ. Poussière visible, contre-jour d'aube accepté. |
| `pont-bascule.jpg` | 2400 × 1600 | Camion sur le pont bascule, cabine de pesée visible. C'est la photo qui prouve « chaque chargement est pesé » — elle doit être lisible, pas atmosphérique. |
| `enrobes-finisseur.jpg` | 2400 × 1600 | Benne calorifugée déchargeant au finisseur, fumée d'enrobé visible. Fin de journée. |
| `porte-engins-chargement.jpg` | 2400 × 1600 | Pelle montant sur un porte-engins, rampes déployées. Plan large : c'est la manœuvre qui parle. |
| `citerne-chantier.jpg` | 2400 × 1600 | Citerne livrant sur un chantier isolé. |
| `atelier.jpg` | 2400 × 1600 | Intervention en atelier, fosse ou pont élévateur, mécanicien au travail. |
| `dispatch-bureau.jpg` | 2400 × 1600 | Poste de dispatch, écrans de suivi visibles mais illisibles au détail (aucune donnée client lisible). |
| `convoi-route.jpg` | 2400 × 1600 | Deux ou trois camions se suivant sur une route de liaison. Paysage marocain identifiable, sans être une carte postale. |
| `chauffeur-controle-depart.jpg` | 2400 × 1600 | Contrôle de départ : tour du camion, fiche à la main. Autorisation du chauffeur requise. |

## 3. Formats dérivés

Aucun recadrage manuel n'est demandé. Livrer le plein cadre ; les composants découpent :

| Emploi | Rapport | Note de cadrage |
|---|---|---|
| Hero | 16:9 | Prévoir 20 % de marge à gauche : le titre s'y pose. |
| Ligne de service (index) | 4:3 | Sujet centré. |
| Hero de page service | 21:9 | Bande basse. |
| Carte de secteur | 3:2 | — |
| Vignette de référence | 3:2 | — |

## 4. Logos clients — `logos/`

SVG de préférence, sinon PNG transparent 512 px de haut.

**Aucun logo n'est publié sans autorisation écrite d'affichage** (voir `[CLIENTS_LOGOS]` dans
`CONTENT_TODO.md`). Affichés en niveaux de gris, couleur au survol.

## 5. Logo TRANSPOLEQ — `brand/`

| Fichier | Spéc. |
|---|---|
| `transpoleq.svg` | Version sur fond clair, tracés vectorisés, sans texte en police liée |
| `transpoleq-inverse.svg` | Version sur fond sombre |
| `favicon.svg` + `icon-512.png` | Icônes de navigateur et d'application |

En attendant, l'en-tête et le pied de page affichent un verrou typographique
(`components/sections/Wordmark.tsx`) — c'est volontairement visible comme un provisoire.

## 6. Ce qui n'est pas une photo

Ces éléments sont **dessinés dans le code** et ne doivent pas être commandés en photo :

- Silhouettes de camions par catégorie → `components/icons/FleetSilhouettes.tsx`
- Icônes → `components/icons/index.tsx`
- Carte de couverture du Maroc → SVG maison (Phase 2)
- Maquettes de l'écran de suivi → construites en code, aux jetons du site.
  **Jamais de capture d'écran d'un outil tiers** : elle daterait, elle exposerait des données
  clients, et elle donnerait à voir l'interface de quelqu'un d'autre.
