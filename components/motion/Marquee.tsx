'use client'

import type { ReactNode } from 'react'
import { useReducedMotion } from './useReducedMotion'
import { cn } from '@/lib/cn'

/**
 * Défilement continu — logos clients (§6.1.8).
 *
 * Sous mouvement réduit, le défilement s'arrête et la liste devient une grille
 * qui défile à la main : aucun logo n'est inaccessible parce qu'il n'est pas
 * passé au bon moment.
 */
export function Marquee({
  children,
  label,
  durationSeconds = 40,
  className,
}: {
  readonly children: ReactNode
  readonly label: string
  readonly durationSeconds?: number
  readonly className?: string
}) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div className={cn('flex flex-wrap items-center gap-x-12 gap-y-6', className)} aria-label={label}>
        {children}
      </div>
    )
  }

  return (
    <div
      className={cn('group relative overflow-hidden', className)}
      aria-label={label}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        className="flex w-max items-center gap-12 group-hover:[animation-play-state:paused]"
        style={{ animation: `transpoleq-marquee ${durationSeconds}s linear infinite` }}
      >
        {children}
        <span aria-hidden className="flex items-center gap-12">
          {children}
        </span>
      </div>
      <style>{`@keyframes transpoleq-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  )
}
