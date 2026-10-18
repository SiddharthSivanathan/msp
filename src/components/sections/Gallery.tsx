"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { gallery, galleryCategories, type GalleryItem } from "@/lib/content";
import { EASE, cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Lightbox } from "@/components/ui/Lightbox";
import { SplitLines } from "@/components/ui/SplitLines";

const RATIO: Record<GalleryItem["ratio"], string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  square: "aspect-square",
};

export function Gallery() {
  const [filter, setFilter] = useState<(typeof galleryCategories)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const items = filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative bg-navy text-paper">
      <div className="shell py-28 sm:py-36 lg:py-44">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <Eyebrow className="mb-8 text-sand">Gallery</Eyebrow>
            <SplitLines id="gallery-title" lines={["Seen on", "the ground."]} className="display-lg uppercase" />
          </div>
          <div role="group" aria-label="Filter gallery" className="-mx-4 flex max-w-full gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 lg:max-w-xl lg:justify-end">
            {galleryCategories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
                className={cn(
                  "eyebrow shrink-0 rounded-full border px-4 py-2.5 !tracking-[0.16em] transition-colors duration-500",
                  filter === c ? "border-paper bg-paper text-ink" : "border-white/15 text-paper/60 hover:border-white/40 hover:text-paper",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.ul layout className="mt-14 columns-1 gap-3 xs:columns-2 lg:mt-20 lg:columns-3 lg:gap-5">
          <AnimatePresence mode="popLayout">
            {items.map((item) => {
              const index = gallery.indexOf(item);
              return (
                <motion.li
                  layout
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="mb-3 break-inside-avoid lg:mb-5"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(index)}
                    data-cursor="View"
                    aria-label={`Open image: ${item.alt}`}
                    className="group relative block w-full overflow-hidden text-left"
                  >
                    <div className="transition-transform duration-[1.2s] ease-[var(--ease-brand)] group-hover:scale-[1.04]">
                      <ImageSlot asset={item} seed={120 + index} caption={false} className={RATIO[item.ratio]} sizes="(min-width:1024px) 33vw, 50vw" />
                    </div>
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-navy-deep/90 to-transparent p-4 pt-12 opacity-100 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
                      <span className="text-sm text-paper/90">{item.direction}</span>
                      <span className="eyebrow !text-[9px] text-paper/50">{item.category}</span>
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>{open !== null && <Lightbox items={gallery} index={open} onChange={setOpen} seedBase={120} />}</AnimatePresence>
    </section>
  );
}
