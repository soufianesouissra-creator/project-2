import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { plant } from "@/content/plant";
import { products } from "@/content/products";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { PageHeader } from "@/components/site/page-header";
import { QuoteForm } from "@/components/site/quote-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const tp = await getTranslations({ locale, namespace: "contactPage" });
  return localizedMetadata({
    locale,
    path: "/contact",
    title: t("contact"),
    description: tp("display"),
  });
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ produit?: string }>;
}) {
  const { locale } = await params;
  const { produit } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");
  const tNav = await getTranslations("nav");
  const tForm = await getTranslations("quoteForm");

  const defaultProduct = products.find((p) => p.slug === produit)?.name;
  const contacts = [
    { key: "commercial", value: plant.contacts.commercialEmail },
    { key: "planning", value: plant.contacts.planningPhone },
    { key: "lab", value: plant.contacts.labEmail },
  ] as const;

  return (
    <>
      <PageHeader eyebrow={tNav("contact")} title={t("display")} />

      <Section register="froid" className="pt-0">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[7fr_4fr]">
            <div>
              <h2 className="eyebrow mb-8 text-acier">{tForm("title")}</h2>
              <QuoteForm
                products={products.map((p) => ({ slug: p.slug, name: p.name }))}
                defaultProduct={defaultProduct}
              />
            </div>

            <aside>
              <h2 className="eyebrow mb-6 text-acier">{t("directTitle")}</h2>
              <dl className="tnum font-mono text-14">
                {contacts.map((c) => (
                  <div
                    key={c.key}
                    className="flex items-baseline justify-between gap-4 border-b border-granulat py-3 first:border-t"
                  >
                    <dt className="uppercase tracking-[0.08em] text-acier">
                      {t(c.key)}
                    </dt>
                    <dd>{c.value ?? t("toFill")}</dd>
                  </div>
                ))}
              </dl>

              <h2 className="eyebrow mt-12 mb-4 text-acier">
                {t("hoursTitle")}
              </h2>
              <p className="max-w-sm text-16 text-bitume/80">
                {t("hoursBody", { time: plant.opensAt })}
              </p>

              <h2 className="eyebrow mt-12 mb-4 text-acier">
                {t("accessTitle")}
              </h2>
              <p className="max-w-sm text-16 text-bitume/80">
                {t("accessBody")}
              </p>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
