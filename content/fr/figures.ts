import { ph } from '../placeholders'

/**
 * Chiffres clés (§6.1.2).
 *
 * `value` est un nombre quand il doit être compté à l'écran, une chaîne quand
 * il n'y a rien à compter. Chaque chiffre porte sa NOTE : une période, une
 * source, une définition. Un chiffre sans période n'engage à rien et ne prouve
 * rien.
 */
export interface KeyFigure {
  readonly id: string
  readonly value: number | string
  readonly unit?: string
  readonly label: string
  readonly note: string
  /** Vrai quand la valeur est encore un crochet : le compteur ne tourne pas. */
  readonly pending: boolean
}

export const KEY_FIGURES: readonly KeyFigure[] = [
  {
    id: 'camions',
    value: ph('N_CAMIONS'),
    label: 'camions en exploitation',
    note: 'À une date de référence à fournir.',
    pending: true,
  },
  {
    id: 'tonnage',
    value: ph('TONNAGE_ANNUEL'),
    unit: 't',
    label: `transportées en ${ph('ANNEE_REFERENCE')}`,
    note: 'Année civile complète.',
    pending: true,
  },
  {
    id: 'km',
    value: ph('KM_ANNUEL'),
    unit: 'km',
    label: 'parcourus par an',
    note: 'Relevé télématique, même année que le tonnage.',
    pending: true,
  },
  {
    id: 'ponctualite',
    value: ph('TAUX_PONCTUALITE'),
    unit: '%',
    label: 'de livraisons à l’heure',
    note: 'Définition de « à l’heure » et période à confirmer.',
    pending: true,
  },
  {
    id: 'dispatch',
    value: '24/7',
    label: 'dispatch joignable',
    note: 'Horaires détaillés en pied de page.',
    pending: false,
  },
]
