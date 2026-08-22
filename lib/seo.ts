import type { Metadata } from "next";
import { routing } from "./i18n/routing";

export const SITE_URL = "https://aleqfactory.ma";

/** Locale-aware path: FR at the root, EN under /en, AR under /ar. */
export function pathFor(locale: string, path: string): string {
  const p = path === "/" ? "" : path;
  return locale === routing.defaultLocale ? p || "/" : `/${locale}${p}`;
}

export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = SITE_URL + pathFor(locale, path);
  }
  languages["x-default"] = SITE_URL + pathFor(routing.defaultLocale, path);
  return languages;
}

/** Per-page metadata with canonical + hreflang for the three locales. */
export function localizedMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: SITE_URL + pathFor(locale, path),
      languages: languageAlternates(path),
    },
  };
}
