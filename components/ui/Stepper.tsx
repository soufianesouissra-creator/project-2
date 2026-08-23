import { cn } from '@/lib/cn'

/**
 * Progression du formulaire de devis, posée sur la ligne de marquage.
 *
 * L'état courant n'est pas porté par la seule couleur : l'étape active est
 * annoncée par `aria-current` et le libellé change de graisse.
 */
export function Stepper({
  steps,
  current,
  className,
}: {
  readonly steps: readonly string[]
  /** Index de l'étape en cours, à partir de 0. */
  readonly current: number
  readonly className?: string
}) {
  return (
    <nav aria-label="Progression" className={className}>
      <ol className="flex items-stretch gap-0">
        {steps.map((step, index) => {
          const done = index < current
          const active = index === current
          return (
            <li key={step} className="flex-1">
              <div
                className={cn(
                  'h-0.5 w-full',
                  done || active ? 'bg-marking' : 'bg-ink/15',
                  !done && !active && 'marking-line-x opacity-25',
                )}
              />
              <div className="flex items-baseline gap-2 pt-3">
                <span
                  className={cn(
                    'font-mono text-xs',
                    done || active ? 'text-ink' : 'text-mist-ink',
                  )}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  aria-current={active ? 'step' : undefined}
                  className={cn(
                    'text-sm',
                    active ? 'text-ink font-medium' : done ? 'text-ink/70' : 'text-mist-ink',
                  )}
                >
                  {step}
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
