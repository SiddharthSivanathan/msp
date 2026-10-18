"use client";

import Image from "next/image";
import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import type { ImageAsset, Tone } from "@/lib/content";
import { features } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Motif } from "./Motif";
import { useRange } from "@/lib/motion";

const TONES: Record<Tone, { bg: string; ink: string }> = {
  navy: { bg: "linear-gradient(170deg, #17324a 0%, #0c2234 55%, #071a2b 100%)", ink: "#d8c7a3" },
  ocean: { bg: "linear-gradient(170deg, #1e4d6b 0%, #123b55 50%, #0a2538 100%)", ink: "#e8e2d6" },
  steel: { bg: "linear-gradient(170deg, #4b565d 0%, #2c3438 55%, #20272b 100%)", ink: "#e8e2d6" },
  sand: { bg: "linear-gradient(170deg, #b9a47a 0%, #8a7550 55%, #5a4a30 100%)", ink: "#f4f1ea" },
  paper: { bg: "linear-gradient(170deg, #f4f1ea 0%, #e8e2d6 60%, #d9d0bf 100%)", ink: "#20272b" },
  night: { bg: "linear-gradient(170deg, #1b1a17 0%, #0b0c0d 60%, #040506 100%)", ink: "#d8c39a" },
};

type Props = {
  asset: ImageAsset;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Subtle in-frame parallax drift. */
  parallax?: number;
  /** Show the shot brief on placeholders. */
  caption?: boolean;
  seed?: number;
  cursor?: string;
  /** Show the review-mode "Interim photo" tag (heroes place their own). */
  interimTag?: boolean;
};

/**
 * Every image on the site. Real photo when `asset.src` is set; otherwise an
 * art-directed placeholder showing the brief for the photograph that belongs here.
 * Both share the same grade so swapping in photography keeps the look consistent.
 */
export function ImageSlot({
  asset,
  className,
  sizes = "100vw",
  priority,
  parallax = 0,
  caption = true,
  seed = 1,
  cursor,
  interimTag = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useRange(scrollYProgress, [0, 1], [`${-parallax}%`, `${parallax}%`]);
  const tone = TONES[asset.tone ?? "navy"];

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden bg-navy", className)}
      data-cursor={cursor}
    >
      <motion.div className="absolute inset-0" style={parallax ? { y, scale: 1 + parallax / 50 } : undefined}>
        {asset.src ? (
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={asset.contain ? "object-contain" : asset.artwork ? "object-cover object-top" : "photo-grade object-cover"}
          />
        ) : (
          <div
            role="img"
            aria-label={asset.alt}
            className="grain absolute inset-0"
            style={{ background: tone.bg, color: tone.ink }}
          >
            <div className="absolute inset-0 opacity-45">
              <Motif name={asset.motif} seed={seed} />
            </div>
          </div>
        )}
      </motion.div>

      {/* Shared cinematic grade */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(4,17,29,0.45))]" />

      {asset.src && asset.interim && interimTag && features.showUnconfirmed && (
        <span
          aria-hidden
          title={`Interim photo — ${asset.credit ?? "stock"} / Unsplash. Brief for MSP photo: ${asset.direction}`}
          className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80"
        >
          Interim photo
        </span>
      )}

      {!asset.src && caption && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5"
          style={{ color: tone.ink }}
        >
          <p className="max-w-[28ch] text-[10px] leading-snug tracking-wide opacity-70">
            <span className="eyebrow mb-1 block !text-[9px] opacity-70">Photo brief</span>
            {asset.direction}
          </p>
        </div>
      )}
    </div>
  );
}
