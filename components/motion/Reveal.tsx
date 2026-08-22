'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Révélation par défaut du site : opacité 0 → 1 et 12 px de translation,
 * 400 ms, une seule fois par section.
 *
 * C'est le seul mouvement autorisé sur du contenu ordinaire. Tout ce qui va
 * au-delà doit encoder quelque chose du transport (§4.6) — sinon on le
 * supprime.
 */
export function Reveal({
  children,
  delay = 0,
  as = 'div',
  className,
}: {
  readonly children: ReactNode
  readonly delay?: number
  readonly as?: 'div' | 'section' | 'li'
  readonly className?: string
}) {
  const reduced = useReducedMotion()
  const Component = motion[as]

  if (reduced) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </Component>
  )
}
