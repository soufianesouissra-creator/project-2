import { ph } from '../placeholders'

/**
 * Postes ouverts (§6.9).
 *
 * VIDE tant que les RH n'ont pas transmis les postes réellement ouverts.
 * Publier une annonce fantôme fait perdre son temps à un chauffeur qui cherche
 * du travail — et le site ne le reverra pas.
 *
 * La page gère l'état vide et propose la candidature spontanée.
 */
export interface Job {
  readonly slug: string
  readonly title: string
  readonly location: string
  /** CDI, CDD, intérim, saisonnier. */
  readonly contract: string
  readonly summary: string
  readonly requirements: readonly string[]
  /** ISO 8601, pour le balisage JobPosting. */
  readonly datePosted: string
  readonly validThrough?: string
}

export const JOBS: readonly Job[] = []

export const JOBS_PENDING = ph('POSTES_OUVERTS')

/** Pourquoi nous rejoindre — À VALIDER PAR LES RH avant publication (§8.5). */
export const WHY_JOIN: readonly string[] = [
  'Des camions récents et entretenus.',
  'Une paie versée à date fixe.',
  'Une formation à l’arrivée et des rappels réguliers.',
  'Un planning connu à l’avance.',
  'Une couverture sociale et une assurance complètes.',
]

/** FAQ chauffeur. Les réponses engagent l'entreprise : à valider. */
export const DRIVER_FAQ = [
  {
    id: 'permis',
    question: 'Quels permis sont requis ?',
    answer: 'À valider par les RH avant publication.',
  },
  {
    id: 'zones',
    question: 'Sur quelles zones roule-t-on ?',
    answer: 'À valider par l’exploitation avant publication.',
  },
  {
    id: 'rythme',
    question: 'Quel est le rythme de travail ?',
    answer: 'À valider par les RH avant publication.',
  },
  {
    id: 'logement',
    question: 'Le logement en déplacement est-il pris en charge ?',
    answer: 'À valider par les RH avant publication.',
  },
] as const
