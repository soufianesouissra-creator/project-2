import { Chip } from './Chip'

export type StatusTone = 'progress' | 'done' | 'alert'

/**
 * Statut d'une mission ou d'un document. Volontairement sans vert ni rouge
 * décoratif : « en cours » et « terminé » sont des étapes, pas un succès et un
 * échec. `alert` existe pour ce qui est réellement anormal.
 */
export function StatusBadge({ tone, label }: { readonly tone: StatusTone; readonly label: string }) {
  const map = { progress: 'active', done: 'muted', alert: 'alert' } as const
  return <Chip tone={map[tone]}>{label}</Chip>
}
