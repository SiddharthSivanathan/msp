"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Subtle desktop cursor. Elements opt in with `data-cursor="View" | "Explore" | "arrow"`.
 * Only mounts for fine pointers without reduced-motion; the native cursor is
 * hidden only once this is running (html.has-cursor).
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 34, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 380, damping: 34, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a, button");
      if (!t) return setLabel(null);
      setLabel(t.dataset.cursor ?? "link");
    };
    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const hasText = label && label !== "link" && label !== "arrow";
  const size = hasText ? 84 : label === "arrow" ? 44 : label === "link" ? 36 : 10;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy"
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.85 : 1,
          backgroundColor: label === "link" ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)",
          borderWidth: label === "link" ? 1 : 0,
        }}
        style={{ borderColor: "white", borderStyle: "solid" }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        <AnimatePresence mode="wait">
          {hasText && (
            <motion.span
              key={label}
              className="eyebrow text-[10px] text-black"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {label}
            </motion.span>
          )}
          {label === "arrow" && (
            <motion.svg
              key="arrow"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="black" strokeWidth="1.5" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
