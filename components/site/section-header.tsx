import { Eyebrow } from "./eyebrow";

/** Eyebrow + the section's single display line (one per section, DESIGN.md §2). */
export function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-12 max-w-4xl">
      <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
      <h2 className="display-wide text-40 text-balance">{title}</h2>
    </div>
  );
}
