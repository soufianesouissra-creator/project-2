import { ButtonLink } from '@/components/ui/Button'
import { TrackingMockup } from './TrackingMockup'

const COLUMNS = [
  {
    title: 'Position en temps réel',
    text: 'Chaque camion porte un traceur 4G. Vous savez où est votre chargement, pas où il était ce matin.',
  },
  {
    title: 'Pesée et preuve de livraison',
    text: 'Le ticket de pesée est rattaché à la mission. Le bon de livraison est signé, horodaté et géolocalisé.',
  },
  {
    title: 'Chauffeurs formés et suivis',
    text: 'Vitesse, freinages et temps de conduite sont mesurés par la télématique, pas déclarés.',
  },
]

/**
 * Bande sombre suivi & sécurité (§6.1.6).
 *
 * Deuxième des trois bandes `--asphalt` du site. C'est ici que la promesse de
 * transparence se démontre : trois colonnes, et une maquette de l'écran de
 * suivi construite en code.
 */
export function TrackingBand() {
  return (
    <section className="bg-asphalt text-concrete py-16 lg:py-24" aria-labelledby="suivi">
      <div className="site-container grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <p className="eyebrow text-mist">Suivi &amp; sécurité</p>
          <h2
            id="suivi"
            className="font-display font-expanded mt-4 max-w-[18ch] text-3xl font-bold lg:text-4xl"
          >
            Vous voyez ce que notre dispatch voit.
          </h2>
          <span aria-hidden className="marking-line-x my-8 block w-full max-w-sm" />

          <dl className="grid gap-8 sm:grid-cols-3 lg:grid-cols-1 lg:gap-6">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <dt className="text-concrete font-medium">{column.title}</dt>
                <dd className="text-concrete/70 mt-1.5 max-w-[52ch] text-sm">{column.text}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/suivi">Comment nous suivons</ButtonLink>
            <ButtonLink href="/securite" variant="ghost-dark">
              Sécurité &amp; conformité
            </ButtonLink>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-5 lg:col-start-8 lg:self-center">
          <TrackingMockup />
        </div>
      </div>
    </section>
  )
}
