import Link from "next/link";
import { Arrow } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";

const actions = [
  { q: "Need wholesale supply?", name: "MSP Traders", href: "/businesses/msp-traders#enquiry" },
  { q: "Need distribution?", name: "M Sevugaperumal & Sons", href: "/businesses/m-sevugaperumal-and-sons#enquiry" },
  { q: "Looking for MSP products?", name: "MSP Fresh Products", href: "/businesses/msp-fresh-products#products" },
  { q: "Need to move goods?", name: "MSP Store", href: "/businesses/msp-store#enquiry" },
  { q: "Need to ship cargo?", name: "MSP Cargo Service", href: "/businesses/msp-cargo-service#enquiry" },
  { q: "Already shipped with us?", name: "Track a consignment", href: "/track-consignment" },
];

/** Direct actions — the site works for customers, not just as a brochure. */
export function QuickActions() {
  return (
    <section aria-labelledby="actions-title" className="bg-navy text-paper">
      <div className="shell py-24 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SplitLines id="actions-title" lines={["How can MSP", "help today?"]} className="display-md uppercase" />
          <p className="eyebrow text-paper/50">Go straight to the right business</p>
        </div>
        <ul className="mt-14 grid gap-px border border-paper/15 bg-paper/15 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((a, i) => (
            <Reveal as="li" key={a.href} delay={(i % 3) * 0.06} y={12} className="bg-navy">
              <Link href={a.href} className="group/arrow flex h-full flex-col justify-between gap-8 p-6 transition-colors duration-500 hover:bg-paper/[0.04] lg:p-8">
                <span className="eyebrow text-sand">{a.q}</span>
                <span className="flex items-center justify-between gap-4 font-display text-xl font-extrabold uppercase tracking-[-0.02em]">
                  {a.name}
                  <Arrow />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
