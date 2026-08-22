import Link from 'next/link'
import { fontVariables } from '@/lib/fonts'
import './globals.css'

/**
 * 404 hors langue : une URL qui n'atteint aucun segment `[locale]`.
 *
 * Elle rend son propre document, puisqu'aucun layout ne fournit `<html>` à ce
 * niveau. Volontairement sans en-tête ni pied de page : le visiteur est hors
 * du site, on lui donne une porte, pas un menu.
 *
 * Le 404 rencontré en navigation normale est `app/[locale]/not-found.tsx`,
 * avec l'en-tête et le pied de page.
 */
export default function GlobalNotFound() {
  return (
    <html lang="fr-MA" dir="ltr" className={fontVariables}>
      <body className="bg-asphalt text-concrete flex min-h-dvh items-center">
        <div className="site-container py-24">
          <p className="eyebrow text-mist">Erreur 404</p>
          <h1 className="font-display font-expanded mt-4 max-w-[16ch] text-4xl font-bold lg:text-5xl">
            Cette page n’est pas sur notre itinéraire.
          </h1>
          <span aria-hidden className="marking-line-x my-8 block w-full max-w-md" />
          {/* `next/link` et non le Link de `lib/navigation` : hors de tout
              segment de langue, il n'y a pas de préfixe de locale à résoudre. */}
          <Link
            href="/"
            className="bg-marking text-asphalt rounded-control inline-flex h-11 items-center px-5 font-medium"
          >
            Retour à l’accueil
          </Link>
        </div>
      </body>
    </html>
  )
}
