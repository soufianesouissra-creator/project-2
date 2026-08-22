import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'

/**
 * Display — Archivo variable, axe de chasse compris.
 * L'axe `wdth` est le geste typographique du site : 125 pour le lettrage de
 * bâche (H1, grands nombres), 82 pour les titres de section.
 */
export const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-archivo',
  preload: true,
})

/** Texte courant. */
export const plexSans = IBM_Plex_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-plex-sans',
  preload: true,
})

/** Donnée : board, tonnages, immatriculations, horodatages, notes de bas de page. */
export const plexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
  preload: false,
})

export const fontVariables = `${archivo.variable} ${plexSans.variable} ${plexMono.variable}`
