import { Link } from '@/lib/navigation'
import { ButtonLink } from '@/components/ui/Button'
import { PinnedHorizontal } from '@/components/motion/PinnedHorizontal'
import { FLEET } from '@/content/fr/fleet'
import { FLEET_SILHOUETTES } from '@/components/icons/FleetSilhouettes'

/**
 * Teaser de flotte (§6.1.5) — un convoi.
 *
 * Les cartes défilent horizontalement sur desktop et redeviennent une liste
 * verticale partout ailleurs. Le mouvement encode quelque chose : un convoi
 * avance. C'est la seule raison pour laquelle il existe.
 */
export function FleetConvoy() {
  return (
    <section className="site-container py-16 lg:py-24" aria-labelledby="flotte">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="flotte" className="font-display font-semicondensed text-ink text-3xl font-semibold">
            La flotte
          </h2>
          <p className="text-ink/70 mt-3 max-w-[62ch] text-lg">
            Chaque catégorie répond à une contrainte de chantier précise. Toutes portent un traceur.
          </p>
        </div>
        <Link href="/flotte" className="text-ink text-sm font-medium underline underline-offset-4">
          Voir toute la flotte
        </Link>
      </div>

      <div className="mt-10">
        <PinnedHorizontal label="Catégories de la flotte">
          {FLEET.map((category) => {
            const Silhouette = FLEET_SILHOUETTES[category.key]
            return (
              <article
                key={category.key}
                className="bg-limestone border-ink/10 rounded-card flex flex-col border p-6 lg:w-[20rem] lg:shrink-0"
              >
                <div className="text-ink">
                  <Silhouette />
                </div>
                <h3 className="font-display font-semicondensed text-ink mt-5 text-lg font-semibold">
                  {category.name}
                </h3>
                <p className="text-ink/70 mt-1.5 flex-1 text-sm">{category.use}</p>
                <dl className="border-ink/10 mt-5 border-t pt-4 font-mono text-xs">
                  <div className="flex justify-between gap-3 py-1">
                    <dt className="text-mist">Capacité utile</dt>
                    <dd className="text-ink text-end">{category.capacity}</dd>
                  </div>
                  <div className="flex justify-between gap-3 py-1">
                    <dt className="text-mist">En exploitation</dt>
                    <dd className="text-ink text-end">{category.count}</dd>
                  </div>
                </dl>
              </article>
            )
          })}
        </PinnedHorizontal>
      </div>

      <ButtonLink href="/flotte" variant="ghost" className="mt-10">
        Voir toute la flotte
      </ButtonLink>
    </section>
  )
}
