import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { PageHero } from '@/components/sections/PageHero'
import { QuoteBand } from '@/components/sections/QuoteBand'
import { FleetGrid } from '@/components/sections/FleetGrid'
import { Card } from '@/components/ui/Card'
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
    path: '/flotte',
    title: 'Flotte',
    description:
      'Bennes, semi-remorques, bennes calorifugées, porte-engins, citernes et plateaux. Capacités, équipements, atelier et politique de renouvellement.',
  })
}

export default async function FlottePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const { RENEWAL, TELEMATICS, WORKSHOP } = getContent(locale)

  const blocks = [WORKSHOP, RENEWAL, TELEMATICS]

  return (
    <>
      <PageHero
        eyebrow="Flotte"
        title="Le bon camion pour la contrainte du chantier."
        lead="Chaque catégorie répond à une contrainte précise : accès difficile, longue distance, température de pose, gabarit, produit liquide. Toutes portent un traceur 4G."
        breadcrumb={[
          { name: 'Accueil', path: '/' },
          { name: 'Flotte', path: '/flotte' },
        ]}
      />

      <FleetGrid />

      <section className="bg-limestone py-16 lg:py-24" aria-labelledby="atelier">
        <div className="site-container">
          <h2 id="atelier" className="sr-only">
            Atelier, renouvellement et télématique
          </h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {blocks.map((block) => (
              <Card key={block.title} className="bg-concrete">
                <h3 className="font-display font-semicondensed text-ink text-xl font-semibold">
                  {block.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {block.points.map((point) => (
                    <li key={point} className="text-ink/80 text-sm">
                      {point}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <p className="text-mist-ink mt-8 max-w-[68ch] font-mono text-xs">
            Les catégories listées sont celles que TRANSPOLEQ exploite. Une catégorie non exploitée est
            retirée de cette page plutôt que laissée à zéro : une ligne vide ferait croire à une flotte
            qui n’existe pas.
          </p>
        </div>
      </section>

      <QuoteBand />
    </>
  )
}
