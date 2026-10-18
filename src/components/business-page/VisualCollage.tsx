import type { Business } from "@/lib/businesses";
import { cn } from "@/lib/utils";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { toLines } from "./shared";

/** Full-bleed editorial collage — "Transport in motion", "Product showcase"… */
export function VisualCollage({ b, images = b.visuals.images, surface = "bg" }: { b: Business; images?: Business["visuals"]["images"]; surface?: "bg" | "alt" }) {
  const [lead, ...rest] = images;
  return (
    <section aria-labelledby="visuals-title" className={cn("relative overflow-hidden text-(--b-ink)", surface === "alt" ? "bg-(--b-alt)" : "bg-(--b-bg)")}>
      <div className="shell py-28 sm:py-36 lg:py-44">
        <SplitLines id="visuals-title" lines={toLines(b.visuals.heading)} className="b-heading text-[clamp(2.5rem,8vw,8rem)] leading-[0.9]" />
        <div className="grid-12 mt-14 gap-y-3 lg:mt-20">
          <Reveal className="col-span-12 lg:col-span-8">
            <ImageSlot asset={lead} seed={500} parallax={8} cursor="View" className="aspect-[16/10]" sizes="(min-width:1024px) 66vw, 100vw" />
          </Reveal>
          <div className="col-span-12 grid grid-cols-2 gap-3 lg:col-span-4 lg:grid-cols-1 lg:pt-24">
            {rest.slice(0, 2).map((im, i) => (
              <Reveal key={i} delay={0.1 * (i + 1)}>
                <ImageSlot asset={im} seed={501 + i} parallax={5} cursor="View" className="aspect-[4/3]" sizes="(min-width:1024px) 33vw, 50vw" />
              </Reveal>
            ))}
          </div>
          {rest[2] && (
            <Reveal className="col-span-12 lg:col-span-7 lg:col-start-4 lg:-mt-10">
              <ImageSlot asset={rest[2]} seed={503} parallax={6} cursor="View" className="aspect-[21/9]" sizes="(min-width:1024px) 58vw, 100vw" />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
