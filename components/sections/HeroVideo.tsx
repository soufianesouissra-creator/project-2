'use client'

import { useEffect, useRef, useState } from 'react'
import { useCalmMode } from '@/components/motion/useReducedMotion'

const POSTER = '/media/hero/hero-poster.jpg'
const SOURCES = [
  { src: '/media/hero/hero-loop.webm', type: 'video/webm' },
  { src: '/media/hero/hero-loop.mp4', type: 'video/mp4' },
]

/**
 * Fond vidéo du hero.
 *
 * Trois précautions, dans cet ordre d'importance :
 *
 * 1. La vidéo n'est montée QU'APRÈS le premier rendu, donc après le LCP. Le
 *    titre et le tableau de dispatch ne se battent pas avec elle pour la bande
 *    passante.
 * 2. Sous mouvement réduit ou en mode économiseur de données, elle n'est jamais
 *    chargée : le poster suffit.
 * 3. Elle est à 20 % d'opacité sur `--asphalt`, ce qui laisse le texte à plus
 *    de 10:1 sans voile ajouté — le brief interdit les dégradés, et un
 *    dégradé de lisibilité par-dessus serait de toute façon redondant. Elle ne
 *    porte AUCUNE information. Si le fichier manque — c'est le cas aujourd'hui, voir
 *    `public/media/README.md` — la bande reste unie et rien ne se voit.
 */
export function HeroVideo() {
  const calm = useCalmMode()
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Deux images d'attente : on laisse la page peindre son contenu utile.
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)))
    return () => cancelAnimationFrame(id)
  }, [])

  if (calm || !mounted) {
    return <div aria-hidden className="bg-asphalt absolute inset-0" />
  }

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <video
        ref={ref}
        className="h-full w-full object-cover opacity-20"
        poster={POSTER}
        preload="none"
        autoPlay
        muted
        loop
        playsInline
      >
        {SOURCES.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>
    </div>
  )
}
