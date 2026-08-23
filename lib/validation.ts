import { z } from 'zod'

/**
 * Schémas d'entrée — UNE définition par donnée, partagée entre le formulaire
 * et la Server Action. Deux définitions de la même donnée divergent toujours,
 * et c'est le serveur qui a raison au mauvais moment.
 *
 * Les messages sont en français : ce sont eux qui s'affichent sous le champ.
 */

const REQUIRED = 'Ce champ est requis.'

/**
 * Téléphone marocain, saisi comme les gens l'écrivent : 0612345678,
 * 06 12 34 56 78, +212 6 12 34 56 78. On normalise avant de valider plutôt
 * que d'imposer un format à quelqu'un qui tape sur un chantier.
 */
export const phoneSchema = z
  .string()
  .trim()
  .min(1, REQUIRED)
  .transform((value) => value.replace(/[\s.\-()]/g, ''))
  .refine((value) => /^(?:\+212|00212|0)[5-7]\d{8}$/.test(value), {
    message: 'Indiquez un numéro de téléphone valide (ex. 06 12 34 56 78).',
  })

export const emailSchema = z
  .string()
  .trim()
  .email('Indiquez une adresse e-mail valide.')

export const optionalEmailSchema = z
  .union([z.literal(''), emailSchema])
  .transform((value) => (value === '' ? undefined : value))

const shortText = (max = 120) => z.string().trim().min(1, REQUIRED).max(max, `Maximum ${max} caractères.`)
const longText = (max = 2000) => z.string().trim().max(max, `Maximum ${max} caractères.`)

/** Champ piège. Rempli = robot : on répond « envoyé » sans rien envoyer. */
export const honeypotSchema = z.string().max(0).optional().or(z.literal(''))

export const SERVICE_SLUGS = [
  'materiaux-vrac',
  'enrobes-a-chaud',
  'transport-exceptionnel',
  'citernes',
  'camions-avec-chauffeur',
  'logistique-chantier',
] as const

export const FREQUENCIES = ['ponctuel', 'recurrent', 'mise-a-disposition'] as const

export const FREQUENCY_LABELS: Record<(typeof FREQUENCIES)[number], string> = {
  ponctuel: 'Ponctuel',
  recurrent: 'Récurrent',
  'mise-a-disposition': 'Mise à disposition',
}

/** Devis — les trois étapes réunies, validées d'un bloc côté serveur. */
export const quoteSchema = z.object({
  // Étape 1 — le transport
  service: z.enum(SERVICE_SLUGS, { message: 'Choisissez un type de transport.' }),
  material: shortText(160),
  quantity: longText(120).optional(),
  frequency: z.enum(FREQUENCIES, { message: 'Choisissez une fréquence.' }),
  // Étape 2 — le trajet
  origin: shortText(160),
  destination: shortText(160),
  startDate: z
    .string()
    .trim()
    .min(1, REQUIRED)
    .refine((value) => !Number.isNaN(Date.parse(value)), { message: 'Indiquez une date valide.' }),
  timeWindow: longText(160).optional(),
  accessNotes: longText(1000).optional(),
  // Étape 3 — vos coordonnées
  company: shortText(160),
  name: shortText(120),
  role: longText(120).optional(),
  phone: phoneSchema,
  email: optionalEmailSchema,
  message: longText(2000).optional(),
  // Anti-spam
  website: honeypotSchema,
  turnstileToken: z.string().optional(),
})

export type QuoteInput = z.infer<typeof quoteSchema>

/** Contact — volontairement court. Un formulaire long fait fuir. */
export const contactSchema = z.object({
  name: shortText(120),
  company: longText(160).optional(),
  phone: phoneSchema,
  message: z.string().trim().min(1, REQUIRED).max(2000, 'Maximum 2000 caractères.'),
  email: optionalEmailSchema,
  website: honeypotSchema,
  turnstileToken: z.string().optional(),
})

export type ContactInput = z.infer<typeof contactSchema>

export const CV_MAX_BYTES = 5 * 1024 * 1024

/** Candidature (Phase 2). Le CV est revérifié côté serveur, `accept` ne protège rien. */
export const applicationSchema = z.object({
  name: shortText(120),
  phone: phoneSchema,
  email: optionalEmailSchema,
  position: longText(160).optional(),
  licences: longText(200).optional(),
  message: longText(2000).optional(),
  website: honeypotSchema,
  turnstileToken: z.string().optional(),
})

export type ApplicationInput = z.infer<typeof applicationSchema>

/**
 * Erreurs par champ, dans la forme que les composants de formulaire attendent.
 */
export type FieldErrors = Record<string, string>

export function fieldErrorsFrom(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {}
  for (const issue of error.issues) {
    const key = issue.path[0]
    if (typeof key === 'string' && !out[key]) out[key] = issue.message
  }
  return out
}
