import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { PageHero } from '@/components/sections/PageHero'
import { QuoteBand } from '@/components/sections/QuoteBand'
import { Card } from '@/components/ui/Card'
import { IconDocument, IconShield } from '@/components/icons'
import { pageMetadata } from '@/lib/seo'
import { routing } from '@/lib/routing'
import {
  AVAILABLE_DOCUMENTS,
  CERTIFICATIONS,
  COMMITMENTS,
  SAFETY_BLOCKS,
} from '@/content/fr/safety'
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
    path: '/securite',
    title: 'Sécurité & conformité',
    description:
      'Engagements de sécurité, suivi des chauffeurs par télématique, maintenance des véhicules, autorisations et assurances.',
  })
}

export default async function SecuritePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  return (
    <>
      <PageHero
        eyebrow="Sécurité & conformité"
        title="Ce qui est mesuré n’a pas besoin d’être promis."
        lead="Cette page décrit ce que nous faisons, pas ce que nous visons. Les documents cités sont communiqués sur demande."
        breadcrumb={[
          { name: 'Accueil', path: '/' },
          { name: 'Sécurité & conformité', path: '/securite' },
        ]}
      />

      <section className="site-container py-16 lg:py-24" aria-labelledby="engagements">
        <h2 id="engagements" className="font-display font-semicondensed text-ink text-3xl font-semibold">
          Nos engagements
        </h2>
        <ul className="mt-8 flex max-w-[68ch] flex-col">
          {COMMITMENTS.map((commitment) => (
            <li key={commitment} className="border-ink/10 flex items-start gap-4 border-b py-4">
              <IconShield className="text-marking mt-0.5 size-5 shrink-0" />
              <span className="text-ink text-lg">{commitment}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-limestone py-16 lg:py-24" aria-labelledby="pratiques">
        <div className="site-container">
          <h2 id="pratiques" className="sr-only">
            Chauffeurs, véhicules, conformité et incidents
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {SAFETY_BLOCKS.map((block) => (
              <Card key={block.id} className="bg-concrete">
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
        </div>
      </section>

      <section className="site-container py-16 lg:py-24" aria-labelledby="certifications">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h2
              id="certifications"
              className="font-display font-semicondensed text-ink text-3xl font-semibold"
            >
              Certifications
            </h2>
            {CERTIFICATIONS.length === 0 ? (
              <p className="text-ink/75 mt-5 max-w-[58ch]">
                Aucune certification n’est affichée ici. Nous ne listons que celles réellement
                détenues, avec leur organisme et leur date de validité — afficher un référentiel qu’on
                ne détient pas se vérifie en un appel.
              </p>
            ) : (
              <ul className="mt-6 flex flex-col gap-4">
                {CERTIFICATIONS.map((certification) => (
                  <li key={certification.name} className="border-ink/10 border-t pt-4">
                    <p className="text-ink font-medium">{certification.name}</p>
                    <p className="text-mist mt-1 font-mono text-xs">
                      {certification.body} · valide jusqu’au {certification.validUntil}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="font-display font-semicondensed text-ink text-3xl font-semibold">
              Documents
            </h2>
            <p className="text-ink/75 mt-5">
              Ces pièces vous sont communiquées sur simple demande, avant ou pendant la mission :
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {AVAILABLE_DOCUMENTS.map((document) => (
                <li key={document} className="text-ink/85 flex items-start gap-3 text-sm">
                  <IconDocument className="text-mist mt-0.5 size-4 shrink-0" />
                  {document}
                </li>
              ))}
            </ul>
            <p className="text-mist mt-6 font-mono text-xs">Demande : {CONTACT.email}</p>
          </div>
        </div>
      </section>

      <QuoteBand />
    </>
  )
}
