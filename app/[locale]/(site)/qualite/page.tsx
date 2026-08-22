import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { plant } from "@/content/plant";
import { labTests } from "@/content/tests";
import { labEquipment } from "@/content/centrale";
import { featuredProducts } from "@/content/products";
import { loc } from "@/lib/content";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { PageHeader } from "@/components/site/page-header";
import { SectionHeader } from "@/components/site/section-header";
import { ArtPlaceholder } from "@/components/site/art-placeholder";
import { DownloadList } from "@/components/site/download-list";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const tp = await getTranslations({ locale, namespace: "qualitePage" });
  return localizedMetadata({
    locale,
    path: "/qualite",
    title: t("qualite"),
    description: tp("intro"),
  });
}

export default async function QualitePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("qualitePage");
  const tNav = await getTranslations("nav");
  const tHome = await getTranslations("home.controle");

  return (
    <>
      <PageHeader
        eyebrow={tNav("qualite")}
        title={t("display")}
        intro={t("intro")}
      />

      {/* Essais — froid: the document register */}
      <Section register="froid" className="pt-0">
        <Container>
          <h2 className="eyebrow mb-6 text-acier">{t("testsTitle")}</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-16">
              <thead>
                <tr className="border-b border-bitume text-start">
                  <th className="py-3 pe-4 text-start font-medium">
                    {t("testName")}
                  </th>
                  <th className="py-3 pe-4 text-start font-medium">
                    {t("testNorm")}
                  </th>
                  <th className="py-3 text-start font-medium">
                    {t("testFreq")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {labTests.map((test) => (
                  <tr key={test.id} className="border-b border-granulat">
                    <td className="py-3 pe-4">{loc(test.name, locale)}</td>
                    <td className="tnum py-3 pe-4 font-mono text-14">
                      {test.norm}
                    </td>
                    <td className="py-3 text-14 text-bitume/70">
                      {loc(test.frequency, locale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="eyebrow mb-6 text-acier">{t("equipTitle")}</h2>
              <ul className="max-w-md">
                {labEquipment.map((item) => (
                  <li
                    key={item.fr}
                    className="border-b border-granulat py-3 text-16 first:border-t"
                  >
                    {loc(item, locale)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4">
              <ArtPlaceholder
                shot="SHOTLIST 06"
                label="presse Duriez en essai, mains et cadran"
                className="aspect-[3/2]"
              />
              <ArtPlaceholder
                shot="SHOTLIST 07"
                label="série de tamis vue de dessus"
                className="aspect-[3/2]"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Contrôles process — chaud: this happens on the line */}
      <Section register="chaud">
        <Container>
          <SectionHeader eyebrow={tNav("qualite")} title={t("processTitle")} />
          <div className="grid gap-10 md:grid-cols-3">
            {(["temp", "pesee", "trace"] as const).map((key) => (
              <div key={key} className="border-s border-calcaire/20 ps-5">
                <h3 className="display-wide text-20">
                  {t(`process.${key}.title`)}
                </h3>
                <p className="mt-3 text-14 opacity-80">
                  {t(`process.${key}.body`)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Externe, ISO, téléchargements — froid */}
      <Section register="froid">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="eyebrow mb-4 text-acier">{t("externalTitle")}</h2>
              <p className="max-w-md text-16 text-bitume/80">
                {t("externalBody", { org: plant.externalControl })}
              </p>
              <h2 className="eyebrow mt-10 mb-4 text-acier">{t("isoTitle")}</h2>
              <p className="max-w-md text-16 text-bitume/80">{t("isoBody")}</p>
            </div>
            <div>
              <h2 className="eyebrow mb-4 text-acier">{t("downloadsTitle")}</h2>
              <DownloadList
                items={featuredProducts()
                  .slice(0, 4)
                  .map((p) => ({
                    name: `Fiche technique — ${p.name}`,
                    href: p.datasheet,
                    pendingLabel: tHome("pdfPending"),
                  }))}
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
