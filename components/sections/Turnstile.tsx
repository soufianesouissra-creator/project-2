'use client'

import Script from 'next/script'
import { useEffect, useId, useRef, useState } from 'react'

/**
 * Widget Cloudflare Turnstile.
 *
 * Sans `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, rien n'est chargé et le composant le
 * DIT à l'écran en développement. Un anti-robot silencieusement absent est
 * pire qu'un anti-robot absent : on croit être protégé.
 *
 * Le jeton est posé dans un champ caché, donc il part avec le `FormData` de la
 * Server Action sans qu'aucun code d'envoi n'ait à le connaître.
 */
declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: { sitekey: string; callback: (token: string) => void; theme?: string },
      ) => string
      remove: (id: string) => void
    }
  }
}

export function Turnstile({ name = 'turnstileToken' }: { readonly name?: string }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const container = useRef<HTMLDivElement>(null)
  const [token, setToken] = useState('')
  const [ready, setReady] = useState(false)
  const id = useId()

  useEffect(() => {
    if (!siteKey || !ready || !container.current || !window.turnstile) return
    const widgetId = window.turnstile.render(container.current, {
      sitekey: siteKey,
      callback: setToken,
      theme: 'light',
    })
    return () => window.turnstile?.remove(widgetId)
  }, [siteKey, ready])

  if (!siteKey) {
    return (
      <div className="text-mist font-mono text-xs" id={id}>
        Vérification anti-robot désactivée : aucune clé Turnstile configurée. Le formulaire
        fonctionne, mais il n’est protégé que par le champ piège et la limitation de débit.
      </div>
    )
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="lazyOnload"
        onReady={() => setReady(true)}
      />
      <div ref={container} />
      <input type="hidden" name={name} value={token} />
    </>
  )
}

/** Champ piège. Hors flux, hors tabulation, hors lecteur d'écran. */
export function Honeypot({ name = 'website' }: { readonly name?: string }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor={name}>Ne pas remplir</label>
      <input id={name} name={name} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  )
}
