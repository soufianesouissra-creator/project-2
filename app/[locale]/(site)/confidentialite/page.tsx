import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { plant } from "@/content/plant";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { PageHeader } from "@/components/site/page-header";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("privacyPage");
  return { title: t("title") };
}

const sections = ["purposes", "data", "retention", "rights"] as const;

export default async function ConfidentialitePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacyPage");
  const tContact = await getTranslations("contactPage");
  const email = plant.contacts.commercialEmail ?? tContact("toFill");

  return (
    <>
      <PageHeader eyebrow={t("title")} title={t("title")} />
      <Section register="froid" className="pt-0">
        <Container>
          <div className="max-w-2xl">
            <p className="text-16 text-bitume/80">
              {t("intro", { name: plant.legalName })}
            </p>
            {sections.map((key) => (
              <div key={key}>
                <h2 className="eyebrow mt-10 mb-4 text-acier">
                  {t(`${key}Title`)}
                </h2>
                <p className="text-16 text-bitume/80">
                  {t(`${key}Body`, { email })}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
