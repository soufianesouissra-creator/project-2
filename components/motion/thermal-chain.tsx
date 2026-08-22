"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Container } from "@/components/site/container";
import { Eyebrow } from "@/components/site/eyebrow";

export type ChainStage = {
  id: string;
  label: string;
  readout: string;
  description: string;
};

type Props = { eyebrow: string; title: string; stages: ChainStage[] };

/**
 * « La ligne chaude » — the signature element (DESIGN.md §4).
 *
 * Progressive enhancement: the server renders the static stepper — complete,
 * legible, zero JS. After hydration, the scroll-pinned version (a lazy chunk
 * carrying the motion library) replaces it only when motion is allowed, the
 * pointer/viewport can pin reliably, and the document is LTR. The fallback
 * is the baseline, not an afterthought.
 */
const ThermalPinned = dynamic(() => import("./thermal-pinned"), {
  ssr: false,
});

export function ThermalChain(props: Props) {
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const ltr = document.documentElement.dir !== "rtl";
    if ((fine || wide) && ltr) setEnhanced(true);
  }, []);

  return enhanced ? <ThermalPinned {...props} /> : <Stepper {...props} />;
}

/** Static fallback: same data, one station per cell, no JS required. */
function Stepper({ eyebrow, title, stages }: Props) {
  return (
    <div className="py-20 md:py-28">
      <Container>
        <Eyebrow className="mb-4 text-calcaire/50!">{eyebrow}</Eyebrow>
        <h2 className="display-wide mb-12 max-w-4xl text-40 text-balance">
          {title}
        </h2>
        <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {stages.map((stage) => (
            <li key={stage.id} className="border-s border-calcaire/20 ps-5">
              <p className="display-number tnum text-40 text-chaud">
                {stage.readout}
              </p>
              <p className="display-wide mt-2 text-20">{stage.label}</p>
              <p className="mt-2 max-w-sm text-14 opacity-70">
                {stage.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </div>
  );
}
