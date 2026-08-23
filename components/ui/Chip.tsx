import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type ChipTone = 'neutral' | 'active' | 'muted' | 'alert'

const TONES: Record<ChipTone, string> = {
  neutral: 'border-ink/25 text-ink',
  // Contour jaune, texte à l'encre. Le jaune de marquage en TEXTE sur du clair
  // donne 1,66:1 : invisible, et contraire à la règle du brief. Le contour
  // suffit à dire « actif », et le libellé reste lisible.
  active: 'border-marking text-ink',
  muted: 'border-mist-ink/50 text-mist-ink',
  alert: 'border-signal text-signal',
}

/**
 * Étiquette courte : un filtre, un statut, une catégorie. Contour seulement —
 * une puce pleine attirerait l'œil autant qu'un bouton et n'en est pas un.
 */
export function Chip({
  tone = 'neutral',
  children,
  className,
}: {
  readonly tone?: ChipTone
  readonly children: ReactNode
  readonly className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[2px] border px-2 py-0.5 font-mono text-xs whitespace-nowrap',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
