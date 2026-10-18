"use client";

import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import type { ImageAsset } from "@/lib/media";
import { useRange } from "@/lib/motion";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SplitLines } from "@/components/ui/SplitLines";

/** Products in motion — a strip of photography that slides with the scroll. */
export function ProductStrip({ heading, images }: { heading: string[]; images: ImageAsset[] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useRange(scrollYProgress, [0, 1], ["6%", "-38%"]);
  return (
    <section ref={ref} aria-labelledby="strip-title" className="relative overflow-hidden bg-(--b-bg) py-28 text-(--b-ink) lg:py-40">
      <div className="shell">
        <SplitLines id="strip-title" lines={heading} className="b-heading text-[clamp(2.5rem,8vw,8rem)] leading-[0.9]" />
      </div>
      <motion.ul style={{ x }} className="mt-14 flex w-max gap-4 lg:mt-20">
        {images.map((im, i) => (
          <li key={i} className={i % 2 ? "w-[70vw] sm:w-[42vw] lg:w-[30vw]" : "w-[80vw] sm:w-[52vw] lg:w-[38vw]"}>
            <ImageSlot asset={im} seed={950 + i} cursor="View" className={i % 2 ? "aspect-[4/5]" : "aspect-[4/3]"} sizes="40vw" />
          </li>
        ))}
      </motion.ul>
    </section>
  );
}
