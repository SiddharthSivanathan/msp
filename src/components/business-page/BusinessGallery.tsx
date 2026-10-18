"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import type { Business } from "@/lib/businesses";
import { cn } from "@/lib/utils";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "./shared";

const SPANS = ["lg:col-span-7 aspect-[4/3]", "lg:col-span-5 aspect-[4/5]", "lg:col-span-4 aspect-square", "lg:col-span-4 aspect-square", "lg:col-span-4 aspect-square", "lg:col-span-6 aspect-[4/3]"];

export function BusinessGallery({ b, surface = "alt" }: { b: Business; surface?: "bg" | "alt" }) {
  const [open, setOpen] = useState<number | null>(null);
  if (!b.gallery.length) return null;
  return (
    <section aria-labelledby="bgallery-title" className={cn("relative text-(--b-ink)", surface === "alt" ? "bg-(--b-alt)" : "bg-(--b-bg)")}>
      <div className="shell py-28 sm:py-36 lg:py-44">
        <SectionHead id="bgallery-title" eyebrow={`${b.name} gallery`} lines={["On the ground."]} size="md" />
        <ul className="mt-14 grid grid-cols-2 gap-3 lg:mt-20 lg:grid-cols-12 lg:gap-4">
          {b.gallery.map((g, i) => (
            <Reveal as="li" key={i} delay={(i % 3) * 0.08} className={cn(i === 0 ? "col-span-2" : "col-span-1", SPANS[i % SPANS.length].split(" ")[0])}>
              <button type="button" data-cursor="View" onClick={() => setOpen(i)} aria-label={`Open image: ${g.alt}`} className="group block w-full overflow-hidden">
                <div className="transition-transform duration-[1.2s] ease-[var(--ease-brand)] group-hover:scale-[1.04]">
                  <ImageSlot asset={g} seed={600 + i} caption={false} className={SPANS[i % SPANS.length].split(" ")[1]} sizes="(min-width:1024px) 50vw, 50vw" />
                </div>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
      <AnimatePresence>{open !== null && <Lightbox items={b.gallery} index={open} onChange={setOpen} seedBase={600} />}</AnimatePresence>
    </section>
  );
}
