import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { PageHero } from '@/components/sections/PageHero'
import { QuoteBand } from '@/components/sections/QuoteBand'
import { Link } from '@/lib/navigation'
import { FLEET_SILHOUETTES } from '@/components/icons/FleetSilhouettes'
import { pageMetadata } from '@/lib/seo'
import { routing } from '@/lib/routing'
import { getContent } from '@/lib/content'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  return pageMetadata({
    locale,
    path: '/secteurs',
    title: 'Secteurs',
    description:
      'BTP, carrières, industrie, énergie et mines, agriculture, collectivités : ce que chaque secteur attend d’un transporteur et comment nous y répondons.',
  })
}

export default async function SecteursPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const { SECTORS, SERVICES } = getContent(locale)

  return (
    <>
      <PageHero
        eyebrow="Secteurs"
        title="Le même camion ne résout pas le même problème."
        lead="Ce qu’un atelier d’enrobés attend n’a rien à voir avec ce qu’attend une carrière ou une collectivité. Voici ce que nous avons compris de chacun."
        breadcrumb={[
          { name: 'Accueil', path: '/' },
          { name: 'Secteurs', path: '/secteurs' },
        ]}
      />

      <div className="site-container py-16 lg:py-24">
        <ul className="grid gap-6 lg:grid-cols-2">
          {SECTORS.map((sector) => {
            const Silhouette = FLEET_SILHOUETTES[sector.fleet[0] ?? 'benne-8x4']
            return (
              <li
                key={sector.id}
                className="bg-limestone border-ink/10 rounded-card flex flex-col border p-6 lg:p-8"
              >
                <div className="text-ink/70 max-w-[14rem]">
                  <Silhouette />
                </div>

                <h2 className="font-display font-semicondensed text-ink mt-6 text-2xl font-semibold">
                  {sector.name}
                </h2>

                <dl className="mt-5 flex flex-1 flex-col gap-4">
                  <div>
                    <dt className="eyebrow text-mist-ink">Le besoin</dt>
                    <dd className="text-ink/80 mt-1.5 text-sm">{sector.need}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-mist-ink">Notre réponse</dt>
                    <dd className="text-ink/80 mt-1.5 text-sm">{sector.answer}</dd>
                  </div>
                </dl>

                <div className="border-ink/10 mt-6 border-t pt-5">
                  <p className="eyebrow text-mist-ink">Services concernés</p>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                    {sector.services.map((slug) => {
                      const service = SERVICES.find((s) => s.slug === slug)
                      if (!service) return null
                      return (
                        <li key={slug}>
                          <Link
                            href={`/services/${slug}`}
                            className="text-ink text-sm font-medium underline underline-offset-4"
                          >
                            {service.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <QuoteBand />
    </>
  )
}
