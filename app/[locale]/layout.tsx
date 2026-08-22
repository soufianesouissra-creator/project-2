import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import clsx from "clsx";
import { routing } from "@/lib/i18n/routing";
import { archivo, bricolage, plexArabic, plexMono } from "@/lib/fonts";
import { SITE_URL } from "@/lib/seo";
import { OrganizationJsonLd } from "@/components/site/json-ld";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AleqFactory — Centrale d'enrobage",
    template: "%s — AleqFactory",
  },
  description:
    "Enrobés bitumineux fabriqués, contrôlés, livrés à température. Centrale d'enrobage du groupe ALEQ, Maroc.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={clsx(
        bricolage.variable,
        archivo.variable,
        plexMono.variable,
        plexArabic.variable,
      )}
    >
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <OrganizationJsonLd />
        {process.env.VERCEL && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
