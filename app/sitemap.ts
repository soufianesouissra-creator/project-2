import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { projects } from "@/content/projects";
import { languageAlternates, pathFor, SITE_URL } from "@/lib/seo";

const staticPaths: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/produits", priority: 0.9 },
  { path: "/contact", priority: 0.9 },
  { path: "/services", priority: 0.8 },
  { path: "/centrale", priority: 0.7 },
  { path: "/qualite", priority: 0.7 },
  { path: "/realisations", priority: 0.6 },
  { path: "/environnement", priority: 0.5 },
  { path: "/groupe", priority: 0.5 },
  { path: "/carrieres", priority: 0.5 },
  { path: "/mentions-legales", priority: 0.1 },
  { path: "/confidentialite", priority: 0.1 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...products.map((p) => ({ path: `/produits/${p.slug}`, priority: 0.8 })),
    ...projects.map((p) => ({
      path: `/realisations/${p.slug}`,
      priority: 0.5,
    })),
  ];

  return paths.map(({ path, priority }) => ({
    url: SITE_URL + pathFor("fr", path),
    changeFrequency: "monthly",
    priority,
    alternates: { languages: languageAlternates(path) },
  }));
}
