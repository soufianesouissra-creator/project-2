import { Counter } from '@/components/motion/Counter'
import { KEY_FIGURES } from '@/content/fr/figures'
import { cn } from '@/lib/cn'

/**
 * Chiffres clés (§6.1.2).
 *
 * Posés directement sur le béton, séparés par un pointillé vertical, alignés
 * sur leur ligne de base — la lecture d'un ticket de pesée plutôt qu'une
 * rangée de tuiles bordées. C'est l'une des trois révisions du plan de
 * conception : une carte par nombre était le réflexe de gabarit.
 *
 * Un chiffre encore manquant s'affiche entre crochets et NE COMPTE PAS : un
 * compteur qui anime « [N_CAMIONS] » serait un mensonge animé.
 */
export function KeyFigures() {
  return (
    <section className="site-container py-16 lg:py-24" aria-labelledby="chiffres-cles">
      <h2 id="chiffres-cles" className="sr-only">
        Chiffres clés
      </h2>

      <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-5 lg:gap-y-0">
        {KEY_FIGURES.map((figure, index) => (
          <div
            key={figure.id}
            className={cn(
              'relative px-0 lg:px-6',
              index > 0 && 'lg:ps-8',
              // Le pointillé sépare, il n'encadre pas.
              index > 0 && 'before:marking-line-y before:absolute before:inset-y-1 before:start-0 before:hidden before:content-[""] lg:before:block',
            )}
          >
            <dd className="font-display font-expanded text-ink text-[length:var(--text-figure)] leading-[0.95] font-bold">
              {figure.pending ? (
                /* Un fait manquant se compose comme une clé, pas comme un
                   chiffre : en mono, plus petit, et sécable. `[TONNAGE_ANNUEL]`
                   en display 64 px est un mot insécable qui faisait déborder la
                   grille des chiffres à 390 px. */
                <span className="text-mist font-mono text-base break-all">{figure.value}</span>
              ) : typeof figure.value === 'number' ? (
                <Counter value={figure.value} />
              ) : (
                figure.value
              )}
              {figure.unit && !figure.pending ? (
                <span className="text-mist ms-1 text-xl">{figure.unit}</span>
              ) : null}
            </dd>
            <dt className="text-ink/80 mt-3 max-w-[22ch] text-sm">{figure.label}</dt>
            <p className="text-mist mt-1.5 font-mono text-xs">{figure.note}</p>
          </div>
        ))}
      </dl>
    </section>
  )
}
