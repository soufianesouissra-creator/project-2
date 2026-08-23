import type { Metadata } from 'next'
import { routing, type Locale } from './routing'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
export const SITE_NAME = 'TRANSPOLEQ'

/**
 * Le site n'est publiable qu'une fois les mentions légales renseignées et le
 * domaine en place. Tant que `NEXT_PUBLIC_SITE_URL` pointe ailleurs que sur le
 * domaine de production, TOUT reste `noindex` — une prévisualisation indexée
 * est une erreur qu'on ne rattrape pas vite.
 */
export const PRODUCTION_HOST = 'transpoleq.ma'

export function isProductionSite(): boolean {
  try {
    return new URL(SITE_URL).hostname.endsWith(PRODUCTION_HOST)
  } catch {
    return false
  }
}

/** Chemin canonique pour une langue, en tenant compte de `as-needed`. */
export function localizedPath(path: string, locale: Locale): string {
  const clean = path === '/' ? '' : path
  return locale === routing.defaultLocale ? clean || '/' : `/${locale}${clean}`
}

/**
 * URL de la vignette Open Graph d'une page.
 *
 * La convention de fichier de Next (`opengraph-image.tsx`) ne s'applique qu'à
 * la RACINE de son segment : `/flotte` et `/services/citernes` se partageaient
 * sans vignette. Chaque page pointe donc sur `/og` avec son propre titre.
 */
export function ogImageUrl(title: string, locale: Locale): string {
  const params = new URLSearchParams({ title, locale })
  return `${SITE_URL}/og?${params.toString()}`
}

export interface PageSeo {
  readonly title: string
  readonly description: string
  readonly path: string
  readonly locale: Locale
  /** Force le noindex même en production : styleguide, pages techniques. */
  readonly noindex?: boolean
  readonly image?: string
}

/**
 * Métadonnées d'une page : titre, description, canonique, hreflang, OG.
 * Toutes les pages passent par ici — c'est ce qui garantit qu'aucune n'oublie
 * sa canonique.
 */
export function pageMetadata({ title, description, path, locale, noindex, image }: PageSeo): Metadata {
  const canonical = localizedPath(path, locale)
  const languages: Record<string, string> = {}
  for (const code of routing.locales) {
    languages[code === 'fr' ? 'fr-MA' : code] = localizedPath(path, code)
  }
  languages['x-default'] = localizedPath(path, routing.defaultLocale)

  const indexable = isProductionSite() && !noindex

  return {
    title,
    description,
    alternates: { canonical, languages },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      locale: locale === 'fr' ? 'fr_MA' : locale,
      images: [
        {
          url: image ?? ogImageUrl(title, locale),
          width: 1200,
          height: 630,
          alt: `TRANSPOLEQ — ${title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
