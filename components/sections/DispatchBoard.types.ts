/**
 * Forme d'une ligne du tableau de dispatch.
 *
 * Ce type est le contrat entre le composant et sa source de données. En
 * Phase 3, un flux anonymisé de la plateforme de suivi du groupe remplacera
 * `content/fr/dispatch-board.ts` sans toucher au composant.
 */
export type DispatchStatus = 'chargement' | 'en-route' | 'livre'

export interface DispatchRow {
  /** Numéro de mission. */
  readonly id: string
  /** Immatriculation interne du camion. */
  readonly truck: string
  readonly from: string
  readonly to: string
  readonly material: string
  /** Tonnage ou volume, unité comprise : « 27,4 t », « 12,0 m³ ». */
  readonly tonnage: string
  readonly status: DispatchStatus
  /** Heure de livraison, présente uniquement quand `status === 'livre'`. */
  readonly doneAt?: string
}

export const STATUS_LABEL: Record<DispatchStatus, string> = {
  chargement: 'En chargement',
  'en-route': 'En route',
  livre: 'Livré',
}

/** Ordre d'avancement d'une mission. Une mission ne recule pas. */
export const STATUS_SEQUENCE: readonly DispatchStatus[] = ['chargement', 'en-route', 'livre']

export function nextStatus(status: DispatchStatus): DispatchStatus | null {
  const index = STATUS_SEQUENCE.indexOf(status)
  return STATUS_SEQUENCE[index + 1] ?? null
}
