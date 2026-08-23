import { ButtonLink } from '@/components/ui/Button'
import { DispatchBoard } from './DispatchBoard'
import { HeroVideo } from './HeroVideo'
import { DEMO_ROWS, INCOMING_ROWS } from '@/content/fr/dispatch-board'

/**
 * Hero (§6.1.1).
 *
 * Bande `--asphalt` pleine largeur. Le titre tient les colonnes 1 à 6, le
 * tableau de dispatch les colonnes 8 à 12 : le premier objet lisible de la
 * page est de la DONNÉE, pas une photo d'ambiance. C'est la thèse du site
 * rendue par la mise en page avant d'être écrite par une phrase.
 *
 * Le H1 est rendu tel quel — aucune animation ne le découpe en mots. Un titre
 * qui apparaît lettre par lettre est un titre qu'on ne peut pas lire pendant
 * qu'il arrive.
 */
export function Hero() {
  return (
    <section className="bg-asphalt text-concrete relative overflow-hidden">
      <HeroVideo />

      <div className="site-container relative grid gap-12 pt-28 pb-16 lg:grid-cols-12 lg:gap-10 lg:pt-40 lg:pb-24">
        <div className="flex flex-col justify-center lg:col-span-6">
          <p className="eyebrow text-mist">Transport &amp; logistique de chantier · Groupe ALEQ</p>

          <h1 className="font-display font-expanded mt-5 text-[length:var(--text-hero)] leading-[1.02] font-bold">
            Du gisement au chantier, chaque tonne à l’heure.
          </h1>

          <span aria-hidden className="marking-line-x my-8 block w-full max-w-sm" />

          <p className="text-concrete/80 max-w-[58ch] text-lg">
            TRANSPOLEQ transporte matériaux, enrobés et engins pour les chantiers d’infrastructure au
            Maroc. Flotte suivie en temps réel, rotations planifiées, livraisons tracées.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/devis" size="lg">
              Demander un devis
            </ButtonLink>
            <ButtonLink href="/flotte" size="lg" variant="ghost-dark">
              Voir la flotte
            </ButtonLink>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-6 lg:col-start-7 lg:self-center">
          <DispatchBoard rows={DEMO_ROWS} incoming={INCOMING_ROWS} live />
        </div>
      </div>
    </section>
  )
}
