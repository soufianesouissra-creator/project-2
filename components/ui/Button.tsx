import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from '@/lib/navigation'
import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'ghost-dark'
export type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * `--marking` porte du texte `--asphalt`, jamais du blanc : c'est le seul
 * emploi en aplat autorisé pour le jaune de marquage, et il tient le contraste
 * (9,4:1). Aucune variante ne pose de jaune sur fond clair en texte.
 */
const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-marking text-asphalt hover:bg-marking/90',
  secondary: 'bg-asphalt text-concrete hover:bg-gravel',
  ghost: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink/5',
  'ghost-dark': 'border border-concrete/30 text-concrete hover:border-concrete hover:bg-concrete/10',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-base',
  lg: 'h-12 px-6 text-base',
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-45'

interface CommonProps {
  readonly variant?: ButtonVariant
  readonly size?: ButtonSize
  readonly className?: string
  readonly children: ReactNode
}

type ButtonProps = CommonProps & ComponentPropsWithoutRef<'button'>

export function Button({ variant = 'primary', size = 'md', className, children, ...rest }: ButtonProps) {
  return (
    <button className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...rest}>
      {children}
    </button>
  )
}

type ButtonLinkProps = CommonProps & {
  readonly href: string
  readonly external?: boolean
} & Omit<ComponentPropsWithoutRef<'a'>, 'href'>

/**
 * Même apparence, sémantique de lien. Un bouton agit, un lien navigue — le
 * lecteur au clavier et le lecteur d'écran ont besoin de la différence.
 */
export function ButtonLink({
  href,
  external = false,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className)

  if (external) {
    return (
      <a href={href} className={classes} rel="noreferrer noopener" {...rest}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  )
}
