import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface FieldProps {
  readonly id: string
  readonly label: string
  /** Aide affichée sous le champ, en mono : c'est de la métadonnée. */
  readonly hint?: string
  readonly error?: string
  readonly required?: boolean
  readonly children: ReactNode
  readonly className?: string
}

/**
 * Enveloppe commune à tous les champs : libellé lié, aide, erreur.
 *
 * Aucun champ du site n'est rendu sans passer par ici — c'est ce qui garantit
 * qu'aucun `input` ne se retrouve sans `label`, et que l'erreur est annoncée
 * par `aria-describedby` plutôt que par la seule couleur.
 */
export function Field({ id, label, hint, error, required, children, className }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-ink text-sm font-medium">
        {label}
        {required ? (
          <span className="text-mist ms-1 font-mono text-xs" aria-hidden>
            requis
          </span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-mist font-mono text-xs">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-signal font-mono text-xs" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export const CONTROL_CLASSES =
  'bg-limestone text-ink border-ink/20 rounded-control h-11 w-full border px-3 text-base transition-colors duration-150 placeholder:text-mist hover:border-ink/40 disabled:cursor-not-allowed disabled:opacity-45 aria-[invalid=true]:border-signal'

/** Attributs ARIA dérivés de l'état du champ, pour ne pas les oublier. */
export function fieldAria(id: string, options: { hint?: string; error?: string }) {
  const describedBy = [options.error ? `${id}-error` : null, options.hint && !options.error ? `${id}-hint` : null]
    .filter(Boolean)
    .join(' ')
  return {
    'aria-invalid': options.error ? true : undefined,
    'aria-describedby': describedBy || undefined,
  } as const
}
