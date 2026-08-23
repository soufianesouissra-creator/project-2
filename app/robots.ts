import type { MetadataRoute } from 'next'
import { SITE_URL, isProductionSite } from '@/lib/seo'

/**
 * Tant que le site n'est pas servi depuis son domaine de production, TOUT est
 * fermé : une prévisualisation indexée est une erreur qu'on ne rattrape pas
 * vite.
 *
 * En production, seules deux zones restent fermées : `/styleguide`, qui est un
 * outil de développement, et `/api`.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isProductionSite()) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/styleguide', '/api/'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
