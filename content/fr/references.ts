import { ph } from '../placeholders'

/**
 * Références (§6.8).
 *
 * VIDE PAR CONSTRUCTION. Aucun nom de client, aucun logo, aucun témoignage
 * n'est publié sans autorisation écrite d'affichage — voir `[CLIENTS_LOGOS]`
 * et `[TEMOIGNAGES]` dans CONTENT_TODO.md.
 *
 * Les composants gèrent le tableau vide et affichent un état vide honnête.
 * Remplir ce fichier suffit à faire apparaître la section partout.
 */
export interface ProjectReference {
  readonly id: string
  readonly client: string
  readonly transport: string
  readonly volume: string
  readonly region: string
  readonly year: string
}

export interface Testimonial {
  readonly id: string
  readonly quote: string
  readonly name: string
  readonly role: string
  readonly company: string
}

export interface ClientLogo {
  readonly name: string
  /** SVG ou PNG transparent dans /public/media/logos/. */
  readonly file: string
}

export const PROJECTS: readonly ProjectReference[] = []
export const TESTIMONIALS: readonly Testimonial[] = []
export const CLIENT_LOGOS: readonly ClientLogo[] = []

export const REFERENCES_PENDING = ph('CLIENTS_LOGOS')
