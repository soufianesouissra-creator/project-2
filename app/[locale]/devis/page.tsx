import type { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import { PageHero } from '@/components/sections/PageHero'
import { QuoteForm } from '@/components/sections/QuoteForm'
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
    path: '/devis',
    title: 'Demander un devis',
    description:
      'Décrivez votre besoin de transport : matériau, trajet, fréquence. Un dispatcher vous rappelle.',
  })
}

/**
 * Demander un devis (§6.10).
 *
 * Le libellé est le même de bout en bout : CTA « Demander un devis » → page
 * « Demander un devis » → bouton « Envoyer la demande » → « Demande envoyée ».
 * Un flux qui change de vocabulaire en route fait douter de l'endroit où l'on
 * a cliqué.
 */
export default async function DevisPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const { CONTACT } = getContent(locale)

  return (
    <>
      <PageHero
        eyebrow="Devis"
        title="Demander un devis"
        lead="Trois étapes : ce que vous transportez, d’où à où, et comment vous joindre. Comptez deux minutes."
        breadcrumb={[
          { name: 'Accueil', path: '/' },
          { name: 'Demander un devis', path: '/devis' },
        ]}
      />

      <div className="site-container grid gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-7">
          {/* La réserve occupe la HAUTEUR du formulaire. Une ligne de texte à
              la place faisait sauter la page de 0,176 de CLS au moment où le
              formulaire arrivait — trois fois le budget du brief. */}
          <Suspense
            fallback={
              <div className="min-h-[46rem]" role="status" aria-live="polite">
                <p className="text-mist-ink font-mono text-sm">Chargement du formulaire…</p>
              </div>
            }
          >
            <QuoteForm />
          </Suspense>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="bg-limestone border-ink/10 rounded-card border p-6">
            <h2 className="font-display font-semicondensed text-ink text-xl font-semibold">
              Ce qui accélère la réponse
            </h2>
            <ul className="text-ink/75 mt-4 flex flex-col gap-3 text-sm">
              <li>Le tonnage ou le volume, même approximatif.</li>
              <li>La date de début et la fenêtre horaire.</li>
              <li>Les contraintes d’accès du chantier.</li>
              <li>Un numéro joignable en journée.</li>
            </ul>
            <p className="border-ink/10 text-mist-ink mt-6 border-t pt-4 font-mono text-xs">
              Urgent : {CONTACT.phone}
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}
