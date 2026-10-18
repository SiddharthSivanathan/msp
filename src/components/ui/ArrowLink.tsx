import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "text" | "light" | "ink";

const styles: Record<Variant, string> = {
  solid: "bg-paper text-ink hover:bg-white px-6 h-12 sm:h-13",
  light: "bg-accent text-white hover:bg-[#3989d6] px-6 h-12 sm:h-13",
  ink: "bg-ink text-paper hover:bg-navy px-6 h-12 sm:h-13",
  outline: "border border-current/30 hover:border-current px-6 h-12 sm:h-13",
  text: "h-auto px-0",
};

/** The site's one CTA style: uppercase label + arrow that travels on hover. */
export function ArrowLink({
  href,
  children,
  variant = "text",
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      data-cursor="arrow"
      className={cn(
        "group/arrow eyebrow inline-flex items-center gap-3 whitespace-nowrap rounded-full !tracking-[0.18em] transition-colors duration-500",
        styles[variant],
        className,
      )}
      {...rest}
    >
      <span className={cn(variant === "text" && "link-underline pb-1")}>{children}</span>
      <Arrow />
    </Link>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-block h-3 w-4 overflow-hidden", className)} aria-hidden>
      {[0, 1].map((n) => (
        <svg
          key={n}
          viewBox="0 0 16 12"
          className={cn(
            "absolute inset-0 h-3 w-4 transition-transform duration-500 ease-[var(--ease-brand)]",
            n === 0 ? "group-hover/arrow:translate-x-full" : "-translate-x-full group-hover/arrow:translate-x-0",
          )}
        >
          <path d="M0 6h14M9.5 1.5 14 6l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      ))}
    </span>
  );
}
