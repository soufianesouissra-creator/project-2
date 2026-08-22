import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { plant } from "@/content/plant";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { PageHeader } from "@/components/site/page-header";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legalPage" });
  return localizedMetadata({
    locale,
    path: "/mentions-legales",
    title: t("title"),
  });
}

export default async function MentionsLegalesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legalPage");
  const tContact = await getTranslations("contactPage");

  const ids = [
    ["ICE", plant.identifiers.ice],
    ["RC", plant.identifiers.rc],
    ["IF", plant.identifiers.if],
    ["Patente", plant.identifiers.patente],
    ["CNSS", plant.identifiers.cnss],
  ] as const;

  return (
    <>
      <PageHeader eyebrow={t("title")} title={t("title")} />
      <Section register="froid" className="pt-0">
        <Container>
          <div className="max-w-2xl">
            <h2 className="eyebrow mb-4 text-acier">{t("editorTitle")}</h2>
            <p className="text-16 text-bitume/80">
              {t("editorBody", { name: plant.legalName })}
            </p>

            <h2 className="eyebrow mt-10 mb-4 text-acier">{t("idsTitle")}</h2>
            <dl className="tnum font-mono text-14">
              {ids.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-4 border-b border-granulat py-2 first:border-t"
                >
                  <dt className="uppercase tracking-[0.08em] text-acier">
                    {label}
                  </dt>
                  <dd>{value ?? tContact("toFill")}</dd>
                </div>
              ))}
            </dl>

            <h2 className="eyebrow mt-10 mb-4 text-acier">
              {t("directorTitle")}
            </h2>
            <p className="text-16 text-bitume/80">{t("directorBody")}</p>

            <h2 className="eyebrow mt-10 mb-4 text-acier">{t("hostTitle")}</h2>
            <p className="text-16 text-bitume/80">{t("hostBody")}</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
