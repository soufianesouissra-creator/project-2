import { ButtonLink } from '@/components/ui/Button'

/**
 * Bande carrières (§6.1.10).
 *
 * Le recrutement de chauffeurs est un vrai besoin commercial, pas une rubrique
 * de courtoisie. La bande s'adresse au chauffeur directement, avec le
 * vocabulaire qu'il utilise, et le bouton mène à des postes — pas à une page
 * « nos valeurs ».
 */
export function CareersBand() {
  return (
    <section className="bg-limestone border-ink/10 border-y py-16 lg:py-20" aria-labelledby="carrieres">
      <div className="site-container flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2
            id="carrieres"
            className="font-display font-expanded text-ink text-3xl font-bold lg:text-4xl"
          >
            Prenez le volant.
          </h2>
          <p className="text-ink/75 mt-4 max-w-[52ch] text-lg">
            Nous recrutons des chauffeurs SPL, des mécaniciens et des dispatchers.
          </p>
        </div>
        <ButtonLink href="/carrieres" size="lg" className="self-start">
          Voir les postes
        </ButtonLink>
      </div>
    </section>
  )
}
