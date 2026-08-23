'use client'

import { useActionState, useState } from 'react'
import { submitApplication } from '@/app/actions/application'
import { IDLE } from '@/app/actions/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { FileInput } from '@/components/ui/FileInput'
import { Honeypot, Turnstile } from './Turnstile'
import { CV_MAX_BYTES } from '@/lib/validation'
import { getContent } from '@/lib/content'
import { useLocale } from 'next-intl'

type FieldName = 'name' | 'phone' | 'email' | 'position' | 'licences' | 'message'

const EMPTY: Record<FieldName, string> = {
  name: '', phone: '', email: '', position: '', licences: '', message: '',
}

/**
 * Candidature spontanée (§6.9).
 *
 * Pensé pour un chauffeur qui postule depuis son téléphone, debout : peu de
 * champs, gros boutons, le CV facultatif. Exiger un PDF à quelqu'un qui n'a que
 * son téléphone, c'est se priver de candidats.
 *
 * Champs contrôlés, comme les deux autres formulaires : React remet un
 * formulaire à zéro quand son action se termine, refus compris.
 */
export function ApplicationForm({ positions }: { readonly positions?: readonly string[] }) {
  const locale = useLocale()
  const { CONTACT } = getContent(locale)
  const [state, action, pending] = useActionState(submitApplication, IDLE)
  const [values, setValues] = useState<Record<FieldName, string>>(EMPTY)
  const [fileError, setFileError] = useState<string>()

  const set = (field: FieldName) => (event: { target: { value: string } }) =>
    setValues((current) => ({ ...current, [field]: event.target.value }))

  if (state.status === 'success') {
    return (
      <div role="status" className="max-w-xl">
        <p className="eyebrow text-mist-ink">Candidature envoyée</p>
        <h2 className="font-display font-expanded text-ink mt-4 text-2xl font-bold">
          Candidature envoyée.
        </h2>
        <p className="text-ink/80 mt-4">
          Les ressources humaines reviennent vers vous. Gardez votre téléphone joignable.
        </p>
        {!state.delivered ? (
          <p className="border-signal text-signal mt-6 border-s-2 ps-4 font-mono text-xs">
            Mode test : aucune clé Resend n’est configurée, donc aucun e-mail n’est réellement parti.
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <form action={action} noValidate className="relative flex max-w-xl flex-col gap-6">
      <Honeypot />

      <Input id="name" label="Nom et prénom" required autoComplete="name" value={values.name} onChange={set('name')} error={state.errors?.name} />
      <Input
        id="phone"
        label="Téléphone"
        type="tel"
        inputMode="tel"
        required
        autoComplete="tel"
        placeholder="06 12 34 56 78"
        hint="C’est par là que les RH vous rappellent."
        value={values.phone}
        onChange={set('phone')}
        error={state.errors?.phone}
      />
      <Input id="email" label="E-mail" type="email" autoComplete="email" hint="Facultatif." value={values.email} onChange={set('email')} error={state.errors?.email} />

      {positions && positions.length > 0 ? (
        <Input
          id="position"
          label="Poste visé"
          list="postes"
          value={values.position}
          onChange={set('position')}
          error={state.errors?.position}
        />
      ) : (
        <Input
          id="position"
          label="Poste visé"
          placeholder="Chauffeur SPL, mécanicien, dispatcher…"
          value={values.position}
          onChange={set('position')}
          error={state.errors?.position}
        />
      )}
      {positions && positions.length > 0 ? (
        <datalist id="postes">
          {positions.map((position) => (
            <option key={position} value={position} />
          ))}
        </datalist>
      ) : null}

      <Input
        id="licences"
        label="Permis et habilitations"
        placeholder="C, CE, FIMO, ADR…"
        value={values.licences}
        onChange={set('licences')}
        error={state.errors?.licences}
      />
      <Textarea
        id="message"
        label="Message"
        rows={4}
        hint="Votre expérience en quelques lignes suffit."
        value={values.message}
        onChange={set('message')}
        error={state.errors?.message}
      />

      <FileInput
        id="cv"
        label="CV"
        hint="Facultatif — PDF, 5 Mo maximum. Sans CV, décrivez votre expérience ci-dessus."
        error={fileError ?? state.errors?.cv}
        onChange={(event) => {
          // Contrôle de confort : le serveur revérifie type ET taille.
          const file = event.currentTarget.files?.[0]
          if (!file) return setFileError(undefined)
          if (file.type !== 'application/pdf') return setFileError('Format accepté : PDF.')
          if (file.size > CV_MAX_BYTES) return setFileError('Le fichier dépasse 5 Mo.')
          setFileError(undefined)
        }}
      />

      <Turnstile />

      {state.status === 'error' && state.message ? (
        <p role="alert" className="text-signal font-mono text-sm">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? 'Envoi…' : 'Postuler'}
        </Button>
        <p className="text-mist-ink font-mono text-xs">Ou appelez le {CONTACT.phone}</p>
      </div>
    </form>
  )
}
