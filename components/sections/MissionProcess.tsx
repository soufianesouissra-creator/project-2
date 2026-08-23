import { getContent } from '@/lib/content'
import { useLocale } from 'next-intl'
import { PinnedHorizontal } from '@/components/motion/PinnedHorizontal'
import { cn } from '@/lib/cn'

/**
 * Une mission TRANSPOLEQ (§6.1.4).
 *
 * Les cinq étapes sont posées sur la ligne de marquage. La numérotation est la
 * SEULE du site : ici l'ordre est réel, et le chiffre aide à s'y retrouver
 * quand on revient sur la page.
 *
 * `notes` permet aux six pages de service d'ajouter leur précision à une étape
 * sans dupliquer le texte commun.
 */
export function MissionProcess({
  notes,
  heading = 'Une mission TRANSPOLEQ',
  intro,
}: {
  readonly notes?: Partial<Record<1 | 2 | 3 | 4 | 5, string>>
  readonly heading?: string
  readonly intro?: string
}) {
  const locale = useLocale()
  const { MISSION_STEPS } = getContent(locale)
  return (
    <section className="bg-limestone py-16 lg:py-24" aria-labelledby="mission">
      <div className="site-container">
        <h2 id="mission" className="font-display font-semicondensed text-ink text-3xl font-semibold">
          {heading}
        </h2>
        {intro ? <p className="text-ink/70 mt-3 max-w-[68ch] text-lg">{intro}</p> : null}
      </div>

      <div className="site-container mt-10">
        <PinnedHorizontal label={heading}>
          {MISSION_STEPS.map((step) => (
            <article
              key={step.n}
              className={cn(
                'flex flex-col lg:w-[22rem] lg:shrink-0',
                'border-ink/10 border-t pt-6',
              )}
            >
              {/* La ligne de marquage porte la séquence : elle continue d'une
                  étape à l'autre plutôt que d'encadrer chacune. */}
              <span aria-hidden className="marking-line-x mb-6 block w-full" />
              <span className="text-mist font-mono text-sm">{String(step.n).padStart(2, '0')}</span>
              <h3 className="font-display font-semicondensed text-ink mt-2 text-xl font-semibold">
                {step.title}
              </h3>
              <p className="text-ink/75 mt-3 text-base">{step.text}</p>
              {notes?.[step.n] ? (
                <p className="text-ink/60 border-ink/10 mt-4 border-s-2 ps-4 text-sm">{notes[step.n]}</p>
              ) : null}
            </article>
          ))}
        </PinnedHorizontal>
      </div>
    </section>
  )
}
