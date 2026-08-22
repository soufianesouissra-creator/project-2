import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { PageHeader } from "@/components/site/page-header";
import { SectionHeader } from "@/components/site/section-header";
import { IntegratedChain } from "@/components/site/integrated-chain";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const tp = await getTranslations({ locale, namespace: "groupePage" });
  return localizedMetadata({
    locale,
    path: "/groupe",
    title: t("groupe"),
    description: tp("intro"),
  });
}

const entities = ["aleq", "transpoleq", "factory"] as const;

export default async function GroupePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("groupePage");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHeader
        eyebrow={tNav("groupe")}
        title={t("display")}
        intro={t("intro")}
      />

      <Section register="froid" className="pt-0">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {entities.map((key) => (
              <article
                key={key}
                className="flex flex-col border border-granulat p-6"
              >
                <h2 className="display-wide text-28">
                  {t(`entities.${key}.name`)}
                </h2>
                <p className="tnum mt-2 font-mono text-12 uppercase tracking-[0.08em] text-acier">
                  {t(`entities.${key}.role`)}
                </p>
                <p className="mt-4 grow text-16 text-bitume/80">
                  {t(`entities.${key}.body`)}
                </p>
                <a
                  href="https://aleq.ma"
                  rel="noopener"
                  className="mt-6 font-mono text-12 uppercase tracking-[0.08em] text-chaud-encre hover:underline"
                >
                  {t("visit")} →
                </a>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section register="chaud">
        <Container>
          <SectionHeader eyebrow={tNav("groupe")} title={t("synergyTitle")} />
          <IntegratedChain
            cols={3}
            stops={entities.map((key) => ({
              name: t(`entities.${key}.name`),
              entity: t(`entities.${key}.role`),
              fact: "",
            }))}
          />
        </Container>
      </Section>
    </>
  );
}
