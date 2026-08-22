import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { Eyebrow } from "@/components/site/eyebrow";
import { SectionHeader } from "@/components/site/section-header";
import { Button, ButtonLink } from "@/components/site/button";
import { StatStrip } from "@/components/site/stat-strip";
import { SpecTable } from "@/components/site/spec-table";

const colors = [
  ["--calcaire", "#E9E8E4", "page ground (froid)"],
  ["--granulat", "#C9C6BE", "hairlines, secondary surfaces"],
  ["--bitume", "#121214", "ink; chaud ground"],
  ["--fonte", "#2A2B2F", "surfaces on chaud"],
  ["--chaud", "#F24E1E", "accent — graphics, CTAs, live values"],
  ["--chaud-encre", "#B33A10", "accent for TEXT on calcaire (AA)"],
  ["--acier", "#53616C", "data labels, captions"],
] as const;

const typeScale = [
  ["text-12", "Bon de pesée n° 2026-08541"],
  ["text-14", "Température relevée au chargement"],
  ["text-16", "Corps de texte — Archivo 400, interlignage 1.55."],
  ["text-20", "Sous-titre — une phrase factuelle."],
  ["text-28", "Intertitre de bloc"],
  ["text-40", "Ligne display de section"],
  ["text-64", "Titre de page"],
  ["text-96", "160 t/h"],
] as const;

/** Dev-only: visible in `next dev`; in production only with SHOW_STYLEGUIDE=1. */
export default function StyleguidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.SHOW_STYLEGUIDE !== "1"
  ) {
    notFound();
  }
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <Section register="froid">
        <Container>
          <SectionHeader eyebrow="Styleguide" title="Tokens et composants" />

          <h3 className="mb-6 text-28 font-medium">Couleurs</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {colors.map(([token, hex, role]) => (
              <div key={token} className="border border-granulat">
                <div className="h-20" style={{ backgroundColor: hex }} />
                <div className="p-3 font-mono text-12">
                  <p className="font-medium">{token}</p>
                  <p className="tnum opacity-60">{hex}</p>
                  <p className="mt-1 text-acier">{role}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="mt-16 mb-6 text-28 font-medium">Échelle typographique</h3>
          <div className="flex flex-col gap-6">
            {typeScale.map(([cls, sample]) => (
              <div key={cls} className="flex items-baseline gap-6 border-b border-granulat pb-4">
                <span className="w-20 shrink-0 font-mono text-12 text-acier">
                  {cls}
                </span>
                <span
                  className={
                    cls === "text-96" || cls === "text-64"
                      ? `${cls} display-number`
                      : cls === "text-40" || cls === "text-28"
                        ? `${cls} display-wide`
                        : cls === "text-12" || cls === "text-14"
                          ? `${cls} font-mono tnum`
                          : cls
                  }
                >
                  {sample}
                </span>
              </div>
            ))}
          </div>

          <h3 className="mt-16 mb-6 text-28 font-medium">Boutons</h3>
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href="/contact">Demander un devis</ButtonLink>
            <Button variant="secondary">Voir les produits</Button>
            <Button variant="ghost">Toutes les formulations</Button>
          </div>

          <h3 className="mt-16 mb-6 text-28 font-medium">Eyebrow · StatStrip</h3>
          <Eyebrow className="mb-4">Centrale d'enrobage — [Ville], Maroc</Eyebrow>
          <StatStrip
            stats={[
              { label: "Capacité", value: "160 t/h" },
              { label: "Stock à chaud", value: "100 t" },
              { label: "Bitume", value: "40/50 · 35/50" },
              { label: "Livraison", value: "≤ 120 km" },
            ]}
          />

          <h3 className="mt-16 mb-6 text-28 font-medium">SpecTable</h3>
          <div className="max-w-md">
            <SpecTable
              rows={[
                { label: "Granularité", value: "0/10" },
                { label: "Liant", value: "40/50 · 35/50" },
                { label: "T° fabrication", value: "150–165 °C", live: true },
                { label: "Épaisseur usuelle", value: "5–7 cm" },
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section register="chaud">
        <Container>
          <SectionHeader
            eyebrow="Registre chaud"
            title="Fond bitume, grain 2 %, accent sur valeur vive."
          />
          <p className="max-w-2xl text-16 opacity-80">
            Les sections chaudes portent la production, le process, la
            livraison. Une seule règle accent par écran, sur la valeur vive :
          </p>
          <p className="display-number mt-8 inline-block border-b border-chaud pb-2 text-96 text-chaud">
            160 °C
          </p>
        </Container>
      </Section>
    </>
  );
}
