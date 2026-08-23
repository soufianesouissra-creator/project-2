import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'
import { getContent } from '@/lib/content'
import { IconPhone, IconWhatsapp } from '@/components/icons'
import { LanguageSwitch } from './LanguageSwitch'

/**
 * Pied de page — dernière bande `--asphalt` de la page.
 *
 * Porte ce qu'un acheteur B2B et un chauffeur cherchent en bas : joindre
 * quelqu'un, vérifier que l'entreprise existe (ICE, RC), retrouver une page.
 */
export function Footer() {
  const t = useTranslations()
  const locale = useLocale()
  const { CONTACT, FOOTER_NAV, GROUP_ENTITIES, LEGAL, LEGAL_NAV } = getContent(locale)
  return (
    <footer className="bg-asphalt text-concrete">
      <div className="site-container py-14 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {FOOTER_NAV.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="eyebrow text-mist mb-4">{column.title}</h2>
              <ul className="flex flex-col gap-2.5">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-marking text-sm transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="eyebrow text-mist mb-4">{t('footer.contact')}</h2>
            <address className="flex flex-col gap-2.5 text-sm not-italic">
              <span className="text-mist">{CONTACT.address}</span>
              <a href={`tel:${CONTACT.phoneHref}`} className="hover:text-marking flex items-center gap-2 font-mono transition-colors">
                <IconPhone className="size-4" />
                {CONTACT.phone}
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                rel="noreferrer noopener"
                className="hover:text-marking flex items-center gap-2 font-mono transition-colors"
              >
                <IconWhatsapp className="size-4" />
                {t('common.whatsapp')}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-marking font-mono transition-colors">
                {CONTACT.email}
              </a>
              <span className="text-mist font-mono text-xs">{CONTACT.hours}</span>
            </address>
          </div>

          <nav aria-label={t('footer.legalInfo')}>
            <h2 className="eyebrow text-mist mb-4">{t('footer.legal')}</h2>
            <ul className="flex flex-col gap-2.5">
              {LEGAL_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-marking text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <LanguageSwitch />
          </nav>
        </div>
      </div>

      {/* La chaîne du groupe, sur la ligne de marquage. */}
      <div className="border-gravel border-t">
        <div className="site-container flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {GROUP_ENTITIES.map((entity, index) => (
              <li key={entity.name} className="flex items-center gap-3">
                {index > 0 ? <span aria-hidden className="marking-line-x w-6 shrink-0" /> : null}
                {entity.current ? (
                  <span className="font-display font-expanded text-sm font-bold" aria-current="true">
                    {entity.name}
                  </span>
                ) : (
                  <a
                    href={entity.href}
                    rel="noreferrer noopener"
                    className="text-mist hover:text-marking font-display font-expanded text-sm font-bold transition-colors"
                  >
                    {entity.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <p className="text-mist font-mono text-xs">
            {LEGAL.legalName} · RC {LEGAL.rc} · ICE {LEGAL.ice}
          </p>
        </div>
      </div>

    </footer>
  )
}
