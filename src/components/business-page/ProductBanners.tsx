import type { Business } from "@/lib/businesses";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "./shared";

/**
 * Client-supplied product artwork. The headline and logo are part of each
 * image, so the banners are shown whole at their own 43:24 ratio — never cropped.
 */
export function ProductBanners({ b }: { b: Business }) {
  if (!b.banners?.length) return null;
  return (
    <section aria-labelledby="banners-title" className="relative bg-(--b-bg) text-(--b-ink)">
      <div className="shell pb-24 sm:pb-32">
        <SectionHead id="banners-title" eyebrow={`From ${b.name}`} lines={["Fresh from", "MSP."]} size="md" />
        <ul className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-2">
          {b.banners.map((im, i) => {
            /** With an odd number of banners the first one leads at full width. */
            const lead = i === 0 && b.banners!.length % 2 === 1;
            return (
              <Reveal as="li" key={im.src} delay={i * 0.1} className={lead ? "lg:col-span-2" : undefined}>
                <ImageSlot
                  asset={im}
                  seed={900 + i}
                  caption={false}
                  className="aspect-[43/24] shadow-[0_30px_60px_-30px_rgba(45,36,24,0.45)]"
                  sizes={lead ? "100vw" : "(min-width:1024px) 50vw, 100vw"}
                />
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
