import { Fragment } from "react";

export type Stat = { label: string; value: string };

/**
 * The weighbridge line: mono, interpunct separators, hairlines above and
 * below. No icons, no cards (DESIGN.md §7).
 */
export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <dl className="tnum flex flex-wrap items-baseline gap-x-3 gap-y-2 border-y border-current/20 py-4 font-mono text-14">
      {stats.map((stat, i) => (
        <Fragment key={stat.label}>
          {i > 0 && <span aria-hidden>·</span>}
          <div className="flex items-baseline gap-2">
            <dt className="uppercase tracking-[0.08em] opacity-60">
              {stat.label}
            </dt>
            <dd className="font-medium">{stat.value}</dd>
          </div>
        </Fragment>
      ))}
    </dl>
  );
}
