'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Link } from '@/lib/navigation'

const STORAGE_KEY = 'transpoleq-consent'

export type Consent = 'accepted' | 'refused'

export function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'accepted' || value === 'refused' ? value : null
  } catch {
    // Navigation privée, stockage bloqué : pas de consentement, pas de mesure.
    return null
  }
}

/**
 * Bandeau de consentement minimal (§6.11).
 *
 * Deux boutons de même poids visuel. Pas de « Accepter tout » en gros et
 * « Gérer mes préférences » en gris : refuser doit être aussi facile
 * qu'accepter, ce que la loi 09-08 et le simple respect du lecteur imposent.
 *
 * La mesure d'audience n'est chargée QU'APRÈS un « Accepter » — c'est
 * `Analytics` qui écoute l'événement, ce bandeau ne fait qu'enregistrer le
 * choix. Aucun cookie n'est posé par le bandeau lui-même.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (readConsent() === null) setVisible(true)
  }, [])

  function choose(consent: Consent) {
    try {
      localStorage.setItem(STORAGE_KEY, consent)
    } catch {
      // Rien à faire : sans stockage, la question sera reposée. C'est le
      // comportement correct — on ne mesure pas sans trace de consentement.
    }
    setVisible(false)
    window.dispatchEvent(new CustomEvent('transpoleq:consent', { detail: consent }))
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Mesure d’audience"
      className="bg-asphalt text-concrete border-gravel fixed inset-x-0 bottom-0 z-50 border-t"
    >
      <div className="site-container flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-concrete/85 text-sm">
          Nous utilisons une mesure d’audience anonyme.{' '}
          <Link href="/confidentialite" className="hover:text-marking underline underline-offset-4">
            En savoir plus
          </Link>
        </p>
        <div className="flex gap-3">
          <Button size="sm" onClick={() => choose('accepted')}>
            Accepter
          </Button>
          <Button size="sm" variant="ghost-dark" onClick={() => choose('refused')}>
            Refuser
          </Button>
        </div>
      </div>
    </div>
  )
}
