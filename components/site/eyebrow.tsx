import clsx from "clsx";
import type { ReactNode } from "react";

/** Mono uppercase kicker above a display line. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={clsx("eyebrow text-acier", className)}>{children}</p>
  );
}
