import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { projects } from "@/content/projects";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { PageHeader } from "@/components/site/page-header";
import { ProjectCard } from "@/components/site/project-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const tp = await getTranslations({ locale, namespace: "realisationsPage" });
  return localizedMetadata({
    locale,
    path: "/realisations",
    title: t("realisations"),
    description: tp("intro"),
  });
}

// Year / client-type / product filters arrive with real project data —
// three template cards filter to nothing useful (TODO.md).
export default async function RealisationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("realisationsPage");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHeader
        eyebrow={tNav("realisations")}
        title={t("display")}
        intro={t("intro")}
      />

      <Section register="froid" className="pt-0">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                locale={locale}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
