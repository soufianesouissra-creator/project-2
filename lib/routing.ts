import { defineRouting } from 'next-intl/routing'

/**
 * Métadonnées par langue. `en` et `ar` sont décrits ici AVANT d'être livrés :
 * ajouter une langue au site consiste à l'ajouter à `routing.locales` et à
 * déposer son fichier `messages/<code>.json`. Rien d'autre à toucher.
 *
 * `dir` est lu par le layout racine : l'arabe basculera le document en RTL
 * sans retouche de composant, puisque le CSS n'emploie que des propriétés
 * logiques.
 */
export const LOCALE_META = {
  fr: { short: 'FR', label: 'Français', htmlLang: 'fr-MA', dir: 'ltr' },
  en: { short: 'EN', label: 'English', htmlLang: 'en', dir: 'ltr' },
  ar: { short: 'AR', label: 'العربية', htmlLang: 'ar-MA', dir: 'rtl' },
} as const satisfies Record<string, { short: string; label: string; htmlLang: string; dir: 'ltr' | 'rtl' }>

export type LocaleCode = keyof typeof LOCALE_META

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',

  /**
   * Détection automatique DÉSACTIVÉE, délibérément.
   *
   * Activée, `next-intl` mémorise la langue dans un cookie et lit
   * `Accept-Language` : après un passage par `/en`, l'URL `/` renvoyait de
   * l'ANGLAIS. Or `/` est déclarée canonique pour le français et porte
   * `hreflang="fr-MA"` — la même adresse servait donc deux contenus, et la
   * canonique mentait.
   *
   * Sans détection, une URL désigne une langue et une seule. Le changement de
   * langue reste explicite, par le sélecteur du pied de page, qui renvoie vers
   * la même page dans l'autre langue.
   */
  localeDetection: false,
})

export type Locale = (typeof routing.locales)[number]

/**
 * Langues annoncées dans le sélecteur mais pas encore livrées.
 * Elles s'affichent désactivées, avec la mention « bientôt » — on ne propose
 * pas un lien qui renverrait un 404.
 *
 * L'arabe reste à faire : `LOCALE_META` porte déjà son `dir: 'rtl'`, et le CSS
 * n'emploie que des propriétés logiques, donc le jour venu il ne manquera que
 * la traduction.
 */
export const PLANNED_LOCALES: readonly LocaleCode[] = ['ar']

export function localeMeta(locale: string) {
  return LOCALE_META[locale as LocaleCode] ?? LOCALE_META.fr
}
