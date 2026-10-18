"use client";

import Link from "next/link";
import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import type { Business } from "@/lib/businesses";
import { features, own, ph } from "@/lib/content";
import { useRange } from "@/lib/motion";
import { EASE, cn } from "@/lib/utils";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { financeSerif } from "@/lib/fonts";
import { BrassRule } from "./FinanceSections";
import { SplitLines } from "@/components/ui/SplitLines";

/**
 * Six hero environments — one per business. They share the breadcrumb,
 * label, CTA and type system (the MSP constant) but each builds its own world.
 */
export function BusinessHero({ b }: { b: Business }) {
  switch (b.slug) {
    case "m-sevugaperumal-and-sons":
      return <DistributionHero b={b} />;
    case "msp-store":
      return <TransportHero b={b} />;
    case "msp-traders":
      return <WholesaleHero b={b} />;
    case "msp-cargo-service":
      return <MaritimeHero b={b} />;
    case "msp-fresh-products":
      return <ProductHero b={b} />;
    case "saptagiri-finance":
      return <FinanceHero b={b} />;
  }
}

/* ------------------------------- shared parts ------------------------------ */

function Crumbs({ b, className }: { b: Business; className?: string }) {
  return (
    <motion.nav
      aria-label="Breadcrumb"
      className={cn("eyebrow mb-8", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      <Link href="/" className="link-underline pb-0.5 opacity-60 hover:opacity-100">MSP</Link>
      <span aria-hidden className="mx-3 opacity-40">/</span>
      <Link href="/businesses" className="link-underline pb-0.5 opacity-60 hover:opacity-100">Businesses</Link>
      <span aria-hidden className="mx-3 opacity-40">/</span>
      <span aria-current="page" className="opacity-90">{b.name}</span>
    </motion.nav>
  );
}

function Label({ b, className }: { b: Business; className?: string }) {
  return (
    <motion.p
      className={cn("eyebrow mb-6 flex flex-wrap items-center gap-3", className)}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: EASE, delay: 0.55 }}
    >
      <span className="tabular-nums opacity-60">{b.index}</span>
      <span aria-hidden className="h-px w-8" style={{ background: b.accent }} />
      <span>{b.name}</span>
      {b.heroLabel !== b.name && (
        <>
          <span aria-hidden className="opacity-40">/</span>
          <span className="opacity-70">{b.heroLabel.replace(`${b.name} / `, "")}</span>
        </>
      )}
    </motion.p>
  );
}

function Ctas({ b, light = false, delay = 1.5 }: { b: Business; light?: boolean; delay?: number }) {
  return (
    <motion.div
      className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      <ArrowLink href={b.ctas.primary.href} variant={light ? "ink" : "solid"}>
        {b.ctas.primary.label}
      </ArrowLink>
      {b.ctas.secondary && <ArrowLink href={b.ctas.secondary.href}>{b.ctas.secondary.label}</ArrowLink>}
    </motion.div>
  );
}

function Supporting({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.p
      className={cn("lede mt-7 max-w-[46ch]", className)}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: EASE, delay: 1.25 }}
    >
      {children}
    </motion.p>
  );
}

function Interim({ show }: { show?: boolean }) {
  if (!features.showUnconfirmed || !show) return null;
  return (
    <span className="absolute right-4 top-24 z-10 rounded-full bg-black/45 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80 sm:right-8">
      Interim photo
    </span>
  );
}

function useHeroParallax() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  return { ref, y: useRange(scrollYProgress, [0, 1], ["0%", "16%"]), fade: useRange(scrollYProgress, [0, 0.75], [1, 0]) };
}

/* ------------------------- 01 Distribution: products ------------------------ */

const productStrip = [
  ph("groceryShelves", "Partner-brand products on shelf", "Stocked retail shelves", "products"),
  ph("warehouseBoxes", "Distribution warehouse", "Boxes in a distribution warehouse"),
  ph("cartons", "Cartons for dispatch", "Cartons ready for dispatch", "products"),
  ph("shopShelves", "Retail partner", "A shopkeeper in a stocked store", "products"),
  own("lorry-inside", "MSP team unloading sacks from inside an MSP lorry at the market", "people"),
  ph("workersWalk", "Warehouse team", "Workers in a warehouse aisle", "people"),
];

