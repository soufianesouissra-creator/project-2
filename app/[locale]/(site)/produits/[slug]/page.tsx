import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { layerLabels, products } from "@/content/products";
import { loc } from "@/lib/content";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { Eyebrow } from "@/components/site/eyebrow";
import { ButtonLink } from "@/components/site/button";
import { SpecTable, type SpecRow } from "@/components/site/spec-table";
import { ProductCard } from "@/components/site/product-card";
import { DownloadList } from "@/components/site/download-list";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return { title: product?.name };
}

export default async function ProduitPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const t = await getTranslations("produitPage");
  const tNav = await getTranslations("nav");
  const tCta = await getTranslations("cta");
  const layer = loc(layerLabels[product.layer], locale);
  const related = products.filter(
    (p) => p.layer === product.layer && p.slug !== product.slug,
  );

  const specRows: SpecRow[] = [
    { label: t("spec.norm"), value: product.norm },
    { label: t("spec.granularity"), value: product.granularity },
    ...(product.classes
      ? [{ label: t("spec.classes"), value: product.classes }]
      : []),
    { label: t("spec.binder"), value: product.binder },
    { label: t("spec.tempManufacture"), value: product.tempManufacture, live: true },
    { label: t("spec.tempLaying"), value: product.tempLaying },
    ...(product.thickness
      ? [{ label: t("spec.thickness"), value: product.thickness }]
      : []),
  ];

  return (
    <>
      <Section register="froid" className="pb-10 md:pb-14">
        <Container>
          <nav
            aria-label="breadcrumb"
            className="mb-10 font-mono text-12 uppercase tracking-[0.08em] text-acier"
          >
            <Link href="/produits" className="hover:text-bitume">
              {tNav("produits")}
            </Link>
            <span aria-hidden> / </span>
            <span>{layer}</span>
            <span aria-hidden> / </span>
            <span aria-current="page" className="text-bitume">
              {product.name}
            </span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[7fr_5fr]">
            <div>
              <Eyebrow className="mb-4">
                {product.norm} · {layer}
              </Eyebrow>
              <h1 className="display-wide text-64">{product.name}</h1>
              <p className="mt-6 max-w-xl text-20 text-bitume/80">
                {loc(product.usage, locale)}
              </p>

              <h2 className="eyebrow mt-10 mb-4 text-acier">{t("strengths")}</h2>
              <ul className="max-w-xl">
                {product.strengths.map((s) => (
                  <li
                    key={s.fr}
                    className="border-b border-granulat py-3 text-16 first:border-t"
                  >
                    {loc(s, locale)}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <ButtonLink href={`/contact?produit=${product.slug}`}>
                  {tCta("quoteForProduct")}
                </ButtonLink>
              </div>
            </div>

            <div>
              <h2 className="eyebrow mb-6 text-acier">{t("specTitle")}</h2>
              <SpecTable rows={specRows} />
              <div className="mt-8">
                <DownloadList
                  items={[
                    {
                      name: `${t("datasheet")} — ${product.name}`,
                      href: product.datasheet,
                      pendingLabel: t("pdfPending"),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* temperature band — the product inside the ligne chaude */}
      <section data-register="chaud" className="py-10">
        <Container>
          <dl className="tnum grid gap-8 font-mono sm:grid-cols-3">
            {(
              [
                ["fab", product.tempManufacture],
                ["delivery", "≥ 145 °C"],
                ["laying", product.tempLaying],
              ] as const
            ).map(([key, value]) => (
              <div key={key}>
                <dt className="text-12 uppercase tracking-[0.08em] text-calcaire/50">
                  {t(`tempBand.${key}`)}
                </dt>
                <dd className="display-number mt-1 text-40 text-chaud">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {related.length > 0 && (
        <Section register="froid">
          <Container>
            <h2 className="eyebrow mb-6 text-acier">
              {t("related", { layer })}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 3).map((p) => (
                <ProductCard key={p.slug} product={p} locale={locale} />
              ))}
            </div>
            <div className="mt-8">
              <ButtonLink href="/produits" variant="ghost" className="px-0">
                {t("backAll")} →
              </ButtonLink>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
