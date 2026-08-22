import type { ReactNode } from "react";
import clsx from "clsx";

export type Register = "froid" | "chaud";

/**
 * Every page section declares its register — froid for what is read and filed
 * (documents, quality, legal), chaud for what is hot and moving (production,
 * process, delivery). The ground colours follow from the register, never from
 * an ad-hoc class (DESIGN.md §1, §8).
 */
export function Section({
  register,
  children,
  className,
  id,
}: {
  register: Register;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      data-register={register}
      className={clsx("py-20 md:py-28", className)}
    >
      {children}
    </section>
  );
}
