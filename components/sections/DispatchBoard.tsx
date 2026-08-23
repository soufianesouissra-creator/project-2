'use client'

import { useEffect, useMemo, useState } from 'react'
import { useCalmMode } from '@/components/motion/useReducedMotion'
import { cn } from '@/lib/cn'
import { nextStatus, STATUS_LABEL, type DispatchRow } from './DispatchBoard.types'

const ROW_COUNT = 7
const TICK_MS = 6000
const POWER_ON_STAGGER_MS = 120

export interface DispatchBoardProps {
  readonly rows: readonly DispatchRow[]
  /**
   * Lignes qui entrent par le haut au fil des rotations. Sans elles, le board
   * fait avancer les statuts mais ne renouvelle pas ses missions.
   */
  readonly incoming?: readonly DispatchRow[]
  /**
   * Anime le board. Coupé d'office sous `prefers-reduced-motion` et en mode
   * économiseur de données — `live` propose, l'utilisateur dispose.
   */
  readonly live?: boolean
  readonly className?: string
}

/**
 * L'élément signature du site (§4.3).
 *
 * Un panneau de salle de dispatch : missions, camions, trajets, tonnages,
 * statuts. C'est le premier objet lisible de la page d'accueil, et c'est
 * délibéré — la thèse du site est qu'on peut montrer chaque tonne en
 * mouvement, alors on la montre avant de l'écrire.
 *
 * La mention « Données illustratives » fait partie du composant. On ne peut
 * pas afficher le board sans elle.
 */
