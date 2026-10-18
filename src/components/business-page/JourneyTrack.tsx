"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, useState } from "react";
import type { Step } from "@/lib/businesses";
import { useRange } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SectionHead } from "./shared";

/**
 * A scroll-driven journey. The object (a carton for distribution, a truck for
 * transport) travels the route as the reader scrolls; each stop lights as it's
 * reached. Same mechanism, different worlds.
 */
export function JourneyTrack({
  steps,
  eyebrow,
  heading,
  object,
  switchAt = 0,
  id,
  surface = "bg",
}: {
  steps: Step[];
  eyebrow: string;
  heading: string[];
  /** "supply": a carton that becomes a delivery vehicle at the `switchAt` step. */
  object: "carton" | "truck" | "supply";
  switchAt?: number;
  id?: string;
  surface?: "bg" | "alt";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "end 25%"] });
  const pos = useRange(scrollYProgress, [0, 1], ["3%", "97%"]);
  const road = object === "truck";
  const [onRoad, setOnRoad] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (object !== "supply") return;
    const next = v >= switchAt / Math.max(1, steps.length - 1) - 0.04;
    if (next !== onRoad) setOnRoad(next);
  });
  const current: "carton" | "truck" = object === "supply" ? (onRoad ? "truck" : "carton") : object;

  return (
    <section id={id} aria-labelledby="journey-title" className={cn("relative text-(--b-ink)", surface === "alt" ? "bg-(--b-alt)" : "bg-(--b-bg)")}>
      <div className="shell py-28 sm:py-36 lg:py-44">
        <SectionHead id="journey-title" eyebrow={eyebrow} lines={heading} size="md" />

        <div ref={ref} className="relative mt-20 lg:mt-28">
          {/* desktop track */}
          <div className="relative hidden h-16 lg:block">
            {road ? (
              <div aria-hidden className="absolute inset-x-0 top-1/2 h-10 -translate-y-1/2 bg-[#15191C]">
                <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 [background:repeating-linear-gradient(90deg,var(--b-accent)_0_36px,transparent_36px_72px)]" />
              </div>
            ) : (
              <div aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-current/25">
                <motion.div className="absolute inset-y-0 left-0 bg-(--b-accent)" style={{ width: pos }} />
              </div>
            )}
            <motion.div aria-hidden className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: pos }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={current}
                  className="block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.35 }}
                >
                  <Icon object={current} />
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>

          <ol className={cn("relative grid gap-0 border-l border-current/20 lg:mt-10 lg:border-l-0", steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-6")}>
            {steps.map((s, i) => (
              <Stop key={s.step} i={i} n={steps.length} s={s} progress={scrollYProgress} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Stop({ i, n, s, progress }: { i: number; n: number; s: Step; progress: MotionValue<number> }) {
  const at = n === 1 ? 0 : i / (n - 1);
  const opacity = useTransform(progress, (v) => (v >= at - 0.04 ? 1 : 0.3));
  return (
    <motion.li style={{ opacity }} className="relative py-6 pl-8 pr-4 lg:py-0 lg:pl-0">
      <span aria-hidden className="absolute -left-[6px] top-8 size-[11px] rounded-full border border-(--b-accent) bg-(--b-bg) lg:hidden" />
      <span className="eyebrow tabular-nums text-(--b-accent)">0{i + 1}</span>
      <h3 className={cn("b-heading mt-3 leading-none", n > 4 ? "text-[clamp(1.3rem,1.55vw,1.6rem)]" : "text-[clamp(1.4rem,2.2vw,2.1rem)]")}>{s.step}</h3>
      <p className="mt-3 max-w-[24ch] text-[0.95rem] leading-relaxed opacity-65">{s.note}</p>
    </motion.li>
  );
}

function Icon({ object }: { object: "carton" | "truck" }) {
  if (object === "truck")
    return (
      <svg width="64" height="36" viewBox="0 0 64 36" className="drop-shadow-lg">
        <rect x="2" y="4" width="38" height="22" fill="#EEF0EF" />
        <path d="M40 10 H52 L60 18 V26 H40 Z" fill="#D9B44A" />
        <rect x="45" y="12" width="7" height="6" fill="#22292E" />
        <circle cx="14" cy="28" r="5" fill="#15191C" stroke="#EEF0EF" strokeWidth="2" />
        <circle cx="50" cy="28" r="5" fill="#15191C" stroke="#EEF0EF" strokeWidth="2" />
      </svg>
    );
  return (
    <svg width="40" height="36" viewBox="0 0 40 36" className="drop-shadow-md">
      <path d="M4 10 L20 3 L36 10 V28 L20 34 L4 28 Z" fill="#C79B6D" stroke="#7A5332" strokeWidth="1.2" />
      <path d="M4 10 L20 17 L36 10 M20 17 V34" fill="none" stroke="#7A5332" strokeWidth="1.2" />
      <path d="M12 6.5 L28 13.5" stroke="#E9D3B6" strokeWidth="3" />
    </svg>
  );
}
