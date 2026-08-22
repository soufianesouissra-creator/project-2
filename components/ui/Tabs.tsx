'use client'

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface TabItem {
  readonly id: string
  readonly label: string
  readonly content: ReactNode
}

/**
 * Onglets ARIA complets : flèches gauche/droite, Début, Fin, et un seul onglet
 * dans l'ordre de tabulation (tabindex mouvant). Les flèches suivent le sens de
 * lecture du document, ce qui les rendra correctes en RTL sans retouche.
 */
export function Tabs({ items, className }: { readonly items: readonly TabItem[]; readonly className?: string }) {
  const base = useId()
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function focusTab(index: number) {
    const clamped = (index + items.length) % items.length
    setActive(clamped)
    refs.current[clamped]?.focus()
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const rtl = document.dir === 'rtl'
    const forward = rtl ? 'ArrowLeft' : 'ArrowRight'
    const backward = rtl ? 'ArrowRight' : 'ArrowLeft'
    if (event.key === forward) focusTab(index + 1)
    else if (event.key === backward) focusTab(index - 1)
    else if (event.key === 'Home') focusTab(0)
    else if (event.key === 'End') focusTab(items.length - 1)
    else return
    event.preventDefault()
  }

  return (
    <div className={className}>
      <div role="tablist" className="border-ink/10 flex gap-1 border-b">
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => {
              refs.current[index] = node
            }}
            role="tab"
            type="button"
            id={`${base}-tab-${item.id}`}
            aria-selected={index === active}
            aria-controls={`${base}-panel-${item.id}`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              '-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors',
              index === active ? 'border-marking text-ink' : 'text-mist hover:text-ink border-transparent',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${base}-panel-${item.id}`}
          aria-labelledby={`${base}-tab-${item.id}`}
          hidden={index !== active}
          tabIndex={0}
          className="pt-5"
        >
          {item.content}
        </div>
      ))}
    </div>
  )
}
