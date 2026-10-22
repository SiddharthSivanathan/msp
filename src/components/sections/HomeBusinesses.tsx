import Link from "next/link";
import { businesses, own, ph, type Business, type ImageAsset } from "@/lib/content";
import { heroSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Arrow } from "@/components/ui/ArrowLink";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Our businesses as an editorial index. The core of the group, distribution
 * and wholesale, leads in two wide frames; the other four follow in an even row
 * beneath. Photographs are shown clean (no tints) and the words sit below them
 * in the hero's serif, so the section reads as one calm, aligned composition.
 */
const IMAGES: Record<Business["slug"], ImageAsset> = {
  "m-sevugaperumal-and-sons": own("street-loading", "Stock being unloaded from a delivery truck at a market street", "people"),
  "msp-traders": own("warehouse-loading", "Rice and grocery sacks being loaded for dispatch in a wholesale warehouse", "warehouse"),
  "msp-fresh-products": own("fresh-range", "MSP Fresh White Pepper Powder, Kashmiri Chilli Powder and Pickle Masala packs", "products"),
  "msp-store": own("fleet-yard", "Goods vehicles lined up at the depot", "road"),
  "msp-cargo-service": own("lorry-inside", "Cargo sacks being loaded into a goods lorry", "people"),
  "saptagiri-finance": ph("finBanglesRed", "Saptagiri Finance — valuables handled with care", "Gold bangles on a red cloth", "products"),
};

const LEAD = new Set<Business["slug"]>(["m-sevugaperumal-and-sons", "msp-traders"]);
const serif = heroSerif.className;

export function HomeBusinesses() {
  return (
    <section id="businesses" aria-labelledby="businesses-title" className="relative bg-paper text-ink">
      <div className="shell py-20 sm:py-28 lg:py-32">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-12 lg:col-span-7">
            <p className="eyebrow mb-6 flex items-center gap-3 text-rust">
              <span aria-hidden className="h-px w-10 bg-current" />
              The MSP Group
            </p>
            <h2 id="businesses-title" className={cn(serif, "text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.03em]")}>
              Our businesses.
            </h2>
          </div>
          <p className="col-span-12 max-w-sm text-[1.05rem] leading-relaxed text-ink/65 lg:col-span-4 lg:col-start-9 lg:pb-2">
            Six businesses, each serving a different need — one group behind them.
          </p>
        </div>

        <ul className="mt-12 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-x-5 lg:gap-y-14">
          {businesses.map((b, i) => {
            const lead = LEAD.has(b.slug);
            return (
              <Reveal as="li" key={b.slug} y={24} delay={(i % 4) * 0.07} className={lead ? "sm:col-span-1 lg:col-span-6" : "lg:col-span-3"}>
                <BusinessEntry b={b} lead={lead} />
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function BusinessEntry({ b, lead }: { b: Business; lead: boolean }) {
  return (
    <Link href={`/businesses/${b.slug}`} data-cursor="Explore" className="group/arrow group block">
      <div className="overflow-hidden">
        <div className="transition-transform duration-[1.2s] ease-[var(--ease-brand)] group-hover:scale-[1.04]">
          <ImageSlot
            asset={IMAGES[b.slug]}
            caption={false}
            interimTag={false}
            className={lead ? "aspect-[4/3] lg:aspect-[16/10]" : "aspect-[4/3] lg:aspect-[4/5]"}
            sizes={lead ? "(min-width:1024px) 50vw, (min-width:640px) 50vw, 100vw" : "(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"}
          />
        </div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4 border-t border-ink/15 pt-4">
        <div>
          <p className="eyebrow tabular-nums text-ink/45">
            {b.index} · {b.card.category}
          </p>
          <h3
            className={cn(
              serif,
              "mt-2 font-medium leading-tight tracking-[-0.015em] transition-colors duration-500 group-hover:text-rust",
              lead ? "text-[clamp(1.6rem,2.4vw,2.25rem)]" : "text-[clamp(1.35rem,1.6vw,1.6rem)]",
            )}
          >
            {b.name}
          </h3>
          <p className="mt-1.5 text-ink/60">{b.card.tagline}</p>
        </div>
        <span className="mt-1 shrink-0 text-ink/50 transition-colors group-hover:text-rust" aria-hidden>
          <Arrow />
        </span>
      </div>
    </Link>
  );
}
