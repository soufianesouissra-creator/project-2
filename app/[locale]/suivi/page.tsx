import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { PageHero } from '@/components/sections/PageHero'
import { TrackingMockup } from '@/components/sections/TrackingMockup'
import { QuoteBand } from '@/components/sections/QuoteBand'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { pageMetadata } from '@/lib/seo'
import { routing } from '@/lib/routing'

const CAPABILITIES = [
  {
    title: 'Position en temps réel',
    text: 'Un traceur 4G sur chaque camion. La position, la vitesse et les arrêts remontent en continu, y compris hors des grands axes.',
  },
  {
    title: 'Géorepérage carrière et chantier',
    text: 'Des zones sont définies autour des points de chargement et de déchargement. L’entrée et la sortie sont horodatées automatiquement — c’est ce qui rend un temps d’attente incontestable.',
  },
  {
    title: 'Ticket de pesée rattaché à la mission',
    text: 'La quantité chargée n’est pas ressaisie : le ticket suit la mission jusqu’à la facture.',
  },
  {
    title: 'Bon de livraison digital',
    text: 'Signature à l’arrivée, horodatage et géolocalisation. Le bon est disponible sans attendre le retour du camion.',
  },
  {
    title: 'Reporting quotidien et hebdomadaire',
    text: 'Tonnages, rotations, temps d’attente et écarts sur le plan. Envoyé, pas à demander.',
  },
  {
    title: 'Alertes sur écart',
    text: 'Un retard connu vaut mieux qu’un retard découvert. Le dispatch prévient dès qu’une rotation décroche.',
  },
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  return pageMetadata({
    locale,
    path: '/suivi',
    title: 'Suivi & technologie',
    description:
      'Position en temps réel, géorepérage, ticket de pesée rattaché à la mission, bon de livraison digital et reporting quotidien.',
  })
}

export default async function SuiviPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  return (
    <>
      <PageHero
        eyebrow="Suivi & technologie"
        title="Vous voyez ce que nous voyons."
        lead="Le suivi n’est pas un service en option : c’est la façon dont nous exploitons. Ce que le dispatch a sous les yeux, vous l’avez aussi."
        breadcrumb={[
          { name: 'Accueil', path: '/' },
          { name: 'Suivi & technologie', path: '/suivi' },
        ]}
      >
        <div className="mt-12 max-w-2xl">
          <TrackingMockup />
        </div>
      </PageHero>

      <section className="site-container py-16 lg:py-24" aria-labelledby="capacites">
        <h2 id="capacites" className="font-display font-semicondensed text-ink text-3xl font-semibold">
          Ce que le suivi couvre
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((capability) => (
            <li key={capability.title} className="flex">
              <Card className="w-full">
                <h3 className="font-display font-semicondensed text-ink text-lg font-semibold">
                  {capability.title}
                </h3>
                <p className="text-ink/75 mt-2 text-sm">{capability.text}</p>
              </Card>
            </li>
          ))}
        </ul>
        <p className="text-mist-ink mt-8 max-w-[68ch] font-mono text-xs">
          Les écrans présentés sur cette page sont dessinés aux couleurs du site à partir des données
          que nous exploitons. Ce ne sont pas des captures d’un outil tiers : elles dateraient au
          premier changement d’interface et exposeraient des données clients.
        </p>
      </section>

      <section className="bg-asphalt text-concrete py-16 lg:py-24" aria-labelledby="espace-client">
        <div className="site-container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-mist-ink">Bientôt</p>
            <h2
              id="espace-client"
              className="font-display font-expanded mt-4 max-w-[18ch] text-3xl font-bold lg:text-4xl"
            >
              Un espace client pour vos missions
            </h2>
            <span aria-hidden className="marking-line-x my-8 block w-full max-w-sm" />
            <p className="text-concrete/80 max-w-[58ch] text-lg">
              Retrouver vos missions, vos tonnages et vos bons de livraison sans les demander. En
              attendant, le reporting vous est envoyé chaque jour par votre dispatcher.
            </p>
            <div className="mt-8">
              {/* Bouton désactivé plutôt qu'un lien vers une page qui n'existe
                  pas : on n'ouvre pas une porte sur un mur. */}
              <Button disabled aria-describedby="espace-client-note">
                Bientôt disponible
              </Button>
              <p id="espace-client-note" className="text-mist-ink mt-3 font-mono text-xs">
                Cette fonctionnalité n’est pas encore ouverte.
              </p>
            </div>
          </div>
        </div>
      </section>

      <QuoteBand />
    </>
  )
}
