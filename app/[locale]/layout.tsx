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
  // Phase 0 : rien n'est public, donc rien n'est indexable. À rouvrir en
  // Phase 1, page par page, via l'API Metadata.
  robots: { index: false, follow: false },
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
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
