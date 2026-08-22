import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { plant } from "@/content/plant";
import { services } from "@/content/services";
import { loc } from "@/lib/content";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { PageHeader } from "@/components/site/page-header";
import { DeliveryEstimator } from "@/components/site/delivery-estimator";
import { ArtPlaceholder } from "@/components/site/art-placeholder";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nav");
  return { title: t("services") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("servicesPage");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHeader
        eyebrow={tNav("services")}
        title={t("display")}
        intro={t("intro")}
      />

      {/* Services — chaud: this is the production/delivery register */}
      <Section register="chaud">
        <Container>
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
            {services.map((service, i) => (
              <article
                key={service.id}
                className={i === 0 ? "md:col-span-2 md:max-w-3xl" : undefined}
              >
                <h2 className="display-wide text-28">
                  {loc(service.name, locale)}
                </h2>
                <p className="mt-3 max-w-xl text-16 opacity-80">
                  {loc(service.summary, locale)}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            <ArtPlaceholder
              shot="SHOTLIST 14"
              label="file de camions, 05:30, phares et éclairage de la centrale"
              className="aspect-[3/2]"
            />
            <ArtPlaceholder
              shot="SHOTLIST 10"
              label="finisseur en pose, équipe derrière"
              className="aspect-[3/2]"
            />
          </div>
        </Container>
      </Section>

      {/* Estimator — froid, live values carry the accent rule */}
      <Section register="froid">
        <Container>
          <div className="max-w-3xl">
            <DeliveryEstimator capacityTph={plant.capacityTph} />
          </div>
        </Container>
      </Section>
    </>
  );
}
