import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { PageHero } from '@/components/sections/PageHero'
import { ContactForm } from '@/components/sections/ContactForm'
import { IconPhone, IconWhatsapp, IconPin, IconClock } from '@/components/icons'
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
    path: '/contact',
    title: 'Contact',
    description: 'Adresse, téléphone, WhatsApp et horaires du dispatch TRANSPOLEQ.',
  })
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const { CONTACT } = getContent(locale)

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parler à un dispatcher"
        lead="Pour une demande chiffrée, passez plutôt par le devis : le formulaire pose les questions qu’un dispatcher poserait."
        breadcrumb={[
          { name: 'Accueil', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />

      <div className="site-container grid gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-5">
          <h2 className="font-display font-semicondensed text-ink text-2xl font-semibold">
            Coordonnées
          </h2>
          <address className="mt-6 flex flex-col gap-5 not-italic">
            <Line icon={<IconPin className="size-5" />} label="Adresse">
              {CONTACT.address}
              <br />
              {CONTACT.city}
            </Line>
            <Line icon={<IconPhone className="size-5" />} label="Téléphone">
              <a href={`tel:${CONTACT.phoneHref}`} className="underline underline-offset-4">
                {CONTACT.phone}
              </a>
            </Line>
            <Line icon={<IconWhatsapp className="size-5" />} label="WhatsApp">
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                rel="noreferrer noopener"
                className="underline underline-offset-4"
              >
                {CONTACT.whatsapp}
              </a>
            </Line>
            <Line icon={<IconClock className="size-5" />} label="Horaires">
              {CONTACT.hours}
            </Line>
          </address>

          {/* Carte : image statique ou MapLibre, jamais une clé Google Maps.
              Tant que l'adresse du siège n'est pas fournie, il n'y a rien à
              placer — et une carte centrée sur le Maroc n'aide personne. */}
          <div className="bg-limestone border-ink/10 mt-10 flex aspect-[4/3] flex-col justify-end border p-4">
            <p className="text-mist-ink font-mono text-xs">Carte à ajouter</p>
            <p className="text-ink/60 mt-1 max-w-[42ch] text-sm">
              Image statique ou MapLibre, une fois l’adresse du siège fournie. Aucune dépendance à une
              clé Google Maps.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="font-display font-semicondensed text-ink text-2xl font-semibold">
            Écrire un message
          </h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  )
}

function Line({
  icon,
  label,
  children,
}: {
  readonly icon: React.ReactNode
  readonly label: string
  readonly children: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
      <span className="text-mist-ink mt-0.5 shrink-0">{icon}</span>
      <span>
        <span className="eyebrow text-mist-ink block">{label}</span>
        <span className="text-ink mt-1 block">{children}</span>
      </span>
    </div>
  )
}
