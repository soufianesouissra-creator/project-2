'use server'

import { headers } from 'next/headers'
import { quoteSchema, fieldErrorsFrom, FREQUENCY_LABELS } from '@/lib/validation'
import { callerKey, rateLimit, sweep } from '@/lib/rate-limit'
import { verifyTurnstile } from '@/lib/turnstile'
import { sendMail, summaryEmail } from '@/lib/mail'
import { serviceBySlug } from '@/content/fr/services'
import { CONTACT } from '@/content/fr/site'
import { ph } from '@/content/placeholders'
import type { FormState } from './types'

/**
 * Demande de devis.
 *
 * L'ordre est le même que pour toute mutation du groupe :
 *   valider (zod) → anti-spam → limiter le débit → envoyer → répondre.
 *
 * Le champ piège est vérifié AVANT tout le reste et répond « envoyé » sans
 * rien envoyer : un robot qui reçoit une erreur réessaie, un robot qui reçoit
 * un succès s'en va.
 */
export async function submitQuote(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = Object.fromEntries(formData) as Record<string, string>

  // 1. Champ piège — silencieux et indistinguable d'un succès.
  if (raw.website) {
    return { status: 'success', delivered: false }
  }

  // 2. Validation. Un seul schéma, partagé avec le formulaire.
  const parsed = quoteSchema.safeParse(raw)
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

  // 3. Turnstile.
  if (!(await verifyTurnstile(input.turnstileToken, ip))) {
    return { status: 'error', message: 'La vérification anti-robot a échoué. Rechargez la page et réessayez.' }
  }

  // 4. Limitation de débit. Ne se desserre jamais, pas même pour un test.
  sweep()
  const limit = rateLimit(callerKey(requestHeaders, 'devis'))
  if (!limit.ok) {
    return {
      status: 'error',
      message: `Trop de demandes envoyées. Réessayez dans ${Math.ceil(limit.retryAfter / 60)} minutes, ou appelez le ${CONTACT.phone}.`,
    }
  }

  const service = serviceBySlug(input.service)
  const rows: readonly (readonly [string, string])[] = [
    ['Type de transport', service?.title ?? input.service],
    ['Matériau ou engin', input.material],
    ['Tonnage ou volume', input.quantity ?? ''],
    ['Fréquence', FREQUENCY_LABELS[input.frequency]],
    ['Origine', input.origin],
    ['Destination', input.destination],
    ['Date de début', input.startDate],
    ['Fenêtre horaire', input.timeWindow ?? ''],
    ['Contraintes d’accès', input.accessNotes ?? ''],
    ['Société', input.company],
    ['Nom', input.name],
    ['Fonction', input.role ?? ''],
    ['Téléphone', input.phone],
    ['E-mail', input.email ?? ''],
    ['Message', input.message ?? ''],
  ]

  const toDispatch = summaryEmail(
    `Demande de devis — ${service?.title ?? input.service}`,
    rows,
    'Demande envoyée depuis le site transpoleq.ma.',
  )

  const dispatchResult = await sendMail({
    to: process.env.MAIL_TO_DISPATCH ?? 'dispatch@transpoleq.ma',
    subject: `Devis — ${input.company} — ${service?.title ?? input.service}`,
    html: toDispatch.html,
    text: toDispatch.text,
    replyTo: input.email,
  })

  if (!dispatchResult.ok) {
    return {
      status: 'error',
      message: `L’envoi a échoué. Réessayez ou appelez le ${CONTACT.phone}.`,
    }
  }

  // Réponse automatique — seulement si l'on a une adresse. On ne promet un
  // rappel que si le délai a été fourni.
  if (input.email) {
    const ack = summaryEmail(
      'Votre demande de devis',
      rows.filter(([label]) => !['Message'].includes(label)),
      `Un dispatcher vous rappelle sous ${ph('DELAI_RAPPEL')}.`,
    )
    await sendMail({
      to: input.email,
      subject: 'TRANSPOLEQ — votre demande de devis',
      html: ack.html,
      text: ack.text,
    })
  }

  return { status: 'success', delivered: dispatchResult.delivered }
}
