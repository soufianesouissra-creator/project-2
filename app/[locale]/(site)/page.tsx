import { getTranslations, setRequestLocale } from "next-intl/server";
import { plant } from "@/content/plant";
import { featuredProducts } from "@/content/products";
import { featuredProjects } from "@/content/projects";
import { labTests } from "@/content/tests";
import { thermalChain } from "@/content/thermal-chain";
import { loc } from "@/lib/content";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeader } from "@/components/site/section-header";
import { Eyebrow } from "@/components/site/eyebrow";
import { ButtonLink } from "@/components/site/button";
import { StatStrip } from "@/components/site/stat-strip";
import { ArtPlaceholder } from "@/components/site/art-placeholder";
import { ProductCard } from "@/components/site/product-card";
import { TestCard } from "@/components/site/test-card";
import { IntegratedChain } from "@/components/site/integrated-chain";
import { ProjectCard } from "@/components/site/project-card";
import { CoverageDiagram } from "@/components/site/coverage-diagram";
import { DownloadList } from "@/components/site/download-list";
import { CountUp } from "@/components/motion/count-up";
import { ThermalChain } from "@/components/motion/thermal-chain";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");
  const tCta = await getTranslations("cta");
  const tStats = await getTranslations("stats");
  const tHome = await getTranslations("home");

  const city = loc(plant.city, locale);
  const stages = thermalChain.map((s) => ({
    id: s.id,
    label: loc(s.label, locale),
    readout: loc(s.readout, locale),
    description: loc(s.description, locale),
  }));

  return (
    <>
      {/* 1 · Hero — chaud. Pulls itself under the transparent header. */}
      <Section
        register="chaud"
        className="-mt-16 flex min-h-svh flex-col justify-center pt-24 pb-10"
      >
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[7fr_5fr]">
            <div>
              <Eyebrow className="hero-rise-1 mb-6 text-calcaire/60!">
                {t("eyebrow", { city })}
              </Eyebrow>
              <h1 className="display-wide hero-rise-2 max-w-5xl text-balance text-96">
                {t("title")}
              </h1>
              <p className="hero-rise-3 mt-6 max-w-2xl text-20 opacity-80">
                {t("sub", {
                  city,
                  capacity: plant.capacityTph,
                  radius: plant.deliveryRadiusKm,
                })}
              </p>
              <div className="hero-rise-4 mt-10 flex flex-wrap gap-4">
                <ButtonLink href="/contact">{tCta("quote")}</ButtonLink>
                <ButtonLink href="/produits" variant="secondary">
                  {tCta("seeProducts")}
                </ButtonLink>
              </div>
            </div>
            <ArtPlaceholder
              shot="SHOTLIST 02"
              label="tour au crépuscule, 24 mm, espace pour le titre à gauche"
              className="hero-clip aspect-[4/5] max-lg:hidden"
            />
          </div>
          <div className="hero-rise-4 mt-16">
            <StatStrip
              stats={[
                {
                  label: tStats("capacity"),
                  value: <CountUp value={plant.capacityTph} suffix=" t/h" />,
                },
                {
                  label: tStats("hotStorage"),
                  value: <CountUp value={plant.hotStorageT} suffix=" t" />,
                },
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

      {/* 2 · La ligne chaude — signature element */}
      <section data-register="chaud" className="border-t border-calcaire/10">
        <ThermalChain
          eyebrow={tHome("lignechaude.eyebrow")}
          title={tHome("lignechaude.title")}
          stages={stages}
        />
      </section>

      {/* 3 · Produits — froid */}
      <Section register="froid">
        <Container>
          <SectionHeader
            eyebrow={tHome("produits.eyebrow")}
            title={tHome("produits.title")}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts().map((product) => (
              <ProductCard key={product.slug} product={product} locale={locale} />
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/produits" variant="ghost" className="px-0">
              {tHome("produits.all")} →
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* 4 · Contrôle — froid */}
      <Section register="froid" className="border-t border-granulat">
        <Container>
          <SectionHeader
            eyebrow={tHome("controle.eyebrow")}
            title={tHome("controle.title")}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {labTests
              .filter((test) => test.featured)
              .slice(0, 3)
              .map((test) => (
                <TestCard
                  key={test.id}
                  test={test}
                  locale={locale}
                  frequencyLabel={tHome("controle.frequency")}
                />
              ))}
          </div>
          <p className="mt-8 max-w-2xl text-16 text-bitume/70">
            {tHome("controle.external", { org: plant.externalControl })}
          </p>
          <div className="mt-8 max-w-2xl">
            <h3 className="eyebrow mb-4 text-acier">
              {tHome("controle.downloads")}
            </h3>
            <DownloadList
              items={featuredProducts()
                .slice(0, 3)
                .map((p) => ({
                  name: `Fiche technique — ${p.name}`,
                  href: p.datasheet,
                  pendingLabel: tHome("controle.pdfPending"),
                }))}
            />
          </div>
        </Container>
      </Section>

      {/* 5 · Chaîne intégrée — chaud */}
      <Section register="chaud">
        <Container>
          <SectionHeader
            eyebrow={tHome("chaine.eyebrow")}
            title={tHome("chaine.title")}
          />
          <IntegratedChain
            stops={[
              {
                name: tHome("chaine.stops.carriere.name"),
                entity: tHome("chaine.stops.carriere.entity"),
                fact: tHome("chaine.stops.carriere.fact"),
              },
              {
                name: tHome("chaine.stops.centrale.name"),
                entity: tHome("chaine.stops.centrale.entity"),
                fact: tHome("chaine.stops.centrale.fact", {
                  capacity: plant.capacityTph,
                }),
              },
              {
                name: tHome("chaine.stops.transport.name"),
                entity: tHome("chaine.stops.transport.entity"),
                fact: tHome("chaine.stops.transport.fact"),
              },
              {
                name: tHome("chaine.stops.chantier.name"),
                entity: tHome("chaine.stops.chantier.entity"),
                fact: tHome("chaine.stops.chantier.fact"),
              },
            ]}
          />
        </Container>
      </Section>

      {/* 6 · Réalisations — froid */}
      <Section register="froid">
        <Container>
          <SectionHeader
            eyebrow={tHome("realisations.eyebrow")}
            title={tHome("realisations.title")}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {featuredProjects().map((project) => (
              <ProjectCard key={project.slug} project={project} locale={locale} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 7 · Zone de livraison — froid */}
      <Section register="froid" className="border-t border-granulat">
        <Container>
          <SectionHeader
            eyebrow={tHome("zone.eyebrow")}
            title={tHome("zone.title", { radius: plant.deliveryRadiusKm })}
          />
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <CoverageDiagram
              rings={[60, 90, 120]}
              ringLabel={(m) => tHome("zone.ringLabel", { minutes: m })}
              plantLabel={tHome("zone.plantLabel")}
            />
            <div className="max-w-md">
              <p className="text-20">{tHome("zone.explain1")}</p>
              <p className="mt-4 text-20 font-medium text-chaud-encre">
                {tHome("zone.explain2")}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 8 · CTA — chaud */}
      <Section register="chaud">
        <Container>
          <Eyebrow className="mb-4 text-calcaire/50!">
            {tHome("ctaBand.eyebrow")}
          </Eyebrow>
          <h2 className="display-wide max-w-3xl text-balance text-64">
            {tHome("ctaBand.title")}
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="/contact">{tCta("quote")}</ButtonLink>
            {plant.contacts.whatsapp && (
              <a
                href={`https://wa.me/${plant.contacts.whatsapp}`}
                className="inline-flex items-center rounded-[2px] border border-current px-6 py-3 text-16 font-medium hover:bg-current/10"
              >
                {tCta("whatsapp")}
              </a>
            )}
            {plant.contacts.planningPhone && (
              <a
                href={`tel:${plant.contacts.planningPhone}`}
                className="inline-flex items-center rounded-[2px] border border-current px-6 py-3 text-16 font-medium hover:bg-current/10"
              >
                {tCta("callPlanning")}
              </a>
            )}
            {!plant.contacts.whatsapp && !plant.contacts.planningPhone && (
              <p className="font-mono text-12 uppercase tracking-[0.08em] opacity-50">
                {tHome("ctaBand.missingContacts")}
              </p>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
