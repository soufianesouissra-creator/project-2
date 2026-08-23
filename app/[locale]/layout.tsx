import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { fontVariables } from '@/lib/fonts'
import { localeMeta, routing } from '@/lib/routing'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { SmoothScroll } from '@/components/motion/SmoothScroll'
import { ToastProvider } from '@/components/ui/Toast'
import { CookieBanner } from '@/components/sections/CookieBanner'
import '../globals.css'

export const viewport: Viewport = {
  themeColor: '#1b1d1f',
  width: 'device-width',
  initialScale: 1,
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'TRANSPOLEQ — Transport et logistique de chantier',
    template: '%s · TRANSPOLEQ',
  },
  description:
    'TRANSPOLEQ transporte matériaux, enrobés et engins pour les chantiers d’infrastructure au Maroc.',
  // L'indexabilité est décidée page par page par `pageMetadata`, qui la
  // conditionne au domaine servi : rien n'est indexable tant que
  // NEXT_PUBLIC_SITE_URL ne pointe pas sur le domaine de production.
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const meta = localeMeta(locale)
  const t = await getTranslations()

  return (
    <html lang={meta.htmlLang} dir={meta.dir} className={fontVariables}>
      <body className="min-h-dvh">
        <NextIntlClientProvider>
          <ToastProvider>
            <a href="#contenu" className="skip-link">
              {t('common.skipToContent')}
            </a>
            <SmoothScroll />
            <Header />
            <main id="contenu">{children}</main>
            <Footer />
            <CookieBanner />
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
