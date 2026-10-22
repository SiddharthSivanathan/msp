"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { own, ph, type ImageAsset } from "@/lib/content";
import { EASE } from "@/lib/utils";
import { Arrow, ArrowLink } from "@/components/ui/ArrowLink";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";

/* ---------------------------------------------------------------------------
 * Short visual moments. Each is one photograph (or strip), one headline, one
 * line, one action. No explanations — the business pages hold the detail.
 * ------------------------------------------------------------------------- */

/** Wholesale & Supply — the moment that makes the wholesale identity unmistakable. */
export function WholesaleMoment() {
  const image = own("warehouse-aisle", "Warehouse aisle with rice sacks on racks and cartons on pallets", "warehouse");
  return (
    <section aria-labelledby="wholesale-moment-title" className="relative isolate overflow-hidden bg-[#2B2419] text-paper">
      <ImageSlot asset={image} parallax={10} caption={false} className="!absolute inset-0 -z-10 h-full" sizes="100vw" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(43,36,25,0.9),rgba(43,36,25,0.45)_55%,rgba(43,36,25,0.15))]" />
      <div className="shell flex min-h-[90svh] flex-col justify-end py-20 lg:py-28">
        <p className="eyebrow mb-6 flex items-center gap-3 text-sand">
          <span aria-hidden className="h-px w-10 bg-current" />
          Wholesale &amp; Supply
        </p>
        <SplitLines id="wholesale-moment-title" lines={["Moving everyday", "essentials from", "source to business."]} className="display-lg max-w-[18ch] uppercase" />
        <Reveal className="mt-10">
          <ArrowLink href="/businesses/msp-traders" variant="solid">Explore MSP Traders</ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Brands. Products. Markets. — one art-directed composition: the headline with
 * its line and action beside it, then one dominant photograph (stock being
 * prepared for distribution) with two supporting frames (the brands, the market)
 * at matching heights. Nothing moves sideways and nothing reads as a gallery.
 */
