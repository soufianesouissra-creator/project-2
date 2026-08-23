import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface Column<Row> {
  readonly key: string
  readonly header: string
  readonly align?: 'start' | 'end'
  /** Rendu d'une cellule. En mono par défaut : ces tableaux portent de la donnée. */
  readonly cell: (row: Row) => ReactNode
}

/**
 * Tableau de données : flotte, références, relevés.
 *
 * La densité est assumée ici — c'est là que la donnée vit. Le défilement
 * horizontal est contenu dans le tableau, jamais dans la page.
 */
export function Table<Row>({
  caption,
  columns,
  rows,
  rowKey,
  className,
}: {
  readonly caption: string
  readonly columns: readonly Column<Row>[]
  readonly rows: readonly Row[]
  readonly rowKey: (row: Row) => string
  readonly className?: string
}) {
  return (
    <div className={cn('border-ink/10 overflow-x-auto border', className)}>
      <table className="w-full border-collapse font-mono text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-ink/10 border-b">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  'eyebrow text-mist-ink px-4 py-3 font-normal',
                  column.align === 'end' ? 'text-end' : 'text-start',
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="border-ink/10 border-b last:border-b-0">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    'text-ink px-4 py-3 tabular-nums',
                    column.align === 'end' ? 'text-end' : 'text-start',
                  )}
                >
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
