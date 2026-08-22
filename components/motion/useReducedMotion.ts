'use client'

import { useEffect, useState } from 'react'

/**
 * `prefers-reduced-motion: reduce`.
 *
 * Rend `true` tant que le composant n'est pas monté : on démarre calme et on
 * n'anime qu'une fois la préférence réellement connue. L'inverse ferait jouer
 * une animation à quelqu'un qui a demandé de ne pas en avoir.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(query.matches)
    apply()
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [])

  return reduced
}

interface SaveDataConnection {
  saveData?: boolean
}

/**
 * Vrai quand il faut se tenir tranquille : préférence système de mouvement
 * réduit, OU mode économiseur de données.
 *
 * Le second cas compte plus qu'il n'en a l'air : le lecteur type est sur un
 * chantier, en 4G, parfois en itinérance. Une boucle qui tourne toutes les
 * six secondes n'a rien à faire là.
 */
export function useCalmMode(): boolean {
  const reduced = useReducedMotion()
  const [saveData, setSaveData] = useState(true)

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: SaveDataConnection }).connection
    setSaveData(connection?.saveData === true)
  }, [])

  return reduced || saveData
}