function DistributionHero({ b }: { b: Business }) {
  const { ref, y, fade } = useHeroParallax();
  return (
    <header ref={ref} className="relative isolate flex min-h-[700px] flex-col overflow-hidden bg-[#2A1A12] text-paper [height:100svh]">
      <motion.div className="absolute inset-0 -z-10" style={{ y }}>
        <ImageSlot interimTag={false} asset={b.image} priority caption={false} className="h-full motion-safe:[&_img]:[animation:ken-burns_18s_var(--ease-brand)_both]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,26,18,0.55),rgba(42,26,18,0.35)_40%,rgba(42,26,18,0.95))]" />
      </motion.div>
      <Interim show={b.image.interim} />

      <motion.div className="shell flex flex-1 flex-col justify-end pb-10 pt-32" style={{ opacity: fade }}>
        <Crumbs b={b} />
        <Label b={b} className="text-[#E9C9A8]" />
        <SplitLines as="h1" trigger="mount" delay={0.7} stagger={0.14} lines={b.heroLines} className="display-xl max-w-[13ch] uppercase" />
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Supporting className="text-paper/80">{b.heroSupporting}</Supporting>
          <Ctas b={b} />
        </div>
      </motion.div>

      {/* Products in motion — the distribution flow, literally */}
      <div aria-hidden className="relative h-28 overflow-hidden border-t border-white/10 sm:h-32">
        <div className="flex h-full w-max gap-2 py-2 motion-safe:[animation:marquee_45s_linear_infinite]">
          {[...productStrip, ...productStrip].map((im, i) => (
            <ImageSlot interimTag={false} key={i} asset={im} caption={false} seed={i} className="h-full w-44 shrink-0 sm:w-56" sizes="224px" />
          ))}
        </div>
      </div>
    </header>
  );
}

/* --------------------------- 02 Transport: the road -------------------------- */

