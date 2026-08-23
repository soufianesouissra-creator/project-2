import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'

/**
 * Display — Archivo variable, axe de chasse compris.
 * L'axe `wdth` est le geste typographique du site : 125 pour le lettrage de
 * bâche (H1, grands nombres), 82 pour les titres de section.
 */
/**
 * Sous-ensemble `latin` SEULEMENT.
 *
 * Le français tient entièrement dans le latin de base (é, è, à, ç, ô, û…) ;
 * `latin-ext` sert aux langues d'Europe centrale. Le charger doublait le
 * nombre de fichiers et pesait 444 ko de fontes, ce qui repoussait le LCP à
 * 4,3 s en 4G simulée — bien au-delà du budget de 2,5 s du brief.
 *
 * L'arabe, le jour venu, ajoutera IBM Plex Sans Arabic avec son propre
 * sous-ensemble : il ne coûtera rien aux pages françaises.
 */
export const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-archivo',
  preload: true,
})

/** Texte courant. */
export const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  // 400 et 500 seulement : les graisses 600 et 700 du site sont TOUJOURS
  // portées par Archivo (titres et grands nombres), jamais par le texte
  // courant. Charger une graisse qu'aucune règle n'utilise est un fichier de
  // plus sur le chemin critique.
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-sans',
  preload: true,
})

/** Donnée : board, tonnages, immatriculations, horodatages, notes de bas de page. */
export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-plex-mono',
  preload: false,
})

export const fontVariables = `${archivo.variable} ${plexSans.variable} ${plexMono.variable}`
