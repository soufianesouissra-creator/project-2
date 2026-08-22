import { Fragment } from "react";

export type ChainStop = { name: string; entity: string; fact: string };

/**
 * The ThermalChain's cold echo: one continuous line, --acier strokes, an
 * entity and one mono fact per stop. No icons, no numbering — it is a chain
 * and it looks like the other chain (DESIGN.md §7).
 */
export function IntegratedChain({ stops }: { stops: ChainStop[] }) {
  return (
    <ol className="grid gap-y-8 md:grid-cols-[repeat(4,1fr)] md:gap-y-0">
      {stops.map((stop, i) => (
        <Fragment key={stop.name}>
          <li className="relative md:pe-6">
            {/* rail segment */}
            <div className="mb-4 flex items-center" aria-hidden>
              <span className="size-2 shrink-0 rounded-full bg-acier" />
              {i < stops.length - 1 && (
                <span className="ms-2 h-px grow bg-acier/40 max-md:hidden" />
              )}
            </div>
            <p className="display-wide text-28">{stop.name}</p>
            <p className="mt-1 text-14 opacity-70">{stop.entity}</p>
            <p className="tnum mt-2 font-mono text-12 uppercase tracking-[0.08em] text-acier">
              {stop.fact}
            </p>
          </li>
        </Fragment>
      ))}
    </ol>
  );
}
