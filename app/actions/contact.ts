'use server'

import { headers } from 'next/headers'
import { contactSchema, fieldErrorsFrom } from '@/lib/validation'
import { callerKey, rateLimit, sweep } from '@/lib/rate-limit'
import { verifyTurnstile } from '@/lib/turnstile'
import { sendMail, summaryEmail } from '@/lib/mail'
import { CONTACT } from '@/content/fr/site'
import type { FormState } from './types'

/** Message de contact. Même enchaînement que le devis, formulaire plus court. */
export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = Object.fromEntries(formData) as Record<string, string>

  if (raw.website) return { status: 'success', delivered: false }

  const parsed = contactSchema.safeParse(raw)
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
  const limit = rateLimit(callerKey(requestHeaders, 'contact'))
  if (!limit.ok) {
    return {
      status: 'error',
      message: `Trop de messages envoyés. Réessayez dans ${Math.ceil(limit.retryAfter / 60)} minutes, ou appelez le ${CONTACT.phone}.`,
    }
  }

  const mail = summaryEmail('Message depuis le site', [
    ['Nom', input.name],
    ['Société', input.company ?? ''],
    ['Téléphone', input.phone],
    ['E-mail', input.email ?? ''],
    ['Message', input.message],
  ])

  const result = await sendMail({
    to: process.env.MAIL_TO_DISPATCH ?? 'dispatch@transpoleq.ma',
    subject: `Contact — ${input.name}`,
    html: mail.html,
    text: mail.text,
    replyTo: input.email,
  })

  if (!result.ok) {
    return { status: 'error', message: `L’envoi a échoué. Réessayez ou appelez le ${CONTACT.phone}.` }
  }

  return { status: 'success', delivered: result.delivered }
}
