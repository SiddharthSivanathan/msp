"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/content";
import { heroSerif } from "@/lib/fonts";
import { EASE, cn } from "@/lib/utils";
import { ArrowLink } from "@/components/ui/ArrowLink";

/**
 * The MSP Fresh banner, in the manner of Indian FMCG brand homepages (Aachi,
 * Sakthi Masala). The whole product scene fills the background — every pack
 * fully in view — and the message sits centred above the packs, on the warm
 * wall of the photograph. Shading is kept to the reading area so the products
 * stay bright. On desktop the banner takes the photograph's own proportions, so the
 * scene is never cropped. On phones the message comes first and the full scene follows.
 */
const s = site.hero.slides[0];
const CORNERS = [
  "left-0 top-0 border-l border-t",
  "right-0 top-0 border-r border-t",
  "bottom-0 left-0 border-b border-l",
  "bottom-0 right-0 border-b border-r",
];
const RISE = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function Hero() {
  const still = useReducedMotion();

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-[#2A1A10] text-paper lg:aspect-[2339/1481]">
      {/* The product scene — full background on desktop */}
      <motion.div
        className="absolute inset-0 -z-10 hidden lg:block"
        initial={still ? false : { scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <Image src={`/images/msp/${s.image}.jpg`} alt={s.alt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: s.position }} />
      </motion.div>
      {/* Shade only where the words sit, and under the menu */}
      <div aria-hidden className="absolute inset-0 -z-10 hidden bg-[radial-gradient(55%_42%_at_50%_22%,rgba(22,13,7,0.62),transparent_75%)] lg:block" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[#160D07]/75 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 hidden h-28 bg-gradient-to-t from-[#120A05]/80 to-transparent lg:block" />

      {/* Fine gold corner marks — a quiet frame around the scene */}
      <div aria-hidden className="pointer-events-none absolute inset-x-6 bottom-6 top-24 hidden lg:block xl:inset-x-8 xl:bottom-8 xl:top-28">
        {CORNERS.map((c) => (
          <span key={c} className={cn("absolute size-7 border-[#E9C27A]/45", c)} />
        ))}
      </div>

      {/* The message */}
      <motion.div
        className="shell relative flex flex-col items-center pb-10 pt-28 text-center sm:pt-32 lg:pb-0 lg:pt-[max(6.5rem,10.5vh)]"
        initial={still ? false : "hidden"}
        animate="shown"
        variants={{ shown: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
      >
        <motion.p variants={RISE} className="eyebrow flex items-center gap-4 !tracking-[0.32em] text-[#E9C27A]">
          <span aria-hidden className="h-px w-12 bg-gradient-to-r from-transparent to-current" />
          {s.label}
          <span aria-hidden className="h-px w-12 bg-gradient-to-l from-transparent to-current" />
        </motion.p>
        <motion.span variants={RISE} aria-hidden className="mb-5 mt-3 block size-1.5 rotate-45 bg-[#E9C27A]" />
        <motion.h1
          id="hero-title"
          variants={RISE}
          className={cn(heroSerif.className, "text-[clamp(2.4rem,4.1vw,4.15rem)] font-normal leading-[1.06] tracking-[-0.03em] [text-shadow:0_2px_30px_rgba(0,0,0,0.35)]")}
        >
          {s.title[0]} <br className="xl:hidden" />
          <em className="font-normal italic text-[#EBCB8B]">{s.title[1]}</em>
        </motion.h1>
        <motion.p variants={RISE} className="mt-4 max-w-[62ch] text-[clamp(0.95rem,1.05vw,1.02rem)] leading-relaxed tracking-[0.01em] text-paper/75">
          {s.text}
        </motion.p>
        <motion.div variants={RISE} className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
          <ArrowLink href={s.cta.href} variant="solid" className="!bg-[#E2BE7E] !text-[#1A120B] shadow-[0_10px_30px_-12px_rgba(226,190,126,0.6)] transition-colors hover:!bg-[#EFD3A1]">
            {s.cta.label}
          </ArrowLink>
          <ArrowLink href={s.link?.href ?? "#businesses"} className="text-paper/85 hover:text-paper">
            {s.link?.label ?? "All Businesses"}
          </ArrowLink>
        </motion.div>
      </motion.div>

      {/* The full scene on phones and tablets, below the message */}
      <div className="relative aspect-[2339/1481] w-full lg:hidden">
        <Image src={`/images/msp/${s.image}.jpg`} alt={s.alt} fill priority sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#2A1A10] to-transparent" />
      </div>

      {/* Catalogue caption — the products in the picture, named as on the packs */}
      {"products" in s && (
        <motion.div
          className="absolute inset-x-0 bottom-0 hidden lg:block"
          initial={still ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="shell flex items-center justify-between gap-8 pb-12 xl:pb-14">
            <p className="eyebrow !text-[10px] text-paper/55">Part of the MSP Group</p>
            <ul className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/80">
              {s.products.map((p, i) => (
                <li key={p} className="flex items-center gap-4">
                  {i > 0 && <span aria-hidden className="size-1 rotate-45 bg-[#E9C27A]" />}
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </section>
  );
}
