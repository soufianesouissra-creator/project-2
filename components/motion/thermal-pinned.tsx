"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Container } from "@/components/site/container";
import { Eyebrow } from "@/components/site/eyebrow";
import type { ChainStage } from "./thermal-chain";

function parseReadout(text: string) {
  const m = text.match(/^([^\d]*)(\d+)(.*)$/);
  if (!m) return null;
  return { prefix: m[1] ?? "", value: Number(m[2]), suffix: m[3] ?? "" };
}

/**
 * The scroll-pinned « ligne chaude » (DESIGN.md §4). Loaded lazily by
 * ThermalChain only when enhancement is possible, so the motion library
 * never enters the first-load bundle. Fully reversible with scroll;
 * transform/opacity only.
 */
export default function ThermalPinned({
  eyebrow,
  title,
  stages,
}: {
  eyebrow: string;
  title: string;
  stages: ChainStage[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const n = stages.length;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [index, setIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIndex(Math.max(0, Math.min(n - 1, Math.floor(v * n))));
  });

  // Glow and progress rail track scroll, softened by a spring.
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });
  const glowLeft = useTransform(progress, (p) => `${p * 100}%`);

  // The temperature readout counts between stage values.
  const stage = stages[index] ?? stages[0]!;
  const parsed = parseReadout(stage.readout);
  const target = parsed ? parsed.value : 25;
  const temp = useSpring(target, { stiffness: 80, damping: 24 });
  useEffect(() => {
    temp.set(target);
  }, [target, temp]);
  const tempText = useTransform(temp, (v) => `${Math.round(v)}`);

  return (
    <div ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <Container>
          <Eyebrow className="mb-4 text-calcaire/50!">{eyebrow}</Eyebrow>
          <h2 className="display-wide max-w-4xl text-40 text-balance">
            {title}
          </h2>

          {/* the chain — decorative; the sr-only list below carries the data */}
          <div aria-hidden className="relative mt-20">
            <motion.div
              className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: glowLeft,
                width: 480,
                height: 480,
                background:
                  "radial-gradient(closest-side, rgba(242,78,30,0.22), transparent 70%)",
              }}
            />
            <div className="relative h-px bg-calcaire/15">
              <motion.div
                className="absolute inset-y-0 left-0 w-full origin-left bg-chaud"
                style={{ scaleX: progress }}
              />
            </div>
            <div className="relative -mt-[5px]">
              {stages.map((s, i) => (
                <div
                  key={s.id}
                  className={clsx(
                    "absolute -translate-x-1/2 size-[11px] rounded-full border transition-colors duration-300",
                    i <= index
                      ? "border-chaud bg-chaud"
                      : "border-calcaire/40 bg-bitume",
                  )}
                  style={{ left: `${(i / (n - 1)) * 100}%` }}
                />
              ))}
            </div>
            <div className="relative mt-5 h-[1.2em] max-lg:hidden">
              {stages.map((s, i) => (
                <p
                  key={s.id}
                  className={clsx(
                    "absolute whitespace-nowrap font-mono text-12 uppercase tracking-[0.08em] transition-opacity duration-300",
                    i === index ? "opacity-100" : "opacity-40",
                    i === 0
                      ? ""
                      : i === n - 1
                        ? "-translate-x-full"
                        : "-translate-x-1/2",
                  )}
                  style={{ left: `${(i / (n - 1)) * 100}%` }}
                >
                  {s.label}
                </p>
              ))}
            </div>
          </div>

          {/* readout + description */}
          <div aria-hidden className="mt-24 min-h-[13rem]">
            <p className="display-number tnum text-96 leading-none text-chaud">
              {parsed ? (
                <>
                  {parsed.prefix}
                  <motion.span>{tempText}</motion.span>
                  {parsed.suffix}
                </>
              ) : (
                stage.readout
              )}
            </p>
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="display-wide mt-4 text-28 lg:hidden">{stage.label}</p>
              <p className="mt-3 max-w-xl text-16 opacity-80">
                {stage.description}
              </p>
            </motion.div>
          </div>

          {/* the real content, for readers and crawlers */}
          <ol className="sr-only">
            {stages.map((s) => (
              <li key={s.id}>
                {s.label} — {s.readout} — {s.description}
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </div>
  );
}
