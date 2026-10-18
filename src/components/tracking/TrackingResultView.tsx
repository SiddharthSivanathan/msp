import Link from "next/link";
import { SHIPMENT_STAGES, stageIndex, type Shipment, type TrackingResult } from "@/lib/tracking";
import { cn } from "@/lib/utils";

const fmt = (iso: string | null | undefined) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
};

/** Renders whatever the tracking backend returns — and nothing it doesn't. */
export function TrackingResultView({ result }: { result: TrackingResult }) {
  switch (result.kind) {
    case "found":
      return <ShipmentView s={result.shipment} />;
    case "not_found":
      return (
        <Notice title="Consignment not found.">
          We couldn’t find consignment <strong>{result.consignmentNumber}</strong>. Please check the number on your
          booking receipt, or contact MSP Cargo Service.
        </Notice>
      );
    case "invalid":
      return <Notice title="Check the number.">{result.message}</Notice>;
    case "error":
      return <Notice title="Something went wrong.">We couldn’t reach the tracking service just now. Please try again shortly, or contact MSP Cargo Service.</Notice>;
    case "unavailable":
      return <Unavailable />;
  }
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-rust bg-white px-6 py-6 text-ink">
      <p className="font-display text-xl font-extrabold uppercase tracking-[-0.01em]">{title}</p>
      <p className="mt-2 max-w-xl text-ink/70">{children}</p>
      <Link href="/businesses/msp-cargo-service#enquiry" className="eyebrow link-underline mt-4 inline-block pb-1 text-ocean">
        Contact MSP Cargo Service →
      </Link>
    </div>
  );
}

function Unavailable() {
  return (
    <div className="space-y-10">
      <Notice title="Tracking is being connected.">
        Tracking service is currently being connected. Please contact MSP Cargo Service for the latest shipment status.
      </Notice>
      <div>
        <p className="eyebrow mb-5 text-ink/50">Once connected, your shipment will show these stages</p>
        <ol className="grid grid-cols-2 border-t border-ink/15 sm:grid-cols-3 lg:grid-cols-6">
          {SHIPMENT_STAGES.map((st, i) => (
            <li key={st.key} className="border-b border-ink/15 py-5 pr-4 lg:border-b-0">
              <span aria-hidden className="mb-3 block size-3 rounded-full border border-ink/30" />
              <span className="eyebrow block text-ink/40">0{i + 1}</span>
              <span className="mt-1 block font-display font-bold uppercase text-ink/60">{st.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function ShipmentView({ s }: { s: Shipment }) {
  const current = stageIndex(s.currentStage);
  const eventAt = (key: string) => s.events?.find((e) => e.stage === key);
  const facts: [string, string][] = [
    ["Status", s.status],
    ["Origin", s.origin],
    ["Destination", s.destination],
    ["Booked", fmt(s.bookedAt)],
    ["Current stage", SHIPMENT_STAGES[current]?.label ?? s.currentStage],
    ["Last updated", fmt(s.lastUpdated)],
  ];

  return (
    <article aria-label={`Consignment ${s.consignmentNumber}`} className="bg-white text-ink">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/10 px-6 py-6 lg:px-10">
        <div>
          <p className="eyebrow text-ink/50">Consignment</p>
          <p className="mt-1 font-display text-3xl font-extrabold tracking-[0.04em]">{s.consignmentNumber}</p>
        </div>
        <p className="eyebrow rounded-full bg-navy px-4 py-2 text-paper">{s.status}</p>
      </header>

      <dl className="grid grid-cols-2 gap-px bg-ink/10 sm:grid-cols-3 lg:grid-cols-6">
        {facts.map(([k, v]) => (
          <div key={k} className="bg-white px-6 py-5">
            <dt className="eyebrow !text-[10px] text-ink/50">{k}</dt>
            <dd className="mt-1.5 font-display font-bold">{v}</dd>
          </div>
        ))}
      </dl>

      <ol className="relative grid gap-0 px-6 py-10 lg:grid-cols-6 lg:px-10">
        {SHIPMENT_STAGES.map((st, i) => {
          const state = i < current ? "done" : i === current ? "current" : "upcoming";
          const ev = eventAt(st.key);
          return (
            <li key={st.key} className="relative flex gap-4 pb-8 lg:flex-col lg:pb-0 lg:pr-4">
              <span aria-hidden className={cn("absolute left-[11px] top-6 h-full w-px lg:left-6 lg:top-[11px] lg:h-px lg:w-full", i === SHIPMENT_STAGES.length - 1 && "hidden", state === "done" ? "bg-navy" : "bg-ink/15")} />
              <span
                className={cn(
                  "relative z-10 grid size-6 shrink-0 place-items-center rounded-full border text-[11px] font-bold",
                  state === "done" && "border-navy bg-navy text-paper",
                  state === "current" && "border-rust bg-white text-rust",
                  state === "upcoming" && "border-ink/25 bg-white text-transparent",
                )}
              >
                {state === "done" ? "✓" : state === "current" ? "●" : "○"}
                <span className="sr-only">{state}</span>
              </span>
              <span className="lg:mt-4">
                <span className={cn("block font-display font-extrabold uppercase", state === "upcoming" && "text-ink/40")}>{st.label}</span>
                {ev && (
                  <span className="mt-1 block text-sm text-ink/60">
                    {fmt(ev.at)}
                    {ev.location ? ` · ${ev.location}` : ""}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </article>
  );
}
