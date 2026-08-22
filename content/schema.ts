import { z } from "zod";

/**
 * Content is typed and validated at module load: a data file that does not
 * match its schema fails the build, not the visitor. Components read these
 * types only — a headless CMS can later replace /content without touching
 * any component (see CONTENT.md).
 */

/** UI-visible content string, per locale. AR is optional until Phase 2. */
export const localizedSchema = z.object({
  fr: z.string().min(1),
  en: z.string().min(1),
  ar: z.string().min(1).optional(),
});
export type Localized = z.infer<typeof localizedSchema>;

export const layerSchema = z.enum([
  "roulement",
  "liaison",
  "assise",
  "entretien",
]);
export type Layer = z.infer<typeof layerSchema>;

export const productSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  /** Technical designation — identical in every language (BBSG 0/10). */
  name: z.string().min(1),
  norm: z.string().min(1),
  layer: layerSchema,
  granularity: z.string().min(1),
  /** e.g. "classe 2 / 3" — omitted when the norm does not class the mix. */
  classes: z.string().optional(),
  binder: z.string().min(1),
  tempManufacture: z.string().min(1),
  tempLaying: z.string().min(1),
  /** Usual thickness, e.g. "5–7 cm". */
  thickness: z.string().optional(),
  usage: localizedSchema,
  strengths: z.array(localizedSchema).min(1),
  /** Shown among the six cards on the Accueil. */
  featured: z.boolean().default(false),
  /** Path under /public/docs once the PDF exists. */
  datasheet: z.string().optional(),
});
export type Product = z.infer<typeof productSchema>;

export const thermalStageSchema = z.object({
  id: z.string(),
  label: localizedSchema,
  /** Mono readout, e.g. "160 °C" or "AMBIANT". */
  readout: localizedSchema,
  description: localizedSchema,
});
export type ThermalStage = z.infer<typeof thermalStageSchema>;

export const labTestSchema = z.object({
  id: z.string(),
  name: localizedSchema,
  norm: z.string().min(1),
  frequency: localizedSchema,
  /** The three Accueil test cards. */
  featured: z.boolean().default(false),
});
export type LabTest = z.infer<typeof labTestSchema>;

export const serviceSchema = z.object({
  id: z.string(),
  name: localizedSchema,
  summary: localizedSchema,
});
export type Service = z.infer<typeof serviceSchema>;

export const teamMemberSchema = z.object({
  name: z.string().min(1),
  role: localizedSchema,
});
export type TeamMember = z.infer<typeof teamMemberSchema>;

export const jobSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: localizedSchema,
  location: localizedSchema,
  description: localizedSchema,
  open: z.boolean().default(true),
});
export type Job = z.infer<typeof jobSchema>;

export const faqSchema = z.object({
  id: z.string(),
  question: localizedSchema,
  answer: localizedSchema,
});
export type Faq = z.infer<typeof faqSchema>;

export const plantSchema = z.object({
  legalName: z.string(),
  city: localizedSchema,
  /** null until real coordinates are provided (TODO.md) — blocks map + schema.org. */
  gps: z.tuple([z.number(), z.number()]).nullable(),
  plantType: localizedSchema,
  capacityTph: z.number().positive(),
  hotStorageT: z.number().positive(),
  bitumenGrades: z.array(z.string()).min(1),
  coldFeedCount: z.number().int().positive(),
  deliveryRadiusKm: z.number().positive(),
  deliveryRadiusH: z.number().positive(),
  externalControl: z.string(),
  opensAt: z.string(),
  domain: z.string(),
  contacts: z.object({
    commercialEmail: z.string().nullable(),
    planningPhone: z.string().nullable(),
    labEmail: z.string().nullable(),
    whatsapp: z.string().nullable(),
  }),
  identifiers: z.object({
    ice: z.string().nullable(),
    rc: z.string().nullable(),
    if: z.string().nullable(),
    patente: z.string().nullable(),
    cnss: z.string().nullable(),
  }),
});
export type Plant = z.infer<typeof plantSchema>;
