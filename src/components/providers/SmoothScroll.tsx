"use client";

import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { useEffect } from "react";

/**
 * Lenis smooth scroll (skipped entirely for reduced-motion users) plus a global
 * MotionConfig that honours the OS reduced-motion preference.
 * In-page anchor links are routed through Lenis so jumps stay smooth.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.25, easing: (t) => 1 - Math.pow(1 - t, 4) });
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
      if (!a) return;
      const url = new URL(a.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const el = document.querySelector(url.hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: 0 });
      history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    // Open/close of overlays can pause scrolling via this event.
    const onLock = (e: Event) => ((e as CustomEvent<boolean>).detail ? lenis.stop() : lenis.start());
    window.addEventListener("msp:scroll-lock", onLock);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      window.removeEventListener("msp:scroll-lock", onLock);
      lenis.destroy();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function setScrollLock(locked: boolean) {
  window.dispatchEvent(new CustomEvent("msp:scroll-lock", { detail: locked }));
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
