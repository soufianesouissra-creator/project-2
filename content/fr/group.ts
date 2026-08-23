import { ph } from '../placeholders'

/**
 * Le groupe (§6.7).
 *
 * Les dates de la frise sont un fait à fournir : une chronologie inventée est
 * la plus facile à démentir et la plus coûteuse quand elle l'est.
 */
export interface Milestone {
  readonly year: string
  readonly title: string
  readonly text: string
}

export const MILESTONES: readonly Milestone[] = [
  {
    year: ph('ANNEE_CREATION'),
    title: 'Création de TRANSPOLEQ',
    text: 'Date et circonstances à fournir par la direction.',
  },
  {
    year: '[JALON]',
    title: 'Jalons du groupe',
    text: 'Création d’ALEQ, mise en service de la centrale d’enrobage, étapes de croissance : à fournir.',
  },
]

/** Trois valeurs, chacune avec sa PREUVE. Une valeur sans preuve est un slogan. */
export interface Value {
  readonly title: string
  readonly sentence: string
  readonly proof: string
}

export const VALUES: readonly Value[] = [
  {
    title: 'Ce qui est mesuré est dit',
    sentence: 'Nous ne déclarons pas ce que la télématique peut établir.',
    proof:
      'Vitesse, freinages, temps de conduite et consommation sont relevés par les traceurs, pas renseignés à la main.',
  },
  {
    title: 'La quantité se prouve',
    sentence: 'Chaque chargement est pesé, chaque livraison est signée.',
    proof:
      'Le ticket de pesée est rattaché à la mission et le bon de livraison est horodaté et géolocalisé.',
  },
  {
    title: 'Un écart se signale',
    sentence: 'Un retard connu vaut mieux qu’un retard découvert.',
    proof:
      'Le dispatch prévient dès qu’une rotation décroche du planning, sans attendre la fin de journée.',
  },
]
