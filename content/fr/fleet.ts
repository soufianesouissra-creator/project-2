import { ph } from '../placeholders'
import type { FleetCategoryKey } from '@/components/icons/FleetSilhouettes'

/**
 * Catégories de flotte (§6.3, §8.3).
 *
 * IMPORTANT : ne listez QUE les catégories réellement exploitées. Une ligne
 * laissée à zéro fait croire à une flotte qui n'existe pas ; une catégorie
 * absente ne trompe personne. Retirer une entrée de ce tableau la retire de la
 * page Flotte, du teaser de l'accueil et des pages de service — c'est le
 * comportement voulu.
 */
export interface FleetCategory {
  readonly key: FleetCategoryKey
  readonly name: string
  readonly use: string
  /** Capacité utile indicative, unité comprise. */
  readonly capacity: string
  /** Nombre en exploitation. Crochet tant qu'il n'est pas fourni. */
  readonly count: string
  readonly equipment: readonly string[]
}

export const FLEET: readonly FleetCategory[] = [
  {
    key: 'benne-8x4',
    name: 'Camions bennes 8x4',
    use: 'Vrac courte distance, accès chantier',
    capacity: '~18–20 t',
    count: ph('FLOTTE_CATEGORIES'),
    equipment: ['GPS', 'Bâche'],
  },
  {
    key: 'semi-benne',
    name: 'Semi-remorques bennes',
    use: 'Vrac longue distance',
    capacity: '~27–30 t',
    count: ph('FLOTTE_CATEGORIES'),
    equipment: ['GPS', 'Bâche'],
  },
  {
    key: 'semi-calorifugee',
    name: 'Semi bennes calorifugées',
    use: 'Enrobés à chaud',
    capacity: '~27 t',
    count: ph('FLOTTE_CATEGORIES'),
    equipment: ['GPS', 'Bâche thermique'],
  },
  {
    key: 'porte-engins',
    name: 'Porte-engins (col de cygne)',
    use: 'Engins de terrassement et de compactage',
    capacity: ph('FLOTTE_CATEGORIES'),
    count: ph('FLOTTE_CATEGORIES'),
    equipment: ['GPS', 'Rampes', 'Arrimage'],
  },
  {
    key: 'citerne',
    name: 'Citernes',
    use: 'Eau, gasoil, liants',
    capacity: ph('FLOTTE_CATEGORIES'),
    count: ph('FLOTTE_CATEGORIES'),
    equipment: ['GPS', 'Jaugeage', 'Citerne dédiée par produit'],
  },
  {
    key: 'plateau',
    name: 'Plateaux',
    use: 'Préfabriqués, tubes, matériaux conditionnés',
    capacity: '13,6 m · ~25 t',
    count: ph('FLOTTE_CATEGORIES'),
    equipment: ['GPS', 'Arrimage'],
  },
  {
    key: 'service',
    name: 'Véhicules de service',
    use: 'Escorte, dépannage, atelier mobile',
    capacity: '—',
    count: ph('FLOTTE_CATEGORIES'),
    equipment: ['GPS'],
  },
]

export function fleetByKeys(keys: readonly FleetCategoryKey[]): readonly FleetCategory[] {
  return FLEET.filter((category) => keys.includes(category.key))
}

/** Blocs de la page Flotte (§6.3). */
export interface FleetBlock {
  readonly title: string
  readonly points: readonly string[]
}

export const WORKSHOP: FleetBlock = {
  title: 'Atelier & maintenance',
  points: [
    'Plan de maintenance préventive par véhicule, planifié et documenté.',
    'Contrôle technique suivi, jamais laissé courir jusqu’à l’échéance.',
    'Gestion des pneumatiques : contrôle de pression et de profondeur, recreusage suivi.',
    `Taux d’immobilisation : ${ph('TAUX_IMMOBILISATION')} %.`,
  ],
}

export const RENEWAL: FleetBlock = {
  title: 'Renouvellement',
  points: [
    `Règle de renouvellement : ${ph('POLITIQUE_RENOUVELLEMENT')}.`,
    'Un camion sorti du parc n’est pas remplacé par un plus vieux.',
  ],
}

export const TELEMATICS: FleetBlock = {
  title: 'Équipement télématique',
  points: [
    'Un traceur 4G sur chaque camion, sans exception.',
    'Données CAN remontées du véhicule : régime, vitesse, consommation.',
    'Suivi de consommation carburant, par véhicule et par chauffeur.',
    'Comportement de conduite : vitesse, freinages, temps de conduite.',
  ],
}
