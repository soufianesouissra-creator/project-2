import type { LabTest } from "@/content/schema";
import { loc } from "@/lib/content";

export function TestCard({
  test,
  locale,
  frequencyLabel,
}: {
  test: LabTest;
  locale: string;
  frequencyLabel: string;
}) {
  return (
    <div className="border border-granulat p-6">
      <p className="font-mono text-12 uppercase tracking-[0.08em] text-acier">
        {test.norm}
      </p>
      <h3 className="display-wide mt-2 text-28">{loc(test.name, locale)}</h3>
      <dl className="tnum mt-4 flex justify-between gap-4 border-t border-granulat pt-3 font-mono text-12">
        <dt className="text-acier">{frequencyLabel}</dt>
        <dd>{loc(test.frequency, locale)}</dd>
      </dl>
    </div>
  );
}
