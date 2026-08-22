import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/lib/i18n/navigation";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[2px] px-6 py-3 " +
  "text-16 font-medium transition-colors duration-150";

/**
 * Primary is the only large accent fill on a screen. Secondary outlines in the
 * current register's ink; ghost is text-only.
 */
const variants: Record<Variant, string> = {
  /* --bitume ink on --chaud fill: 5.4:1. Calcaire ink would be 2.9:1 — fails AA. */
  primary: "bg-chaud text-bitume hover:brightness-90",
  secondary: "border border-current bg-transparent hover:bg-current/10",
  ghost: "bg-transparent underline-offset-4 hover:underline",
};

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: {
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & ComponentProps<typeof Link>) {
  return (
    <Link className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: {
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & ComponentProps<"button">) {
  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
