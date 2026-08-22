import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { PageHeader } from "@/components/site/page-header";
import { ArtPlaceholder } from "@/components/site/art-placeholder";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nav");
  return { title: t("environnement") };
}

const items = ["filtre", "rap", "tiedes", "eau", "hse"] as const;

export default async function EnvironnementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("envPage");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHeader
        eyebrow={tNav("environnement")}
        title={t("display")}
        intro={t("intro")}
      />

      <Section register="froid" className="pt-0">
        <Container>
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
            {items.map((key) => (
              <article
                key={key}
                className="border-t border-granulat pt-5"
              >
                <h2 className="display-wide text-28">
                  {t(`items.${key}.title`)}
                </h2>
                <p className="mt-3 max-w-xl text-16 text-bitume/80">
                  {t(`items.${key}.body`)}
                </p>
              </article>
            ))}
            <ArtPlaceholder
              shot="SHOTLIST 09"
              label="jauges des citernes bitume, gros plan"
              className="aspect-[3/2] self-start"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}

// « [0] accident avec arrêt depuis [date] » is deliberately absent until
// the figure is real and verifiable (master prompt §6, TODO.md).
