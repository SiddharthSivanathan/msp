import type { Business } from "@/lib/businesses";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SplitLines } from "@/components/ui/SplitLines";
import { StatusBadge, visible } from "./shared";

/**
 * Wholesale categories as stacked full-screen panels — each category slides
 * over the last as you scroll, like moving down a warehouse aisle.
 */
export function CategoryStack({ b }: { b: Business }) {
  const items = visible(b.offer?.items ?? []);
  if (!items.length) return null;
  return (
    <section id="products" aria-labelledby="cat-title" className="relative bg-(--b-bg) text-(--b-ink)">
      <div className="shell pb-16 pt-28 sm:pt-36 lg:pt-44">
        <p className="eyebrow mb-8 flex items-center gap-3 text-(--b-accent)">
          <span aria-hidden className="h-px w-8 bg-current opacity-60" />
          {b.offer?.eyebrow}
        </p>
        <SplitLines id="cat-title" lines={["What we", "supply."]} className="b-heading text-[clamp(2.25rem,6vw,6rem)] leading-[0.95]" />
      </div>
      <ol>
        {items.map((it, i) => (
          <li key={it.title} className="sticky top-0 h-[100svh] overflow-hidden" style={{ zIndex: i + 1 }}>
            {it.image && <ImageSlot asset={it.image} seed={300 + i} caption={false} className="!absolute inset-0 h-full" sizes="100vw" />}
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(43,36,25,0.15),rgba(43,36,25,0.85))]" />
            <div className="shell relative flex h-full flex-col justify-end pb-16 text-[#F4EEE2] lg:pb-24">
              <p className="font-display text-[clamp(4rem,10vw,9rem)] font-extrabold leading-none tracking-[-0.05em] text-[#F4EEE2]/25">0{i + 1}</p>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <h3 className="b-heading text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.9]">{it.title}</h3>
                  {it.body && <p className="mt-4 max-w-md text-lg opacity-85">{it.body}</p>}
                </div>
                <StatusBadge status={it.status} className="!opacity-90" />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
