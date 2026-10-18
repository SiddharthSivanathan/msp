import Image from "next/image";
import type { Partner } from "@/lib/content";

/** Official logo once supplied; a restrained typographic wordmark until then. */
export function BrandLogo({ partner }: { partner: Partner }) {
  if (partner.logo) {
    return (
      <Image
        src={partner.logo}
        alt={`${partner.name} logo`}
        width={220}
        height={80}
        className="h-16 w-auto object-contain sm:h-20"
      />
    );
  }
  return (
    <span className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold uppercase tracking-[-0.04em] text-ink/80 transition-colors duration-500 group-hover:text-ink">
      {partner.name}
    </span>
  );
}
