import clsx from "clsx";
import type { ReactNode } from "react";

/** 12-column frame: 1440 px max, 24 px gutters (DESIGN.md §3). */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mx-auto w-full max-w-[1440px] px-6", className)}>
      {children}
    </div>
  );
}
