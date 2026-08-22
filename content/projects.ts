import { projectSchema, type Project } from "./schema";
import { z } from "zod";

/**
 * PLACEHOLDERS — every entry below is an art-directed stand-in showing the
 * client exactly which data a réalisation needs. All three must be replaced
 * with real, documented chantiers before launch (TODO.md).
 */
export const projects: Project[] = z.array(projectSchema).parse([
  {
    slug: "chantier-a-documenter-1",
    name: {
      fr: "[Voirie à documenter — section, ville]",
      en: "[Road project to document — section, city]",
    },
    client: "[Client]",
    clientType: "public",
    products: ["GB 0/14", "BBSG 0/10"],
    tonnage: "[12 500] t",
    year: "[2026]",
    featured: true,
    placeholder: true,
  },
  {
    slug: "chantier-a-documenter-2",
    name: {
      fr: "[Plateforme logistique à documenter]",
      en: "[Logistics platform to document]",
    },
    client: "[Client]",
    clientType: "prive",
    products: ["EME 0/14", "BBME 0/10"],
    tonnage: "[8 200] t",
    year: "[2025]",
    featured: true,
    placeholder: true,
  },
  {
    slug: "chantier-a-documenter-3",
    name: {
      fr: "[Chantier ALEQ à documenter]",
      en: "[ALEQ site to document]",
    },
    client: "ALEQ",
    clientType: "groupe",
    products: ["BBSG 0/14"],
    tonnage: "[15 000] t",
    year: "[2025]",
    featured: true,
    placeholder: true,
  },
]);

export function featuredProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
