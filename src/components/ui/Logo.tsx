import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The official MSP logo (client-supplied artwork): Ganesha emblem in a green
 * rounded frame with the red "M.S.P" wordmark. Used as-is — never redrawn,
 * recoloured or re-typed. The only processing applied to the supplied JPEG
 * (kept at /brand/msp-logo-original.jpg) is that the white corners OUTSIDE the
 * rounded frame were made transparent so the badge sits cleanly on dark and
 * light backgrounds. Always scale by height; width follows the 365:441 ratio.
 */
export const LOGO = { src: "/brand/msp-logo.png", width: 365, height: 441 } as const;

export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={LOGO.src}
      width={LOGO.width}
      height={LOGO.height}
      alt="MSP Group"
      priority={priority}
      sizes="80px"
      className={cn("block h-11 w-auto select-none", className)}
    />
  );
}

/**
 * Header/footer brand lockup: the official logo + the company name
 * "M Sevugaperumal & Sons" as a restrained two-line descriptor. The logo stays
 * the primary mark; the name inherits the surrounding text colour so it reads on
 * dark, light and photographic headers alike.
 */
export function BrandLockup({
  logoClassName,
  className,
  size = "md",
  priority = false,
}: {
  logoClassName?: string;
  className?: string;
  size?: "md" | "lg";
  priority?: boolean;
}) {
  return (
    <span className={cn("flex items-center", size === "lg" ? "gap-5" : "gap-3 sm:gap-4", className)}>
      <Logo priority={priority} className={logoClassName} />
      <span aria-hidden className={cn("w-px self-stretch bg-current opacity-25", size === "lg" ? "my-2" : "my-1.5")} />
      <span
        className={cn(
          "font-display font-bold uppercase leading-[1.15]",
          size === "lg" ? "text-base tracking-[0.12em] sm:text-lg" : "text-[0.7rem] tracking-[0.12em] sm:text-[0.8rem] xl:text-[0.92rem]",
        )}
      >
        <span className="block">M Sevugaperumal</span>
        <span className="block opacity-80">&amp; Sons</span>
      </span>
    </span>
  );
}
