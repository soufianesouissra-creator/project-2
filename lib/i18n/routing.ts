import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en", "ar"],
  defaultLocale: "fr",
  // FR lives at the root; EN under /en, AR under /ar (RTL).
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
