import clsx from "clsx";

/**
 * Art-directed placeholder: a --fonte block carrying the mono description of
 * the intended shot, so the client sees exactly what to photograph
 * (DESIGN.md §4.6 / SHOTLIST.md). Replaced 1:1 by the real photo.
 */
export function ArtPlaceholder({
  label,
  shot,
  className,
}: {
  /** What the frame should contain, e.g. « Tour au crépuscule, 24 mm ». */
  label: string;
  /** SHOTLIST.md reference, e.g. "SHOTLIST 02". */
  shot: string;
  className?: string;
}) {
  return (
    <figure
      aria-hidden
      className={clsx(
        "relative flex items-end overflow-hidden rounded-[2px] bg-fonte",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 14px, #E9E8E4 14px 15px)",
        }}
      />
      <figcaption className="relative p-4 font-mono text-12 text-calcaire/60">
        <span className="text-chaud">{shot}</span> — {label}
      </figcaption>
    </figure>
  );
}
