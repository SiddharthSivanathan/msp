import Link from "next/link";
import { businesses, type Business } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Arrow, ArrowLink } from "@/components/ui/ArrowLink";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";

/**
 * The MSP Business Network on the homepage. Hierarchy is deliberate: the three
 * product/supply businesses (distribution, wholesale, own products) get large
 * editorial chapters; transport, cargo and finance follow as the services that
 * support that network — present, but never the identity of the group.
 */
const PRIMARY: Business["slug"][] = ["m-sevugaperumal-and-sons", "msp-traders", "msp-fresh-products"];

export function BusinessNetwork() {
  const primary = businesses.filter((b) => PRIMARY.includes(b.slug));
  const supporting = businesses.filter((b) => !PRIMARY.includes(b.slug));

  return (
    <section id="businesses" aria-labelledby="network-title">
      <div className="bg-paper-dim text-ink">
        <div className="shell grid-12 gap-y-14 py-28 sm:py-36 lg:py-44">
          <div className="col-span-12 lg:col-span-7">
            <p className="eyebrow mb-8 flex items-center gap-3 text-rust">
              <span aria-hidden className="h-px w-10 bg-current" />
              Six businesses
            </p>
            <SplitLines id="network-title" lines={["The MSP", "Business Network."]} className="display-lg uppercase" />
            <Reveal className="mt-10 max-w-xl">
              <p className="lede text-ink/70">
                Brands, wholesale and products at the centre — with transportation, cargo and finance supporting the
                movement of goods to market.
                <span className="mt-3 block font-semibold text-ink">One group. Six businesses. One growing network.</span>
              </p>
            </Reveal>
          </div>
          <ol className="col-span-12 self-end lg:col-span-4 lg:col-start-9">
            {businesses.map((b, i) => (
              <Reveal as="li" key={b.slug} delay={i * 0.06} y={10}>
                <a href={`#division-${b.slug}`} className="group/arrow flex items-center justify-between gap-4 border-b border-ink/15 py-4 first:border-t">
                  <span className="flex items-baseline gap-4">
                    <span className="eyebrow tabular-nums text-ink/45">{b.index}</span>
                    <span className="font-display text-lg font-bold">{b.name}</span>
                  </span>
                  <span className="eyebrow flex items-center gap-3 !text-[10px] text-ink/55">
                    {b.category}
                    <Arrow />
                  </span>
                </a>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      {primary.map((b, i) => (
        <Division key={b.slug} b={b} i={i} />
      ))}

      <SupportingServices items={supporting} />
    </section>
  );
}

const LOOK: Partial<Record<Business["slug"], { section: string; imageFirst: boolean }>> = {
  "m-sevugaperumal-and-sons": { section: "bg-[#F6EEE3] text-[#2A211B]", imageFirst: false },
  "msp-traders": { section: "bg-paper text-ink", imageFirst: true },
  "msp-fresh-products": { section: "bg-[#FBF6EC] text-[#2D2418]", imageFirst: false },
};

/** A large editorial chapter for a product/supply business. */
function Division({ b, i }: { b: Business; i: number }) {
  const look = LOOK[b.slug]!;
  const href = b.home.href ?? `/businesses/${b.slug}`;
  return (
    <article id={`division-${b.slug}`} aria-labelledby={`division-${b.slug}-title`} className={cn("relative overflow-hidden", look.section)}>
      <div className="grid lg:min-h-[100svh] lg:grid-cols-12">
        <div className={cn("relative min-h-[62svh] lg:col-span-7 lg:min-h-0", look.imageFirst ? "lg:order-1" : "lg:order-2")}>
          <ImageSlot asset={b.image} parallax={6} seed={i + 1} caption={false} cursor="Explore" className="!absolute inset-0 h-full" sizes="(min-width:1024px) 58vw, 100vw" />
          <Link href={`/businesses/${b.slug}`} aria-label={b.name} tabIndex={-1} className="absolute inset-0" data-cursor="Explore" />
          <span aria-hidden className="pointer-events-none absolute bottom-4 right-5 font-display text-[clamp(5rem,12vw,11rem)] font-extrabold leading-none text-white/85 mix-blend-overlay">
            {b.index}
          </span>
        </div>
        <div className={cn("flex items-center lg:col-span-5", look.imageFirst ? "lg:order-2" : "lg:order-1")}>
          <div className="w-full px-[clamp(1rem,4.2vw,4.5rem)] py-20 lg:py-28">
            <p className="eyebrow mb-8 flex items-center gap-3">
              <span className="tabular-nums">{b.index}</span>
              <span aria-hidden className="h-px w-8" style={{ background: b.accent }} />
              <span>{b.slug === "m-sevugaperumal-and-sons" ? "Distribution & Dealership" : b.slug === "msp-fresh-products" ? "MSP-owned products" : b.category}</span>
            </p>
            <p className="mb-5 font-display text-lg font-bold opacity-80">{b.name}</p>
            <SplitLines
              id={`division-${b.slug}-title`}
              lines={b.home.lines}
              className={cn(
                "uppercase",
                b.slug === "msp-fresh-products"
                  ? "font-display text-[clamp(2.1rem,4.4vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.04em]"
                  : "display-lg",
              )}
            />
            <Reveal className="mt-8 max-w-md">
              <p className="lede opacity-75">{b.home.text}</p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ArrowLink href={href} variant="ink">
                  {b.home.cta}
                </ArrowLink>
                {href !== `/businesses/${b.slug}` && <ArrowLink href={`/businesses/${b.slug}`}>About {b.name}</ArrowLink>}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Transport, cargo and finance — the services that move and support the network. Deliberately smaller. */
function SupportingServices({ items }: { items: Business[] }) {
  return (
    <div className="bg-navy text-paper">
      <div className="shell py-24 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-6 flex items-center gap-3 text-sand">
              <span aria-hidden className="h-px w-10 bg-current" />
              Supporting the network
            </p>
            <h3 className="font-display text-[clamp(1.75rem,3.4vw,3rem)] font-extrabold uppercase leading-none tracking-[-0.03em]">
              Moving goods. Supporting business.
            </h3>
          </div>
          <p className="max-w-sm text-paper/60">Transport, cargo and financial services that keep MSP’s supply network moving.</p>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-3 lg:gap-6">
          {items.map((b, i) => (
            <Reveal as="li" key={b.slug} delay={i * 0.1} className="h-full">
              <article id={`division-${b.slug}`} aria-labelledby={`division-${b.slug}-title`} className="group/arrow group flex h-full flex-col">
                <Link href={`/businesses/${b.slug}`} data-cursor="Explore" className="block overflow-hidden" tabIndex={-1} aria-hidden>
                  <div className="transition-transform duration-[1.2s] ease-[var(--ease-brand)] group-hover:scale-[1.04]">
                    <ImageSlot asset={b.image} seed={1200 + i} caption={false} className="aspect-[16/10]" sizes="(min-width:768px) 33vw, 100vw" />
                  </div>
                </Link>
                <div className="flex flex-1 flex-col border-b border-paper/15 py-6">
                  <p className="eyebrow flex items-center gap-3 text-paper/60">
                    <span className="tabular-nums">{b.index}</span>
                    <span aria-hidden className="h-px w-6" style={{ background: b.accent }} />
                    {b.category}
                  </p>
                  <p className="mt-3 font-display text-sm font-bold text-paper/80">{b.name}</p>
                  <h3 id={`division-${b.slug}-title`} className="mt-2 font-display text-2xl font-extrabold uppercase leading-[1.05] tracking-[-0.02em]">
                    {b.positioning}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/65">{b.home.text}</p>
                  <div className="mt-auto pt-6">
                    <ArrowLink href={b.home.href ?? `/businesses/${b.slug}`} className="text-paper">
                      {b.home.cta}
                    </ArrowLink>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}
