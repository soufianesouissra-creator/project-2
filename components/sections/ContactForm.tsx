'use client'

import { useActionState, useState } from 'react'
import { submitContact } from '@/app/actions/contact'
import { IDLE } from '@/app/actions/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Honeypot, Turnstile } from './Turnstile'
import { CONTACT } from '@/content/fr/site'

type FieldName = 'name' | 'company' | 'phone' | 'email' | 'message'

const EMPTY: Record<FieldName, string> = { name: '', company: '', phone: '', email: '', message: '' }

/**
 * Formulaire de contact (§6.10).
 *
 * Quatre champs. Un formulaire de contact long est un formulaire de contact
 * vide : qui a une question précise appelle, les autres écrivent trois lignes.
 *
 * Champs CONTRÔLÉS, pour la même raison que le devis : React remet un
 * formulaire à zéro quand son action se termine, y compris quand elle se
 * termine par un refus. Un visiteur dont le numéro est rejeté perdait le
 * message qu'il venait d'écrire — et ne le réécrivait pas.
 */
export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, IDLE)
  const [values, setValues] = useState<Record<FieldName, string>>(EMPTY)

  const set = (field: FieldName) => (event: { target: { value: string } }) =>
    setValues((current) => ({ ...current, [field]: event.target.value }))

  if (state.status === 'success') {
    return (
      <div role="status" className="max-w-xl">
        <p className="eyebrow text-mist">Message envoyé</p>
        <h2 className="font-display font-expanded text-ink mt-4 text-2xl font-bold">
          Message envoyé.
        </h2>
        <p className="text-ink/80 mt-4">Nous vous répondons aux heures du dispatch.</p>
        {!state.delivered ? (
          <p className="border-signal text-signal mt-6 border-s-2 ps-4 font-mono text-xs">
            Mode test : aucune clé Resend n’est configurée, donc aucun e-mail n’est réellement parti.
          </p>
        ) : null}
      </div>
    )
  }

  return (
    /* `noValidate` : les messages de validation natifs s'affichent dans la
       langue du navigateur, pas dans celle du site. Le schéma zod du serveur
       rend les mêmes règles en français. */
    <form action={action} noValidate className="relative flex max-w-xl flex-col gap-6">
      <Honeypot />
      <div className="grid gap-6 sm:grid-cols-2">
        <Input id="name" label="Nom" required autoComplete="name" value={values.name} onChange={set('name')} error={state.errors?.name} />
        <Input id="company" label="Société" autoComplete="organization" value={values.company} onChange={set('company')} error={state.errors?.company} />
      </div>
      <Input
        id="phone"
        label="Téléphone"
        type="tel"
        inputMode="tel"
        required
        autoComplete="tel"
        placeholder="06 12 34 56 78"
        value={values.phone}
        onChange={set('phone')}
        error={state.errors?.phone}
      />
      <Input
        id="email"
        label="E-mail"
        type="email"
        autoComplete="email"
        hint="Facultatif."
        value={values.email}
        onChange={set('email')}
        error={state.errors?.email}
      />
      <Textarea id="message" label="Message" required rows={5} value={values.message} onChange={set('message')} error={state.errors?.message} />

      <Turnstile />

      {state.status === 'error' && state.message ? (
        <p role="alert" className="text-signal font-mono text-sm">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? 'Envoi…' : 'Envoyer le message'}
        </Button>
        <p className="text-mist font-mono text-xs">Ou appelez le {CONTACT.phone}</p>
      </div>
    </form>
  )
}
