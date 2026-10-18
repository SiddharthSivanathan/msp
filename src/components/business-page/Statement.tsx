import type { Business } from "@/lib/businesses";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SplitLines } from "@/components/ui/SplitLines";

/** Full-bleed photograph with a large two-line statement — "From here. To there." */
export function Statement({ b }: { b: Business }) {
  if (!b.statement) return null;
  return (
    <section aria-labelledby="statement-title" className="relative isolate overflow-hidden bg-navy-deep text-paper">
      <ImageSlot asset={b.statement.image} parallax={10} seed={700} caption={false} className="!absolute inset-0 -z-10 h-full" sizes="100vw" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,19,32,0.35),rgba(5,19,32,0.15)_45%,rgba(5,19,32,0.85))]" />
      <div className="shell flex min-h-[90svh] flex-col justify-end py-20 lg:py-28">
        <SplitLines id="statement-title" lines={b.statement.lines} className="display-xl uppercase" />
        <p className="eyebrow mt-8 text-paper/70">
          {b.name} — {b.about.flow.length ? b.about.flow.join("  ·  ") : b.category}
        </p>
      </div>
    </section>
  );
}
