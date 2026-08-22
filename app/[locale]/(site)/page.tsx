import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { plant } from "@/content/plant";
import { loc } from "@/lib/content";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { Eyebrow } from "@/components/site/eyebrow";
import { ButtonLink } from "@/components/site/button";
import { StatStrip } from "@/components/site/stat-strip";

/**
 * Phase 1: hero-lite exercising tokens, type and primitives.
 * The full Accueil (photo hero, ThermalChain, the eight sections) is Phase 2.
 */
export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("hero");
  const tCta = useTranslations("cta");
  const tStats = useTranslations("stats");

  const city = loc(plant.city, locale);

  return (
    <Section register="chaud" className="min-h-[85svh] content-center py-28">
      <Container>
        <Eyebrow className="mb-6 text-calcaire/60!">
          {t("eyebrow", { city })}
        </Eyebrow>
        <h1 className="display-wide max-w-5xl text-balance text-96">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-2xl text-20 opacity-80">
          {t("sub", {
            city,
            capacity: plant.capacityTph,
            radius: plant.deliveryRadiusKm,
          })}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/contact">{tCta("quote")}</ButtonLink>
          <ButtonLink href="/produits" variant="secondary">
            {tCta("seeProducts")}
          </ButtonLink>
        </div>
        <div className="mt-16">
          <StatStrip
            stats={[
              { label: tStats("capacity"), value: `${plant.capacityTph} t/h` },
              { label: tStats("hotStorage"), value: `${plant.hotStorageT} t` },
              { label: tStats("bitumen"), value: plant.bitumenGrades.join(" · ") },
              {
                label: tStats("delivery"),
                value: `≤ ${plant.deliveryRadiusKm} km`,
              },
            ]}
          />
        </div>
      </Container>
    </Section>
  );
}
