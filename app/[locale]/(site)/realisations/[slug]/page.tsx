import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { projects } from "@/content/projects";
import { loc } from "@/lib/content";
import { Link } from "@/lib/i18n/navigation";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { Eyebrow } from "@/components/site/eyebrow";
import { ArtPlaceholder } from "@/components/site/art-placeholder";
import { SpecTable } from "@/components/site/spec-table";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project ? loc(project.name, locale) : undefined };
}

export default async function RealisationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const t = await getTranslations("realisationPage");
  const tCard = await getTranslations("projectCard");
  const tNav = await getTranslations("nav");

  return (
    <Section register="froid">
      <Container>
        <nav
          aria-label="breadcrumb"
          className="mb-10 font-mono text-12 uppercase tracking-[0.08em] text-acier"
        >
          <Link href="/realisations" className="hover:text-bitume">
            {tNav("realisations")}
          </Link>
          <span aria-hidden> / </span>
          <span aria-current="page" className="text-bitume">
            {loc(project.name, locale)}
          </span>
        </nav>

        <Eyebrow className="mb-4">{project.year}</Eyebrow>
        <h1 className="display-wide max-w-4xl text-balance text-64">
          {loc(project.name, locale)}
        </h1>

        {project.placeholder && (
          <p className="mt-6 max-w-xl border border-granulat p-4 font-mono text-12 uppercase tracking-[0.08em] text-acier">
            {t("placeholderNote")}
          </p>
        )}

        <div className="mt-12 grid gap-12 lg:grid-cols-[7fr_5fr]">
          <div className="grid gap-4">
            <ArtPlaceholder
              shot="SHOTLIST 10"
              label="finisseur en pose sur ce chantier"
              className="aspect-[3/2]"
            />
            <ArtPlaceholder
              shot="SHOTLIST 12"
              label="macro de la texture de l'enrobé posé"
              className="aspect-[3/2]"
            />
          </div>
          <div>
            <SpecTable
              rows={[
                { label: tCard("client"), value: project.client },
                { label: tCard("product"), value: project.products.join(" · ") },
                { label: tCard("tonnage"), value: project.tonnage, live: true },
                { label: tCard("year"), value: project.year },
              ]}
            />
            <div className="mt-8">
              <Link
                href="/realisations"
                className="font-mono text-12 uppercase tracking-[0.08em] text-chaud-encre hover:underline"
              >
                ← {t("back")}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
