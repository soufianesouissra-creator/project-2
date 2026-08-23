import type { ReactNode } from 'react'
import { PageHero } from './PageHero'

/**
 * Gabarit des pages légales.
 *
 * Mesure de texte courte, titres nets, aucune illustration. Ces pages se
 * consultent pour vérifier un numéro, pas pour être séduit.
 */
export function LegalLayout({
  title,
  updated,
  children,
}: {
  readonly title: string
  readonly updated: string
  readonly children: ReactNode
}) {
  return (
    <>
      <PageHero
        eyebrow="Informations légales"
        title={title}
        breadcrumb={[
          { name: 'Accueil', path: '/' },
          { name: title, path: '#' },
        ]}
      />
      <div className="site-container py-16 lg:py-24">
        <p className="text-mist font-mono text-xs">Dernière mise à jour : {updated}</p>
        <div className="mt-8 flex max-w-[68ch] flex-col gap-8">{children}</div>
      </div>
    </>
  )
}

export function LegalSection({
  title,
  children,
}: {
  readonly title: string
  readonly children: ReactNode
}) {
  return (
    <section>
      <h2 className="font-display font-semicondensed text-ink text-xl font-semibold">{title}</h2>
      <div className="text-ink/80 mt-3 flex flex-col gap-3">{children}</div>
    </section>
  )
}

export function LegalList({ rows }: { readonly rows: readonly (readonly [string, string])[] }) {
  return (
    <dl className="divide-ink/10 border-ink/10 divide-y border-y">
      {rows.map(([label, value]) => (
        <div key={label} className="flex flex-wrap gap-x-6 gap-y-1 py-3">
          <dt className="text-mist w-56 shrink-0 font-mono text-xs">{label}</dt>
          <dd className="text-ink font-mono text-sm break-all">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
