import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'

import { Hero } from '@/components/sections/Hero'
import { KeyFigures } from '@/components/sections/KeyFigures'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { MissionProcess } from '@/components/sections/MissionProcess'
import { FleetConvoy } from '@/components/sections/FleetConvoy'
import { TrackingBand } from '@/components/sections/TrackingBand'
import { GroupChain } from '@/components/sections/GroupChain'
import { ReferencesMarquee } from '@/components/sections/ReferencesMarquee'
import { CoverageMap } from '@/components/sections/CoverageMap'
import { CareersBand } from '@/components/sections/CareersBand'
import { QuoteBand } from '@/components/sections/QuoteBand'
import { JsonLd } from '@/components/JsonLd'
import { organizationSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { routing } from '@/lib/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  return pageMetadata({
    locale,
    path: '/',
    title: 'Transport et logistique de chantier au Maroc',
    description:
      'TRANSPOLEQ transporte matériaux, enrobés et engins pour les chantiers d’infrastructure au Maroc. Flotte suivie en temps réel, rotations planifiées, livraisons tracées.',
  })
}

/**
 * Accueil (§6.1) — onze sections, dans l'ordre du brief.
 *
 * Le rythme alterne béton et enrobé : hero sombre, quatre sections claires,
 * bande de suivi sombre, trois sections claires, bande devis sombre, pied de
 * page sombre. Le sombre reste minoritaire — c'est ce qui l'empêche de virer
 * au « presque-noir partout » que le brief rejette.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  return (
    <>
      <JsonLd data={organizationSchema()} />
      <Hero />
      <KeyFigures />
      <ServicesGrid />
      <MissionProcess intro="De la demande à la preuve de livraison, cinq étapes, toujours les mêmes." />
      <FleetConvoy />
      <TrackingBand />
      <GroupChain />
      <ReferencesMarquee />
      <CoverageMap />
      <CareersBand />
      <QuoteBand />
    </>
  )
}
