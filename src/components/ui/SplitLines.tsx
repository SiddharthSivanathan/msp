"use client";

import { motion } from "motion/react";
import { EASE, cn } from "@/lib/utils";

type Props = {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** "mount" plays immediately (hero); "view" waits until scrolled into view. */
  trigger?: "mount" | "view";
  id?: string;
};

/** Masked line-by-line headline reveal. Text stays a single accessible string. */
export function SplitLines({
  lines,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.12,
  trigger = "view",
  id,
}: Props) {
  const Tag = as;
  const play = trigger === "mount" ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <Tag id={id} className={className} aria-label={lines.join(" ")}>
      <motion.span className="block" initial="hidden" {...play} aria-hidden>
        {lines.map((line, i) => (
          <span key={i} className={cn("block overflow-hidden pb-[0.06em]", lineClassName)}>
            <motion.span
              className="block will-change-transform"
              variants={{
                hidden: { y: "105%" },
                show: { y: "0%", transition: { duration: 1.25, ease: EASE, delay: delay + i * stagger } },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
