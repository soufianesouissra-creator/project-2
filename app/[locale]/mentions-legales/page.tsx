import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { LegalLayout, LegalList, LegalSection } from '@/components/sections/LegalLayout'
import { pageMetadata } from '@/lib/seo'
import { routing } from '@/lib/routing'
import { getContent } from '@/lib/content'
import { ph } from '@/content/placeholders'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  return pageMetadata({
    locale,
    path: '/mentions-legales',
    title: 'Mentions légales',
    description: 'Identité de l’éditeur, hébergeur et directeur de la publication du site TRANSPOLEQ.',
  })
}

export default async function MentionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const { CONTACT, LEGAL } = getContent(locale)

  return (
    <LegalLayout title="Mentions légales" updated="à compléter">
      <LegalSection title="Éditeur du site">
        <LegalList
          rows={[
            ['Raison sociale', LEGAL.legalName],
            ['Forme juridique', LEGAL.legalForm],
            ['Capital social', LEGAL.capital],
            ['Siège social', `${CONTACT.address}, ${CONTACT.city}`],
            ['Registre du commerce', LEGAL.rc],
            ['ICE', LEGAL.ice],
            ['Identifiant fiscal', LEGAL.taxId],
            ['Téléphone', CONTACT.phone],
            ['E-mail', CONTACT.email],
            ['Directeur de la publication', ph('DIRECTEUR_PUBLICATION')],
          ]}
        />
        <p className="text-mist font-mono text-xs">
          Les valeurs entre crochets restent à fournir. Cette page ne peut pas être publiée en l’état :
          les mentions légales d’un site marchand marocain sont opposables.
        </p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <LegalList rows={[['Hébergeur', ph('HEBERGEUR')]]} />
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          Les textes, illustrations, silhouettes, icônes et éléments d’interface de ce site sont la
          propriété de {LEGAL.legalName}, sauf mention contraire. Toute reproduction sans autorisation
          écrite est interdite.
        </p>
        <p>
          Les marques et logos de tiers éventuellement présentés le sont avec l’autorisation de leurs
          titulaires et restent leur propriété.
        </p>
      </LegalSection>

      <LegalSection title="Données affichées">
        <p>
          Les chiffres, capacités et délais présentés sur ce site sont indicatifs et ne constituent pas
          un engagement contractuel. Seul le devis signé fait foi.
        </p>
        <p>
          Le tableau de dispatch affiché sur la page d’accueil présente des données illustratives : il
          ne reflète aucune mission réelle et n’expose aucune donnée client.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          {LEGAL.legalName} s’efforce de tenir ce site à jour mais ne garantit pas l’exactitude ni
          l’exhaustivité des informations qui y figurent. Les liens vers des sites tiers n’engagent pas
          sa responsabilité.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
