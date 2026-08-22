import type { ReactNode } from 'react'
import { Link } from '@/lib/navigation'
import { cn } from '@/lib/cn'

interface CardProps {
  readonly children: ReactNode
  readonly className?: string
  /** Rend la carte entièrement cliquable, sans imbriquer de lien dans un lien. */
  readonly href?: string
  readonly onDark?: boolean
}

/**
 * Surface élevée. L'élévation se lit par la valeur (`--limestone` sur
 * `--concrete`, `--gravel` sur `--asphalt`), jamais par une ombre portée.
 */
export function Card({ children, className, href, onDark = false }: CardProps) {
  const classes = cn(
    'rounded-card border p-6 transition-colors duration-150',
    onDark ? 'bg-gravel border-concrete/10 text-concrete' : 'bg-limestone border-ink/10 text-ink',
    href && (onDark ? 'hover:border-marking' : 'hover:border-ink/35'),
    className,
  )

  if (href) {
    return (
      <Link href={href} className={cn(classes, 'block')}>
        {children}
      </Link>
    )
  }

  return <div className={classes}>{children}</div>
}
