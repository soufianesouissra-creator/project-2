'use client'

import { useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Défilement lissé (Lenis), desktop uniquement.
 *
 * Trois raisons de le limiter : le défilement natif d'iOS et d'Android est déjà
 * bon, le lissage entre en conflit avec les gestes tactiles, et le lecteur type
 * est sur un téléphone au bord d'un chantier — on ne lui charge pas une
 * bibliothèque pour un confort qu'il ne verra pas.
 *
 * Coupé sous `prefers-reduced-motion`, et importé dynamiquement pour rester
 * hors du bundle initial.
 */
export function SmoothScroll() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (coarse) return

    let frame = 0
    let cancelled = false
    let destroy: (() => void) | undefined

    void import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
      const raf = (time: number) => {
        lenis.raf(time)
        frame = requestAnimationFrame(raf)
      }
      frame = requestAnimationFrame(raf)
      destroy = () => {
        cancelAnimationFrame(frame)
        lenis.destroy()
      }
    })

    return () => {
      cancelled = true
      destroy?.()
    }
  }, [reduced])

  return null
}
