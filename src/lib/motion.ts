"use client";

import { transform, useTransform, type MotionValue } from "motion/react";

/**
 * Range mapping for scroll-linked values. Uses the function form of useTransform
 * on purpose: Motion may otherwise hand opacity off to a native ScrollTimeline,
 * which mis-maps progress for sticky/pinned targets on some viewports.
 */
export function useRange<T extends number | string>(
  progress: MotionValue<number>,
  input: number[],
  output: T[],
) {
  return useTransform(progress, (v) => transform(v, input, output));
}
