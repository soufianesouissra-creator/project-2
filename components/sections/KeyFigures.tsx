import { Counter } from '@/components/motion/Counter'
import { getContent } from '@/lib/content'
import { useLocale } from 'next-intl'
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
  const locale = useLocale()
  const { KEY_FIGURES } = getContent(locale)
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
                <span className="text-mist-ink font-mono text-base break-all">{figure.value}</span>
              ) : typeof figure.value === 'number' ? (
                <Counter value={figure.value} />
              ) : (
                figure.value
              )}
              {figure.unit && !figure.pending ? (
                <span className="text-mist-ink ms-1 text-xl">{figure.unit}</span>
              ) : null}
            </dd>
            <dt className="text-ink/80 mt-3 max-w-[22ch] text-sm">{figure.label}</dt>
            {/* La note est un second `dd` : dans une liste de définitions,
                `div` n'accepte que `dt` et `dd`, et un `p` y rendait la
                structure invalide. */}
            <dd className="text-mist-ink mt-1.5 font-mono text-xs">{figure.note}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
