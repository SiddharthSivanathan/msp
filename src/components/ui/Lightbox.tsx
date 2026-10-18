"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import type { ImageAsset } from "@/lib/media";
import { EASE } from "@/lib/utils";
import { setScrollLock } from "@/components/providers/SmoothScroll";
import { ImageSlot } from "./ImageSlot";

/** Fullscreen viewer: ←/→ to browse, Esc to close, focus returns to the opener. */
export function Lightbox({
  items,
  index,
  onChange,
  seedBase = 0,
}: {
  items: (ImageAsset & { category?: string })[];
  index: number;
  onChange: (i: number | null) => void;
  seedBase?: number;
}) {
  const item = items[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);
  const go = useCallback((d: number) => onChange((index + d + items.length) % items.length), [index, items.length, onChange]);

  useEffect(() => {
    opener.current = document.activeElement;
    setScrollLock(true);
    closeRef.current?.focus();
    return () => {
      setScrollLock(false);
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onChange]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[90] flex flex-col bg-navy-deep/[0.97] text-paper backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="shell flex h-20 shrink-0 items-center justify-between">
        <p className="eyebrow tabular-nums text-paper/50">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}{item.category ? ` — ${item.category}` : ""}
        </p>
        <button ref={closeRef} type="button" onClick={() => onChange(null)} className="eyebrow flex items-center gap-3 rounded-full border border-white/20 px-4 py-2.5 hover:border-white/50">
          Close <span aria-hidden>✕</span>
        </button>
      </div>

      <div className="shell relative flex min-h-0 flex-1 items-center justify-center pb-6">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            className="flex h-full w-full max-w-6xl flex-col"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <ImageSlot asset={item} seed={seedBase + index} className="min-h-0 flex-1" sizes="90vw" />
            <figcaption className="mt-4 text-sm text-paper/60">{item.alt}</figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="shell flex h-20 shrink-0 items-center justify-between border-t border-white/10">
        <button type="button" onClick={() => go(-1)} className="eyebrow py-3 text-paper/70 hover:text-paper">
          ← Previous
        </button>
        <button type="button" onClick={() => go(1)} className="eyebrow py-3 text-paper/70 hover:text-paper">
          Next →
        </button>
      </div>
    </motion.div>
  );
}
