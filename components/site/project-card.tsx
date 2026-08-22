import { getTranslations } from "next-intl/server";
import type { Project } from "@/content/schema";
import { loc } from "@/lib/content";
import { ArtPlaceholder } from "./art-placeholder";

export async function ProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: string;
}) {
  const t = await getTranslations("projectCard");

  return (
    <article className="flex flex-col border border-granulat">
      <ArtPlaceholder
        shot="SHOTLIST 10"
        label="finisseur en pose, équipe derrière"
        className="aspect-[3/2]"
      />
      <div className="flex grow flex-col p-6">
        <h3 className="display-wide text-20">{loc(project.name, locale)}</h3>
        <dl className="tnum mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-granulat pt-4 font-mono text-12">
          <dt className="text-acier">{t("client")}</dt>
          <dd className="text-end">{project.client}</dd>
          <dt className="text-acier">{t("product")}</dt>
          <dd className="text-end">{project.products.join(" · ")}</dd>
          <dt className="text-acier">{t("tonnage")}</dt>
          <dd className="text-end">{project.tonnage}</dd>
          <dt className="text-acier">{t("year")}</dt>
          <dd className="text-end">{project.year}</dd>
        </dl>
      </div>
    </article>
  );
}
