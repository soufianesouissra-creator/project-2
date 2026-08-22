import { useId, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Précision courte sur une donnée : période d'un chiffre, définition d'un
 * indicateur.
 *
 * Apparaît au survol ET au focus, et le texte est lié par `aria-describedby` —
 * donc un lecteur d'écran l'obtient même sans survol. Une infobulle ne porte
 * jamais une information indispensable : elle précise, elle n'informe pas.
 */
export function Tooltip({
  label,
  children,
  className,
}: {
  readonly label: string
  readonly children: ReactNode
  readonly className?: string
}) {
  const id = useId()
  return (
    <span className={cn('group relative inline-flex', className)}>
      <span aria-describedby={id} tabIndex={0} className="border-mist/60 border-b border-dashed">
        {children}
      </span>
      <span
        role="tooltip"
        id={id}
        className="bg-asphalt text-concrete pointer-events-none absolute bottom-full start-0 z-20 mb-2 w-max max-w-64 rounded-[2px] px-2.5 py-1.5 font-mono text-xs opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {label}
      </span>
    </span>
  )
}
