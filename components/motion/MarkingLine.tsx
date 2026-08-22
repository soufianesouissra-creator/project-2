'use client'

import { motion } from 'motion/react'
import { useReducedMotion } from './useReducedMotion'
import { cn } from '@/lib/cn'

const DASH = 24
const GAP = 16

/**
 * La ligne de marquage (§4.4) — le seul motif décoratif récurrent du site.
 *
 * Animée, elle se dessine dans le sens de la lecture : c'est ce qui en fait
 * une progression plutôt qu'un ornement. Statique, elle reste un séparateur
 * lisible. La version purement CSS (`marking-line-x`) suffit quand rien n'a
 * besoin d'être animé.
 */
export function MarkingLine({
  orientation = 'horizontal',
  animated = true,
  className,
}: {
  readonly orientation?: 'horizontal' | 'vertical'
  readonly animated?: boolean
  readonly className?: string
}) {
  const reduced = useReducedMotion()
  const horizontal = orientation === 'horizontal'
  const draw = animated && !reduced

  return (
    <svg
      aria-hidden
      className={cn(horizontal ? 'h-0.5 w-full' : 'h-full w-0.5', className)}
      preserveAspectRatio="none"
      viewBox={horizontal ? '0 0 1000 2' : '0 0 2 1000'}
    >
      <motion.line
        x1={horizontal ? 0 : 1}
        y1={horizontal ? 1 : 0}
        x2={horizontal ? 1000 : 1}
        y2={horizontal ? 1 : 1000}
        stroke="var(--color-marking)"
        strokeWidth={2}
        strokeDasharray={`${DASH} ${GAP}`}
        initial={draw ? { pathLength: 0 } : false}
        whileInView={draw ? { pathLength: 1 } : undefined}
        viewport={{ once: true, margin: '-32px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  )
}
