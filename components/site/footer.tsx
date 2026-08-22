import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Container } from "./container";
import { Eyebrow } from "./eyebrow";
import { LocaleSwitcher } from "./locale-switcher";

const sitemap = [
  { href: "/centrale", key: "centrale" },
  { href: "/produits", key: "produits" },
  { href: "/services", key: "services" },
  { href: "/qualite", key: "qualite" },
  { href: "/environnement", key: "environnement" },
  { href: "/realisations", key: "realisations" },
  { href: "/groupe", key: "groupe" },
  { href: "/carrieres", key: "carrieres" },
  { href: "/contact", key: "contact" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer data-register="chaud" className="py-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="display-wide text-20">
              ALEQ<span className="text-chaud">FACTORY</span>
            </p>
            <p className="mt-3 max-w-xs text-16 opacity-70">{t("tagline")}</p>
          </div>

          <div>
            <Eyebrow className="mb-4 text-calcaire/50!">{t("sitemap")}</Eyebrow>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-16">
              {sitemap.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="opacity-80 hover:opacity-100"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Eyebrow className="mb-4 text-calcaire/50!">{t("group")}</Eyebrow>
            <p className="max-w-xs text-16 opacity-70">{t("groupLine")}</p>
            <div className="mt-6">
              <LocaleSwitcher />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-calcaire/15 pt-6 font-mono text-12 opacity-60 md:flex-row md:items-center md:justify-between">
          <p>{t("identifiers")}</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:underline">
              {t("legalNotice")}
            </Link>
            <Link href="/confidentialite" className="hover:underline">
              {t("privacy")}
            </Link>
          </div>
          <p>{t("copyright", { year })}</p>
        </div>
      </Container>
    </footer>
  );
}
