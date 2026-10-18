import Link from "next/link";
import { businesses, nextBusiness, type Business } from "@/lib/businesses";
import { Arrow } from "@/components/ui/ArrowLink";
import { ImageSlot } from "@/components/ui/ImageSlot";

/** "Part of the MSP Business Network" — the other four businesses. */
export function RelatedBusinesses({ b }: { b: Business }) {
  const others = businesses.filter((x) => x.slug !== b.slug);
  return (
    <section aria-labelledby="related-title" className="bg-navy text-paper">
      <div className="shell py-24 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="related-title" className="font-display text-[clamp(1.75rem,3.4vw,3rem)] font-semibold uppercase leading-none tracking-[-0.045em]">
            Part of the MSP Business Network
          </h2>
          <p className="eyebrow text-paper/45">One group. Six businesses.</p>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/businesses/${o.slug}`} data-cursor="Explore" className="group/arrow group block">
                <div className="relative overflow-hidden">
                  <div className="transition-transform duration-[1.2s] ease-[var(--ease-brand)] group-hover:scale-[1.05]">
                    <ImageSlot asset={o.image} seed={Number(o.index) * 13} caption={false} className="aspect-[4/5]" sizes="(min-width:1024px) 25vw, 50vw" />
                  </div>
                  <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: o.accent }} />
                </div>
                <p className="eyebrow mt-4 text-paper/45">
                  {o.index} — {o.category}
                </p>
                <p className="mt-2 flex items-center justify-between gap-3 font-display text-lg font-semibold uppercase tracking-[-0.03em]">
                  {o.name}
                  <Arrow />
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Store → Traders → Cargo → Sons → Finance → Back to MSP. */
export function NextBusiness({ b }: { b: Business }) {
  const next = nextBusiness(b.slug);
  const href = next ? `/businesses/${next.slug}` : "/";
  return (
    <Link href={href} data-cursor="Explore" className="group/arrow block border-t border-white/10 bg-navy text-paper transition-colors duration-700 hover:bg-navy-deep">
      <div className="shell flex items-end justify-between gap-6 py-16 lg:py-24">
        <div>
          <p className="eyebrow mb-5 text-paper/45">{next ? `Next business — ${next.index}` : "You’ve seen all six"}</p>
          <p className="display-md uppercase">{next ? next.name : "Back to MSP"}</p>
          {next && <p className="mt-3 text-paper/55">{next.positioning}</p>}
        </div>
        <span className="mb-3 text-paper/70 transition-colors group-hover/arrow:text-paper">
          <svg width="44" height="30" viewBox="0 0 16 12" aria-hidden className="transition-transform duration-500 group-hover/arrow:translate-x-2">
            <path d="M0 6h14M9.5 1.5 14 6l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
