import type { Business } from "@/lib/businesses";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead, StatusBadge, visible } from "./shared";

export function AudienceBlock({ b }: { b: Business }) {
  if (!b.audience) return null;
  const items = visible(b.audience.items);
  if (!items.length) return null;
  return (
    <section aria-labelledby="audience-title" className="relative bg-(--b-bg) text-(--b-ink)">
      <div className="shell grid-12 gap-y-14 py-28 sm:py-36 lg:py-44">
        <SectionHead id="audience-title" eyebrow="Customers" lines={[b.audience.heading]} size="md" className="col-span-12 lg:col-span-4" />
        <ul className="col-span-12 lg:col-span-7 lg:col-start-6">
          {items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i * 0.07} y={14} className="flex items-center justify-between gap-6 border-b border-current/15 py-5 first:border-t lg:py-7">
              <span className="flex items-baseline gap-5">
                <span className="eyebrow tabular-nums opacity-40">0{i + 1}</span>
                <span className="font-display text-[clamp(1.6rem,3.6vw,3.25rem)] font-semibold uppercase leading-none tracking-[-0.045em]">{it.title}</span>
              </span>
              <StatusBadge status={it.status} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
