import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { PageHero } from '@/components/sections/PageHero'
import { MediaFrame } from '@/components/sections/MediaFrame'
import { MissionProcess } from '@/components/sections/MissionProcess'
import { Faq } from '@/components/sections/Faq'
import { QuoteBand } from '@/components/sections/QuoteBand'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/JsonLd'
import { FLEET_SILHOUETTES } from '@/components/icons/FleetSilhouettes'
import { breadcrumbSchema, serviceSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { routing } from '@/lib/routing'
import { SERVICES, serviceBySlug } from '@/content/fr/services'
import { fleetByKeys } from '@/content/fr/fleet'

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICES.map((service) => ({ locale, slug: service.slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const service = serviceBySlug(slug)
  if (!service) notFound()

  return pageMetadata({
    locale,
    path: `/services/${service.slug}`,
    title: service.title,
    description: service.oneLine,
  })
}

/**
 * Page de service (§6.2).
 *
 * Gabarit unique pour les six : pour qui → ce qui est inclus → matériel →
 * comment ça se passe → indicateurs → FAQ → devis prérempli.
 *
 * Le CTA final passe `?service=<slug>` à `/devis` : personne ne resaisit ce
 * qu'il vient de lire.
 */
export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const service = serviceBySlug(slug)
  if (!service) notFound()

  const fleet = fleetByKeys(service.fleet)

  return (
    <>
      <JsonLd data={serviceSchema(service, locale)} />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: 'Accueil', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path: `/services/${service.slug}` },
          ],
          locale,
        )}
      />

      <PageHero
        eyebrow="Service"
        title={service.title}
        lead={service.oneLine}
        breadcrumb={[
          { name: 'Accueil', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={`/devis?service=${service.slug}`} size="lg">
            Demander un devis
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="ghost-dark">
            Parler à un dispatcher
          </ButtonLink>
        </div>
      </PageHero>

      <div className="site-container py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h2 className="font-display font-semicondensed text-ink text-2xl font-semibold">
              Pour qui
            </h2>
            <ul className="text-ink/80 mt-4 flex flex-wrap gap-x-2 gap-y-2">
              {service.forWho.map((who) => (
                <li key={who} className="border-ink/20 rounded-[2px] border px-2.5 py-1 font-mono text-xs">
                  {who}
                </li>
              ))}
            </ul>

            <h2 className="font-display font-semicondensed text-ink mt-12 text-2xl font-semibold">
              Ce que nous transportons
            </h2>
            <ul className="text-ink/80 mt-4 flex flex-wrap gap-x-2 gap-y-2">
              {service.carries.map((item) => (
                <li key={item} className="border-ink/20 rounded-[2px] border px-2.5 py-1 font-mono text-xs">
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="font-display font-semicondensed text-ink mt-12 text-2xl font-semibold">
              Ce qui est inclus
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {service.included.map((item) => (
                <li key={item} className="text-ink/85 flex items-start gap-3">
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    className="text-marking mt-1 size-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path d="M4 10.5 8 14.5 16 5.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <MediaFrame
              src={service.image}
              alt={`${service.title} en situation sur un chantier marocain`}
              ratio="landscape"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />

            <h2 className="font-display font-semicondensed text-ink mt-10 text-2xl font-semibold">
              Indicateurs
            </h2>
            <dl className="mt-5 flex flex-col gap-5">
              {service.kpis.map((kpi) => (
                <div key={kpi.label} className="border-ink/10 border-t pt-4">
                  <dt className="text-ink/80 text-sm">{kpi.label}</dt>
                  <dd className="text-ink mt-1 font-mono text-lg break-all">{kpi.value}</dd>
                  <p className="text-mist mt-1 font-mono text-xs">{kpi.note}</p>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Matériel : les catégories de flotte filtrées sur ce service. */}
      <section className="bg-limestone py-16 lg:py-24" aria-labelledby="materiel">
        <div className="site-container">
          <h2 id="materiel" className="font-display font-semicondensed text-ink text-3xl font-semibold">
            Matériel mobilisé
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fleet.map((category) => {
              const Silhouette = FLEET_SILHOUETTES[category.key]
              return (
                <li
                  key={category.key}
                  className="border-ink/10 rounded-card bg-concrete flex flex-col border p-5"
                >
                  <div className="text-ink">
                    <Silhouette />
                  </div>
                  <h3 className="font-display font-semicondensed text-ink mt-4 text-lg font-semibold">
                    {category.name}
                  </h3>
                  <p className="text-mist mt-2 font-mono text-xs break-all">
                    {category.capacity} · {category.count}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <MissionProcess
        heading="Comment ça se passe"
        intro="Les cinq étapes d’une mission, avec ce qu’elles ont de particulier pour ce service."
        notes={service.stepNotes}
      />

      <div className="site-container py-16 lg:py-24">
        <Faq items={service.faq} />
      </div>

      <QuoteBand />
    </>
  )
}
