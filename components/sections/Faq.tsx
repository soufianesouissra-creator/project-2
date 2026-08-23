import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/JsonLd'
import { faqSchema } from '@/lib/schema'

/**
 * FAQ (§6.2, §8.6).
 *
 * Les vraies questions d'un acheteur : facturation, garantie de quantité,
 * délai de mobilisation, assurance. Pas « Qui sommes-nous ? ».
 *
 * Une réponse encore marquée « à confirmer » est affichée — on ne cache pas
 * qu'elle manque — mais elle n'est PAS balisée en `FAQPage` : Google
 * afficherait « à confirmer par l'exploitation » dans ses résultats.
 */
export function Faq({
  items,
  heading = 'Questions fréquentes',
  className,
}: {
  readonly items: readonly { readonly id: string; readonly question: string; readonly answer: string }[]
  readonly heading?: string
  readonly className?: string
}) {
  if (items.length === 0) return null

  return (
    <section className={className} aria-labelledby="faq">
      <JsonLd data={faqSchema(items)} />
      <h2 id="faq" className="font-display font-semicondensed text-ink text-3xl font-semibold">
        {heading}
      </h2>
      <Accordion
        className="mt-8 max-w-3xl"
        items={items.map((item) => ({
          id: item.id,
          question: item.question,
          answer: <p>{item.answer}</p>,
        }))}
      />
    </section>
  )
}
