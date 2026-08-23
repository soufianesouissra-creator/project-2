import type { MetadataRoute } from 'next'
import { SITE_URL, isProductionSite, localizedPath } from '@/lib/seo'
import { routing } from '@/lib/routing'
import { SERVICES } from '@/content/fr/services'

/** Pages publiques, avec leur priorité relative. `/styleguide` n'y figure jamais. */
const STATIC_PATHS: readonly { readonly path: string; readonly priority: number }[] = [
  { path: '/', priority: 1 },
  { path: '/services', priority: 0.9 },
  { path: '/devis', priority: 0.9 },
  { path: '/flotte', priority: 0.8 },
  { path: '/suivi', priority: 0.8 },
  { path: '/securite', priority: 0.7 },
  { path: '/secteurs', priority: 0.7 },
  { path: '/groupe', priority: 0.6 },
  { path: '/references', priority: 0.6 },
  { path: '/carrieres', priority: 0.7 },
  { path: '/contact', priority: 0.7 },
  { path: '/mentions-legales', priority: 0.2 },
  { path: '/confidentialite', priority: 0.2 },
]

/**
 * Sitemap.
 *
 * Vide tant que le site n'est pas servi depuis son domaine de production :
 * annoncer les URL d'une prévisualisation reviendrait à demander leur
 * indexation, ce que `robots.ts` interdit par ailleurs. Les deux fichiers
 * doivent dire la même chose.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionSite()) return []

  const paths = [
    ...STATIC_PATHS,
    ...SERVICES.map((service) => ({ path: `/services/${service.slug}`, priority: 0.8 })),
  ]

  return paths.map(({ path, priority }) => ({
    url: `${SITE_URL}${localizedPath(path, routing.defaultLocale)}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? ('weekly' as const) : ('monthly' as const),
    priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [
          locale === 'fr' ? 'fr-MA' : locale,
          `${SITE_URL}${localizedPath(path, locale)}`,
        ]),
      ),
    },
  }))
}
