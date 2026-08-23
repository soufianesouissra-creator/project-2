import { ph } from '../placeholders'

/**
 * Sécurité & conformité (§6.4, §8.4).
 *
 * Ton factuel, aucune formule. Une page sécurité qui promet « l'excellence »
 * ne dit rien ; une page qui dit « aucun camion ne part sans contrôle de
 * départ » se vérifie.
 */
export const COMMITMENTS: readonly string[] = [
  'Aucun camion ne part sans contrôle de départ.',
  'Chaque chauffeur est formé avant sa première mission, puis suivi.',
  'Vitesse, freinages et temps de conduite sont mesurés par la télématique, pas déclarés.',
  'La maintenance est préventive, planifiée et documentée.',
  'Tout incident est déclaré, analysé et suivi d’une action.',
]

export interface SafetyBlock {
  readonly id: string
  readonly title: string
  readonly points: readonly string[]
}

export const SAFETY_BLOCKS: readonly SafetyBlock[] = [
  {
    id: 'chauffeurs',
    title: 'Chauffeurs',
    points: [
      'Recrutement sur permis et expérience vérifiés.',
      'Formation à l’arrivée : arrimage, bâchage, conduite économique, gestes de sécurité au chargement.',
      'Suivi de conduite par télématique : vitesse, freinages brusques, temps de conduite et de repos.',
      'Les écarts donnent lieu à un entretien, pas à une sanction automatique.',
    ],
  },
  {
    id: 'vehicules',
    title: 'Véhicules',
    points: [
      'Contrôle technique suivi par véhicule, jamais laissé courir jusqu’à l’échéance.',
      'Maintenance préventive planifiée, historique conservé.',
      'Arrimage contrôlé avant chaque départ de charge exceptionnelle.',
      'Bâchage systématique sur le vrac et l’enrobé.',
    ],
  },
  {
    id: 'conformite',
    title: 'Conformité',
    points: [
      'Autorisations de transport de marchandises à jour.',
      'Assurance responsabilité civile et assurance marchandises transportées.',
      'Autorisations spécifiques pour le transport exceptionnel, demandées par itinéraire.',
      'Documents communiqués sur demande.',
    ],
  },
  {
    id: 'incidents',
    title: 'Incidents',
    points: [
      'Tout incident est déclaré, quelle que soit sa gravité.',
      'Analyse des causes, pas recherche d’un responsable.',
      'Chaque analyse débouche sur une action datée et vérifiée.',
    ],
  },
]

/** Documents qu'un acheteur peut demander avant de contracter. */
export const AVAILABLE_DOCUMENTS: readonly string[] = [
  'Attestation d’assurance responsabilité civile',
  'Attestation d’assurance marchandises transportées',
  'Cartes grises des véhicules affectés',
  'Autorisations de transport',
  'Attestation de régularité fiscale et sociale',
]

/** Certifications RÉELLEMENT détenues. Vide tant que rien n'est confirmé. */
export const CERTIFICATIONS: readonly { readonly name: string; readonly body: string; readonly validUntil: string }[] = []

export const CERTIFICATIONS_PENDING = ph('CERTIFICATIONS')
