import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { plant } from "@/content/plant";
import { equipment, gallery, roles, timeline } from "@/content/centrale";
import { loc } from "@/lib/content";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { PageHeader } from "@/components/site/page-header";
import { SectionHeader } from "@/components/site/section-header";
import { Eyebrow } from "@/components/site/eyebrow";
import { SpecTable } from "@/components/site/spec-table";
import { ArtPlaceholder } from "@/components/site/art-placeholder";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nav");
  return { title: t("centrale") };
}

export default async function CentralePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("centralePage");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHeader
        eyebrow={tNav("centrale")}
        title={t("display")}
        intro={t("intro")}
      />

      {/* Fiche technique — froid */}
      <Section register="froid" className="pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="eyebrow mb-6 text-acier">{t("specTitle")}</h2>
              <SpecTable
                rows={[
                  {
                    label: t("spec.type"),
                    value: loc(plant.plantType, locale),
                  },
                  {
                    label: t("spec.capacity"),
                    value: `${plant.capacityTph} t/h`,
                    live: true,
                  },
                  {
                    label: t("spec.hotStorage"),
                    value: `${plant.hotStorageT} t`,
                  },
                  {
                    label: t("spec.bitumen"),
                    value: plant.bitumenGrades.join(" · "),
                  },
                  { label: t("spec.coldFeed"), value: `${plant.coldFeedCount} ×` },
                  {
                    label: t("spec.radius"),
                    value: `≤ ${plant.deliveryRadiusKm} km / ${plant.deliveryRadiusH} h`,
                  },
                  { label: t("spec.control"), value: plant.externalControl },
                  { label: t("spec.opensAt"), value: plant.opensAt },
                ]}
              />
            </div>
            <ArtPlaceholder
              shot="SHOTLIST 11"
              label="vue drone de la centrale, milieu de matinée"
              className="aspect-[4/3] lg:aspect-auto"
            />
          </div>
        </Container>
      </Section>

      {/* Équipements + cabine — chaud */}
      <Section register="chaud">
        <Container>
          <SectionHeader eyebrow={tNav("centrale")} title={t("equipTitle")} />
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {equipment.map((item) => (
              <li
                key={item.detail + loc(item.name, locale)}
                className="flex items-baseline justify-between gap-4 border-b border-calcaire/15 py-3"
              >
                <span className="text-16">{loc(item.name, locale)}</span>
                <span className="tnum shrink-0 font-mono text-12 text-calcaire/60">
                  {item.detail}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h3 className="display-wide text-28">{t("controlRoomTitle")}</h3>
              <p className="mt-4 max-w-xl text-16 opacity-80">
                {t("controlRoomBody")}
              </p>
            </div>
            <ArtPlaceholder
              shot="SHOTLIST 05"
              label="cabine de commande, opérateur, écrans"
              className="aspect-[3/2]"
            />
          </div>
        </Container>
      </Section>

      {/* Repères + métiers + certifications — froid */}
      <Section register="froid">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="eyebrow mb-6 text-acier">{t("timelineTitle")}</h2>
              {/* true sequence — numbering allowed (DESIGN.md §4.7) */}
              <ol className="border-s border-granulat">
                {timeline.map((entry, i) => (
                  <li key={i} className="relative ps-6 pb-8 last:pb-0">
                    <span className="absolute -start-[5px] top-1.5 size-[9px] rounded-full bg-acier" />
                    <p className="tnum font-mono text-14 text-chaud-encre">
                      {entry.year}
                    </p>
                    <p className="mt-1 text-16">{loc(entry.event, locale)}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="eyebrow mb-6 text-acier">{t("teamTitle")}</h2>
              <ul className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <li
                    key={role.fr}
                    className="rounded-[2px] border border-granulat px-4 py-2 text-16"
                  >
                    {loc(role, locale)}
                  </li>
                ))}
              </ul>
              <h2 className="eyebrow mt-12 mb-4 text-acier">
                {t("certifTitle")}
              </h2>
              <p className="max-w-md text-16 text-bitume/80">
                {t("certifBody")}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Galerie — chaud */}
      <Section register="chaud">
        <Container>
          <Eyebrow className="mb-8 text-calcaire/50!">
            {t("galleryTitle")}
          </Eyebrow>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item) => (
              <ArtPlaceholder
                key={item.shot}
                shot={item.shot}
                label={item.label}
                className="aspect-[3/2]"
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
