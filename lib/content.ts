import type { Localized } from "@/content/schema";

/** Resolve a localized content string. AR falls back to FR until Phase 2. */
export function loc(value: Localized, locale: string): string {
  if (locale === "en") return value.en;
  if (locale === "ar" && value.ar) return value.ar;
  return value.fr;
}
