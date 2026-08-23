import { COVERAGE_INTRO, REGIONS } from '@/content/fr/coverage'
import { Chip } from '@/components/ui/Chip'

/**
 * Couverture (§6.1.9).
 *
 * Carte SVG maison, volontairement SCHÉMATIQUE : une silhouette du royaume au
 * trait, des hubs en points, des itinéraires en pointillé de marquage. Ce n'est
 * pas une carte géographique et elle ne prétend pas l'être — la précision
 * cartographique n'apporterait rien à un acheteur qui veut savoir « couvrez-vous
 * ma région ? », et la liste à droite répond à cette question mieux qu'un tracé.
 *
 * Aucune région n'est coloriée « desservie » tant que l'exploitation ne l'a pas
 * confirmé : une carte qui colorie tout le royaume ne dit rien.
 */
export function CoverageMap() {
  const confirmed = REGIONS.filter((region) => region.served === true)
  const pending = REGIONS.filter((region) => region.served === null)

  return (
    <section className="site-container py-16 lg:py-24" aria-labelledby="couverture">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h2
            id="couverture"
            className="font-display font-semicondensed text-ink text-3xl font-semibold"
          >
            Où nous intervenons
          </h2>
          <p className="text-ink/70 mt-3 max-w-[52ch] text-lg">{COVERAGE_INTRO}</p>

          <h3 className="eyebrow text-mist mt-10">Régions</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {confirmed.map((region) => (
              <li key={region.id}>
                <Chip tone="neutral">{region.name}</Chip>
              </li>
            ))}
            {pending.map((region) => (
              <li key={region.id}>
                <Chip tone="muted">{region.name}</Chip>
              </li>
            ))}
          </ul>

          {confirmed.length === 0 ? (
            <p className="text-mist mt-5 max-w-[52ch] font-mono text-xs">
              Les régions desservies en propre et les sites d’exploitation restent à confirmer par
              l’exploitation. Aucune n’est présentée comme couverte tant qu’elle ne l’est pas.
            </p>
          ) : null}
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <MoroccoDiagram />
        </div>
      </div>
    </section>
  )
}

/**
 * Silhouette du Maroc, au même trait que les icônes et les silhouettes de
 * flotte : 2 px, sans remplissage.
 *
 * Simplifiée, mais RECONNAISSABLE — c'est tout l'intérêt. Un premier jet
 * schématique donnait une forme quelconque : elle n'aidait personne à se
 * repérer et ne valait pas la place qu'elle prenait. Le tracé suit la côte
 * atlantique, la côte méditerranéenne, le saillant de Figuig et la pointe sud.
 *
 * Ce n'est pas un fond de carte : la question « couvrez-vous ma région ? »
 * trouve sa réponse dans la liste, pas dans le dessin.
 */
function MoroccoDiagram() {
  return (
    <figure>
      <svg
        viewBox="0 0 300 520"
        role="img"
        aria-labelledby="carte-titre"
        className="text-ink/30 mx-auto max-h-[24rem] w-full max-w-[16rem]"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <title id="carte-titre">
          Silhouette du Maroc. Les régions desservies sont listées à côté de cette illustration.
        </title>

        <path d="M112 28 L150 34 L186 42 L216 52 L234 62 L236 96 L224 126 L248 158 L232 188 L196 216 L164 250 L140 286 L152 302 L152 352 L152 432 L120 472 L96 500 L86 470 L78 430 L70 392 L62 356 L56 328 L50 300 L44 268 L38 236 L34 208 L42 182 L52 166 L64 150 L72 132 L82 96 L96 60 Z" />

        {/* Itinéraires, sur la ligne de marquage. Ils relient les points, ils
            ne prétendent pas suivre une route réelle. */}
        <g stroke="var(--color-marking)" strokeDasharray="16 10" strokeWidth={2}>
          <path d="M110 44 L74 152" />
          <path d="M74 152 L82 236" />
          <path d="M82 236 L66 358" />
        </g>

        {/* Sites d'exploitation. Non nommés tant que la liste n'est pas fournie. */}
        <g className="text-ink" stroke="currentColor" fill="var(--color-concrete)" strokeWidth={2}>
          <circle cx="110" cy="44" r="6" />
          <circle cx="74" cy="152" r="6" />
          <circle cx="82" cy="236" r="6" />
          <circle cx="66" cy="358" r="6" />
        </g>
      </svg>
      <figcaption className="text-mist mt-4 text-center font-mono text-xs">
        Silhouette indicative. Les sites d’exploitation seront nommés et replacés une fois la liste
        fournie ({'['}HUBS{']'}).
      </figcaption>
    </figure>
  )
}
