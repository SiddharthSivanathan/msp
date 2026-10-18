import type { Business, Item } from "@/lib/businesses";
import { cn } from "@/lib/utils";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead, StatusBadge, visible } from "./shared";

type Variant = "rows" | "categories" | "tiles" | "slots";

/**
 * What the business does / sells / moves. Renders only items allowed by the
 * confirmation status (see `visible`). Returns nothing if no item qualifies.
 */
export function OfferBlock({ b, variant, surface = "alt", id }: { b: Business; variant: Variant; surface?: "bg" | "alt"; id?: string }) {
  if (!b.offer) return null;
  const items = visible(b.offer.items);
  if (!items.length) return null;

  return (
    <section
      id={id}
      aria-labelledby="offer-title"
      className={cn("relative text-(--b-ink)", surface === "alt" ? "bg-(--b-alt)" : "bg-(--b-bg)")}
    >
      <div className="shell py-28 sm:py-36 lg:py-44">
        <SectionHead id="offer-title" eyebrow={b.offer.eyebrow} lines={[b.offer.heading]} size="md" className="max-w-4xl" />
        <div className="mt-16 lg:mt-24">
          {variant === "rows" && <Rows items={items} />}
          {variant === "categories" && <Categories items={items} />}
          {variant === "tiles" && <Tiles items={items} />}
          {variant === "slots" && <Slots items={items} />}
        </div>
      </div>
    </section>
  );
}

function Rows({ items }: { items: Item[] }) {
  return (
    <ol className="border-t border-current/15">
      {items.map((it, i) => (
        <Reveal as="li" key={it.title + i} delay={i * 0.06} className="group grid grid-cols-12 gap-x-4 gap-y-3 border-b border-current/15 py-8 lg:py-10">
          <span className="eyebrow col-span-2 pt-2 tabular-nums opacity-40 lg:col-span-1">0{i + 1}</span>
          <h3 className="col-span-10 font-display text-[clamp(1.5rem,3vw,2.75rem)] font-semibold uppercase leading-none tracking-[-0.045em] transition-transform duration-700 ease-[var(--ease-brand)] group-hover:translate-x-2 lg:col-span-5">
            {it.title}
          </h3>
          <div className="col-span-10 col-start-3 flex flex-col items-start gap-3 lg:col-span-5 lg:col-start-8">
            {it.body && <p className="text-[1rem] leading-relaxed opacity-65">{it.body}</p>}
            <StatusBadge status={it.status} />
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

function Categories({ items }: { items: Item[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-3 lg:gap-6">
      {items.map((it, i) => (
        <Reveal as="li" key={it.title} delay={i * 0.12} className={cn(i === 1 && "md:mt-16", i === 2 && "md:mt-32")}>
          <article className="group">
            {it.image && (
              <div className="overflow-hidden">
                <div className="transition-transform duration-[1.4s] ease-[var(--ease-brand)] group-hover:scale-[1.04]">
                  <ImageSlot asset={it.image} seed={300 + i} parallax={4} className="aspect-[4/5]" sizes="(min-width:768px) 33vw, 100vw" />
                </div>
              </div>
            )}
            <div className="mt-6 flex items-start justify-between gap-4 border-t border-current/15 pt-5">
              <div>
                <p className="eyebrow mb-3 tabular-nums opacity-40">0{i + 1}</p>
                <h3 className="font-display text-3xl font-semibold uppercase tracking-[-0.045em]">{it.title}</h3>
                {it.body && <p className={cn("mt-2 text-[0.95rem] leading-relaxed", it.status === "placeholder" ? "opacity-40" : "opacity-65")}>{it.body}</p>}
              </div>
              <StatusBadge status={it.status} className="mt-7" />
            </div>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}

function Tiles({ items }: { items: Item[] }) {
  return (
    <ul className="grid grid-cols-1 gap-px overflow-hidden border border-current/15 bg-current/15 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <Reveal as="li" key={it.title} delay={(i % 3) * 0.08} y={12} className="group relative flex min-h-48 flex-col justify-between bg-(--b-alt) p-6 transition-colors duration-700 hover:bg-(--b-bg) lg:min-h-64 lg:p-8">
          <div className="flex items-start justify-between">
            <span className="eyebrow tabular-nums opacity-40">0{i + 1}</span>
            <StatusBadge status={it.status} />
          </div>
          <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-semibold uppercase leading-none tracking-[-0.045em]">{it.title}</h3>
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-(--b-accent) transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-x-100" />
        </Reveal>
      ))}
    </ul>
  );
}

function Slots({ items }: { items: Item[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-3 lg:gap-6">
      {items.map((it, i) => (
        <Reveal as="li" key={i} delay={i * 0.1} className="flex min-h-64 flex-col justify-between border border-dashed border-current/25 p-7 lg:min-h-80">
          <span className="eyebrow tabular-nums text-(--b-accent)">0{i + 1}</span>
          <div>
            <h3 className="b-heading text-2xl leading-tight opacity-50">{it.title}</h3>
            {it.body && <p className="mt-3 text-sm opacity-40">{it.body}</p>}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
