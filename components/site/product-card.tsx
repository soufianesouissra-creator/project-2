import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { layerLabels } from "@/content/products";
import type { Product } from "@/content/schema";
import { loc } from "@/lib/content";

/**
 * The card behaves like a fiche technique: hover unfolds spec rows
 * (grid-rows 0fr→1fr — motion moment 4). On touch and reduced motion the
 * rows are simply always visible; no hover trap (DESIGN.md §5, §7).
 */
export async function ProductCard({
  product,
  locale,
}: {
  product: Product;
  locale: string;
}) {
  const t = await getTranslations("productCard");
  const layer = loc(layerLabels[product.layer], locale);

  return (
    <Link
      href={`/produits/${product.slug}`}
      className="group flex flex-col border border-granulat bg-calcaire p-6 transition-colors hover:border-bitume"
    >
      <p className="font-mono text-12 uppercase tracking-[0.08em] text-acier">
        {product.norm}
      </p>
      <h3 className="display-wide mt-2 text-28">{product.name}</h3>
      <p className="mt-2 text-14 text-bitume/70">{layer}</p>

      <div className="mt-4 grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 motion-safe:pointer-fine:grid-rows-[0fr] motion-safe:pointer-fine:group-hover:grid-rows-[1fr] motion-safe:pointer-fine:group-focus-visible:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <dl className="tnum border-t border-granulat pt-3 font-mono text-12">
            <div className="flex justify-between gap-4 py-1">
              <dt className="text-acier">{t("granularity")}</dt>
              <dd>{product.granularity}</dd>
            </div>
            <div className="flex justify-between gap-4 py-1">
              <dt className="text-acier">T° fab.</dt>
              <dd>{product.tempManufacture}</dd>
            </div>
            <div className="flex justify-between gap-4 py-1">
              <dt className="text-acier">T° pose</dt>
              <dd>{product.tempLaying}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Link>
  );
}