function TransportHero({ b }: { b: Business }) {
  const { ref, y, fade } = useHeroParallax();
  const stops = b.process.steps.map((s) => s.step);
  return (
    <header ref={ref} className="relative isolate flex min-h-[700px] flex-col overflow-hidden bg-[#1A2024] text-[#EEF0EF] [height:100svh]">
      <motion.div className="absolute inset-0 -z-10" style={{ y }}>
        <ImageSlot interimTag={false} asset={own("fleet-yard", "MSP vans and goods carriers lined up at the depot", "road")} priority caption={false} className="h-full" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,32,36,0.92),rgba(26,32,36,0.45)_60%,rgba(26,32,36,0.2))]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,#1A2024)]" />
      </motion.div>
      <Interim show />

      <motion.div className="shell flex flex-1 flex-col justify-end pb-10 pt-32" style={{ opacity: fade }}>
        <Crumbs b={b} />
        <Label b={b} className="text-[#D9B44A]" />
        <SplitLines as="h1" trigger="mount" delay={0.7} stagger={0.14} lines={["Keeping", "the islands moving."]} className="display-xl max-w-[14ch] uppercase" />
        <Supporting className="text-[#EEF0EF]/80">{b.heroSupporting}</Supporting>
        <Ctas b={b} />
      </motion.div>

      {/* The road: lane markings travel, the route reads left to right */}
      <div aria-hidden className="relative bg-[#15191C]">
        <div className="h-1.5 w-full motion-safe:[animation:road-lane_1.6s_linear_infinite] [background:repeating-linear-gradient(90deg,#D9B44A_0_48px,transparent_48px_96px)] [background-size:96px_100%]" />
        <div className="shell flex items-center justify-between py-4">
          {stops.map((s, i) => (
            <span key={s} className="eyebrow flex items-center gap-3 !text-[10px] text-[#EEF0EF]/70">
              {i > 0 && <span className="hidden text-[#D9B44A] sm:inline">→</span>}
              {s}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

/* ------------------------- 03 Wholesale: the warehouse ----------------------- */

function WholesaleHero({ b }: { b: Business }) {
  return (
    <header className="relative grid min-h-[700px] overflow-hidden bg-[#EFE7D8] text-[#2B2419] lg:grid-cols-12 lg:[height:100svh]">
      <div className="relative order-2 flex flex-col justify-end px-[clamp(1rem,4.2vw,4.5rem)] pb-12 pt-14 lg:order-1 lg:col-span-6 lg:pb-16 lg:pt-36">
        <Crumbs b={b} />
        <Label b={b} className="text-[#8A6534]" />
        <SplitLines as="h1" trigger="mount" delay={0.7} stagger={0.14} lines={["Powering", "the everyday", "supply."]} className="display-xl uppercase" />
        <Supporting className="text-[#2B2419]/75">{b.heroSupporting}</Supporting>
        <Ctas b={b} light />
        <motion.ul
          aria-label="Product categories"
          className="mt-12 flex flex-wrap gap-3"
          initial="h"
          animate="s"
          variants={{ s: { transition: { staggerChildren: 0.12, delayChildren: 1.7 } } }}
        >
          {["Rice", "Groceries", "Essentials"].map((c) => (
            <motion.li
              key={c}
              variants={{ h: { opacity: 0, y: 10 }, s: { opacity: 1, y: 0 } }}
              className="border-2 border-[#2B2419] px-4 py-2 font-display text-sm font-extrabold uppercase tracking-[0.18em]"
            >
              {c}
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <motion.div
        className="relative order-1 min-h-[52svh] lg:order-2 lg:col-span-6 lg:min-h-0"
        initial={{ clipPath: "inset(0 0 0 100%)" }}
        animate={{ clipPath: "inset(0 0 0 0%)" }}
        transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      >
        <ImageSlot interimTag={false} asset={b.image} priority caption={false} parallax={6} className="!absolute inset-0 h-full" sizes="50vw" />
        <Interim show={b.image.interim} />
      </motion.div>
    </header>
  );
}

/* ------------------------- 04 Cargo: the maritime route ---------------------- */

function MaritimeHero({ b }: { b: Business }) {
  const { ref, y, fade } = useHeroParallax();
  return (
    <header ref={ref} className="relative isolate flex min-h-[720px] flex-col overflow-hidden bg-navy-deep text-paper [height:100svh]">
      <motion.div className="absolute inset-0 -z-10" style={{ y }}>
        <ImageSlot interimTag={false} asset={ph("hero", "MSP cargo vessel arriving at Port Blair", "A container ship arriving beneath green hills", "sea")} priority caption={false} className="h-full" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,19,32,0.6),rgba(5,19,32,0.25)_35%,rgba(5,19,32,0.95))]" />
      </motion.div>
      <Interim show />

      <motion.div className="shell flex flex-1 flex-col justify-end pb-8 pt-32" style={{ opacity: fade }}>
        <Crumbs b={b} />
        <Label b={b} className="text-[#8FB3C9]" />
        <SplitLines as="h1" trigger="mount" delay={0.7} stagger={0.14} lines={b.heroLines} className="display-xl uppercase" />
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Supporting className="text-paper/80">{b.heroSupporting}</Supporting>
          <Ctas b={b} />
        </div>
      </motion.div>

      {/* The crossing */}
      <div className="shell pb-8">
        <div className="flex items-center gap-4 border-t border-white/15 pt-6 font-display text-[clamp(1.25rem,3.4vw,2.75rem)] font-extrabold uppercase tracking-[-0.02em]">
          <span>Chennai</span>
          <span aria-hidden className="relative h-8 flex-1 overflow-hidden">
            <svg className="absolute inset-x-0 top-1/2 h-4 w-full -translate-y-1/2" preserveAspectRatio="none" viewBox="0 0 200 10">
              <path d="M0 5 Q 5 1 10 5 T 20 5 T 30 5 T 40 5 T 50 5 T 60 5 T 70 5 T 80 5 T 90 5 T 100 5 T 110 5 T 120 5 T 130 5 T 140 5 T 150 5 T 160 5 T 170 5 T 180 5 T 190 5 T 200 5" fill="none" stroke="#8FB3C9" strokeOpacity="0.55" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
            </svg>
            <motion.svg
              className="absolute top-0 h-8 w-10"
              viewBox="0 0 40 32"
              initial={{ left: "0%" }}
              animate={{ left: ["0%", "92%"] }}
              transition={{ duration: 9, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 1.8 }}
            >
              <path d="M4 20 L36 20 L31 27 L8 27 Z" fill="#F4F1EA" />
              <rect x="10" y="13" width="6" height="7" fill="#D8C7A3" />
              <rect x="17" y="13" width="6" height="7" fill="#8FB3C9" />
              <rect x="24" y="9" width="5" height="11" fill="#F4F1EA" />
            </motion.svg>
          </span>
          <span>Port Blair</span>
        </div>
        <p className="eyebrow mt-3 flex justify-between !text-[10px] text-paper/45">
          <span>13.08° N · 80.27° E</span>
          <span className="hidden sm:inline">Bay of Bengal</span>
          <span>11.62° N · 92.73° E</span>
        </p>
      </div>
    </header>
  );
}

/* ------------------------- 05 Own products: the product stage ---------------- */

function ProductHero({ b }: { b: Business }) {
  const pack = b.products?.[0]?.image;
  return (
    <header className="relative overflow-hidden bg-[#FBF6EC] text-[#2D2418]">
      <div className="shell grid-12 min-h-[100svh] items-center gap-y-12 pb-16 pt-32 lg:pt-28">
        <div className="col-span-12 lg:col-span-6">
          <Crumbs b={b} />
          <Label b={b} className="text-[#C7541F]" />
          <SplitLines as="h1" trigger="mount" delay={0.7} stagger={0.14} lines={b.heroLines} className="font-display text-[clamp(2.5rem,6vw,6.25rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.045em]" lineClassName="[&:nth-child(2)]:text-[#C7541F]" />
          <Supporting className="text-[#2D2418]/75">{b.heroSupporting}</Supporting>
          <Ctas b={b} light />
        </div>

        {/* Product stage: a packshot in front of its ingredients */}
        <div className="relative col-span-12 mx-auto aspect-square w-full max-w-[560px] lg:col-span-6">
          <motion.div
            className="absolute inset-[6%] overflow-hidden rounded-full"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
          >
            <ImageSlot interimTag={false} asset={b.image} priority caption={false} className="h-full" sizes="560px" />
            <div className="absolute inset-0 bg-[#C7541F]/15" />
          </motion.div>
          {pack && (
            <motion.div
              className="absolute bottom-[4%] left-[8%] w-[38%] rotate-[-4deg] shadow-[0_30px_60px_-25px_rgba(45,36,24,0.55)]"
              initial={{ y: 40, opacity: 0, rotate: -10 }}
              animate={{ y: 0, opacity: 1, rotate: -4 }}
              transition={{ duration: 1.3, ease: EASE, delay: 1.1 }}
            >
              <ImageSlot interimTag={false} asset={pack} caption className="aspect-[3/4]" sizes="220px" />
            </motion.div>
          )}
          <motion.ul
            className="absolute right-0 top-[10%] space-y-2 text-right"
            initial="h"
            animate="s"
            variants={{ s: { transition: { staggerChildren: 0.15, delayChildren: 1.6 } } }}
          >
            {(b.offer?.items ?? []).map((c) => (
              <motion.li key={c.title} variants={{ h: { opacity: 0, x: 12 }, s: { opacity: 1, x: 0 } }} className="eyebrow inline-block rounded-full bg-white px-3 py-1.5 !text-[10px] shadow-sm">
                {c.title}
              </motion.li>
            ))}
          </motion.ul>
          <Interim show={b.image.interim} />
        </div>
      </div>
    </header>
  );
}

/* --------------- 06 Finance: a traditional local finance shop signboard --------------- */

/** Maroon signboard with a brass double border, the name in a traditional serif, and an ornament photo. */
function FinanceHero({ b }: { b: Business }) {
  return (
    <header className="bg-[#5A1414] pb-10 pt-24 text-[#FAF4E8] lg:pb-14 lg:pt-28">
      <div className="shell">
        <Crumbs b={b} className="!mb-5 text-[#FAF4E8]/70" />
        <motion.div
          className="grid border-[6px] border-double border-[#B58A3A] bg-[#7A1F1F] lg:grid-cols-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col justify-center p-8 text-center sm:p-12 lg:col-span-7 lg:p-14 lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D9B977]">An MSP Group business</p>
            <h1 className={cn(financeSerif.className, "mt-4 text-[clamp(2.4rem,5.6vw,4.5rem)] font-bold uppercase leading-[1.05] tracking-[0.02em] text-[#F3DFA9]")}>
              Saptagiri Finance
            </h1>
            <BrassRule light className="mt-5 justify-center lg:justify-start" />
            <p className={cn(financeSerif.className, "mt-6 text-[clamp(1.3rem,2.2vw,1.8rem)] font-semibold")}>{b.heroLines.join(" ")}</p>
            <p className="mt-3 text-[1.05rem] text-[#FAF4E8]/80">{b.heroSupporting}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link href={b.ctas.primary.href} className="bg-[#D9B977] px-7 py-3.5 font-bold text-[#2B1D16] transition-colors hover:bg-[#F3DFA9]">
                {b.ctas.primary.label}
              </Link>
              {b.ctas.secondary && (
                <Link href={b.ctas.secondary.href} className="border border-[#D9B977] px-7 py-3.5 font-bold text-[#F3DFA9] transition-colors hover:bg-[#D9B977]/15">
                  {b.ctas.secondary.label}
                </Link>
              )}
            </div>
          </div>
          <div className="relative min-h-[300px] border-t-[6px] border-double border-[#B58A3A] lg:col-span-5 lg:border-l-[6px] lg:border-t-0">
            <ImageSlot asset={b.image} priority caption={false} className="!absolute inset-0 h-full" sizes="(min-width:1024px) 40vw, 100vw" />
          </div>
        </motion.div>
      </div>
    </header>
  );
}
