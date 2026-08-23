import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { PageHero } from '@/components/sections/PageHero'
import { QuoteBand } from '@/components/sections/QuoteBand'
import { Table } from '@/components/ui/Table'
import { ButtonLink } from '@/components/ui/Button'
import { pageMetadata } from '@/lib/seo'
import { routing } from '@/lib/routing'
import { PROJECTS, TESTIMONIALS } from '@/content/fr/references'
import { CONTACT } from '@/content/fr/site'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  return pageMetadata({
    locale,
    path: '/references',
    title: 'Références',
    description:
      'Chantiers réalisés, tonnages transportés et régions couvertes. Références détaillées communiquées sur demande.',
  })
}

/**
 * Références (§6.8).
 *
 * Livrée VIDE, et c'est intentionnel : aucun nom de client, aucun logo, aucun
 * témoignage n'est publié sans autorisation ÉCRITE de son titulaire. L'état
 * vide explique pourquoi et propose l'alternative — des références chiffrées
 * communiquées sur demande, ce qui est de toute façon ce qu'un acheteur veut.
 */
export default async function ReferencesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const hasProjects = PROJECTS.length > 0

  return (
    <>
      <PageHero
        eyebrow="Références"
        title="Des chantiers, des tonnages, des régions."
        lead="Nous communiquons volontiers des références comparables au vôtre. Nous ne publions un nom qu’avec l’accord écrit de celui qui le porte."
        breadcrumb={[
          { name: 'Accueil', path: '/' },
          { name: 'Références', path: '/references' },
        ]}
      />

      <section className="site-container py-16 lg:py-24" aria-labelledby="chantiers">
        <h2 id="chantiers" className="font-display font-semicondensed text-ink text-3xl font-semibold">
          Chantiers réalisés
        </h2>

        {hasProjects ? (
          <Table
            className="mt-10"
            caption="Chantiers réalisés par TRANSPOLEQ"
            rowKey={(row) => row.id}
            rows={PROJECTS}
            columns={[
              { key: 'client', header: 'Client', cell: (row) => row.client },
              { key: 'transport', header: 'Type de transport', cell: (row) => row.transport },
              { key: 'volume', header: 'Volume / durée', align: 'end', cell: (row) => row.volume },
              { key: 'region', header: 'Région', cell: (row) => row.region },
              { key: 'year', header: 'Année', align: 'end', cell: (row) => row.year },
            ]}
          />
        ) : (
          <div className="border-ink/10 mt-10 max-w-[68ch] border-s-2 ps-6">
            <p className="text-ink/80 text-lg">
              Aucun chantier n’est publié pour le moment. Ce n’est pas qu’il n’y en a pas : c’est que
              chaque référence nommée demande l’autorisation écrite du client concerné, et que nous ne
              la contournons pas.
            </p>
            <p className="text-ink/75 mt-4">
              Décrivez-nous votre chantier et nous vous communiquons des références comparables —
              tonnage, durée, région, contraintes d’accès — avec les coordonnées d’un donneur d’ordre
              qui accepte d’être appelé.
            </p>
            <p className="text-mist mt-5 font-mono text-sm">Demande : {CONTACT.email}</p>
          </div>
        )}
      </section>

      {TESTIMONIALS.length > 0 ? (
        <section className="bg-limestone py-16 lg:py-24" aria-labelledby="temoignages">
          <div className="site-container">
            <h2
              id="temoignages"
              className="font-display font-semicondensed text-ink text-3xl font-semibold"
            >
              Ce qu’ils en disent
            </h2>
            <ul className="mt-10 grid gap-8 lg:grid-cols-2">
              {TESTIMONIALS.map((testimonial) => (
                <li key={testimonial.id} className="border-ink/10 border-s-2 ps-6">
                  <blockquote className="text-ink text-lg">« {testimonial.quote} »</blockquote>
                  <p className="text-mist mt-3 font-mono text-xs">
                    {testimonial.name} · {testimonial.role} · {testimonial.company}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="site-container py-16 lg:py-24" aria-labelledby="fiche">
        <div className="bg-limestone border-ink/10 rounded-card border p-8">
          <h2 id="fiche" className="font-display font-semicondensed text-ink text-2xl font-semibold">
            Fiche de présentation
          </h2>
          <p className="text-ink/75 mt-3 max-w-[62ch]">
            Capacités, flotte, couverture et attestations en un document. À produire une fois les
            chiffres de flotte confirmés — nous ne diffusons pas une plaquette dont les nombres sont
            encore entre crochets.
          </p>
          <ButtonLink href="/contact" variant="ghost" className="mt-6">
            La demander
          </ButtonLink>
        </div>
      </section>

      <QuoteBand />
    </>
  )
}
