# Fontes embarquées

## `Archivo-Bold.ttf`

Archivo, graisse 700, au format TrueType. **Utilisée uniquement pour la génération
des images Open Graph** (`app/[locale]/opengraph-image.tsx` et la route
`/api/og`) : `next/og` a besoin d'un binaire de fonte, il ne peut pas lire une
feuille de style.

Le site lui-même charge Archivo par `next/font` (Google), avec son axe de chasse
variable — voir `lib/fonts.ts`. Ce fichier n'est donc PAS servi aux visiteurs et
ne pèse rien sur le chargement des pages.

Licence : SIL Open Font License 1.1, texte complet dans `Archivo-OFL.txt`.
La redistribution est autorisée, licence incluse — c'est fait.

Source : `https://fonts.gstatic.com/s/archivo/` (build TrueType officiel Google Fonts).
