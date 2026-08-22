import { thermalStageSchema, type ThermalStage } from "./schema";
import { z } from "zod";

/**
 * « La ligne chaude » — the six stages of the signature element (DESIGN.md §4).
 * Stage 4's 150 °C is interpolated, to confirm with the chef de centrale.
 */
export const thermalChain: ThermalStage[] = z
  .array(thermalStageSchema)
  .parse([
    {
      id: "granulats",
      label: { fr: "Granulats", en: "Aggregates" },
      readout: { fr: "AMBIANT", en: "AMBIENT" },
      description: {
        fr: "Cinq prédoseurs dosent les fractions issues des carrières du groupe.",
        en: "Five cold feeders dose the fractions from the group's own quarries.",
      },
    },
    {
      id: "sechage",
      label: { fr: "Séchage", en: "Drying" },
      readout: { fr: "160 °C", en: "160 °C" },
      description: {
        fr: "Le tambour sécheur porte les granulats à 160 °C ; le filtre à manches capte les fines.",
        en: "The drying drum brings the aggregates to 160 °C; the baghouse captures the fines.",
      },
    },
    {
      id: "malaxage",
      label: { fr: "Malaxage", en: "Mixing" },
      readout: { fr: "155 °C", en: "155 °C" },
      description: {
        fr: "Granulats, filler et bitume pesés au kilogramme, malaxés gâchée par gâchée.",
        en: "Aggregates, filler and bitumen weighed to the kilogram, mixed batch by batch.",
      },
    },
    {
      id: "stockage",
      label: { fr: "Stockage à chaud", en: "Hot storage" },
      readout: { fr: "[150] °C", en: "[150] °C" },
      description: {
        fr: "100 t de trémies calorifugées : les camions chargent sans attendre la fabrication.",
        en: "100 t of insulated silos: trucks load without waiting for production.",
      },
    },
    {
      id: "transport",
      label: { fr: "Transport", en: "Transport" },
      readout: { fr: "≥ 145 °C", en: "≥ 145 °C" },
      description: {
        fr: "Camions bâchés, suivi GPS TRANSPOLEQ ; température relevée au chargement et à la livraison.",
        en: "Sheeted trucks, TRANSPOLEQ GPS tracking; temperature recorded at loading and delivery.",
      },
    },
    {
      id: "mise-en-oeuvre",
      label: { fr: "Mise en œuvre", en: "Paving" },
      readout: { fr: "135 °C", en: "135 °C" },
      description: {
        fr: "Finisseur et compacteurs ALEQ ; le compactage s'achève au-dessus de 135 °C.",
        en: "ALEQ paver and rollers; compaction is completed above 135 °C.",
      },
    },
  ]);
