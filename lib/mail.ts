import 'server-only'
import { Resend } from 'resend'

/**
 * Envoi d'e-mail.
 *
 * Sans `RESEND_API_KEY`, rien n'est envoyé : le message est journalisé et
 * l'appel rend `{ ok: true, delivered: false }`. Le formulaire se comporte
 * normalement en développement, et l'absence de livraison est explicite plutôt
 * que silencieuse.
 */
export interface MailMessage {
  readonly to: string
  readonly subject: string
  /** Corps en HTML sobre, aux couleurs du site. */
  readonly html: string
  /** Repli texte, pour les clients qui n'affichent pas le HTML. */
  readonly text: string
  readonly replyTo?: string
}

export interface MailResult {
  readonly ok: boolean
  /** Faux quand aucune clé n'est configurée : rien n'est parti. */
  readonly delivered: boolean
  readonly error?: string
}

export function mailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.MAIL_FROM)
}

export async function sendMail(message: MailMessage): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.MAIL_FROM

  if (!apiKey || !from) {
    console.info(`[mail] non configuré — message non envoyé.\n  à : ${message.to}\n  objet : ${message.subject}\n${message.text}`)
    return { ok: true, delivered: false }
  }

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
      replyTo: message.replyTo,
    })
    if (error) {
      console.error('[mail] échec Resend :', error.message)
      return { ok: false, delivered: false, error: error.message }
    }
    return { ok: true, delivered: true }
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'erreur inconnue'
    console.error('[mail] échec :', reason)
    return { ok: false, delivered: false, error: reason }
  }
}

/**
 * Gabarit d'e-mail : un tableau de récapitulatif, lisible tel quel.
 * Le dispatch lit ça sur un téléphone — pas de colonne inutile, pas d'image.
 */
export function summaryEmail(title: string, rows: readonly (readonly [string, string])[], footer?: string) {
  const visible = rows.filter(([, value]) => value.trim().length > 0)

  const html = `<!doctype html><html lang="fr"><body style="margin:0;padding:24px;background:#E8E6E1;font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#121315">
  <div style="max-width:640px;margin:0 auto;background:#F7F6F3;border:1px solid rgba(18,19,21,.1)">
    <div style="background:#1B1D1F;color:#E8E6E1;padding:16px 20px">
      <div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8E949A">TRANSPOLEQ</div>
      <div style="font-size:18px;font-weight:600;margin-top:4px">${escapeHtml(title)}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${visible
        .map(
          ([label, value]) =>
            `<tr><th align="left" style="padding:10px 20px;border-bottom:1px solid rgba(18,19,21,.08);color:#8E949A;font-weight:400;width:38%;vertical-align:top">${escapeHtml(label)}</th><td style="padding:10px 20px;border-bottom:1px solid rgba(18,19,21,.08);vertical-align:top">${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`,
        )
        .join('')}
    </table>
    ${footer ? `<div style="padding:14px 20px;color:#8E949A;font-size:12px">${escapeHtml(footer)}</div>` : ''}
  </div>
</body></html>`

  const text = `${title}\n\n${visible.map(([label, value]) => `${label} : ${value}`).join('\n')}${footer ? `\n\n${footer}` : ''}`

  return { html, text }
}

/** Les valeurs viennent d'un formulaire public : rien n'est interpolé brut. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
