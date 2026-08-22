'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Boîte de dialogue modale.
 *
 * Bâtie sur l'élément `<dialog>` natif : le piège de focus, la touche Échap,
 * la couche d'inertie et le rendu au-dessus de tout viennent du navigateur.
 * Une réimplémentation en React serait plus de code pour moins de fiabilité.
 */
export function Dialog({
  open,
  onClose,
  title,
  children,
  className,
}: {
  readonly open: boolean
  readonly onClose: () => void
  readonly title: string
  readonly children: ReactNode
  readonly className?: string
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (open && !node.open) node.showModal()
    if (!open && node.open) node.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onClick={(event) => {
        // Clic sur le fond : l'élément `dialog` occupe toute la fenêtre, donc
        // une cible égale à la boîte elle-même signifie « en dehors du contenu ».
        if (event.target === ref.current) onClose()
      }}
      className={cn(
        'bg-limestone text-ink rounded-card m-auto w-[min(32rem,calc(100vw-2rem))] p-0 backdrop:bg-asphalt/70',
        className,
      )}
    >
      <div className="border-ink/10 flex items-center justify-between gap-4 border-b px-6 py-4">
        <h2 className="font-display font-semicondensed text-xl font-semibold">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-mist hover:text-ink rounded-[2px] p-1 transition-colors"
          aria-label="Fermer"
        >
          <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M4 4l12 12M16 4L4 16" />
          </svg>
        </button>
      </div>
      <div className="px-6 py-5">{children}</div>
    </dialog>
  )
}
