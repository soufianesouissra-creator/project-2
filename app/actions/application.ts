'use server'

import { headers } from 'next/headers'
import { applicationSchema, fieldErrorsFrom, CV_MAX_BYTES } from '@/lib/validation'
import { callerKey, rateLimit, sweep } from '@/lib/rate-limit'
import { verifyTurnstile } from '@/lib/turnstile'
import { sendMail, summaryEmail } from '@/lib/mail'
import { CONTACT } from '@/content/fr/site'
import type { FormState } from './types'

/**
 * Candidature (§6.9).
 *
 * Le CV est revérifié ICI : `accept="application/pdf"` sur l'input est un
 * confort, pas un contrôle — il se contourne en deux clics. Type ET taille
 * sont contrôlés côté serveur, dans cet ordre.
 *
 * Sans jeton Vercel Blob, le fichier n'est pas stocké et l'e-mail RH le DIT :
 * mieux vaut une candidature signalée comme incomplète qu'un CV silencieusement
 * perdu.
 */
export async function submitApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = Object.fromEntries(
    [...formData.entries()].filter(([, value]) => typeof value === 'string'),
  ) as Record<string, string>

  if (raw.website) return { status: 'success', delivered: false }

  const parsed = applicationSchema.safeParse(raw)
  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Certains champs doivent être corrigés.',
      errors: fieldErrorsFrom(parsed.error),
    }
  }
  const input = parsed.data

  const requestHeaders = await headers()
  const ip = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim()

  if (!(await verifyTurnstile(input.turnstileToken, ip))) {
    return { status: 'error', message: 'La vérification anti-robot a échoué. Rechargez la page et réessayez.' }
  }

  sweep()
  const limit = rateLimit(callerKey(requestHeaders, 'candidature'), 3)
  if (!limit.ok) {
    return {
      status: 'error',
      message: `Trop de candidatures envoyées. Réessayez dans ${Math.ceil(limit.retryAfter / 60)} minutes.`,
    }
  }

  // ── CV : type puis taille, côté serveur ────────────────────────────────────
  let cvNote = 'Aucun CV joint.'
  const cv = formData.get('cv')
  if (cv instanceof File && cv.size > 0) {
    if (cv.type !== 'application/pdf') {
      return { status: 'error', message: 'Format accepté : PDF.', errors: { cv: 'Format accepté : PDF.' } }
    }
    if (cv.size > CV_MAX_BYTES) {
      return { status: 'error', message: 'Le fichier dépasse 5 Mo.', errors: { cv: 'Le fichier dépasse 5 Mo.' } }
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN
    if (!token) {
      cvNote = `CV reçu (${cv.name}, ${Math.round(cv.size / 1024)} ko) mais NON STOCKÉ : aucun jeton Vercel Blob configuré. Rappeler le candidat pour le redemander.`
    } else {
      try {
        const { put } = await import('@vercel/blob')
        // `addRandomSuffix` : deux candidats homonymes ne s'écrasent pas.
        const blob = await put(`candidatures/${cv.name}`, cv, {
          access: 'public',
          token,
          addRandomSuffix: true,
        })
        cvNote = blob.url
      } catch (error) {
        console.error('[candidature] dépôt du CV impossible :', error)
        cvNote = `CV reçu (${cv.name}) mais son dépôt a échoué. Rappeler le candidat.`
      }
    }
  }

  const mail = summaryEmail('Candidature', [
    ['Nom', input.name],
    ['Téléphone', input.phone],
    ['E-mail', input.email ?? ''],
    ['Poste visé', input.position ?? 'Candidature spontanée'],
    ['Permis', input.licences ?? ''],
    ['Message', input.message ?? ''],
    ['CV', cvNote],
  ])

  const result = await sendMail({
    to: process.env.MAIL_TO_RH ?? 'rh@transpoleq.ma',
    subject: `Candidature — ${input.name}${input.position ? ` — ${input.position}` : ''}`,
    html: mail.html,
    text: mail.text,
    replyTo: input.email,
  })

  if (!result.ok) {
    return { status: 'error', message: `L’envoi a échoué. Réessayez ou appelez le ${CONTACT.phone}.` }
  }

  return { status: 'success', delivered: result.delivered }
}
