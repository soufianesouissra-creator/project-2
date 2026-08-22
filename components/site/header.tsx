"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Container } from "./container";
import { ButtonLink } from "./button";
import { LocaleSwitcher } from "./locale-switcher";

const navItems = [
  { href: "/produits", key: "produits" },
  { href: "/services", key: "services" },
  { href: "/qualite", key: "qualite" },
  { href: "/realisations", key: "realisations" },
  { href: "/groupe", key: "groupe" },
  { href: "/contact", key: "contact" },
] as const;

/**
 * Sticky header. tone="overlay" (dark hero pages) starts transparent with
 * calcaire ink and turns solid --calcaire after 24 px of scroll.
 */
export function Header({ tone = "solid" }: { tone?: "solid" | "overlay" }) {
  const t = useTranslations("nav");
  const tCta = useTranslations("cta");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = tone === "overlay" && !scrolled && !open;

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-colors duration-200",
        transparent
          ? "bg-transparent text-calcaire"
          : "border-b border-granulat bg-calcaire/95 text-bitume backdrop-blur",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={t("home")}
          className="display-wide text-20 tracking-tight"
        >
          ALEQ
          <span className={transparent ? "text-chaud" : "text-chaud-encre"}>
            FACTORY
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="principal">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-16 font-medium opacity-80 transition-opacity hover:opacity-100"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LocaleSwitcher />
          <ButtonLink href="/contact" className="px-4 py-2">
            {tCta("quote")}
          </ButtonLink>
        </div>

        <button
          type="button"
          className="eyebrow lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t("menuClose") : t("menuOpen")}
        </button>
      </Container>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-granulat bg-calcaire text-bitume lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 text-20 font-medium"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-4 flex items-center justify-between">
              <ButtonLink href="/contact" onClick={() => setOpen(false)}>
                {tCta("quote")}
              </ButtonLink>
              <LocaleSwitcher />
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
