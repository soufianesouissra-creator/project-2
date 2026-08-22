"use client";

import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";

/** AR joins the visible switcher when its content lands (Phase 2). */
const visibleLocales = ["fr", "en"] as const;

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("locale");

  return (
    <nav aria-label={t("switchLabel")} className="flex items-center gap-1">
      {visibleLocales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          aria-current={l === locale ? "true" : undefined}
          className={clsx(
            "eyebrow px-1.5 py-1",
            l === locale ? "opacity-100" : "opacity-50 hover:opacity-100",
          )}
        >
          {t(l)}
        </Link>
      ))}
    </nav>
  );
}
