import Link from "next/link";
import { businesses, own, ph, type Business, type ImageAsset } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Arrow } from "@/components/ui/ArrowLink";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";

/**
 * Our businesses — an asymmetric editorial layout, not six identical cards.
 * Distribution and wholesale get the largest frames; transport, cargo and
 * finance follow at smaller scale. Each frame carries its business's own tint
 * so the six worlds are already distinct before you click.
 */
type Tile = { span: string; aspect: string; tint: string; image: ImageAsset; size: "lg" | "md" | "sm" };

const TILES: Record<Business["slug"], Tile> = {
  "m-sevugaperumal-and-sons": {
    span: "lg:col-span-7",
    aspect: "aspect-[4/3] lg:aspect-[7/6]",
    tint: "from-[#3A231A]/90 via-[#3A231A]/30",
    image: own("street-loading", "MSP team unloading stock from an MSP truck at a market street", "people"),
    size: "lg",
  },
  "msp-traders": {
    span: "lg:col-span-5 lg:mt-24",
    aspect: "aspect-[4/5]",
    tint: "from-[#2B2419]/90 via-[#2B2419]/30",
    image: own("market-unloading", "MSP team unloading rice sacks from a lorry at the market", "grain"),
    size: "lg",
  },
  "msp-fresh-products": {
    span: "lg:col-span-5",
    aspect: "aspect-[4/5] lg:aspect-[5/6]",
    tint: "from-[#5A2412]/85 via-[#5A2412]/25",
    image: own("fresh-chilli-scene", "MSP Fresh Kashmiri Chilli Powder pack with chillies and chilli powder", "products"),
    size: "md",
  },
  "msp-store": {
    span: "lg:col-span-4 lg:mt-16",
    aspect: "aspect-[4/5]",
    tint: "from-[#1A2024]/90 via-[#1A2024]/30",
    image: own("fleet-yard", "MSP vans and goods carriers lined up at the depot", "road"),
    size: "md",
  },
  "msp-cargo-service": {
    span: "lg:col-span-3 lg:mt-32",
    aspect: "aspect-[4/5] lg:aspect-[3/4]",
    tint: "from-[#051320]/90 via-[#051320]/30",
    image: ph("portDusk", "MSP Cargo Service — port", "Port cranes at dusk", "containers"),
    size: "sm",
  },
  "saptagiri-finance": {
    span: "lg:col-span-12",
    aspect: "aspect-[4/3] sm:aspect-[21/9] lg:aspect-[32/9]",
    tint: "from-[#0D141C]/95 via-[#0D141C]/65",
    image: ph("finNecklace", "Saptagiri Finance — valuables handled with care", "A gold necklace and earrings on a dark surface", "products"),
    size: "md",
  },
};

export function HomeBusinesses() {
  return (
    <section id="businesses" aria-labelledby="businesses-title" className="relative bg-paper text-ink">
      <div className="shell py-24 sm:py-32 lg:py-40">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-12 lg:col-span-8">
            <p className="eyebrow mb-6 flex items-center gap-3 text-rust">
              <span aria-hidden className="h-px w-10 bg-current" />
              The MSP Group
            </p>
            <SplitLines id="businesses-title" lines={["Our businesses."]} className="display-lg uppercase" />
          </div>
          <p className="col-span-12 font-display text-lg font-semibold text-ink/70 lg:col-span-4 lg:pb-3 lg:text-right">
            Different businesses. One growing network.
          </p>
        </div>

        <ul className="grid-12 mt-14 gap-y-4 lg:mt-20 lg:gap-y-6">
          {businesses.map((b, i) => (
            <Reveal as="li" key={b.slug} delay={(i % 3) * 0.08} className={cn("col-span-12", b.slug !== "saptagiri-finance" && "sm:col-span-6", TILES[b.slug].span)}>
              <BusinessTile b={b} t={TILES[b.slug]} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BusinessTile({ b, t }: { b: Business; t: Tile }) {
  const finance = b.slug === "saptagiri-finance";
  return (
    <Link
      href={`/businesses/${b.slug}`}
      data-cursor="Explore"
      aria-label={`${b.name} — ${b.card.category}. ${b.card.tagline}`}
      className="group/arrow group relative block overflow-hidden bg-navy text-paper"
    >
      <div className="transition-transform duration-[1.4s] ease-[var(--ease-brand)] group-hover:scale-[1.05]">
        <ImageSlot asset={t.image} caption={false} parallax={4} className={t.aspect} sizes="(min-width:1024px) 50vw, 100vw" />
      </div>
      <div aria-hidden className={cn("absolute inset-0 bg-gradient-to-t to-transparent", finance && "bg-gradient-to-r", t.tint)} />
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-x-100" style={{ background: b.accent }} />

      <div className={cn("absolute inset-0 flex flex-col justify-end p-6 lg:p-8", finance && "lg:justify-center")}>
        <p className="eyebrow flex items-center gap-3 text-paper/75">
          <span className="tabular-nums">{b.index}</span>
          <span aria-hidden className="h-px w-8" style={{ background: b.accent }} />
          {b.card.category}
        </p>
        <h3
          className={cn(
            "mt-4 font-display uppercase leading-[0.95] tracking-[-0.03em]",
            finance ? "font-light" : "font-extrabold",
            t.size === "lg" ? "text-[clamp(1.9rem,3.4vw,3.25rem)]" : t.size === "md" ? "text-[clamp(1.6rem,2.4vw,2.4rem)]" : "text-[clamp(1.5rem,1.9vw,1.9rem)]",
          )}
        >
          {b.name}
        </h3>
        <p className="mt-2 text-paper/80">{b.card.tagline}</p>
        <span className="eyebrow mt-6 inline-flex items-center gap-3">
          Explore <Arrow />
        </span>
      </div>
    </Link>
  );
}
