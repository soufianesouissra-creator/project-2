'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { readConsent } from '@/components/sections/CookieBanner'

/**
 * Mesure d'audience — chargée UNIQUEMENT après consentement explicite.
 *
 * Trois conditions, toutes nécessaires :
 *   1. `NEXT_PUBLIC_ANALYTICS` est renseignée (sinon aucune mesure, point) ;
 *   2. le visiteur a répondu « Accepter » au bandeau ;
 *   3. on est côté client, après montage.
 *
 * Le script n'est pas seulement « désactivé » quand on refuse : il n'est jamais
 * inséré dans le document. Un script chargé puis mis en veille a déjà vu
 * l'adresse IP du visiteur, et la politique de confidentialité affirme le
 * contraire.
 *
 * Plausible plutôt que Google Analytics : pas de cookie, pas de donnée
 * personnelle, un script de moins de 1 ko. Le bandeau reste — la loi 09-08
 * s'apprécie sur la finalité, pas sur la technique.
 */
export function Analytics() {
  const [allowed, setAllowed] = useState(false)
  const domain = process.env.NEXT_PUBLIC_ANALYTICS

  useEffect(() => {
    if (!domain) return
    setAllowed(readConsent() === 'accepted')

    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail
      setAllowed(detail === 'accepted')
    }
    window.addEventListener('transpoleq:consent', onConsent)
    return () => window.removeEventListener('transpoleq:consent', onConsent)
  }, [domain])

  if (!domain || !allowed) return null

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="lazyOnload"
    />
  )
}
