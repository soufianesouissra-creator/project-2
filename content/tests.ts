import { labTestSchema, type LabTest } from "./schema";
import { z } from "zod";

/** Lab test list — frequencies are defaults to confirm with the laborantin. */
export const labTests: LabTest[] = z.array(labTestSchema).parse([
  {
    id: "granulometrie",
    name: { fr: "Granulométrie", en: "Grading" },
    norm: "NM EN 12697-2",
    frequency: { fr: "Chaque lot", en: "Every batch lot" },
    featured: true,
  },
  {
    id: "teneur-liant",
    name: { fr: "Teneur en liant", en: "Binder content" },
    norm: "NM EN 12697-1",
    frequency: { fr: "Chaque lot", en: "Every batch lot" },
    featured: true,
  },
  {
    id: "duriez",
    name: { fr: "Duriez", en: "Duriez" },
    norm: "NM EN 12697-12",
    frequency: { fr: "Par formulation", en: "Per mix design" },
    featured: true,
  },
  {
    id: "pcg",
    name: { fr: "PCG — presse à cisaillement giratoire", en: "Gyratory compactor" },
    norm: "NM EN 12697-31",
    frequency: { fr: "Par formulation", en: "Per mix design" },
    featured: true,
  },
  {
    id: "marshall",
    name: { fr: "Marshall", en: "Marshall" },
    norm: "NM EN 12697-34",
    frequency: { fr: "Selon cahier des charges", en: "Per specification" },
  },
  {
    id: "ornierage",
    name: { fr: "Orniérage", en: "Wheel tracking" },
    norm: "NM EN 12697-22",
    frequency: { fr: "Par formulation, selon classe", en: "Per mix design, by class" },
  },
  {
    id: "module",
    name: { fr: "Module de rigidité (EME)", en: "Stiffness modulus (EME)" },
    norm: "NM EN 12697-26",
    frequency: { fr: "Formulations EME", en: "EME mix designs" },
  },
]);
