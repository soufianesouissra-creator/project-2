import { productSchema, type Layer, type Product } from "./schema";
import { z } from "zod";

/**
 * Default product list from the master prompt — to adjust to plant reality
 * (TODO.md). No emulsion unit assumed: grave émulsion is excluded from v1.
 */
export const products: Product[] = z.array(productSchema).parse([
  {
    slug: "bbsg-0-10",
    name: "BBSG 0/10",
    norm: "NM EN 13108-1",
    layer: "roulement",
    granularity: "0/10",
    classes: "classe [3]",
    binder: "40/50 · 35/50",
    tempManufacture: "150–[165] °C",
    tempLaying: "≥ 135 °C",
    thickness: "5–7 cm",
    featured: true,
    usage: {
      fr: "Béton bitumineux semi-grenu pour couches de roulement. Trafic [T3 à T1].",
      en: "Semi-coarse asphalt concrete for wearing courses. Traffic [T3 to T1].",
    },
    strengths: [
      {
        fr: "Macrotexture et adhérence de surface",
        en: "Surface macrotexture and skid resistance",
      },
      {
        fr: "Compacité PCG conforme à l'étude de formulation",
        en: "Gyratory compaction to the approved mix design",
      },
    ],
  },
  {
    slug: "bbsg-0-14",
    name: "BBSG 0/14",
    norm: "NM EN 13108-1",
    layer: "roulement",
    granularity: "0/14",
    classes: "classe [3]",
    binder: "40/50 · 35/50",
    tempManufacture: "150–[165] °C",
    tempLaying: "≥ 135 °C",
    thickness: "6–9 cm",
    usage: {
      fr: "Couches de roulement de plus forte épaisseur, voiries à trafic lourd.",
      en: "Thicker wearing courses, heavy-traffic roads.",
    },
    strengths: [
      {
        fr: "Résistance à l'orniérage sous trafic lourd",
        en: "Rutting resistance under heavy traffic",
      },
    ],
  },
  {
    slug: "bbme-0-10",
    name: "BBME 0/10",
    norm: "NM EN 13108-1",
    layer: "liaison",
    granularity: "0/10",
    binder: "35/50",
    tempManufacture: "155–[170] °C",
    tempLaying: "≥ 140 °C",
    thickness: "5–7 cm",
    usage: {
      fr: "Béton bitumineux à module élevé, roulement ou liaison sous trafic lourd.",
      en: "High-modulus asphalt concrete, wearing or binder course under heavy traffic.",
    },
    strengths: [
      {
        fr: "Module de rigidité élevé, faible orniérage",
        en: "High stiffness modulus, low rutting",
      },
    ],
  },
  {
    slug: "bbtm-0-6",
    name: "BBTM 0/6",
    norm: "NM EN 13108-2",
    layer: "roulement",
    granularity: "0/6",
    binder: "40/50",
    tempManufacture: "150–[165] °C",
    tempLaying: "≥ 140 °C",
    thickness: "2–3 cm",
    featured: true,
    usage: {
      fr: "Béton bitumineux très mince, entretien de surface et adhérence.",
      en: "Very thin asphalt concrete, surface maintenance and skid resistance.",
    },
    strengths: [
      {
        fr: "Remise en état rapide, faible consommation de matériaux",
        en: "Fast renewal, low material consumption",
      },
    ],
  },
  {
    slug: "gb-0-14",
    name: "GB 0/14 classe 2/3",
    norm: "NM EN 13108-1",
    layer: "assise",
    granularity: "0/14",
    classes: "classe 2 / 3",
    binder: "35/50",
    tempManufacture: "145–[160] °C",
    tempLaying: "≥ 130 °C",
    thickness: "8–14 cm",
    featured: true,
    usage: {
      fr: "Grave-bitume pour couches d'assise, structures neuves et renforcements.",
      en: "Bituminous roadbase for base courses, new build and strengthening.",
    },
    strengths: [
      {
        fr: "Portance des assises, épaisseurs importantes en une passe",
        en: "Base bearing capacity, thick lifts in one pass",
      },
    ],
  },
  {
    slug: "eme-0-14",
    name: "EME 0/14 classe 2",
    norm: "NM EN 13108-1",
    layer: "assise",
    granularity: "0/14",
    classes: "classe 2",
    binder: "[10/20 · 15/25]",
    tempManufacture: "160–[175] °C",
    tempLaying: "≥ 145 °C",
    thickness: "6–13 cm",
    featured: true,
    usage: {
      fr: "Enrobé à module élevé, assises à hautes performances, trafic lourd.",
      en: "High-modulus asphalt, high-performance base courses, heavy traffic.",
    },
    strengths: [
      {
        fr: "Module contrôlé en laboratoire, durée de vie structurelle",
        en: "Lab-verified modulus, structural design life",
      },
    ],
  },
  {
    slug: "enrobes-tiedes",
    name: "Enrobés tièdes",
    norm: "NM EN 13108",
    layer: "roulement",
    granularity: "toute formulation",
    binder: "selon formulation",
    tempManufacture: "−30 °C vs enrobé à chaud",
    tempLaying: "≥ 110 °C",
    featured: true,
    usage: {
      fr: "Toute formulation du catalogue, fabriquée à température abaissée : moins d'énergie, moins d'émissions, fenêtre de compactage préservée.",
      en: "Any mix in the catalogue, produced at reduced temperature: less energy, lower emissions, compaction window preserved.",
    },
    strengths: [
      {
        fr: "−30 °C à la fabrication, énergie et CO₂ réduits",
        en: "−30 °C at production, lower energy and CO₂",
      },
    ],
  },
  {
    slug: "enrobe-froid-stockable",
    name: "Enrobé à froid stockable",
    norm: "—",
    layer: "entretien",
    granularity: "0/6",
    binder: "bitume fluxé",
    tempManufacture: "ambiante",
    tempLaying: "ambiante",
    featured: true,
    usage: {
      fr: "Réparations ponctuelles et entretien : stockable plusieurs mois, mise en œuvre sans matériel spécifique.",
      en: "Spot repairs and maintenance: storable for months, laid without specialist plant.",
    },
    strengths: [
      {
        fr: "Disponible en stock, applicable par tous temps",
        en: "Available from stock, applicable in all weather",
      },
    ],
  },
]);

export const layerOrder: Layer[] = [
  "roulement",
  "liaison",
  "assise",
  "entretien",
];

export const layerLabels: Record<Layer, { fr: string; en: string; ar?: string }> =
  {
    roulement: { fr: "Couche de roulement", en: "Wearing course" },
    liaison: { fr: "Couche de liaison", en: "Binder course" },
    assise: { fr: "Couche d'assise", en: "Base course" },
    entretien: { fr: "Entretien", en: "Maintenance" },
  };

export function productsByLayer(layer: Layer): Product[] {
  return products.filter((p) => p.layer === layer);
}

export function featuredProducts(): Product[] {
  return products.filter((p) => p.featured);
}