export function DispatchBoard({ rows, incoming = [], live = false, className }: DispatchBoardProps) {
  const calm = useCalmMode()
  const animated = live && !calm

  const initial = useMemo(() => rows.slice(0, ROW_COUNT), [rows])
  const [visible, setVisible] = useState<readonly DispatchRow[]>(initial)
  const [poweredRows, setPoweredRows] = useState(animated ? 0 : ROW_COUNT)
  const [cursor, setCursor] = useState(0)

  /**
   * Mise en service : les lignes s'allument une par une.
   *
   * Elle ne joue QUE si le tout premier rendu était déjà silencieux — c'est-à-
   * dire jamais en pratique, puisque `useCalmMode` démarre calme et que les
   * lignes sont donc peintes par le serveur.
   *
   * Le premier jet remettait `poweredRows` à 0 après le montage : les lignes
   * déjà affichées s'éteignaient puis se rallumaient — un clignotement visible,
   * et un LCP repoussé de trois secondes parce qu'un élément à `opacity: 0`
   * n'est pas considéré comme peint.
   *
   * On a préféré le contenu à l'effet. La vie du board reste portée par ce qui
   * encode réellement du transport : un statut qui avance, une mission qui
   * entre.
   */
  useEffect(() => {
    if (poweredRows >= ROW_COUNT) return
    let row = poweredRows
    const timer = setInterval(() => {
      row += 1
      setPoweredRows(row)
      if (row >= ROW_COUNT) clearInterval(timer)
    }, POWER_ON_STAGGER_MS)
    return () => clearInterval(timer)
  }, [poweredRows])

  // Vie du board : un statut avance, une mission entre, la plus ancienne sort.
  useEffect(() => {
    if (!animated) return
    const timer = setInterval(() => {
      setVisible((current) => {
        const advancedIndex = current.findIndex((row) => row.status !== 'livre')
        const advanced =
          advancedIndex === -1
            ? current
            : current.map((row, index) => {
                if (index !== advancedIndex) return row
                const next = nextStatus(row.status)
                if (!next) return row
                return next === 'livre' ? { ...row, status: next, doneAt: deliveredAt() } : { ...row, status: next }
              })

        if (incoming.length === 0) return advanced

        // Une mission entre en tête (c'est la plus récente), la plus ancienne
        // quitte le bas du panneau.
        const arriving = incoming[cursor % incoming.length]
        if (!arriving) return advanced
        const alreadyThere = advanced.some((row) => row.id === arriving.id)
        if (alreadyThere) return advanced
        return [arriving, ...advanced].slice(0, ROW_COUNT)
      })
      setCursor((value) => value + 1)
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [animated, incoming, cursor])

  return (
    /* Requêtes de CONTENEUR, pas de fenêtre. Le board vit dans une colonne
       étroite du hero (~540 px) autant qu'en pleine largeur : des points de
       rupture calés sur la fenêtre lui feraient afficher six colonnes dans un
       panneau qui n'en tient que quatre, et le statut — la seule colonne qui
       dit ce qui se passe — sortirait du cadre. */
    <section
      /* `min-w-0` : posé dans une grille ou un flex, un élément ne descend pas
         sous la largeur de son contenu par défaut. Sans cela, le panneau
         s'élargissait jusqu'au min-content du tableau et faisait défiler la
         PAGE horizontalement à 390 px, au lieu de faire défiler le tableau
         dans son propre cadre. */
      className={cn('bg-asphalt text-concrete border-gravel @container min-w-0 border', className)}
      aria-label="Tableau de dispatch, données illustratives"
    >
      <header className="border-gravel flex items-center justify-between border-b px-3 py-3">
        <span className="eyebrow text-concrete">Dispatch</span>
        {animated ? (
          <span className="eyebrow text-mist flex items-center gap-2">
            <span aria-hidden className="bg-marking size-1.5" />
            En ligne
          </span>
        ) : null}
      </header>

      <div className="w-full overflow-x-auto">
        {/* Sous 24rem de panneau — un téléphone tenu à la main — le corps
            descend d'un cran et le tonnage se replie dans la colonne trajet.
            Sinon le STATUT, la seule colonne qui dise ce qui se passe, ne
            s'atteint qu'en faisant défiler le tableau. */}
        <table className="w-full border-collapse text-start font-mono text-xs @sm:text-sm">
          <caption className="sr-only">
            Missions de transport en cours — données illustratives, non contractuelles.
          </caption>
          <thead>
            <tr className="text-mist eyebrow">
              <th scope="col" className="px-2 py-2 @sm:px-3 text-start font-normal">
                N°
              </th>
              <th scope="col" className="hidden px-2 py-2 @sm:px-3 text-start font-normal @xl:table-cell">
                Camion
              </th>
              <th scope="col" className="w-full px-3 py-2 text-start font-normal">
                Trajet
              </th>
              <th scope="col" className="hidden px-2 py-2 @sm:px-3 text-start font-normal @3xl:table-cell">
                Matériau
              </th>
              <th scope="col" className="hidden px-2 py-2 @sm:px-3 text-end font-normal whitespace-nowrap @sm:table-cell">
                Tonnage
              </th>
              <th scope="col" className="px-2 py-2 @sm:px-3 text-start font-normal whitespace-nowrap">
                Statut
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row, index) => (
              <tr
                key={row.id}
                className={cn(
                  'border-gravel border-t align-top transition-opacity duration-300',
                  index < poweredRows ? 'opacity-100' : 'opacity-0',
                )}
              >
                <td className="text-concrete px-2 py-2.5 whitespace-nowrap @sm:px-3">{row.id}</td>
                <td className="text-mist hidden px-2 py-2.5 whitespace-nowrap @sm:px-3 @xl:table-cell">
                  {row.truck}
                </td>
                {/* Origine et destination sur deux lignes, comme sur un vrai
                    tableau de service. Sur une seule ligne, un nom de chantier
                    un peu long fait passer la flèche à la ligne et chaque
                    rangée prend une hauteur différente — le panneau perd la
                    densité qui fait tout son intérêt. */}
                <td className="px-2 py-2.5 @sm:px-3">
                  <span className="text-concrete block truncate">{row.from}</span>
                  <span className="text-concrete block truncate">
                    <span className="text-mist">→</span> {row.to}
                  </span>
                  {/* Quand le panneau est trop étroit pour leur colonne, camion
                      et matériau se replient ici plutôt que de disparaître :
                      ce sont eux qui rendent la ligne crédible. */}
                  <span className="text-mist block text-[0.6875rem] @3xl:hidden">
                    <span className="@sm:hidden">{row.tonnage} · </span>
                    <span className="@xl:hidden">{row.truck} · </span>
                    {row.material}
                  </span>
                </td>
                <td className="text-mist hidden px-2 py-2.5 whitespace-nowrap @sm:px-3 @3xl:table-cell">
                  {row.material}
                </td>
                <td className="text-concrete hidden px-2 py-2.5 text-end whitespace-nowrap tabular-nums @sm:table-cell @sm:px-3">
                  {row.tonnage}
                </td>
                <td className="px-2 py-2.5 whitespace-nowrap @sm:px-3">
                  <StatusChip row={row} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="border-gravel text-mist border-t px-3 py-2.5 font-mono text-xs">
        Données illustratives
      </footer>
    </section>
  )
}

/**
 * Puce de statut. Contour `--marking` pour ce qui avance, `--mist` pour ce qui
 * est terminé. Pas de vert ni de rouge : un tableau de service raconte
 * l'avancement, pas le succès et l'échec.
 */
function StatusChip({ row }: { row: DispatchRow }) {
  const done = row.status === 'livre'
  const label = done && row.doneAt ? `${STATUS_LABEL.livre} ${row.doneAt}` : STATUS_LABEL[row.status]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[2px] border px-1.5 py-0.5 font-mono text-[0.6875rem] whitespace-nowrap transition-colors duration-300 @sm:px-2 @sm:text-xs',
        done ? 'border-mist/50 text-mist' : 'border-marking text-marking',
      )}
    >
      {label}
    </span>
  )
}

/**
 * Heure de livraison au moment où le statut bascule. Appelée dans un
 * gestionnaire d'intervalle côté client uniquement — jamais au rendu, ce qui
 * provoquerait une divergence d'hydratation.
 */
function deliveredAt(): string {
  const now = new Date()
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
}
