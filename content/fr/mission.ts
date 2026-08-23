/**
 * Une mission TRANSPOLEQ (§6.1.4, §8.2).
 *
 * Numérotées parce que l'ordre est réel : c'est la seule numérotation du site.
 * Les six pages de service y ajoutent leurs précisions via `stepNotes`.
 */
export interface MissionStep {
  readonly n: 1 | 2 | 3 | 4 | 5
  readonly title: string
  readonly text: string
}

export const MISSION_STEPS: readonly MissionStep[] = [
  {
    n: 1,
    title: 'Demande',
    text: 'Vous décrivez le besoin : matériau, volume, origine, destination, fenêtre de livraison.',
  },
  {
    n: 2,
    title: 'Planification',
    text: 'Le dispatch affecte camions et chauffeurs, fixe les rotations et confirme le planning.',
  },
  {
    n: 3,
    title: 'Chargement & pesée',
    text: 'Chaque chargement est pesé et documenté. Le ticket de pesée suit la mission.',
  },
  {
    n: 4,
    title: 'Transport suivi',
    text: 'Position, vitesse et étapes sont suivies en temps réel. Vous êtes informé de tout écart.',
  },
  {
    n: 5,
    title: 'Livraison & preuve',
    text: 'Bon de livraison signé, horodaté et géolocalisé, disponible dans votre reporting.',
  },
]
