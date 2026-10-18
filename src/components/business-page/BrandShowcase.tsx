import { features, partners, TODO } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "./shared";

/**
 * Brands we represent — one large editorial chapter per CONFIRMED brand.
 * Descriptions and imagery are client-supplied; nothing is written for a brand.
 */
export function BrandShowcase() {
  return (
    <section id="brands" aria-labelledby="brands-title" className="relative bg-(--b-alt) text-(--b-ink)">
      <div className="shell py-28 sm:py-36 lg:py-44">
        <SectionHead id="brands-title" eyebrow="Brand partners" lines={["Brands we", "represent."]} />

        <div className="mt-16 space-y-6 lg:mt-24 lg:space-y-8">
          {partners.map((p, i) => (
            <Reveal key={p.name} delay={0.15 * i} y={40}>
              <article className={cn("grid overflow-hidden bg-(--b-bg) lg:grid-cols-12", i % 2 && "lg:[&>*:first-child]:order-2")}>
                <div className="relative min-h-[320px] lg:col-span-6 lg:min-h-[480px]">
                  <ImageSlot
                    asset={p.image}
                    seed={900 + i}
                    parallax={0}
                    className={cn("!absolute inset-0 h-full", p.image.contain && "!bg-[#013B71]")}
                    sizes="50vw"
                  />
                </div>
                <div className="flex flex-col justify-between gap-10 p-8 lg:col-span-6 lg:p-14">
                  <div>
                    <p className="eyebrow tabular-nums text-(--b-accent)">Brand 0{i + 1}</p>
                    <div className="mt-6"><BrandLogo partner={p} /></div>
                    {p.logo && <h3 className="mt-5 font-display text-2xl font-extrabold uppercase tracking-[-0.03em]">{p.name}</h3>}
                    {p.company && <p className="mt-2 text-sm font-semibold opacity-60">{p.company}</p>}
                    <p className={cn("mt-6 max-w-md leading-relaxed", p.description ? "opacity-70" : "opacity-40")}>
                      {p.description ?? (features.showUnconfirmed ? "[BRAND DESCRIPTION TO BE ADDED]" : "")}
                    </p>
                  </div>
                  <dl className="grid grid-cols-2 gap-6 border-t border-current/15 pt-6">
                    <div>
                      <dt className="eyebrow !text-[10px] opacity-50">Distribution role</dt>
                      <dd className="mt-1.5 font-display font-bold">Distributed by M Sevugaperumal &amp; Sons</dd>
                    </div>
                    <div className="flex items-end justify-end">
                      <ArrowLink href="#enquiry">Enquire</ArrowLink>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
          {features.showUnconfirmed && (
            <p className="eyebrow rounded-full border border-dashed border-current/40 px-4 py-2 text-center opacity-50">{TODO.brands}</p>
          )}
        </div>
      </div>
    </section>
  );
}
