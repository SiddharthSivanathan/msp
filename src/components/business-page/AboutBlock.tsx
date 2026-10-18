"use client";

import { motion } from "motion/react";
import type { Business } from "@/lib/businesses";
import { EASE } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { WordReveal } from "@/components/ui/WordReveal";

/** Introduction + the business's "flow" (e.g. Supply → Availability → …). */
export function AboutBlock({ b, children }: { b: Business; children?: React.ReactNode }) {
  return (
    <section id="intro" aria-labelledby="about-title" className="relative bg-(--b-bg) text-(--b-ink)">
      <div className="shell py-28 sm:py-36 lg:py-44">
        <p className="eyebrow mb-10 flex items-center gap-3 text-(--b-accent)">
          <span aria-hidden className="h-px w-8 bg-current opacity-60" />
          About {b.name}
        </p>
        <div id="about-title">
          <WordReveal text={b.about.heading} className="b-heading max-w-[15ch] text-[clamp(2.25rem,6vw,6rem)] leading-[0.95]" dim={0.15} />
        </div>

        <div className="grid-12 mt-16 gap-y-10 lg:mt-24">
          {b.about.body.map((p, i) => (
            <Reveal
              key={i}
              delay={i * 0.12}
              className={i === 0 ? "col-span-12 md:col-span-6 lg:col-span-5" : "col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-8"}
            >
              <p className={i === 0 ? "font-display text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-snug tracking-[-0.025em]" : "lede opacity-70"}>
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        {b.about.flow.length > 0 && <Flow steps={b.about.flow} label={b.about.flowLabel} />}
        {children}
      </div>
    </section>
  );
}

/** A → B → C chain that draws itself in. */
export function Flow({ steps, label = "How it connects" }: { steps: string[]; label?: string }) {
  return (
    <div className="mt-20 lg:mt-28">
      <p className="eyebrow mb-6 opacity-50">{label}</p>
      <motion.ol
        className="flex flex-col border-y border-current/15 lg:flex-row"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
      >
        {steps.map((s, i) => (
          <motion.li
            key={s}
            className="relative flex flex-1 items-center justify-between gap-4 border-b border-current/15 py-6 last:border-b-0 lg:border-b-0 lg:py-10 lg:pr-6"
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay: i * 0.22 } },
            }}
          >
            <span className="flex items-baseline gap-4">
              <span className="eyebrow tabular-nums opacity-40">0{i + 1}</span>
              <span className="font-display text-[clamp(1.35rem,2.3vw,2.1rem)] font-semibold uppercase tracking-[-0.04em]">{s}</span>
            </span>
            {i < steps.length - 1 && (
              <motion.span
                aria-hidden
                className="text-(--b-accent) max-lg:rotate-90"
                variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0, transition: { delay: i * 0.22 + 0.3 } } }}
              >
                <svg width="22" height="14" viewBox="0 0 16 12"><path d="M0 6h14M9.5 1.5 14 6l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
              </motion.span>
            )}
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}
