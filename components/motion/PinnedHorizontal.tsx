'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useReducedMotion } from './useReducedMotion'

/**
 * Défilement horizontal épinglé — les deux seules sections qui épinglent :
 * la mission (une séquence) et le convoi de flotte (un convoi).
 *
 * GSAP et ScrollTrigger sont importés DYNAMIQUEMENT et seulement ici : les
 * pages qui n'épinglent rien ne les téléchargent pas.
 *
 * Trois cas où l'on n'épingle pas du tout, et où le contenu se lit alors comme
 * une liste verticale ordinaire :
 *   — mouvement réduit ;
 *   — pointeur grossier (téléphone, tablette) : l'épinglage vole le geste de
 *     défilement, et le lecteur type est justement sur un téléphone ;
 *   — largeur inférieure à 1024 px.
 *
 * Le contenu est le MÊME dans les deux cas. Rien n'est caché à qui n'épingle
 * pas : c'est la disposition qui change, pas l'information.
 */
export function PinnedHorizontal({
  children,
  label,
  className,
}: {
  readonly children: ReactNode
  readonly label: string
  readonly className?: string
}) {
  const reduced = useReducedMotion()
  const container = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    if (reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.innerWidth < 1024) return

    const containerEl = container.current
    const trackEl = track.current
    if (!containerEl || !trackEl) return

    let cleanup: (() => void) | undefined
    let cancelled = false

    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)
        setPinned(true)

        const distance = () => Math.max(0, trackEl.scrollWidth - containerEl.clientWidth)

        const tween = gsap.to(trackEl, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: containerEl,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })

        cleanup = () => {
          tween.scrollTrigger?.kill()
          tween.kill()
          gsap.set(trackEl, { x: 0 })
          setPinned(false)
        }
      },
    )

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [reduced])

  return (
    <div
      ref={container}
      aria-label={label}
      className={cn(
        className,
        // Épinglé, le conteneur occupe la fenêtre et centre sa piste :
        // autrement les cartes restent collées en haut et laissent une plage
        // de béton vide sous elles pendant toute la durée du défilement.
        pinned && 'flex min-h-[70svh] items-center',
      )}
      // Le débordement horizontal est porté par la piste, jamais par la page.
      style={pinned ? { overflow: 'hidden' } : undefined}
    >
      <div
        ref={track}
        className={
          pinned
            ? 'flex w-max items-stretch gap-6'
            : 'flex w-full flex-col gap-6 lg:flex-row lg:flex-wrap lg:items-stretch'
        }
      >
        {children}
      </div>
    </div>
  )
}
