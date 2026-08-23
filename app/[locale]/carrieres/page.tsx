import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { PageHero } from '@/components/sections/PageHero'
import { ApplicationForm } from '@/components/sections/ApplicationForm'
import { Faq } from '@/components/sections/Faq'
import { JsonLd } from '@/components/JsonLd'
import { Chip } from '@/components/ui/Chip'
import { jobPostingSchema } from '@/lib/schema'
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
    path: '/carrieres',
    title: 'Carrières',
    description:
      'TRANSPOLEQ recrute des chauffeurs SPL, des mécaniciens et des dispatchers. Postulez depuis votre téléphone.',
  })
}

/**
 * Carrières (§6.9).
 *
 * Pensée mobile d'abord, sans compromis : un chauffeur postule depuis son
 * téléphone, souvent debout, parfois entre deux rotations. Le formulaire vient
 * TÔT dans la page, pas après trois écrans de discours.
 */
export default async function CarrieresPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const { DRIVER_FAQ, JOBS, WHY_JOIN } = getContent(locale)

  const hasJobs = JOBS.length > 0

  return (
    <>
      {JOBS.map((job) => (
        <JsonLd
          key={job.slug}
          data={jobPostingSchema({
            title: job.title,
            description: job.summary,
            location: job.location,
            employmentType: job.contract,
            datePosted: job.datePosted,
            validThrough: job.validThrough,
          })}
        />
      ))}

      <PageHero
        eyebrow="Carrières"
        title="Prenez le volant."
        lead="Nous recrutons des chauffeurs SPL, des mécaniciens et des dispatchers. Un appel ou trois champs suffisent pour commencer."
        breadcrumb={[
          { name: 'Accueil', path: '/' },
          { name: 'Carrières', path: '/carrieres' },
        ]}
      />

      <section className="site-container py-16 lg:py-24" aria-labelledby="postes">
        <h2 id="postes" className="font-display font-semicondensed text-ink text-3xl font-semibold">
          Postes ouverts
        </h2>

        {hasJobs ? (
          <ul className="mt-10 grid gap-4 lg:grid-cols-2">
            {JOBS.map((job) => (
              <li
                key={job.slug}
                className="bg-limestone border-ink/10 rounded-card flex flex-col border p-6"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Chip tone="active">{job.contract}</Chip>
                  <Chip tone="muted">{job.location}</Chip>
                </div>
                <h3 className="font-display font-semicondensed text-ink mt-4 text-xl font-semibold">
                  {job.title}
                </h3>
                <p className="text-ink/75 mt-2 flex-1 text-sm">{job.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {job.requirements.map((requirement) => (
                    <li key={requirement}>
                      <Chip>{requirement}</Chip>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink/80 mt-6 max-w-[62ch] text-lg">
            Aucun poste ouvert pour le moment. Envoyez une candidature spontanée : les besoins en
            chauffeurs changent d’un mois à l’autre, et les RH rappellent les candidatures reçues.
          </p>
        )}
      </section>

      <section className="bg-limestone py-16 lg:py-24" aria-labelledby="candidature">
        <div className="site-container grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h2
              id="candidature"
              className="font-display font-semicondensed text-ink text-3xl font-semibold"
            >
              Candidature spontanée
            </h2>
            <p className="text-ink/75 mt-3 max-w-[52ch]">
              Le CV est facultatif. Votre expérience en quelques lignes suffit pour être rappelé.
            </p>
            <div className="mt-8">
              <ApplicationForm positions={JOBS.map((job) => job.title)} />
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="font-display font-semicondensed text-ink text-2xl font-semibold">
              Pourquoi nous rejoindre
            </h2>
            <ul className="mt-6 flex flex-col">
              {WHY_JOIN.map((reason) => (
                <li key={reason} className="border-ink/10 border-b py-3.5">
                  <span className="text-ink">{reason}</span>
                </li>
              ))}
            </ul>
            <p className="text-mist-ink mt-5 max-w-[46ch] font-mono text-xs">
              Cette liste doit être validée par les RH avant publication : chaque ligne est un
              engagement que l’entreprise devra tenir dès le premier jour.
            </p>
          </div>
        </div>
      </section>

      <div className="site-container py-16 lg:py-24">
        <Faq items={DRIVER_FAQ} heading="Questions des chauffeurs" />
      </div>
    </>
  )
}
