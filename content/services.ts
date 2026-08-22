import { serviceSchema, type Service } from "./schema";
import { z } from "zod";

export const services: Service[] = z.array(serviceSchema).parse([
  {
    id: "livraison",
    name: { fr: "Livraison", en: "Delivery" },
    summary: {
      fr: "Camions bâchés TRANSPOLEQ, suivi GPS en temps réel, bon de pesée numéroté, température relevée au chargement et à la livraison.",
      en: "TRANSPOLEQ sheeted trucks, real-time GPS tracking, numbered weighbridge ticket, temperature recorded at loading and delivery.",
    },
  },
  {
    id: "mise-en-oeuvre",
    name: { fr: "Mise en œuvre", en: "Paving" },
    summary: {
      fr: "Finisseur, compacteurs et équipe ALEQ ; rendement journalier adapté au phasage du chantier.",
      en: "ALEQ paver, rollers and crew; daily output matched to the site's phasing.",
    },
  },
  {
    id: "formulation",
    name: { fr: "Études de formulation", en: "Mix design studies" },
    summary: {
      fr: "Formulation étudiée au laboratoire avant la première tonne, au cahier des charges du maître d'ouvrage.",
      en: "Mix designed in the lab before the first tonne, to the owner's specification.",
    },
  },
  {
    id: "controle-chantier",
    name: { fr: "Contrôle qualité chantier", en: "Site quality control" },
    summary: {
      fr: "Prélèvements et essais sur chantier, carottages, rapports transmis au maître d'œuvre.",
      en: "Site sampling and testing, coring, reports issued to the engineer.",
    },
  },
  {
    id: "conseil",
    name: { fr: "Conseil technique", en: "Technical advice" },
    summary: {
      fr: "Choix de formulation, épaisseurs et phasage : un interlocuteur technique avant le devis.",
      en: "Mix selection, thicknesses and phasing: a technical contact before the quote.",
    },
  },
]);
