import Image from 'next/image'
import { cn } from '@/lib/cn'

/**
 * Emplacement d'image.
 *
 * Les photos n'ont pas encore été prises (voir `public/media/README.md`). Plutôt
 * qu'un `next/image` qui échouerait au build, ce composant réserve la place aux
 * BONNES proportions et affiche le fichier attendu. La mise en page ne bougera
 * pas quand la vraie photo arrivera — et le trou reste visible, ce qui est le
 * but.
 *
 * Dès qu'un fichier existe, passer `available` à vrai suffit : le composant
 * bascule sur `next/image` avec ses `sizes` et son placeholder.
 */
export function MediaFrame({
  src,
  alt,
  ratio = 'landscape',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  available = false,
  priority = false,
  className,
}: {
  readonly src: string
  /** Texte alternatif en français, décrivant la scène — jamais « image ». */
  readonly alt: string
  readonly ratio?: 'landscape' | 'wide' | 'banner' | 'square'
  readonly sizes?: string
  readonly available?: boolean
  readonly priority?: boolean
  readonly className?: string
}) {
  const ratios = {
    landscape: 'aspect-[4/3]',
    wide: 'aspect-[16/9]',
    banner: 'aspect-[21/9]',
    square: 'aspect-square',
  } as const

  if (available) {
    return (
      <div className={cn('relative overflow-hidden', ratios[ratio], className)}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'bg-limestone border-ink/10 flex flex-col justify-end border p-4',
        ratios[ratio],
        className,
      )}
      role="img"
      aria-label={`Emplacement d’image : ${alt}`}
    >
      <p className="text-mist font-mono text-xs">Photo à fournir</p>
      <p className="text-ink/60 mt-1 font-mono text-xs break-all">{src}</p>
      <p className="text-ink/60 mt-2 max-w-[46ch] text-sm">{alt}</p>
    </div>
  )
}
