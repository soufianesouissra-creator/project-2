import { ph } from '../placeholders'

/**
 * Couverture (§6.1.9).
 *
 * Les régions sont celles du découpage administratif marocain. `served`
 * distingue ce qui est réellement desservi de ce qui reste à confirmer : une
 * carte qui colorie tout le royaume sans distinction ne dit rien.
 */
export interface Region {
  readonly id: string
  readonly name: string
  /** null tant que l'exploitation n'a pas confirmé. */
  readonly served: boolean | null
}

export const REGIONS: readonly Region[] = [
  { id: 'tanger-tetouan', name: 'Tanger-Tétouan-Al Hoceïma', served: null },
  { id: 'oriental', name: 'L’Oriental', served: null },
  { id: 'fes-meknes', name: 'Fès-Meknès', served: null },
  { id: 'rabat-sale', name: 'Rabat-Salé-Kénitra', served: null },
  { id: 'beni-mellal', name: 'Béni Mellal-Khénifra', served: null },
  { id: 'casablanca', name: 'Casablanca-Settat', served: null },
  { id: 'marrakech', name: 'Marrakech-Safi', served: null },
  { id: 'draa-tafilalet', name: 'Drâa-Tafilalet', served: null },
  { id: 'souss-massa', name: 'Souss-Massa', served: null },
  { id: 'guelmim', name: 'Guelmim-Oued Noun', served: null },
  { id: 'laayoune', name: 'Laâyoune-Sakia El Hamra', served: null },
  { id: 'dakhla', name: 'Dakhla-Oued Ed-Dahab', served: null },
]

export const COVERAGE_INTRO = `Basés à ${ph('VILLE_SIEGE')}, nous opérons sur tout le royaume.`

/** Sites d'exploitation. Vides tant que l'exploitation ne les a pas fournis. */
export const HUBS: readonly { readonly name: string; readonly role: string }[] = [
  { name: ph('HUBS'), role: 'Sites d’exploitation et régions desservies à confirmer' },
]
