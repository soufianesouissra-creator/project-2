import type { DispatchRow } from '@/components/sections/DispatchBoard.types'

/**
 * Lignes ILLUSTRATIVES du tableau de dispatch.
 *
 * Ce ne sont pas des missions réelles : les sites sont anonymisés en
 * « Carrière A », « Chantier B ». Le composant affiche « Données
 * illustratives » de façon non désactivable.
 *
 * Phase 3 : ces lignes seront remplacées par un flux anonymisé de la
 * plateforme de suivi du groupe. La forme ne changera pas — c'est pourquoi
 * elle est typée ici et pas écrite dans le composant.
 */
export const DEMO_ROWS: readonly DispatchRow[] = [
  {
    id: 'M-2308',
    truck: 'TPQ-014',
    from: 'Carrière A',
    to: 'Chantier RN9',
    material: 'GNT 0/31,5',
    tonnage: '27,4 t',
    status: 'en-route',
  },
  {
    id: 'M-2309',
    truck: 'TPQ-007',
    from: 'Centrale enrobage',
    to: 'Chantier RN9',
    material: 'EB 0/10',
    tonnage: '26,1 t',
    status: 'chargement',
  },
  {
    id: 'M-2310',
    truck: 'TPQ-022',
    from: 'Carrière B',
    to: 'Plateforme Sud',
    material: 'Sable 0/4',
    tonnage: '28,0 t',
    status: 'en-route',
  },
  {
    id: 'M-2311',
    truck: 'TPQ-031',
    from: 'Dépôt atelier',
    to: 'Chantier VRD 12',
    material: 'Pelle 22 t',
    tonnage: '22,0 t',
    status: 'chargement',
  },
  {
    id: 'M-2307',
    truck: 'TPQ-005',
    from: 'Carrière A',
    to: 'Chantier RN9',
    material: 'GNT 0/31,5',
    tonnage: '27,8 t',
    status: 'livre',
    doneAt: '14:32',
  },
  {
    id: 'M-2306',
    truck: 'TPQ-018',
    from: 'Dépôt liquides',
    to: 'Chantier Est',
    material: 'Eau',
    tonnage: '12,0 m³',
    status: 'livre',
    doneAt: '13:58',
  },
  {
    id: 'M-2305',
    truck: 'TPQ-011',
    from: 'Carrière B',
    to: 'Centrale enrobage',
    material: 'Gravillon 4/6',
    tonnage: '29,2 t',
    status: 'livre',
    doneAt: '13:20',
  },
]

/** Lignes qui entrent par le bas quand une ligne sort par le haut. */
export const INCOMING_ROWS: readonly DispatchRow[] = [
  {
    id: 'M-2312',
    truck: 'TPQ-009',
    from: 'Carrière A',
    to: 'Chantier Nord',
    material: 'Tout-venant',
    tonnage: '26,5 t',
    status: 'chargement',
  },
  {
    id: 'M-2313',
    truck: 'TPQ-026',
    from: 'Dépôt liquides',
    to: 'Carrière B',
    material: 'Gasoil',
    tonnage: '8,0 m³',
    status: 'chargement',
  },
  {
    id: 'M-2314',
    truck: 'TPQ-003',
    from: 'Centrale enrobage',
    to: 'Chantier RN9',
    material: 'EB 0/14',
    tonnage: '27,0 t',
    status: 'chargement',
  },
]
