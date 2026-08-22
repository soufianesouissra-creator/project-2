import { z } from "zod";
import { localizedSchema, type Localized } from "./schema";

const equipmentSchema = z.object({
  name: localizedSchema,
  /** Mono detail: a count, a capacity, or "[à compléter]". */
  detail: z.string(),
});
export type Equipment = z.infer<typeof equipmentSchema>;

/** Equipment list from the master prompt — details to fill (TODO.md). */
export const equipment: Equipment[] = z.array(equipmentSchema).parse([
  {
    name: { fr: "Prédoseurs", en: "Cold feeders", ar: "الموزّعات" },
    detail: "5 ×",
  },
  {
    name: { fr: "Tambour sécheur", en: "Drying drum", ar: "أسطوانة التجفيف" },
    detail: "[marque/modèle]",
  },
  {
    name: { fr: "Filtre à manches", en: "Baghouse filter", ar: "مرشّح الأكياس" },
    detail: "[surface filtrante]",
  },
  {
    name: { fr: "Criblage à chaud", en: "Hot screening", ar: "الغربلة الساخنة" },
    detail: "[nb de coupures]",
  },
  {
    name: {
      fr: "Trémies de pesage",
      en: "Weighing hoppers",
      ar: "قواديس الوزن",
    },
    detail: "granulats · filler · bitume",
  },
  {
    name: { fr: "Malaxeur", en: "Mixer", ar: "الخلاطة" },
    detail: "[capacité de gâchée]",
  },
  {
    name: {
      fr: "Trémies de stockage à chaud",
      en: "Hot storage silos",
      ar: "قواديس التخزين الساخن",
    },
    detail: "100 t",
  },
  {
    name: {
      fr: "Citernes bitume à huile thermique",
      en: "Thermal-oil bitumen tanks",
      ar: "خزانات البيتومين بالزيت الحراري",
    },
    detail: "40/50 · 35/50 — [capacité]",
  },
  {
    name: { fr: "Silo filler", en: "Filler silo", ar: "صومعة الفيلر" },
    detail: "[capacité]",
  },
  {
    name: { fr: "Pont-bascule", en: "Weighbridge", ar: "الجسر القبّاني" },
    detail: "bon numéroté par chargement",
  },
]);

const timelineSchema = z.object({
  year: z.string(),
  event: localizedSchema,
});
export type TimelineEntry = z.infer<typeof timelineSchema>;

/** True sequence — numbering allowed (DESIGN.md §4.7). Placeholders. */
export const timeline: TimelineEntry[] = z.array(timelineSchema).parse([
  {
    year: "[20xx]",
    event: {
      fr: "[Décision d'implantation et travaux — à documenter]",
      en: "[Site decision and works — to document]",
    },
  },
  {
    year: "[20xx]",
    event: {
      fr: "[Montage de la centrale et premiers essais — à documenter]",
      en: "[Plant erection and first trials — to document]",
    },
  },
  {
    year: "[20xx]",
    event: {
      fr: "[Première tonne livrée — à documenter]",
      en: "[First tonne delivered — to document]",
    },
  },
]);

/** The plant's trades — names arrive with content/team.ts (TODO.md). */
export const roles: Localized[] = z.array(localizedSchema).parse([
  { fr: "Chef de centrale", en: "Plant manager", ar: "رئيس المحطة" },
  { fr: "Opérateur de cabine", en: "Control-room operator", ar: "مشغّل القمرة" },
  { fr: "Laborantin", en: "Lab technician", ar: "تقني مختبر" },
  {
    fr: "Conducteur de chargeuse",
    en: "Loader operator",
    ar: "سائق المحمّلة",
  },
  { fr: "Régleur finisseur", en: "Paver screed operator", ar: "ضابط الفرّاشة" },
]);

/** Gallery shot briefs — replaced 1:1 by the SHOTLIST.md photographs. */
export const gallery: { shot: string; label: string }[] = [
  { shot: "SHOTLIST 01", label: "tour à l'aube, grand angle" },
  { shot: "SHOTLIST 03", label: "premier chargement sous le silo" },
  { shot: "SHOTLIST 05", label: "cabine de commande, opérateur" },
  { shot: "SHOTLIST 09", label: "jauges des citernes bitume" },
  { shot: "SHOTLIST 11", label: "vue drone de la centrale" },
  { shot: "SHOTLIST 14", label: "file de camions, 05:30" },
];

/** Lab bench — details to confirm with the laborantin (TODO.md). */
export const labEquipment: Localized[] = z.array(localizedSchema).parse([
  { fr: "Presse Duriez", en: "Duriez press", ar: "مكبس Duriez" },
  {
    fr: "Presse à cisaillement giratoire (PCG)",
    en: "Gyratory compactor",
    ar: "مكبس الدوران (PCG)",
  },
  { fr: "Série de tamis", en: "Sieve stack", ar: "سلسلة مناخل" },
  { fr: "Étuves", en: "Ovens", ar: "أفران تجفيف" },
  {
    fr: "Extracteur de liant",
    en: "Binder extraction unit",
    ar: "جهاز استخلاص الرابط",
  },
  {
    fr: "Balances de précision",
    en: "Precision balances",
    ar: "موازين دقيقة",
  },
]);
