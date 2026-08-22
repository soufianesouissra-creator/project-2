'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Link, usePathname } from '@/lib/navigation'
import { MAIN_NAV, CONTACT } from '@/content/fr/site'
import { ButtonLink } from '@/components/ui/Button'
import { IconPhone, IconWhatsapp } from '@/components/icons'
import { Wordmark } from './Wordmark'
import { cn } from '@/lib/cn'

const SCROLL_THRESHOLD = 80

/**
 * En-tête collant.
 *
 * Transparent au sommet, il devient une bande `--asphalt` après 80 px — une
 * bande de roulement épinglée en haut de la page, cohérente avec les autres
 * bandes du site.
 *
 * `overHero` dit au composant qu'il est posé sur une bande sombre : c'est ce
 * qui décide de la couleur du texte au sommet. Sans cette information, un
 * en-tête transparent sur du béton clair serait illisible.
 */
export function Header({ overHero = false }: { readonly overHero?: boolean }) {
  const t = useTranslations()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Le menu se ferme à la navigation : sinon il reste ouvert par-dessus la
  // page d'arrivée.
  useEffect(() => setMenuOpen(false), [pathname])

  // Échap ferme, et le fond de page ne défile pas derrière le menu plein écran.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  const dark = scrolled || menuOpen || overHero

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-200',
        scrolled || menuOpen ? 'bg-asphalt' : 'bg-transparent',
      )}
    >
      <div className="site-container flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link href="/" aria-label={t('header.homeLabel')} className="shrink-0">
          <Wordmark onDark={dark} />
        </Link>

        <nav aria-label={t('header.mainNav')} className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {MAIN_NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative py-2 text-sm font-medium transition-colors',
                      dark ? 'text-concrete hover:text-marking' : 'text-ink hover:text-ink/70',
                    )}
                  >
                    {item.label}
                    {/* Indicateur de page active : la ligne de marquage. */}
                    {active ? (
                      <span aria-hidden className="marking-line-x absolute inset-x-0 -bottom-0.5 block" />
                    ) : null}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 lg:gap-4">
          <a
            href={`tel:${CONTACT.phoneHref}`}
            className={cn(
              'hidden items-center gap-2 font-mono text-sm transition-colors sm:inline-flex',
              dark ? 'text-concrete hover:text-marking' : 'text-ink hover:text-ink/70',
            )}
          >
            <IconPhone className="size-4" />
            {CONTACT.phone}
          </a>

          <ButtonLink href="/devis" size="sm" className="hidden sm:inline-flex">
            {t('common.requestQuote')}
          </ButtonLink>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            className={cn('rounded-control p-2 lg:hidden', dark ? 'text-concrete' : 'text-ink')}
          >
            <span className="sr-only">{menuOpen ? t('header.closeMenu') : t('header.openMenu')}</span>
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              {menuOpen ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen ? <MobileMenu /> : null}
    </header>
  )
}

/**
 * Menu plein écran. Grands items en Archivo semi-condensé, téléphone et
 * WhatsApp en bas — c'est là que le pouce arrive.
 */
function MobileMenu() {
  const t = useTranslations()
  return (
    <div
      id="menu-mobile"
      className="bg-asphalt fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto lg:hidden"
    >
      <nav aria-label={t('header.mainNav')} className="site-container flex-1 py-8">
        <ul className="flex flex-col">
          {MAIN_NAV.map((item) => (
            <li key={item.href} className="border-gravel border-b">
              <Link
                href={item.href}
                className="font-display font-semicondensed text-concrete hover:text-marking block py-4 text-3xl font-semibold transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink href="/devis" size="lg" className="mt-8 w-full">
          {t('common.requestQuote')}
        </ButtonLink>
      </nav>

      <div className="site-container border-gravel flex flex-col gap-3 border-t py-6">
        <a
          href={`tel:${CONTACT.phoneHref}`}
          className="text-concrete hover:text-marking flex items-center gap-3 font-mono text-base transition-colors"
        >
          <IconPhone className="size-5" />
          {CONTACT.phone}
        </a>
        <a
          href={`https://wa.me/${CONTACT.whatsapp}`}
          rel="noreferrer noopener"
          className="text-concrete hover:text-marking flex items-center gap-3 font-mono text-base transition-colors"
        >
          <IconWhatsapp className="size-5" />
          {t('common.whatsapp')}
        </a>
      </div>
    </div>
  )
}
