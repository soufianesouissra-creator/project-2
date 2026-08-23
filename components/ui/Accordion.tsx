import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface AccordionItem {
  readonly id: string
  readonly question: string
  readonly answer: ReactNode
}

/**
 * FAQ et blocs repliables.
 *
 * Bâti sur `<details>` / `<summary>` natifs : clavier, lecteur d'écran et
 * recherche dans la page fonctionnent sans une ligne de JavaScript, et le
 * contenu reste présent dans le DOM — ce qui compte pour une FAQ indexée en
 * `FAQPage`.
 */
export function Accordion({
  items,
  exclusive = false,
  className,
}: {
  readonly items: readonly AccordionItem[]
  /** Un seul volet ouvert à la fois. */
  readonly exclusive?: boolean
  readonly className?: string
}) {
  return (
    <div className={cn('divide-ink/10 border-ink/10 divide-y border-y', className)}>
      {items.map((item) => (
        <details key={item.id} name={exclusive ? 'accordion' : undefined} className="group">
          <summary className="text-ink flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-medium [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden
              /* Seul le CONTOUR passe au jaune à l'ouverture : le signe
                 lui-même reste à l'encre, sinon il tombe à 1,66:1 sur clair. */
              className="border-ink/25 text-ink relative size-6 shrink-0 rounded-[2px] border transition-colors group-open:border-marking"
            >
              <span className="absolute start-1/2 top-1/2 h-px w-2.5 -translate-x-1/2 -translate-y-1/2 bg-current" />
              <span className="absolute start-1/2 top-1/2 h-2.5 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-200 group-open:scale-y-0" />
            </span>
          </summary>
          <div className="text-ink/80 max-w-[68ch] pb-5 text-base">{item.answer}</div>
        </details>
      ))}
    </div>
  )
}
