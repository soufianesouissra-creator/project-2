"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import {
  estimateDelivery,
  formatMinutes,
  TRUCK_PAYLOAD_T,
} from "@/lib/estimator";

/** Utility, not spectacle (master prompt §6). Live values carry the accent rule. */
export function DeliveryEstimator({ capacityTph }: { capacityTph: number }) {
  const t = useTranslations("servicesPage.estimator");
  const id = useId();
  const [raw, setRaw] = useState("500");
  const estimate = estimateDelivery(Number(raw), capacityTph);

  return (
    <div className="border border-granulat bg-calcaire p-6 md:p-8">
      <p className="eyebrow mb-2 text-acier">{t("eyebrow")}</p>
      <h3 className="display-wide text-28">{t("title")}</h3>

      <div className="mt-6 max-w-xs">
        <label htmlFor={id} className="mb-2 block text-14 text-acier">
          {t("quantity")}
        </label>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={1}
          step={10}
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          className="tnum w-full rounded-[2px] border border-granulat bg-transparent px-4 py-3 font-mono text-20 focus:border-bitume focus:outline-none"
        />
      </div>

      {/* one accent rule for the whole live group — DESIGN.md §1 */}
      <dl className="tnum mt-8 grid gap-6 border-t border-chaud pt-4 font-mono sm:grid-cols-3">
        <div>
          <dt className="text-12 uppercase tracking-[0.08em] text-acier">
            {t("trucks")}
          </dt>
          <dd className="display-number mt-1 text-40">
            {estimate ? estimate.trucks : "—"}
          </dd>
          <dd className="text-12 text-acier">
            {t("trucksNote", { payload: TRUCK_PAYLOAD_T })}
          </dd>
        </div>
        <div>
          <dt className="text-12 uppercase tracking-[0.08em] text-acier">
            {t("production")}
          </dt>
          <dd className="display-number mt-1 text-40">
            {estimate ? formatMinutes(estimate.productionMinutes) : "—"}
          </dd>
          <dd className="text-12 text-acier">
            {t("productionNote", { capacity: capacityTph })}
          </dd>
        </div>
        <div>
          <dt className="text-12 uppercase tracking-[0.08em] text-acier">
            {t("window")}
          </dt>
          <dd className="display-wide mt-2 text-20">
            {estimate ? t("windowDays", { days: estimate.productionDays }) : "—"}
          </dd>
        </div>
      </dl>

      <p className="mt-8 text-14 text-bitume/60">{t("footnote")}</p>
    </div>
  );
}
