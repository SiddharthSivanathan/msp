import type { Business } from "@/lib/businesses";
import { features, TODO } from "@/lib/content";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "./shared";

/**
 * Own-brand product cards. Every field is client-supplied; until then a card
 * shows the placeholder token (review mode only — hidden at launch if empty).
 */
export function ProductShowcase({ b }: { b: Business }) {
  const products = (b.products ?? []).filter((p) => p.name || features.showUnconfirmed);
  if (!products.length) return null;

  return (
    <section id="range" aria-labelledby="products-title" className="relative bg-(--b-bg) text-(--b-ink)">
      <div className="shell py-28 sm:py-36 lg:py-44">
        <SectionHead id="products-title" eyebrow="Product showcase" lines={["The MSP", "product range."]} size="md" />
        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-5">
          {products.map((p, i) => (
            <Reveal as="li" key={i} delay={(i % 4) * 0.08}>
              <article className="group flex h-full flex-col border border-current/15">
                <div className="overflow-hidden">
                  <div className="transition-transform duration-[1.2s] ease-[var(--ease-brand)] group-hover:scale-[1.04]">
                    <ImageSlot asset={p.image} seed={800 + i} className="aspect-[4/5]" sizes="(min-width:1024px) 25vw, 50vw" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="eyebrow text-(--b-accent)">{p.category}</p>
                  <h3 className={`mt-3 font-display text-lg font-extrabold uppercase leading-tight tracking-[-0.02em] ${p.name ? "" : "opacity-45"}`}>
                    {p.name ?? TODO.productInfo}
                  </h3>
                  <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-current/15 pt-4 text-sm">
                    <div>
                      <dt className="eyebrow !text-[9px] opacity-50">Pack size</dt>
                      <dd className={p.packSize ? "" : "opacity-40"}>{p.packSize ?? "—"}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow !text-[9px] opacity-50">Brand</dt>
                      <dd>MSP</dd>
                    </div>
                  </dl>
                  {p.description && <p className="mt-3 text-sm opacity-65">{p.description}</p>}
                  {p.ingredients && (
                    <p className="mt-3 text-sm opacity-65">
                      <span className="eyebrow mr-2 !text-[9px] opacity-60">Ingredients</span>
                      {p.ingredients}
                    </p>
                  )}
                  {p.usage && (
                    <p className="mt-2 text-sm opacity-65">
                      <span className="eyebrow mr-2 !text-[9px] opacity-60">Usage</span>
                      {p.usage}
                    </p>
                  )}
                  <ArrowLink href="#enquiry" className="mt-5 self-start !text-[10px]">Enquire</ArrowLink>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
