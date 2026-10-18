import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { features, ph } from "@/lib/content";
import { TrackingPanel } from "@/components/tracking/TrackingPanel";
import { SplitLines } from "@/components/ui/SplitLines";

export const metadata: Metadata = {
  title: "Track Your Consignment",
  description: "Track an MSP Cargo Service consignment between Chennai and Port Blair using your consignment number.",
  alternates: { canonical: "/track-consignment" },
};

const backdrop = ph("shipSea", "MSP cargo vessel at sea", "A container ship at sea", "sea");

export default function TrackConsignmentPage() {
  return (
    <>
      <header className="relative isolate overflow-hidden bg-navy-deep text-paper">
        <Image src={backdrop.src!} alt="" fill priority sizes="100vw" className="photo-grade -z-10 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,19,32,0.92),rgba(5,19,32,0.6)_60%,rgba(5,19,32,0.4))]" />
        {features.showUnconfirmed && (
          <span className="absolute right-4 top-24 rounded-full bg-black/45 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80 sm:right-8">Interim photo</span>
        )}
        <div className="shell pb-16 pt-36 lg:pb-24 lg:pt-44">
          <p className="eyebrow mb-8 flex items-center gap-3 text-sand">
            <span aria-hidden className="h-px w-10 bg-current" />
            MSP Cargo Service · Chennai → Port Blair
          </p>
          <SplitLines as="h1" trigger="mount" delay={0.2} lines={["Track your", "consignment."]} className="display-xl uppercase" />
          <p className="lede mt-8 max-w-xl text-paper/80">
            Enter your consignment number to view the latest available shipment status.
          </p>
        </div>
      </header>

      <section aria-label="Tracking" className="bg-paper text-ink">
        <div className="shell grid-12 gap-y-14 py-16 lg:py-24">
          <div className="col-span-12 lg:col-span-8">
            <Suspense fallback={<div className="h-32" aria-busy="true" />}>
              <TrackingPanel />
            </Suspense>
          </div>
          <aside className="col-span-12 space-y-8 lg:col-span-3 lg:col-start-10">
            <div className="border-t border-ink/15 pt-5">
              <p className="eyebrow text-ink/50">Your consignment number</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/70">Use the consignment number provided by MSP Cargo Service for your shipment.</p>
            </div>
            <div className="border-t border-ink/15 pt-5">
              <p className="eyebrow text-ink/50">Need help?</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/70">For the latest status, or to ship new cargo, contact MSP Cargo Service.</p>
              <Link href="/businesses/msp-cargo-service#enquiry" className="eyebrow link-underline mt-3 inline-block pb-1 text-ocean">
                Contact MSP Cargo Service →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
