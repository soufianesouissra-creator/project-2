import clsx from "clsx";

export type SpecRow = {
  label: string;
  value: string;
  /** A "live" value carries the single 1 px --chaud rule (DESIGN.md §3). */
  live?: boolean;
};

/** Fiche-technique table: mono values, hairline rows. */
export function SpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <table className="w-full border-collapse text-16">
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.label}
            className={clsx(
              "border-b",
              row.live ? "border-chaud" : "border-granulat",
            )}
          >
            <th
              scope="row"
              className="py-3 pe-4 text-start font-normal text-acier"
            >
              {row.label}
            </th>
            <td className="tnum py-3 text-end font-mono">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
