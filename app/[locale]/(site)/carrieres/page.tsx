import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { jobs } from "@/content/jobs";
import { loc } from "@/lib/content";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { PageHeader } from "@/components/site/page-header";
import { ApplicationForm } from "@/components/site/application-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const tp = await getTranslations({ locale, namespace: "carrieresPage" });
  return localizedMetadata({
    locale,
    path: "/carrieres",
    title: t("carrieres"),
    description: tp("intro"),
  });
}

export default async function CarrieresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("carrieresPage");
  const tNav = await getTranslations("nav");
  const open = jobs.filter((j) => j.open);

  return (
    <>
      <PageHeader
        eyebrow={tNav("carrieres")}
        title={t("display")}
        intro={t("intro")}
      />

      <Section register="froid" className="pt-0">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="eyebrow mb-6 text-acier">{t("openTitle")}</h2>
              {open.length === 0 ? (
                <p className="max-w-md border border-granulat p-6 text-16 text-bitume/80">
                  {t("emptyJobs")}
                </p>
              ) : (
                <ul>
                  {open.map((job) => (
                    <li
                      key={job.slug}
                      className="border-b border-granulat py-4 first:border-t"
                    >
                      <p className="display-wide text-20">
                        {loc(job.title, locale)}
                      </p>
                      <p className="mt-1 text-14 text-acier">
                        {loc(job.location, locale)}
                      </p>
                      <p className="mt-2 max-w-lg text-16 text-bitume/80">
                        {loc(job.description, locale)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              <h2 className="eyebrow mt-14 mb-6 text-acier">
                {t("valuesTitle")}
              </h2>
              {/* practices, not slogans — and not a numbered sequence */}
              <ul className="max-w-md">
                {(["v1", "v2", "v3", "v4"] as const).map((key) => (
                  <li
                    key={key}
                    className="border-b border-granulat py-3 text-16 first:border-t"
                  >
                    {t(`values.${key}`)}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="eyebrow mb-8 text-acier">{t("applyTitle")}</h2>
              <ApplicationForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
