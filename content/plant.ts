import { plantSchema } from "./schema";

/**
 * Plant data sheet. Every default here mirrors the master prompt; nulls and
 * "[…]" markers are unfilled data tracked in TODO.md. Values render verbatim,
 * so a missing datum is visible, never silently invented.
 */
export const plant = plantSchema.parse({
  legalName: "AleqFactory",
  city: { fr: "[Ville]", en: "[City]", ar: "[المدينة]" },
  gps: null,
  plantType: {
    fr: "Centrale discontinue (batch)",
    en: "Batch plant",
    ar: "محطة إنتاج متقطع",
  },
  capacityTph: 160,
  hotStorageT: 100,
  bitumenGrades: ["40/50", "35/50"],
  coldFeedCount: 5,
  deliveryRadiusKm: 120,
  deliveryRadiusH: 2,
  externalControl: "LPEE",
  opensAt: "05:30",
  domain: "aleqfactory.ma",
  contacts: {
    commercialEmail: null,
    planningPhone: null,
    labEmail: null,
    whatsapp: null,
  },
  identifiers: {
    ice: null,
    rc: null,
    if: null,
    patente: null,
    cnss: null,
  },
});
