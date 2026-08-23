import type { ReactNode } from 'react'
import { Link } from '@/lib/navigation'

/**
 * En-tête de page — bande `--asphalt`, comme le hero de l'accueil.
 *
 * Un fil d'Ariane visible : sur un site à deux niveaux (services → détail),
 * l'acheteur qui arrive par un moteur de recherche doit voir où il est.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  breadcrumb,
  children,
}: {
  readonly eyebrow?: string
  readonly title: string
  readonly lead?: string
  readonly breadcrumb?: readonly { readonly name: string; readonly path: string }[]
  readonly children?: ReactNode
}) {
  return (
    <section className="bg-asphalt text-concrete">
      <div className="site-container pt-28 pb-14 lg:pt-40 lg:pb-20">
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav aria-label="Fil d’Ariane" className="mb-6">
            <ol className="text-mist flex flex-wrap items-center gap-2 font-mono text-xs">
              {breadcrumb.map((entry, index) => (
                <li key={entry.path} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden>/</span> : null}
                  {index === breadcrumb.length - 1 ? (
                    <span aria-current="page" className="text-concrete">
                      {entry.name}
                    </span>
                  ) : (
                    <Link href={entry.path} className="hover:text-marking transition-colors">
                      {entry.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? <p className="eyebrow text-mist">{eyebrow}</p> : null}
        <h1 className="font-display font-expanded mt-4 max-w-[20ch] text-3xl font-bold lg:text-5xl">
          {title}
        </h1>
        {lead ? (
          <>
            <span aria-hidden className="marking-line-x my-8 block w-full max-w-sm" />
            <p className="text-concrete/80 max-w-[62ch] text-lg">{lead}</p>
          </>
        ) : null}
        {children}
      </div>
    </section>
  )
}
