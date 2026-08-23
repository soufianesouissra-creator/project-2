import { cn } from '@/lib/cn'

/**
 * Verrou de marque : TRANSPOLEQ + son appartenance au groupe.
 *
 * Typographique, pas un fichier : aucun logo n'a été fourni (voir
 * `[LOGO]` dans CONTENT_TODO.md). Le jour où il arrive, c'est ce composant
 * qu'on remplace — l'en-tête et le pied de page n'ont pas à le savoir.
 *
 * La barre jaune à gauche est la seule marque graphique : un trait de
 * marquage vertical, dans le même vocabulaire que le reste du site.
 */
export function Wordmark({ onDark = false, className }: { readonly onDark?: boolean; readonly className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span aria-hidden className="bg-marking block h-7 w-1" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display font-expanded text-lg font-bold tracking-tight',
            onDark ? 'text-concrete' : 'text-ink',
          )}
        >
          TRANSPOLEQ
        </span>
        {/* La mention de groupe est de la métadonnée : elle change de gris
            selon le fond, sinon elle tombe à 2,46:1 sur du béton clair. */}
        <span
          className={cn(
            'mt-1 font-mono text-[0.625rem] tracking-wider uppercase',
            onDark ? 'text-mist' : 'text-mist-ink',
          )}
        >
          Groupe ALEQ
        </span>
      </span>
    </span>
  )
}
