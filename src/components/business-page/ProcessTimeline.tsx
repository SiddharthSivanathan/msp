"use client";

import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import type { Business } from "@/lib/businesses";
import { useRange } from "@/lib/motion";
import { EASE, cn } from "@/lib/utils";
import { SectionHead } from "./shared";

/**
 * How the business works. "vertical": sticky heading + a line that fills as
 * you scroll. "horizontal": a chain across the page that draws itself in.
 */
export function ProcessTimeline({ b, variant = "vertical", surface = "bg" }: { b: Business; variant?: "vertical" | "horizontal" | "ledger"; surface?: "bg" | "alt" }) {
  return (
    <section aria-labelledby="process-title" className={cn("relative text-(--b-ink)", surface === "alt" ? "bg-(--b-alt)" : "bg-(--b-bg)")}>
      <div className="shell py-28 sm:py-36 lg:py-44">
        {variant === "vertical" ? <Vertical b={b} /> : variant === "ledger" ? <Ledger b={b} /> : <Horizontal b={b} />}
      </div>
    </section>
  );
}

function Vertical({ b }: { b: Business }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useRange(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="grid-12 gap-y-16">
      <div className="col-span-12 lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <SectionHead id="process-title" eyebrow={b.process.eyebrow} lines={[b.process.heading]} size="md" />
          <p className="mt-8 max-w-sm opacity-60">{b.process.steps.map((s) => s.step).join(" → ")}</p>
        </div>
      </div>
      <ol ref={ref} className="relative col-span-12 lg:col-span-6 lg:col-start-7">
        <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-current/15" />
        <motion.span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-(--b-accent)" style={{ scaleY: fill }} />
        {b.process.steps.map((s, i) => (
          <motion.li
            key={s.step}
            className="relative pb-14 pl-12 last:pb-0 lg:pb-20"
            initial={{ opacity: 0.15 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: "-45% 0px -45% 0px" }}
            transition={{ duration: 0.6 }}
          >
            <span aria-hidden className="absolute left-0 top-2 size-[11px] rounded-full border border-(--b-accent) bg-(--b-bg)" />
            <p className="eyebrow tabular-nums opacity-50">Step 0{i + 1}</p>
            <h3 className="b-heading mt-3 text-[clamp(1.75rem,3.4vw,3rem)] leading-none">{s.step}</h3>
            <p className="mt-3 max-w-md text-[1.02rem] leading-relaxed opacity-65">{s.note}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function Horizontal({ b }: { b: Business }) {
  const n = b.process.steps.length;
  return (
    <>
      <SectionHead id="process-title" eyebrow={b.process.eyebrow} lines={[b.process.heading]} size="md" />
      <motion.ol
        className={cn("relative mt-16 grid gap-0 sm:grid-cols-2 lg:mt-24", n === 5 ? "lg:grid-cols-5" : "lg:grid-cols-6")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
      >
        <span aria-hidden className="absolute inset-x-0 top-0 hidden h-px bg-current/15 lg:block" />
        <motion.span
          aria-hidden
          className="absolute inset-x-0 top-0 hidden h-px origin-left bg-(--b-accent) lg:block"
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.35 * n, ease: EASE } } }}
        />
        {b.process.steps.map((s, i) => (
          <motion.li
            key={s.step}
            className="relative border-l border-current/15 py-6 pl-6 pr-4 sm:border-l-0 sm:border-t sm:pl-0 lg:border-t-0 lg:pt-10"
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay: 0.2 + i * 0.3 } } }}
          >
            <motion.span
              aria-hidden
              className="absolute -top-[5px] left-0 hidden size-[11px] rounded-full border border-(--b-accent) bg-(--b-bg) lg:block"
              variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { delay: 0.2 + i * 0.3 } } }}
            />
            <span className="eyebrow tabular-nums opacity-40">0{i + 1}</span>
            <h3 className="mt-3 font-display text-xl font-semibold uppercase leading-tight tracking-[-0.03em]">{s.step}</h3>
            <p className="mt-2 text-sm leading-relaxed opacity-60">{s.note}</p>
          </motion.li>
        ))}
      </motion.ol>
    </>
  );
}

/** Wholesale: the process as an order docket — rows, numbers, rules. */
function Ledger({ b }: { b: Business }) {
  return (
    <div className="grid-12 gap-y-14">
      <SectionHead id="process-title" eyebrow={b.process.eyebrow} lines={[b.process.heading]} size="md" className="col-span-12 lg:col-span-4" />
      <div className="col-span-12 border-2 border-current lg:col-span-7 lg:col-start-6">
        <div className="eyebrow grid grid-cols-12 border-b-2 border-current px-5 py-3 !text-[10px]">
          <span className="col-span-2">No.</span>
          <span className="col-span-4">Stage</span>
          <span className="col-span-6">Detail</span>
        </div>
        <ol>
          {b.process.steps.map((s, i) => (
            <motion.li
              key={s.step}
              className="grid grid-cols-12 items-baseline border-b border-current/20 px-5 py-5 last:border-b-0"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
            >
              <span className="col-span-2 font-display text-2xl font-extrabold tabular-nums text-(--b-accent)">{String(i + 1).padStart(2, "0")}</span>
              <span className="col-span-4 font-display text-lg font-extrabold uppercase leading-tight">{s.step}</span>
              <span className="col-span-6 text-[0.95rem] opacity-70">{s.note}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
