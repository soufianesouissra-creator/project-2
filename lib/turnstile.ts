import 'server-only'

/**
 * Vérification Cloudflare Turnstile.
 *
 * Sans clé secrète configurée, on rend `true` et on le DIT dans le journal :
 * les formulaires restent utilisables en développement et sur une
 * prévisualisation, mais personne ne peut croire que la protection est active
 * alors qu'elle ne l'est pas.
 */
const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export async function verifyTurnstile(token: string | undefined, remoteIp?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.warn('[turnstile] TURNSTILE_SECRET_KEY absente — vérification ignorée (mode test).')
    return true
  }
  if (!token) return false

  try {
    const body = new URLSearchParams({ secret, response: token })
    if (remoteIp) body.set('remoteip', remoteIp)

    const response = await fetch(VERIFY_URL, { method: 'POST', body })
    if (!response.ok) return false
    const result = (await response.json()) as { success?: boolean }
    return result.success === true
  } catch {
    // Un échec réseau côté Cloudflare ne doit pas faire perdre une demande de
    // devis : on laisse passer, le champ piège et la limitation de débit
    // restent en place.
    console.error('[turnstile] vérification injoignable — la demande est acceptée.')
    return true
  }
}

/**
 * La protection est-elle réellement active ?
 *
 * La clé de SITE est publique et doit donc porter le préfixe `NEXT_PUBLIC_` ;
 * la clé secrète ne le porte surtout pas. Les deux noms sont vérifiés ici,
 * sinon cette fonction rendrait `false` en permanence.
 */
export function turnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
}
