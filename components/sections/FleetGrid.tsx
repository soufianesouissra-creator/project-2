'use client'

import { useMemo, useState } from 'react'
import { FLEET } from '@/content/fr/fleet'
import { FLEET_SILHOUETTES } from '@/components/icons/FleetSilhouettes'
import { Chip } from '@/components/ui/Chip'
import { cn } from '@/lib/cn'

/**
 * Grille de flotte filtrable (§6.3).
 *
 * Le filtre porte sur l'USAGE, pas sur des catégories techniques : un chef de
 * chantier cherche « qui peut livrer mon enrobé », pas « semi-remorque
 * calorifugée ». Les boutons sont de vrais boutons de filtre, avec
 * `aria-pressed`, et l'état vide dit quoi faire.
 */
const FILTERS = [
  { id: 'tous', label: 'Tous', match: () => true },
  { id: 'vrac', label: 'Vrac', match: (key: string) => ['benne-8x4', 'semi-benne'].includes(key) },
  { id: 'enrobes', label: 'Enrobés', match: (key: string) => key === 'semi-calorifugee' },
  { id: 'engins', label: 'Engins', match: (key: string) => ['porte-engins', 'plateau'].includes(key) },
  { id: 'liquides', label: 'Liquides', match: (key: string) => key === 'citerne' },
] as const

export function FleetGrid() {
  const [active, setActive] = useState<string>('tous')

  const visible = useMemo(() => {
    const filter = FILTERS.find((f) => f.id === active) ?? FILTERS[0]
    return FLEET.filter((category) => filter.match(category.key))
  }, [active])

  return (
    <section className="site-container py-16 lg:py-24" aria-labelledby="categories">
      <h2 id="categories" className="font-display font-semicondensed text-ink text-3xl font-semibold">
        Catégories
      </h2>

      <div role="group" aria-label="Filtrer par usage" className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            aria-pressed={active === filter.id}
            onClick={() => setActive(filter.id)}
            className={cn(
              'rounded-control border px-3 py-1.5 font-mono text-xs transition-colors',
              active === filter.id
                ? 'border-ink bg-ink text-concrete'
                : 'border-ink/25 text-ink hover:border-ink',
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-mist mt-10 font-mono text-sm">
          Aucune catégorie ne correspond à ce filtre.
        </p>
      ) : (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((category) => {
            const Silhouette = FLEET_SILHOUETTES[category.key]
            return (
              <li key={category.key} className="bg-limestone border-ink/10 rounded-card border p-6">
                <div className="text-ink">
                  <Silhouette />
                </div>
                <h3 className="font-display font-semicondensed text-ink mt-5 text-xl font-semibold">
                  {category.name}
                </h3>
                <p className="text-ink/70 mt-1.5 text-sm">{category.use}</p>

                <dl className="border-ink/10 mt-5 border-t pt-4 font-mono text-xs">
                  <div className="flex justify-between gap-3 py-1">
                    <dt className="text-mist">Capacité utile</dt>
                    <dd className="text-ink text-end break-all">{category.capacity}</dd>
                  </div>
                  <div className="flex justify-between gap-3 py-1">
                    <dt className="text-mist">En exploitation</dt>
                    <dd className="text-ink text-end break-all">{category.count}</dd>
                  </div>
                </dl>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {category.equipment.map((item) => (
                    <li key={item}>
                      <Chip tone="muted">{item}</Chip>
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
