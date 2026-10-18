import Link from "next/link";
import { TrackingForm } from "@/components/tracking/TrackingForm";

/** A compact customer utility for MSP Cargo Service customers — a tool, not the identity of the group. */
export function TrackingBand({ tone = "light", lead }: { tone?: "light" | "dark"; lead?: string }) {
  const dark = tone === "dark";
  return (
    <section aria-labelledby="track-band-title" className={dark ? "bg-navy-deep text-paper" : "bg-paper text-ink"}>
      <div className={`shell grid-12 items-center gap-y-8 py-14 lg:py-16 ${dark ? "" : "border-b border-ink/10"}`}>
        <div className="col-span-12 lg:col-span-4">
          <p className={`eyebrow mb-4 ${dark ? "text-sand" : "text-rust"}`}>MSP Cargo Service</p>
          <h2 id="track-band-title" className="font-display text-[clamp(1.8rem,3.2vw,2.75rem)] font-extrabold uppercase leading-none tracking-[-0.03em]">
            Track your consignment.
          </h2>
          {lead && <p className={`mt-3 ${dark ? "text-paper/65" : "text-ink/65"}`}>{lead}</p>}
          <Link href="/track-consignment" className={`eyebrow link-underline mt-4 inline-block pb-1 ${dark ? "text-paper/60" : "text-ink/60"}`}>
            Open tracking page →
          </Link>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <TrackingForm tone={tone} compact />
        </div>
      </div>
    </section>
  );
}
