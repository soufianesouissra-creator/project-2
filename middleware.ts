import createMiddleware from 'next-intl/middleware'
import { routing } from './lib/routing'

export default createMiddleware(routing)

export const config = {
  // Tout sauf les API, les internes Next, les médias et les fichiers statiques.
  matcher: '/((?!api|_next|_vercel|media|.*\\..*).*)',
}
