import { GROUP_CHAIN, GROUP_ENTITIES } from '@/content/fr/site'
import { ButtonLink } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

/**
 * Le groupe (§6.1.7).
 *
 * Triptyque « ALEQ construit. AleqFactory produit. TRANSPOLEQ transporte. »
 * puis la chaîne intégrée dessinée sur la ligne de marquage.
 *
 * C'est un argument commercial, pas un organigramme : TRANSPOLEQ connaît les
 * contraintes de chantier parce qu'elle vit dans un groupe de travaux publics.
 */
export function GroupChain() {
  return (
    <section className="site-container py-16 lg:py-24" aria-labelledby="groupe">
      <p className="eyebrow text-mist">Groupe ALEQ</p>
      <h2 id="groupe" className="font-display font-semicondensed text-ink mt-4 text-3xl font-semibold">
        Une chaîne complète, du gisement au chantier
      </h2>
      <p className="text-ink/70 mt-3 max-w-[68ch] text-lg">
        Nous transportons pour un groupe qui construit et qui produit. Les contraintes d’un atelier de
        mise en œuvre, nous les connaissons parce que nous les subissons aussi.
      </p>

      <ul className="mt-10 grid gap-4 lg:grid-cols-3">
        {GROUP_ENTITIES.map((entity) => (
          <li
            key={entity.name}
            className={cn(
              'rounded-card border p-6',
              entity.current ? 'bg-asphalt text-concrete border-asphalt' : 'bg-limestone border-ink/10',
            )}
          >
            <p
              className={cn(
                'font-display font-expanded text-xl font-bold',
                entity.current ? 'text-concrete' : 'text-ink',
              )}
            >
              {entity.name}
            </p>
            <p className={cn('mt-1 text-lg', entity.current ? 'text-marking' : 'text-ink/70')}>
              {entity.verb}
            </p>
            <p className={cn('mt-4 text-sm', entity.current ? 'text-concrete/70' : 'text-ink/70')}>
              {entity.scope}
            </p>
          </li>
        ))}
      </ul>

      {/* La chaîne, sur la ligne de marquage. */}
      <ol className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
        {GROUP_CHAIN.map((stage, index) => (
          <li key={stage} className="flex items-center gap-4 sm:flex-1">
            {index > 0 ? (
              <span aria-hidden className="marking-line-x hidden w-full flex-1 sm:block" />
            ) : null}
            <span className="text-ink font-mono text-sm whitespace-nowrap">{stage}</span>
          </li>
        ))}
      </ol>

      <ButtonLink href="/groupe" variant="ghost" className="mt-10">
        Le groupe
      </ButtonLink>
    </section>
  )
}
