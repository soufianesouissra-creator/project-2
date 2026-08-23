import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { PageHero } from '@/components/sections/PageHero'
import { GroupChain } from '@/components/sections/GroupChain'
import { KeyFigures } from '@/components/sections/KeyFigures'
import { ButtonLink } from '@/components/ui/Button'
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
    path: '/groupe',
    title: 'Le groupe',
    description:
      'TRANSPOLEQ est le bras transport du groupe ALEQ : carrière, centrale d’enrobage, transport, chantier.',
  })
}

export default async function GroupePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const { MILESTONES, VALUES } = getContent(locale)

  return (
    <>
      <PageHero
        eyebrow="Le groupe"
        title="Nous transportons pour un groupe qui construit."
        lead="ALEQ construit, AleqFactory produit, TRANSPOLEQ transporte. Les contraintes d’un chantier, nous ne les découvrons pas chez le client : nous les vivons."
        breadcrumb={[
          { name: 'Accueil', path: '/' },
          { name: 'Le groupe', path: '/groupe' },
        ]}
      />

      <GroupChain />

      {/* Frise, sur la ligne de marquage. */}
      <section className="bg-limestone py-16 lg:py-24" aria-labelledby="frise">
        <div className="site-container">
          <h2 id="frise" className="font-display font-semicondensed text-ink text-3xl font-semibold">
            Repères
          </h2>
          <ol className="mt-10 flex flex-col gap-0">
            {MILESTONES.map((milestone) => (
              <li key={milestone.title} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <span aria-hidden className="bg-marking mt-2 size-2 shrink-0 rounded-full" />
                  <span aria-hidden className="marking-line-y flex-1" />
                </div>
                <div className="pb-10">
                  <p className="text-mist-ink font-mono text-sm break-all">{milestone.year}</p>
                  <h3 className="font-display font-semicondensed text-ink mt-1 text-xl font-semibold">
                    {milestone.title}
                  </h3>
                  <p className="text-ink/75 mt-2 max-w-[62ch]">{milestone.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-mist-ink max-w-[68ch] font-mono text-xs">
            Les dates restent à fournir par la direction. Une chronologie inventée est la plus facile
            à démentir et la plus coûteuse quand elle l’est.
          </p>
        </div>
      </section>

      <section className="site-container py-16 lg:py-24" aria-labelledby="valeurs">
        <h2 id="valeurs" className="font-display font-semicondensed text-ink text-3xl font-semibold">
          Trois façons de travailler
        </h2>
        <p className="text-ink/70 mt-3 max-w-[68ch] text-lg">
          Chacune est suivie de ce qui la rend vérifiable. Une valeur sans preuve est un slogan.
        </p>
        <ul className="mt-10 grid gap-8 lg:grid-cols-3">
          {VALUES.map((value) => (
            <li key={value.title}>
              <span aria-hidden className="marking-line-x block w-full" />
              <h3 className="font-display font-semicondensed text-ink mt-5 text-xl font-semibold">
                {value.title}
              </h3>
              <p className="text-ink mt-3 text-lg">{value.sentence}</p>
              <p className="text-ink/70 mt-3 text-sm">{value.proof}</p>
            </li>
          ))}
        </ul>
      </section>

      <KeyFigures />

      <section className="bg-asphalt text-concrete py-16 lg:py-20">
        <div className="site-container flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="font-display font-expanded max-w-[20ch] text-3xl font-bold">
            Travailler avec le groupe
          </h2>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/devis" size="lg">
              Demander un devis
            </ButtonLink>
            <ButtonLink href="/carrieres" size="lg" variant="ghost-dark">
              Nous rejoindre
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
