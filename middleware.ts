import createMiddleware from 'next-intl/middleware'
import { routing } from './lib/routing'

export default createMiddleware(routing)

export const config = {
  /**
   * Tout sauf les API, les internes Next, les médias, les fichiers statiques —
   * et `/og`.
   *
   * Sans cette dernière exclusion, `/og` était réécrit en `/fr/og`, qui
   * n'existe pas : la route rendait un 404 HTML alors que toutes les pages
   * pointaient dessus pour leur vignette. Un lien partagé serait resté sans
   * image, sans qu'aucune page ne paraisse cassée.
   */
  matcher: '/((?!api|og|_next|_vercel|media|.*\\..*).*)',
}
