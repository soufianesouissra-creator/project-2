'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/lib/navigation'
import { LOCALE_META, PLANNED_LOCALES, routing } from '@/lib/routing'

/**
 * Sélecteur de langue.
 *
 * Il renvoie vers LA MÊME page dans l'autre langue, jamais vers l'accueil : un
 * lecteur qui bascule depuis une fiche service veut cette fiche en anglais.
 * `usePathname` de `lib/navigation` rend le chemin SANS préfixe de langue,
 * c'est donc `Link` qui repose le bon.
 *
 * Composant client isolé : `usePathname` n'existe pas côté serveur, et le pied
 * de page n'a pas à devenir client pour trois boutons.
 *
 * Les langues prévues mais pas encore livrées s'affichent désactivées, avec la
 * mention « bientôt » — on ne propose pas un lien qui renverrait un 404.
 */
export function LanguageSwitch() {
  const t = useTranslations()
  const pathname = usePathname()
  const current = useLocale()

  return (
    <div className="mt-6">
      <h3 className="eyebrow text-mist mb-2">{t('footer.language')}</h3>
      <ul className="flex items-center gap-2 font-mono text-xs">
        {routing.locales.map((locale) => {
          const active = locale === current
          return (
            <li key={locale}>
              {active ? (
                <span
                  className="border-marking text-marking rounded-[2px] border px-2 py-1"
                  aria-current="true"
                >
                  {LOCALE_META[locale].short}
                </span>
              ) : (
                <Link
                  href={pathname}
                  locale={locale}
                  hrefLang={LOCALE_META[locale].htmlLang}
                  className="border-mist/40 text-mist hover:border-concrete hover:text-concrete rounded-[2px] border px-2 py-1 transition-colors"
                >
                  <span className="sr-only">{LOCALE_META[locale].label}</span>
                  <span aria-hidden>{LOCALE_META[locale].short}</span>
                </Link>
              )}
            </li>
          )
        })}
        {PLANNED_LOCALES.map((locale) => (
          <li key={locale}>
            <span className="border-mist/25 text-mist/60 rounded-[2px] border px-2 py-1">
              {LOCALE_META[locale].short}
              <span className="ms-1.5 lowercase">{t('footer.soon')}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