export function DistributionMoment() {
  const main = own("warehouse-stock-check", "Grocery stock being checked and prepared for distribution in the warehouse", "warehouse");
  const brands: ImageAsset = {
    src: "/brands/aachi-masala-packs.jpg",
    alt: "Aachi masala packs — one of the brands distributed by M Sevugaperumal & Sons",
    direction: "Distributed brands",
    motif: "products",
  };
  const market = own("lorry-street", "Goods being delivered to a market street", "road");
  const frames = [
    { image: brands, label: "The brands" },
    { image: market, label: "The market" },
  ];

  return (
    <section aria-labelledby="distribution-moment-title" className="relative overflow-hidden bg-[#F6EEE3] py-20 text-[#2A211B] sm:py-24 lg:py-28">
      <div className="shell">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="eyebrow mb-6 flex items-center gap-3 text-[#A4472A]">
              <span aria-hidden className="h-px w-10 bg-current" />
              M Sevugaperumal &amp; Sons
            </p>
            <SplitLines
              id="distribution-moment-title"
              lines={["Brands.", "Products.", "Markets."]}
              className="font-display text-[clamp(2.4rem,5vw,4.75rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.045em]"
            />
          </div>
          <Reveal className="col-span-12 sm:max-w-sm lg:col-span-4 lg:col-start-9 lg:max-w-none lg:pb-2">
            <span aria-hidden className="mb-6 hidden h-px w-12 bg-[#A4472A] lg:block" />
            <p className="text-[1.125rem] leading-relaxed text-[#2A211B]/75">Connecting products with the businesses that need them.</p>
            <ArrowLink href="/businesses" variant="ink" className="mt-7">Explore Our Businesses</ArrowLink>
          </Reveal>
        </div>

        {/* One dominant photograph, two supporting frames */}
        <div className="mt-12 grid gap-3 sm:gap-4 lg:mt-16 lg:h-[min(60vh,620px)] lg:grid-cols-12">
          <Reveal y={30} className="relative lg:col-span-8 lg:h-full">
            <ImageSlot asset={main} caption={false} parallax={3} className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full" sizes="(min-width:1024px) 62vw, 100vw" />
            <Caption>Stock prepared for distribution</Caption>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-4 lg:h-full lg:grid-cols-1 lg:grid-rows-2">
            {frames.map((f, i) => (
              <Reveal key={f.label} y={30} delay={0.1 + i * 0.08} className="relative lg:h-full lg:min-h-0">
                <ImageSlot asset={f.image} caption={false} interimTag={false} className="aspect-square lg:aspect-auto lg:h-full" sizes="(min-width:1024px) 31vw, 50vw" />
                <Caption>{f.label}</Caption>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** A quiet label in the corner of a frame. */
function Caption({ children }: { children: React.ReactNode }) {
  return (
    <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 pb-3 pt-10 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 sm:px-5 sm:pb-4">
      {children}
    </span>
  );
}

/** MSP Fresh Products — a small, product-led moment. */
export function FreshMoment() {
  const main = own("fresh-range", "MSP Fresh White Pepper Powder, Kashmiri Chilli Powder and Pickle Masala packs", "products");
  const detail = own("pack-soya", "MSP Fresh Soya Chunks Mini pack", "products");
  return (
    <section aria-labelledby="fresh-moment-title" className="relative overflow-hidden bg-[#FBF6EC] text-[#2D2418]">
      <div className="shell grid-12 items-center gap-y-12 py-24 lg:py-32">
        <div className="relative col-span-12 lg:col-span-6">
          <Reveal y={40}>
            <ImageSlot asset={main} parallax={5} className="aspect-[4/3]" sizes="(min-width:1024px) 50vw, 100vw" />
          </Reveal>
          <motion.div
            className="absolute -bottom-8 right-4 w-[38%] shadow-[0_30px_60px_-25px_rgba(45,36,24,0.55)] sm:right-8"
            initial={{ opacity: 0, y: 30, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          >
            <ImageSlot asset={detail} interimTag={false} caption={false} className="aspect-[4/5]" sizes="240px" />
          </motion.div>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <p className="eyebrow mb-6 flex items-center gap-3 text-[#C7541F]">
            <span aria-hidden className="h-px w-10 bg-current" />
            MSP Fresh Products
          </p>
          <SplitLines id="fresh-moment-title" lines={["Everyday essentials.", "The MSP way."]} className="font-display text-[clamp(2.25rem,4.6vw,4.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em]" lineClassName="[&:nth-child(2)]:text-[#C7541F]" />
          <Reveal className="mt-8">
            <ArrowLink href="/businesses/msp-fresh-products#products" variant="ink">View products</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Transport + cargo as one movement of goods: product → warehouse → truck → cargo → destination. */
const flow = ["Product", "Warehouse", "Truck", "Cargo", "Destination"];

export function MovementPair() {
  const pair = [
    {
      href: "/businesses/msp-store",
      category: "Transportation",
      name: "MSP Store",
      line: "Keeping the islands moving.",
      image: own("vans-pair", "Two MSP vans parked side by side", "road"),
      tint: "from-[#1A2024]/90",
    },
    {
      href: "/businesses/msp-cargo-service",
      category: "Cargo & Shipping",
      name: "MSP Cargo Service",
      line: "Mainland to island.",
      image: ph("craneLoading", "MSP cargo being loaded", "Cranes loading cargo", "containers"),
      tint: "from-[#051320]/90",
    },
  ];
  return (
    <section aria-labelledby="movement-title" className="relative bg-navy text-paper">
      <div className="shell py-24 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="movement-title" className="font-display text-[clamp(1.75rem,3.4vw,3rem)] font-extrabold uppercase leading-none tracking-[-0.03em]">
            Moving the goods.
          </h2>
          <motion.ol
            aria-label="How goods move"
            className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-paper/70"
            initial="h"
            whileInView="s"
            viewport={{ once: true }}
            variants={{ s: { transition: { staggerChildren: 0.15 } } }}
          >
            {flow.map((f, i) => (
              <motion.li key={f} className="flex items-center gap-3" variants={{ h: { opacity: 0, x: -8 }, s: { opacity: 1, x: 0 } }}>
                {i > 0 && <span aria-hidden className="text-sand">→</span>}
                <span className={i >= 2 && i <= 3 ? "text-paper" : ""}>{f}</span>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:gap-6">
          {pair.map((p, i) => (
            <Reveal as="li" key={p.href} delay={i * 0.12}>
              <Link href={p.href} data-cursor="Explore" className="group/arrow group relative block overflow-hidden">
                <div className="transition-transform duration-[1.4s] ease-[var(--ease-brand)] group-hover:scale-[1.05]">
                  <ImageSlot asset={p.image} seed={1500 + i} caption={false} className="aspect-[16/10]" sizes="(min-width:768px) 50vw, 100vw" />
                </div>
                <div aria-hidden className={`absolute inset-0 bg-gradient-to-t to-transparent ${p.tint}`} />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 lg:p-8">
                  <div>
                    <p className="eyebrow text-paper/70">{p.category}</p>
                    <p className="mt-3 font-display text-[clamp(1.6rem,2.6vw,2.5rem)] font-extrabold uppercase leading-none tracking-[-0.03em]">{p.name}</p>
                    <p className="mt-2 text-paper/80">{p.line}</p>
                  </div>
                  <span className="eyebrow inline-flex items-center gap-3">Explore <Arrow /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        <p className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-paper/60">
          Already shipping with MSP?
          <Link href="/track-consignment" className="eyebrow link-underline inline-flex items-center gap-2 pb-0.5 text-sand">
            Track your consignment <Arrow />
          </Link>
        </p>
      </div>
    </section>
  );
}

/** Closing statement — the story itself lives on /about. */
export function GroupClosing() {
  return (
    <section aria-labelledby="closing-title" className="bg-paper text-ink">
      <div className="shell flex flex-col justify-between gap-10 py-24 lg:flex-row lg:items-end lg:py-36">
        <div>
          <SplitLines id="closing-title" lines={["One group.", "Different businesses."]} className="display-lg uppercase" />
          <p className="mt-6 font-display text-lg font-semibold text-ink/70">Explore the businesses that make up MSP.</p>
        </div>
        <ArrowLink href="/businesses" variant="ink" className="self-start lg:self-end">
          Explore MSP
        </ArrowLink>
      </div>
    </section>
  );
}
