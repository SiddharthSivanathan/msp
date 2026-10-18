"use client";

import { motion, useScroll } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import type { Business } from "@/lib/businesses";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useRange } from "@/lib/motion";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SplitLines } from "@/components/ui/SplitLines";

/**
 * The signature cargo experience: Chennai → … → Port Blair → Destination.
 * Desktop pins the section and sails horizontally through each stage while a
 * vessel crosses the sea line below. Mobile becomes a vertical voyage log.
 */
export function VoyageJourney({ b }: { b: Business }) {
  const stages = b.journey ?? [];
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    if (!isDesktop || !track.current) return;
    const measure = () => setDistance(Math.max(0, track.current!.scrollWidth - window.innerWidth));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useRange(scrollYProgress, [0, 1], [0, -distance]);
  const ship = useRange(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (!stages.length) return null;

  return (
    <section
      ref={ref}
      aria-labelledby="voyage-title"
      className="relative bg-[#051320] text-paper"
      style={isDesktop ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className={isDesktop ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : ""}>
        <div className="shell pt-28 lg:pt-0">
          <p className="eyebrow mb-6 flex items-center gap-3 text-[#8FB3C9]">
            <span aria-hidden className="h-px w-8 bg-current" />
            The voyage
          </p>
          <SplitLines id="voyage-title" lines={["Chennai to", "Port Blair."]} className="display-md uppercase" />
        </div>

        <motion.ol
          ref={track}
          className="mt-12 flex flex-col gap-10 px-[clamp(1rem,4.2vw,4.5rem)] pb-24 lg:w-max lg:flex-row lg:gap-6 lg:pb-0"
          style={isDesktop ? { x } : undefined}
        >
          {stages.map((s, i) => (
            <li key={s.stage} className="lg:w-[min(30vw,420px)]">
              <ImageSlot asset={s.image} seed={1000 + i} caption={false} className="aspect-[4/3]" sizes="(min-width:1024px) 30vw, 100vw" />
              <div className="mt-5 flex items-baseline gap-4 border-t border-white/15 pt-4">
                <span className="font-display text-3xl font-extrabold tabular-nums text-[#8FB3C9]">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-xl font-extrabold uppercase tracking-[-0.01em]">{s.stage}</h3>
                  <p className="mt-1 text-sm text-paper/60">{s.note}</p>
                </div>
              </div>
            </li>
          ))}
        </motion.ol>

        {isDesktop && (
          <div className="shell mt-12" aria-hidden>
            <div className="relative h-10">
              <svg className="absolute inset-x-0 top-1/2 h-4 w-full -translate-y-1/2" preserveAspectRatio="none" viewBox="0 0 400 10">
                <path d={"M0 5" + Array.from({ length: 40 }, (_, k) => ` Q ${k * 10 + 5} ${k % 2 ? 9 : 1} ${k * 10 + 10} 5`).join("")} fill="none" stroke="#8FB3C9" strokeOpacity="0.5" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
              </svg>
              <motion.svg className="absolute top-0 h-10 w-12 -translate-x-1/2" viewBox="0 0 40 32" style={{ left: ship }}>
                <path d="M4 20 L36 20 L31 27 L8 27 Z" fill="#F4F1EA" />
                <rect x="10" y="13" width="6" height="7" fill="#D8C7A3" />
                <rect x="17" y="13" width="6" height="7" fill="#8FB3C9" />
                <rect x="24" y="9" width="5" height="11" fill="#F4F1EA" />
              </motion.svg>
              <span className="eyebrow absolute -bottom-5 left-0 !text-[10px] text-paper/50">Chennai</span>
              <span className="eyebrow absolute -bottom-5 right-0 !text-[10px] text-paper/50">Port Blair</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
