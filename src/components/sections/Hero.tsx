"use client";

import Image from "next/image";
import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { own, site } from "@/lib/content";
import { heroSerif } from "@/lib/fonts";
import { useRange } from "@/lib/motion";
import { EASE, cn } from "@/lib/utils";
import { ArrowLink } from "@/components/ui/ArrowLink";

/**
 * A calm, premium product still-life in the manner of leading Indian FMCG
 * homepages: MSP's own packs on a warm wooden table, the headline set in a
 * display serif above them. The stage image melts into a deep-brown backdrop
 * that matches its wall, so the photograph has no hard edges at any width.
 */
const still = own("hero-still", "MSP Fresh White Pepper Powder, Kashmiri Chilli Powder and Pickle Masala on a wooden table with whole spices", "products");
const BG = "#2E1C11";
/** Soft edges on every side so the photograph dissolves into the backdrop. */
const STAGE_MASK =
  "linear-gradient(to bottom, transparent 0%, #000 32%, #000 88%, transparent 100%), linear-gradient(to right, transparent 0%, #000 15%, #000 85%, transparent 100%)";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useRange(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useRange(scrollYProgress, [0, 1], ["0%", "35%"]);
  const fade = useRange(scrollYProgress, [0, 0.6], [1, 0]);
  const [first, ...rest] = site.headline;

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[680px] flex-col overflow-hidden text-paper [height:100svh]"
      style={{ background: BG }}
    >
      {/* Warm window light behind the headline */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(60%_45%_at_50%_18%,rgba(214,150,88,0.28),transparent_70%)]" />

      {/* Product stage */}
      <motion.div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 flex h-[46%] justify-center sm:h-[50%] lg:h-[54%]" style={{ y: imgY }}>
        <motion.div
          className="relative aspect-[2339/1011] h-full shrink-0 overflow-hidden"
          style={{ maskImage: STAGE_MASK, WebkitMaskImage: STAGE_MASK, maskComposite: "intersect", WebkitMaskComposite: "source-in" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
        >
          <div className="absolute inset-0 motion-safe:[animation:ken-burns_22s_var(--ease-brand)_both]">
            <Image src={still.src!} alt="" fill priority sizes="(min-width:1024px) 90vw, 260vw" className="object-cover" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="shell relative flex flex-col items-center pt-28 text-center sm:pt-32 lg:pt-36" style={{ y: textY, opacity: fade }}>
        <motion.p
          className="eyebrow mb-5 flex items-center gap-3 text-[#E9C27A]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
        >
          <span className="h-px w-8 bg-current" aria-hidden />
          MSP Group
          <span className="h-px w-8 bg-current" aria-hidden />
        </motion.p>

        <motion.h1
          id="hero-title"
          className={cn(heroSerif.className, "text-[clamp(2.3rem,5.2vw,4.9rem)] font-medium leading-[1.04] tracking-[-0.02em]")}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.7 }}
        >
          {first} {rest.slice(0, -1).join(" ")}
          <br />
          <em className="font-medium text-[#E9C27A]">{rest.at(-1)}</em>
        </motion.h1>

        <motion.p
          className="mt-4 text-[clamp(1rem,1.3vw,1.15rem)] text-paper/75 lg:mt-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 1.05 }}
        >
          {site.heroLine}
        </motion.p>

        <motion.div
          className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 1.25 }}
        >
          <ArrowLink href="#businesses" variant="solid">Explore our businesses</ArrowLink>
          <ArrowLink href="/businesses/msp-traders#enquiry" className="text-paper">Wholesale enquiry</ArrowLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
