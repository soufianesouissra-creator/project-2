'use client'

import { animate, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Compteur des chiffres clés. Compte une fois, à l'entrée dans le champ.
 *
 * Le nombre final est rendu immédiatement quand le mouvement est réduit, et
 * il est toujours présent dans le DOM pour un lecteur d'écran : la valeur
 * n'est jamais portée par l'animation seule.
 */
export function Counter({
  value,
  decimals = 0,
  className,
}: {
  readonly value: number
  readonly decimals?: number
  readonly className?: string
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-64px' })
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (reduced || !inView) return
    setDisplay(0)
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    })
    return () => controls.stop()
  }, [inView, reduced, value])

  const formatted = new Intl.NumberFormat('fr-MA', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(display)

  return (
    <span ref={ref} className={className} data-numeric>
      {formatted}
    </span>
  )
}
