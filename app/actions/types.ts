import type { FieldErrors } from '@/lib/validation'

/**
 * État partagé par toutes les Server Actions de formulaire.
 *
 * `useActionState` a besoin d'une forme stable entre l'état initial et le
 * retour de l'action. Une seule définition, ici.
 */
export interface FormState {
  readonly status: 'idle' | 'success' | 'error'
  /** Message global : panne d'envoi, limitation de débit, anti-spam. */
  readonly message?: string
  readonly errors?: FieldErrors
  /**
   * Faux quand l'envoi a « réussi » sans e-mail parti (aucune clé configurée).
   * Sert au mode test : on ne fait pas croire à une livraison.
   */
  readonly delivered?: boolean
}

export const IDLE: FormState = { status: 'idle' }
