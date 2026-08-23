import 'server-only'

/**
 * Limitation de débit en mémoire, par empreinte d'appelant.
 *
 * Volontairement simple : une instance, une fenêtre glissante. C'est suffisant
 * pour un site vitrine dont les formulaires sont déjà protégés par Turnstile et
 * un champ piège, et ça ne fait dépendre l'envoi d'un devis d'aucun service
 * externe.
 *
 * LIMITE ASSUMÉE : sur plusieurs instances serverless, chaque instance a son
 * propre compteur. Le jour où le volume le justifie, remplacer par un store
 * partagé (Upstash, Vercel KV) — l'interface ne changera pas.
 *
 * La limitation ne se desserre jamais pour faire passer un test : la suite de
 * navigateur envoie ses formulaires en mode test, pas en contournant le garde.
 */
interface Window {
  count: number
  resetAt: number
}

const buckets = new Map<string, Window>()

export interface RateLimitResult {
  readonly ok: boolean
  /** Secondes avant de pouvoir réessayer. 0 quand la requête passe. */
  readonly retryAfter: number
}

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000): RateLimitResult {
  const now = Date.now()
  const current = buckets.get(key)

  if (!current || now > current.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, retryAfter: 0 }
  }

  if (current.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((current.resetAt - now) / 1000) }
  }

  current.count += 1
  return { ok: true, retryAfter: 0 }
}

/**
 * Empreinte de l'appelant, depuis les en-têtes du proxy.
 * Jamais journalisée telle quelle : elle sert de clé, pas de trace.
 */
export function callerKey(headers: Headers, scope: string): string {
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const ip = forwarded || headers.get('x-real-ip') || 'inconnu'
  return `${scope}:${ip}`
}

/** Purge des fenêtres expirées, pour que la map ne grossisse pas sans fin. */
export function sweep(now = Date.now()): void {
  for (const [key, window] of buckets) {
    if (now > window.resetAt) buckets.delete(key)
  }
}
