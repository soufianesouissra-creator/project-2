import { CONTACT, LEGAL } from '@/content/fr/site'
import { SERVICES, type Service } from '@/content/fr/services'
import { SITE_NAME, SITE_URL, localizedPath } from './seo'
import type { Locale } from './routing'

/**
 * Données structurées JSON-LD.
 *
 * Un seul principe : on ne balise QUE ce que la page affiche réellement. Un
 * `aggregateRating` inventé ou un `numberOfEmployees` approximatif est une
 * fausse déclaration à un moteur de recherche, et les crochets `[…]` du
 * contenu ne doivent pas s'y retrouver — d'où `omitPlaceholders`.
 */

/** Retire les valeurs encore entre crochets : on préfère un champ absent. */
function omitPlaceholders<T extends Record<string, unknown>>(input: T): Partial<T> {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(input)) {
    if (typeof value === 'string' && /^\[[A-Z_]+\]$/.test(value)) continue
    if (value === undefined || value === null) continue
    out[key] = value
  }
  return out as Partial<T>
}

export function organizationSchema() {
  return omitPlaceholders({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    legalName: LEGAL.legalName,
    url: SITE_URL,
    description:
      'Transport et logistique de chantier au Maroc : matériaux en vrac, enrobés à chaud, engins, citernes.',
    parentOrganization: {
      '@type': 'Organization',
      name: 'ALEQ',
      url: 'https://aleq.ma',
    },
    address: omitPlaceholders({
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address,
      addressLocality: CONTACT.city,
      addressCountry: 'MA',
    }),
    telephone: CONTACT.phone,
    email: CONTACT.email,
    areaServed: { '@type': 'Country', name: 'Maroc' },
  })
}

export function serviceSchema(service: Service, locale: Locale) {
  return omitPlaceholders({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.oneLine,
    serviceType: service.title,
    url: `${SITE_URL}${localizedPath(`/services/${service.slug}`, locale)}`,
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    areaServed: { '@type': 'Country', name: 'Maroc' },
  })
}

export function faqSchema(items: readonly { question: string; answer: string }[]) {
  // Une FAQ dont les réponses ne sont pas encore validées n'est pas balisée :
  // Google afficherait « à confirmer par l'exploitation » dans ses résultats.
  const answered = items.filter((item) => !/à (confirmer|valider|mesurer)/i.test(item.answer))
  if (answered.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: answered.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function breadcrumbSchema(
  trail: readonly { readonly name: string; readonly path: string }[],
  locale: Locale,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: `${SITE_URL}${localizedPath(entry.path, locale)}`,
    })),
  }
}

export function jobPostingSchema(job: {
  readonly title: string
  readonly description: string
  readonly location: string
  readonly employmentType: string
  readonly datePosted: string
  readonly validThrough?: string
}) {
  return omitPlaceholders({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    validThrough: job.validThrough,
    employmentType: job.employmentType,
    hiringOrganization: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    jobLocation: {
      '@type': 'Place',
      address: omitPlaceholders({
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: 'MA',
      }),
    },
  })
}

export const ALL_SERVICE_SLUGS = SERVICES.map((service) => service.slug)
