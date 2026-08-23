import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { PageHero } from '@/components/sections/PageHero'
import { MediaFrame } from '@/components/sections/MediaFrame'
import { QuoteBand } from '@/components/sections/QuoteBand'
import { ButtonLink } from '@/components/ui/Button'
import { Link } from '@/lib/navigation'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { routing } from '@/lib/routing'
import { getContent } from '@/lib/content'
import { cn } from '@/lib/cn'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  return pageMetadata({
    locale,
    path: '/services',
    title: 'Services de transport',
    description:
      'Matériaux en vrac, enrobés à chaud, porte-engins, citernes, camions avec chauffeur et logistique de chantier, partout au Maroc.',
  })
}

/**
 * Index des services (§6.2).
 *
 * Six grandes lignes alternées image / texte. Chacune répond aux trois
 * questions qu'un acheteur pose dans cet ordre : qu'est-ce que vous
 * transportez, avec quoi, et pour qui.
 */
export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const { SERVICES } = getContent(locale)

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: 'Accueil', path: '/' },
            { name: 'Services', path: '/services' },
          ],
          locale,
        )}
      />

      <PageHero
        eyebrow="Services"
        title="Six façons de faire arriver ce qui doit arriver."
        lead="Chaque service répond à une contrainte de chantier précise. Tous partagent la même mécanique : rotations planifiées, chargements pesés, livraisons tracées."
        breadcrumb={[
          { name: 'Accueil', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      />

      <div className="site-container py-16 lg:py-24">
        <ul className="flex flex-col gap-16 lg:gap-24">
          {SERVICES.map((service, index) => (
            <li key={service.slug}>
              <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <div
                  className={cn(
                    'lg:col-span-5',
                    // Alternance : l'image passe à droite une ligne sur deux.
                    index % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-8 lg:order-2',
                  )}
                >
                  <MediaFrame src={service.image} alt={`${service.title} — ${service.oneLine}`} />
                </div>

                <div
                  className={cn(
                    'lg:col-span-6',
                    index % 2 === 0 ? 'lg:col-start-7' : 'lg:col-start-1 lg:order-1',
                  )}
                >
                  <h2 className="font-display font-semicondensed text-ink text-2xl font-semibold lg:text-3xl">
                    {service.title}
                  </h2>
                  <p className="text-ink/75 mt-3 max-w-[62ch] text-lg">{service.oneLine}</p>

                  <dl className="mt-8 grid gap-6 sm:grid-cols-3">
                    <div>
                      <dt className="eyebrow text-mist">Ce que nous transportons</dt>
                      <dd className="text-ink/80 mt-2 text-sm">{service.carries.join(' · ')}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-mist">Matériel mobilisé</dt>
                      <dd className="text-ink/80 mt-2 text-sm">
                        {service.fleet.length} catégorie{service.fleet.length > 1 ? 's' : ''} de la flotte
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-mist">Pour qui</dt>
                      <dd className="text-ink/80 mt-2 text-sm">{service.forWho.join(' · ')}</dd>
                    </div>
                  </dl>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <ButtonLink href={`/services/${service.slug}`} variant="ghost">
                      {service.title}
                    </ButtonLink>
                    <Link
                      href={`/devis?service=${service.slug}`}
                      className="text-ink self-center text-sm font-medium underline underline-offset-4"
                    >
                      Demander un devis
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <QuoteBand />
    </>
  )
}
