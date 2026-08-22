import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en", "ar"],
  defaultLocale: "fr",
  // FR lives at the root; EN under /en, AR under /ar (RTL).
  localePrefix: "as-needed",
  // No Accept-Language redirect: the audience is FR-first and a redirect
  // costs ~600 ms of LCP on every crawler and first visit. The header
  // switcher is the way in to /en and /ar.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
