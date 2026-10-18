"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { businesses } from "@/lib/content";
import { EASE, cn } from "@/lib/utils";
import { Arrow } from "@/components/ui/ArrowLink";

/** Desktop "Businesses" nav item with a panel listing the six dedicated pages. */
export function BusinessesMenu() {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrap = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  /** Opened by hover — the first click should keep it open, not toggle it shut. */
  const viaHover = useRef(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const show = () => {
    clearTimeout(timer.current);
    if (!open) viaHover.current = true;
    setOpen(true);
  };
  const hide = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      viaHover.current = false;
      setOpen(false);
    }, 160);
  };

  return (
    <div
      ref={wrap}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onBlur={(e) => !wrap.current?.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          if (viaHover.current) viaHover.current = false;
          else setOpen((o) => !o);
        }}
        className="flex items-center gap-1.5 pb-1 text-[0.8125rem] font-semibold opacity-80 transition-opacity hover:opacity-100"
      >
        Businesses
        <svg width="9" height="6" viewBox="0 0 9 6" aria-hidden className={cn("transition-transform duration-500", open && "rotate-180")}>
          <path d="M1 1l3.5 3.5L8 1" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            className="absolute left-1/2 top-full z-50 w-[min(760px,90vw)] -translate-x-1/2 pt-5"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="border border-white/10 bg-navy-deep p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
              <ul className="grid grid-cols-2 gap-1">
                {businesses.map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={`/businesses/${b.slug}`}
                      onClick={() => setOpen(false)}
                      className="group/arrow flex items-start justify-between gap-4 p-4 transition-colors duration-300 hover:bg-white/[0.05]"
                    >
                      <span>
                        <span className="eyebrow flex items-center gap-2 !text-[9px] text-paper/45">
                          <span className="size-1.5 rounded-full" style={{ background: b.accent }} />
                          {b.index} — {b.category}
                        </span>
                        <span className="mt-2 block font-display text-lg font-semibold uppercase tracking-[-0.03em] text-paper">{b.name}</span>
                        <span className="mt-1 block text-[0.8rem] text-paper/50">{b.positioning}</span>
                      </span>
                      <Arrow className="mt-1 text-paper/60" />
                    </Link>
                  </li>
                ))}
                <li className="col-span-2">
                  <Link
                    href="/businesses"
                    onClick={() => setOpen(false)}
                    className="group/arrow flex h-full flex-col justify-between bg-white/[0.04] p-4 transition-colors hover:bg-white/[0.08]"
                  >
                    <span className="eyebrow !text-[9px] text-sand">The MSP Business Network</span>
                    <span className="mt-6 flex items-center justify-between font-display text-lg font-semibold uppercase tracking-[-0.03em] text-paper">
                      One group <Arrow />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
