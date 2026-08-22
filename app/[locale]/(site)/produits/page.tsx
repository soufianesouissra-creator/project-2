import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { layerLabels, layerOrder, productsByLayer } from "@/content/products";
import { loc } from "@/lib/content";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { PageHeader } from "@/components/site/page-header";
import { ProductCard } from "@/components/site/product-card";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nav");
  return { title: t("produits") };
}

export default async function ProduitsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("produitsPage");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHeader
        eyebrow={tNav("produits")}
        title={t("display")}
        intro={t("intro")}
      />

      <Section register="froid" className="pt-0">
        <Container>
          <div className="flex flex-col gap-16">
            {layerOrder.map((layer) => {
              const items = productsByLayer(layer);
              if (items.length === 0) return null;
              return (
                <div key={layer}>
                  <h2 className="eyebrow mb-6 border-b border-granulat pb-3 text-acier">
                    {loc(layerLabels[layer], locale)}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((product) => (
                      <ProductCard
                        key={product.slug}
                        product={product}
                        locale={locale}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
