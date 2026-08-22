/**
 * Delivery-zone diagram: schematic time rings (60/90/120 min) around the
 * plant. Deliberately not a basemap: the constraint is time-at-temperature,
 * and the schematic needs no GPS. The MapLibre map with precomputed
 * isochrones replaces this once coordinates are provided (TODO.md).
 */
export function CoverageDiagram({
  rings,
  ringLabel,
  plantLabel,
}: {
  /** Minutes, inner to outer, e.g. [60, 90, 120]. */
  rings: number[];
  ringLabel: (minutes: number) => string;
  plantLabel: string;
}) {
  const size = 640;
  const c = size / 2;
  const maxR = c - 40;
  const maxMin = Math.max(...rings);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={rings.map((m) => ringLabel(m)).join(", ")}
      className="w-full max-w-xl"
    >
      {rings.map((minutes) => {
        const r = (minutes / maxMin) * maxR;
        return (
          <g key={minutes}>
            <circle
              cx={c}
              cy={c}
              r={r}
              fill="none"
              stroke="var(--color-acier)"
              strokeOpacity={0.5}
              strokeWidth={1}
              strokeDasharray={minutes === maxMin ? "none" : "2 4"}
            />
            <text
              x={c}
              y={c - r + 18}
              textAnchor="middle"
              className="tnum"
              fill="var(--color-acier)"
              fontFamily="var(--font-mono)"
              fontSize={13}
            >
              {ringLabel(minutes)}
            </text>
          </g>
        );
      })}
      {/* plant marker */}
      <rect
        x={c - 5}
        y={c - 5}
        width={10}
        height={10}
        fill="var(--color-chaud)"
      />
      <text
        x={c}
        y={c + 26}
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-mono)"
        fontSize={13}
      >
        {plantLabel}
      </text>
    </svg>
  );
}
