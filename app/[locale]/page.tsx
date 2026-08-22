import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ButtonLink } from '@/components/ui/Button'
import { MarkingLine } from '@/components/motion/MarkingLine'

export const metadata: Metadata = {
  title: 'Fondations',
  robots: { index: false, follow: false },
}

/**
 * Page d'attente de la Phase 0.
 *
 * L'accueil réel (§6.1) est construit en Phase 1, après validation du
 * styleguide. Mettre ici une ébauche de hero donnerait à valider une page qui
 * n'a pas été conçue — c'est exactement ce que la porte de phase existe pour
 * éviter.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <section className="bg-asphalt text-concrete flex min-h-dvh items-center">
      <div className="site-container py-32">
        <p className="eyebrow text-mist">Phase 0 · Fondations</p>
        <h1 className="font-display font-expanded mt-5 max-w-[18ch] text-4xl font-bold lg:text-6xl">
          Le système avant les pages.
        </h1>
        <MarkingLine className="my-9 max-w-lg" />
        <p className="text-concrete/80 max-w-[62ch] text-lg">
          Jetons, fontes, grille, en-tête, pied de page, primitives de mouvement et tableau de
          dispatch sont livrés. L’accueil et les pages de service se construisent en Phase 1, une fois
          le système validé.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/styleguide">Voir le styleguide</ButtonLink>
          <ButtonLink href="/styleguide#board" variant="ghost-dark">
            Voir le tableau de dispatch
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
