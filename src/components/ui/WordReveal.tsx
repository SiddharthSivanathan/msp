"use client";

import { motion, useScroll, type MotionValue } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useRange } from "@/lib/motion";

/** Scroll-linked word-by-word illumination for large editorial statements. */
export function WordReveal({
  text,
  className,
  as = "h2",
  dim = 0.14,
}: {
  text: string | string[];
  className?: string;
  as?: "h2" | "p";
  dim?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 55%"] });
  const lines = Array.isArray(text) ? text : [text];
  const total = lines.reduce((n, l) => n + l.split(" ").length, 0);
  let i = 0;
  const Tag = as;

  return (
    <Tag ref={ref} className={className} aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.split(" ").map((word) => {
            const start = i / total;
            const end = (i + 1) / total;
            i++;
            return (
              <Word key={`${li}-${word}-${i}`} progress={scrollYProgress} range={[start, end]} dim={dim}>
                {word}
              </Word>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

function Word({
  children,
  progress,
  range,
  dim,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  dim: number;
}) {
  const opacity = useRange(progress, range, [dim, 1]);
  const y = useRange(progress, range, ["0.18em", "0em"]);
  return (
    <motion.span className={cn("mr-[0.22em] inline-block")} style={{ opacity, y }}>
      {children}
    </motion.span>
  );
}
