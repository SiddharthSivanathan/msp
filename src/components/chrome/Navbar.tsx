"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { businesses, contact, nav, PLACEHOLDER } from "@/lib/content";
import { EASE, cn } from "@/lib/utils";
import { Arrow, ArrowLink } from "@/components/ui/ArrowLink";
import { BrandLockup } from "@/components/ui/Logo";
import { setScrollLock } from "@/components/providers/SmoothScroll";
import { BusinessesMenu } from "./BusinessesMenu";

const LIGHT_HERO = ["/about", "/businesses/msp-traders", "/businesses/msp-fresh-products"];

export function Navbar() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const toggleRef = useRef<HTMLButtonElement>(null);
  /** Over photography the bar is transparent; once scrolled it becomes a clean off-white bar. */
  const light = compact && !open;
  /** Pages whose hero is light (off-white) need dark text before scrolling. */
  const pathname = usePathname();
  const lightHero = !open && LIGHT_HERO.includes(pathname);

  useMotionValueEvent(scrollY, "change", (v) => setCompact(v > 48));

  useEffect(() => {
    setScrollLock(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <>
      <a
        href="#main"
        className="eyebrow fixed left-4 top-4 z-[80] -translate-y-24 rounded-full bg-paper px-4 py-3 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.35 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-500",
          light ? "border-b border-ink/10 bg-paper text-ink" : lightHero ? "border-b border-transparent text-ink" : "border-b border-transparent text-paper",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "shell flex items-center justify-between transition-[height] duration-700 ease-[var(--ease-brand)]",
            compact ? "h-16" : "h-20 lg:h-24",
          )}
        >
          <Link href="/" aria-label="MSP — M Sevugaperumal & Sons — home" className="relative z-10" onClick={() => open && close()}>
            <motion.span
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.1 }}
            >
              <BrandLockup priority logoClassName={cn("transition-[height] duration-700 ease-[var(--ease-brand)]", compact && !open ? "h-11" : "h-12 lg:h-16")} />
            </motion.span>
          </Link>

          <ul className="hidden items-center gap-5 lg:flex xl:gap-8 2xl:gap-9">
            {nav.map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.5 + i * 0.06 }}
              >
                {item.label === "Businesses" ? (
                  <BusinessesMenu />
                ) : item.href === "/track-consignment" ? (
                  <Link href={item.href} className="link-underline flex items-center gap-2 pb-1 text-[0.8125rem] font-bold">
                    <span aria-hidden className="size-1.5 rounded-full bg-rust" />
                    {item.label}
                  </Link>
                ) : (
                  <Link href={item.href} className="link-underline pb-1 text-[0.8125rem] font-semibold opacity-80 transition-opacity hover:opacity-100">
                    {item.label}
                  </Link>
                )}
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block">
              <ArrowLink href="/contact" variant={light || lightHero ? "ink" : "outline"} className="!h-10 !px-5">
                Enquire
              </ArrowLink>
            </span>

            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className={cn("relative z-10 grid size-11 place-items-center rounded-full border border-current/25 lg:hidden", open && "text-paper")}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-500",
                    open && "translate-y-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-500",
                    open && "-translate-y-1.5 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-lenis-prevent
            className="fixed inset-0 z-40 overflow-y-auto bg-navy-deep text-paper lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="shell flex min-h-full flex-col pb-10 pt-28">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}>
                <Link
                  href="/track-consignment"
                  onClick={() => setOpen(false)}
                  className="group/arrow mb-6 flex items-center justify-between bg-sand px-5 py-5 text-ink"
                >
                  <span>
                    <span className="eyebrow block !text-[10px] text-ink/60">MSP Cargo Service</span>
                    <span className="mt-1 block font-display text-xl font-extrabold uppercase">Track consignment</span>
                  </span>
                  <Arrow />
                </Link>
              </motion.div>
              <ul className="flex flex-col">
                {nav.filter((n) => n.href !== "/track-consignment").map((item, i) => (
                  <motion.li
                    key={item.href}
                    className="border-b border-white/10"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group/arrow flex items-center justify-between py-5 font-display text-[2rem] font-semibold tracking-[-0.04em] xs:text-4xl"
                    >
                      <span>{item.label}</span>
                      <span className="flex items-center gap-3 text-paper/40">
                        <span className="eyebrow tabular-nums">0{i + 1}</span>
                        <Arrow />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="mt-10 grid gap-8 xs:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div>
                  <p className="eyebrow mb-4 text-paper/45">Businesses</p>
                  <ul className="space-y-2.5 text-[0.95rem] text-paper/80">
                    {businesses.map((b) => (
                      <li key={b.slug}>
                        <Link href={`/businesses/${b.slug}`} onClick={() => setOpen(false)}>
                          {b.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow mb-4 text-paper/45">Contact</p>
                  <p className="text-[0.95rem] text-paper/80">{contact.phone ?? PLACEHOLDER}</p>
                  <p className="mt-2 text-[0.95rem] text-paper/80">{contact.email ?? PLACEHOLDER}</p>
                </div>
              </motion.div>

              <div className="mt-auto pt-12">
                <ArrowLink href="/contact" variant="solid" className="w-full justify-between" onClick={() => setOpen(false)}>
                  Enquire
                </ArrowLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
