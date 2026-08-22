import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

/**
 * Attrape-tout de la langue.
 *
 * Sans cette route, une URL inconnue n'atteint jamais le segment `[locale]` :
 * Next rend son 404 par défaut, en anglais, hors de la charte.
 *
 * `setRequestLocale` doit être appelé ICI, avant `notFound()` : la page 404
 * n'a pas de `params` à elle et ne peut donc pas établir la langue de la
 * requête. Sans cet appel, ses traductions échouent et Next se rabat
 * silencieusement sur son 404 par défaut — le symptôme exact qu'on corrige.
 */
export default async function CatchAllPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  notFound()
}
