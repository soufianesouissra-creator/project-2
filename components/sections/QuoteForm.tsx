'use client'

import { useActionState, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { submitQuote } from '@/app/actions/quote'
import { IDLE } from '@/app/actions/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Stepper } from '@/components/ui/Stepper'
import { Honeypot, Turnstile } from './Turnstile'

import {
  FREQUENCIES,
  FREQUENCY_LABELS,
  fieldErrorsFrom,
  quoteSchema,
  type FieldErrors,
} from '@/lib/validation'
import { getContent } from '@/lib/content'
import { useLocale } from 'next-intl'
import { ph } from '@/content/placeholders'
import { cn } from '@/lib/cn'

const STEPS = ['Le transport', 'Le trajet', 'Vos coordonnées'] as const

type FieldName =
  | 'service' | 'material' | 'quantity' | 'frequency'
  | 'origin' | 'destination' | 'startDate' | 'timeWindow' | 'accessNotes'
  | 'company' | 'name' | 'role' | 'phone' | 'email' | 'message'

const STEP_FIELDS: readonly (readonly FieldName[])[] = [
  ['service', 'material', 'quantity', 'frequency'],
  ['origin', 'destination', 'startDate', 'timeWindow', 'accessNotes'],
  ['company', 'name', 'role', 'phone', 'email', 'message'],
]

/**
 * Validation d'étape DÉRIVÉE du schéma serveur, jamais réécrite à côté.
 * Deux définitions de la même règle divergent, et c'est toujours
 * l'utilisateur qui l'apprend en dernier.
 */
const STEP_SCHEMAS = [
  quoteSchema.pick({ service: true, material: true, quantity: true, frequency: true }),
  quoteSchema.pick({ origin: true, destination: true, startDate: true, timeWindow: true, accessNotes: true }),
  quoteSchema.pick({ company: true, name: true, role: true, phone: true, email: true, message: true }),
] as const

const EMPTY: Record<FieldName, string> = {
  service: '', material: '', quantity: '', frequency: '',
  origin: '', destination: '', startDate: '', timeWindow: '', accessNotes: '',
  company: '', name: '', role: '', phone: '', email: '', message: '',
}

/**
 * Formulaire de devis en trois étapes (§6.10).
 *
 * TOUS les champs sont CONTRÔLÉS, et l'état vit dans React — comme le brief
 * l'impose, et sans `localStorage` : une demande à moitié remplie n'a pas à
 * survivre à la fermeture de l'onglet.
 *
 * Ce n'est pas un choix de style. Avec des champs non contrôlés, la saisie des
 * étapes 1 et 2 se VIDAIT au passage à l'étape suivante — les nœuds du DOM
 * restaient les mêmes, mais leurs valeurs étaient remises à zéro, et le serveur
 * recevait une demande amputée de son trajet et de sa fréquence. Un état React
 * unique rend la panne impossible plutôt que de la corriger.
 *
 * Les trois étapes restent MONTÉES en permanence, seules les inactives sont
 * masquées : c'est ce qui permet à un seul `FormData` de tout porter à l'envoi.
 */
export function QuoteForm() {
  const locale = useLocale()
  const { SERVICE_OPTIONS } = getContent(locale)
  const params = useSearchParams()
  const [state, action, pending] = useActionState(submitQuote, IDLE)
  const [step, setStep] = useState(0)
  const [clientErrors, setClientErrors] = useState<FieldErrors>({})

  const [values, setValues] = useState<Record<FieldName, string>>(() => ({
    ...EMPTY,
    // Préremplissage depuis la bande de l'accueil ou une page de service.
    service: params.get('service') ?? '',
    material: params.get('material') ?? '',
    phone: params.get('phone') ?? '',
  }))

  // Une erreur serveur ramène à la première étape fautive : afficher
  // « corrigez certains champs » en restant sur une étape où tout est vert
  // est une impasse.
  useEffect(() => {
    if (state.status !== 'error' || !state.errors) return
    const first = STEP_FIELDS.findIndex((fields) => fields.some((field) => state.errors?.[field]))
    if (first >= 0) setStep(first)
  }, [state])

  if (state.status === 'success') {
    return <QuoteSuccess delivered={state.delivered ?? false} />
  }

  const set = (field: FieldName) => (event: { target: { value: string } }) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
    // Corriger un champ efface son erreur : laisser un message rouge sous un
    // champ qu'on vient de réparer est une petite trahison.
    setClientErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const errorFor = (field: FieldName) => clientErrors[field] ?? state.errors?.[field]

  function goNext() {
    const result = STEP_SCHEMAS[step]?.safeParse(values)
    if (result && !result.success) {
      const errors = fieldErrorsFrom(result.error)
      setClientErrors(errors)
      // Le premier champ fautif reçoit le focus : sur un téléphone, l'erreur
      // peut être hors écran.
      const first = STEP_FIELDS[step]?.find((field) => errors[field])
      if (first) document.getElementById(first)?.focus()
      return
    }
    setClientErrors({})
    setStep((current) => current + 1)
  }

  function goBack() {
    setClientErrors({})
    setStep((current) => current - 1)
  }

  return (
    /* `noValidate` : la validation native refuse d'envoyer un formulaire dont
       un champ requis est masqué — nos étapes inactives le sont — et échoue en
       silence avec « invalid form control is not focusable ». Et ses messages
       s'affichent dans la langue du navigateur, pas dans celle du site. Toute
       la validation passe donc par le MÊME schéma zod. */
    <form action={action} noValidate className="relative max-w-3xl">
      <Honeypot />
      <Stepper steps={[...STEPS]} current={step} className="mb-10" />

      <fieldset className={cn('flex flex-col gap-6', step !== 0 && 'hidden')}>
        <legend className="sr-only">{STEPS[0]}</legend>
        <Select
          id="service"
          label="Type de transport"
          required
          placeholder="Choisir un service"
          options={SERVICE_OPTIONS}
          value={values.service}
          onChange={set('service')}
          error={errorFor('service')}
        />
        <Input
          id="material"
          label="Matériau ou engin"
          required
          placeholder="GNT 0/31,5, enrobé EB 0/10, pelle 22 t…"
          value={values.material}
          onChange={set('material')}
          error={errorFor('material')}
        />
        <Input
          id="quantity"
          label="Tonnage ou volume"
          placeholder="1 200 t, 30 m³, 4 rotations par jour…"
          hint="Une estimation suffit. Le dispatch affine avec vous."
          value={values.quantity}
          onChange={set('quantity')}
          error={errorFor('quantity')}
        />
        <Select
          id="frequency"
          label="Fréquence"
          required
          placeholder="Choisir une fréquence"
          options={FREQUENCIES.map((value) => ({ value, label: FREQUENCY_LABELS[value] }))}
          value={values.frequency}
          onChange={set('frequency')}
          error={errorFor('frequency')}
        />
      </fieldset>

      <fieldset className={cn('flex flex-col gap-6', step !== 1 && 'hidden')}>
        <legend className="sr-only">{STEPS[1]}</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <Input id="origin" label="Origine" required placeholder="Carrière, centrale, dépôt…" value={values.origin} onChange={set('origin')} error={errorFor('origin')} />
          <Input id="destination" label="Destination" required placeholder="Chantier, plateforme, site…" value={values.destination} onChange={set('destination')} error={errorFor('destination')} />
          <Input id="startDate" label="Date de début" type="date" required value={values.startDate} onChange={set('startDate')} error={errorFor('startDate')} />
          <Input id="timeWindow" label="Fenêtre horaire" placeholder="07h–17h, nuit, week-end…" value={values.timeWindow} onChange={set('timeWindow')} error={errorFor('timeWindow')} />
        </div>
        <Textarea
          id="accessNotes"
          label="Contraintes d’accès"
          rows={4}
          hint="Largeur de piste, pente, portance, horaires de chantier, présence d’un pont bascule."
          value={values.accessNotes}
          onChange={set('accessNotes')}
          error={errorFor('accessNotes')}
        />
      </fieldset>

      <fieldset className={cn('flex flex-col gap-6', step !== 2 && 'hidden')}>
        <legend className="sr-only">{STEPS[2]}</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <Input id="company" label="Société" required autoComplete="organization" value={values.company} onChange={set('company')} error={errorFor('company')} />
          <Input id="name" label="Nom" required autoComplete="name" value={values.name} onChange={set('name')} error={errorFor('name')} />
          <Input id="role" label="Fonction" placeholder="Chef de projet, acheteur…" value={values.role} onChange={set('role')} error={errorFor('role')} />
          <Input id="phone" label="Téléphone" type="tel" inputMode="tel" required autoComplete="tel" placeholder="06 12 34 56 78" value={values.phone} onChange={set('phone')} error={errorFor('phone')} />
        </div>
        <Input
          id="email"
          label="E-mail"
          type="email"
          autoComplete="email"
          hint="Facultatif. Sans e-mail, la confirmation vous arrive par téléphone."
          value={values.email}
          onChange={set('email')}
          error={errorFor('email')}
        />
        <Textarea id="message" label="Message" rows={4} value={values.message} onChange={set('message')} error={errorFor('message')} />
        <div className="mt-2">
          <Turnstile />
        </div>
      </fieldset>

      {state.status === 'error' && state.message ? (
        <p role="alert" className="text-signal mt-8 font-mono text-sm">
          {state.message}
        </p>
      ) : null}

      <div className="border-ink/10 mt-10 flex flex-wrap items-center gap-3 border-t pt-8">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={goBack}>
            Retour
          </Button>
        ) : null}

        {step < STEPS.length - 1 ? (
          <Button type="button" size="lg" onClick={goNext}>
            Étape suivante
          </Button>
        ) : (
          <Button type="submit" size="lg" disabled={pending}>
            {pending ? 'Envoi…' : 'Envoyer la demande'}
          </Button>
        )}

        <p className="text-mist-ink ms-auto font-mono text-xs">
          Étape {step + 1} sur {STEPS.length}
        </p>
      </div>
    </form>
  )
}

function QuoteSuccess({ delivered }: { readonly delivered: boolean }) {
  const locale = useLocale()
  const { CONTACT } = getContent(locale)
  return (
    <div className="max-w-2xl" role="status">
      <p className="eyebrow text-mist-ink">Demande envoyée</p>
      <h2 className="font-display font-expanded text-ink mt-4 text-3xl font-bold">Demande envoyée.</h2>
      <span aria-hidden className="marking-line-x my-7 block w-full max-w-sm" />
      <p className="text-ink/80 text-lg">Un dispatcher vous rappelle sous {ph('DELAI_RAPPEL')}.</p>
      <p className="text-mist-ink mt-4 font-mono text-sm">
        Besoin d’une réponse immédiate : {CONTACT.phone}
      </p>
      {!delivered ? (
        <p className="border-signal text-signal mt-8 border-s-2 ps-4 font-mono text-xs">
          Mode test : aucune clé Resend n’est configurée, donc aucun e-mail n’est réellement parti.
          La demande a été journalisée côté serveur.
        </p>
      ) : null}
    </div>
  )
}
