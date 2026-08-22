import type { MetadataRoute } from 'next'

/**
 * Phase 0 : le site n'est pas public. Tout est fermé à l'indexation, y compris
 * sur les déploiements de prévisualisation.
 *
 * Phase 1 : ouvrir les pages publiques et laisser `/styleguide` fermé — cette
 * page reste un outil de développement, jamais un contenu.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', disallow: '/' },
  }
}
