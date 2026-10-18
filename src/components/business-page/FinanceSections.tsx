import Link from "next/link";
import type { Business } from "@/lib/businesses";
import { contact, PLACEHOLDER } from "@/lib/content";
import { financeSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Saptagiri Finance — a TRADITIONAL LOCAL FINANCE SHOP: maroon, cream and
 * brass, a shop-signboard character, counter / money / ornament photography,
 * straightforward wording. No products are named and no rates, amounts,
 * tenure, schemes or licences are stated.
 */

export const FIN = { maroon: "#7A1F1F", maroonDeep: "#5A1414", cream: "#FAF4E8", beige: "#F1E6D2", brass: "#B58A3A", ink: "#2B1D16" };

const serif = financeSerif.className;
const h2 = cn(serif, "text-[clamp(1.9rem,3.4vw,2.8rem)] font-bold leading-tight text-[#2B1D16]");
const body = "text-[1.05rem] leading-relaxed text-[#2B1D16]/75";

/** Small brass divider with a diamond — a traditional signboard flourish. */
export function BrassRule({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span aria-hidden className={cn("flex items-center gap-3", className)}>
      <span className={cn("h-px w-12", light ? "bg-[#D9B977]" : "bg-[#B58A3A]")} />
      <span className={cn("size-2 rotate-45", light ? "bg-[#D9B977]" : "bg-[#B58A3A]")} />
      <span className={cn("h-px w-12", light ? "bg-[#D9B977]" : "bg-[#B58A3A]")} />
    </span>
  );
}

function Heading({ kicker, title, id, center = false }: { kicker: string; title: string; id: string; center?: boolean }) {
  return (
    <div className={cn(center && "text-center")}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7A1F1F]">{kicker}</p>
      <h2 id={id} className={cn(h2, "mt-3")}>{title}</h2>
      <BrassRule className={cn("mt-5", center && "justify-center")} />
    </div>
  );
}

/* ─ How we help ------------------------------------------------------------- */

const HELP = [
  { title: "Financial assistance", line: "Support for your everyday financial needs.", icon: "rupee" },
  { title: "Valuables handled with care", line: "Careful handling of customer valuables.", icon: "scale" },
  { title: "Clear documentation", line: "Every step clearly recorded and explained.", icon: "doc" },
  { title: "Personal service", line: "Talk to us directly — we are here to help.", icon: "hand" },
] as const;

function Icon({ name }: { name: (typeof HELP)[number]["icon"] }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
      {name === "rupee" && <path {...c} d="M7 5h10 M7 9h10 M7 5h3.5a4 4 0 010 8H7l7.5 7" />}
      {name === "scale" && <path {...c} d="M12 4v16 M8 20h8 M5 7h14 M5 7l-2.5 6a2.5 2.5 0 005 0L5 7z M19 7l-2.5 6a2.5 2.5 0 005 0L19 7z" />}
      {name === "doc" && <path {...c} d="M7 3h7l4 4v14H7z M14 3v4h4 M9.5 12h6 M9.5 15.5h6" />}
      {name === "hand" && <path {...c} d="M4 13l4-4 3 1 3-3 6 6-3 3-2-1-3 3-3-1-2 2-3-3z M11 10l3 3" />}
    </svg>
  );
}

export function FinanceHelp() {
  return (
    <section id="trust" aria-labelledby="help-title" className="scroll-mt-20 bg-[#FAF4E8]">
      <div className="shell py-20 lg:py-28">
        <Heading kicker="Simple. Clear. Dependable." title="How we help" id="help-title" center />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HELP.map((p, i) => (
            <Reveal as="li" key={p.title} y={10} delay={i * 0.06} className="border border-[#B58A3A]/40 bg-white/60 p-6 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#7A1F1F] text-[#F3DFA9]">
                <Icon name={p.icon} />
              </span>
              <h3 className={cn(serif, "mt-5 text-lg font-bold text-[#2B1D16]")}>{p.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-[#2B1D16]/70">{p.line}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─ At our counter (money, ornaments, weighing) ------------------------------ */

export function FinanceCounter({ b }: { b: Business }) {
  const [notes, handover, assess] = b.visuals.images;
  const tiles = [
    { image: notes, caption: "Financial assistance" },
    { image: handover, caption: "Personal service" },
    { image: assess, caption: "Handled with care" },
  ];
  return (
    <section aria-labelledby="counter-title" className="bg-[#F1E6D2]">
      <div className="shell py-20 lg:py-28">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-12 lg:col-span-6">
            <Heading kicker="At our counter" title="Financial matters are personal." id="counter-title" />
          </div>
          <Reveal y={10} className="col-span-12 lg:col-span-5 lg:col-start-8">
            <p className={body}>We keep the process simple, clear and customer-focused.</p>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {tiles.map((t, i) => (
            <Reveal as="li" key={t.caption} y={10} delay={i * 0.08} className="border-4 border-white bg-white shadow-sm">
              <ImageSlot asset={t.image} seed={1950 + i} caption={false} className="aspect-[4/3]" sizes="(min-width:768px) 33vw, 100vw" />
              <p className={cn(serif, "px-4 py-3 text-center font-bold text-[#7A1F1F]")}>{t.caption}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─ Valuables ----------------------------------------------------------------- */

export function FinanceValuables({ b }: { b: Business }) {
  const v = b.valuables;
  if (!v) return null;
  return (
    <section aria-labelledby="valuables-title" className="bg-[#FAF4E8]">
      <div className="shell py-20 lg:py-28">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-12 lg:col-span-6">
            <Heading kicker="Valuables" title="Your Valuables. Handled With Care." id="valuables-title" />
          </div>
          <Reveal y={10} className="col-span-12 lg:col-span-5 lg:col-start-8">
            <p className={body}>
              When valuables are part of the financial process, we focus on careful handling, security and clear
              documentation.
            </p>
          </Reveal>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {v.steps.map((s, i) => (
            <Reveal as="li" key={s.stage} y={10} delay={i * 0.06}>
              <ImageSlot asset={s.image} seed={2000 + i} caption={false} className="aspect-square border border-[#B58A3A]/40" sizes="(min-width:1024px) 25vw, 50vw" />
              <p className={cn(serif, "mt-3 font-bold text-[#2B1D16]")}>{s.stage}</p>
              <p className="text-sm text-[#2B1D16]/65">{s.note}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─ Four steps ---------------------------------------------------------------- */

export function FinanceSteps({ b }: { b: Business }) {
  return (
    <section aria-labelledby="steps-title" className="bg-[#7A1F1F] text-[#FAF4E8]">
      <div className="shell py-20 lg:py-24">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D9B977]">How it works</p>
          <h2 id="steps-title" className={cn(serif, "mt-3 text-[clamp(1.9rem,3.4vw,2.8rem)] font-bold")}>Four simple steps</h2>
          <BrassRule light className="mt-5 justify-center" />
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {b.process.steps.map((s, i) => (
            <Reveal as="li" key={s.step} y={10} delay={i * 0.08} className="border border-[#D9B977]/40 p-6 text-center">
              <span className={cn(serif, "mx-auto grid size-12 place-items-center rounded-full border-2 border-[#D9B977] text-xl font-bold text-[#F3DFA9]")}>
                {i + 1}
              </span>
              <h3 className={cn(serif, "mt-4 text-xl font-bold")}>{s.step}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-[#FAF4E8]/80">{s.note}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─ Relationships ------------------------------------------------------------- */

export function FinanceRelationships({ b }: { b: Business }) {
  return (
    <section aria-labelledby="relationships-title" className="bg-[#FAF4E8]">
      <div className="shell grid-12 items-center gap-y-10 py-20 lg:py-28">
        <Reveal y={10} className="col-span-12 lg:col-span-6">
          <div className="border-4 border-white bg-white shadow-sm">
            <ImageSlot asset={b.visuals.images[3] ?? b.visuals.images[1]} seed={2050} caption={false} className="aspect-[4/3]" sizes="(min-width:1024px) 50vw, 100vw" />
          </div>
        </Reveal>
        <Reveal y={10} delay={0.1} className="col-span-12 lg:col-span-5 lg:col-start-8">
          <Heading kicker="Our customers" title="A Business Built Around Relationships." id="relationships-title" />
          <p className={cn(body, "mt-6")}>
            Good financial service is not only about numbers. It is about trust, clarity and knowing that someone is
            there to assist you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─ Contact (signboard style) ----------------------------------------------- */

export function FinanceContact({ b }: { b: Business }) {
  const phone = b.contact.phone ?? contact.phone;
  const email = b.contact.email ?? contact.email;
  return (
    <section id="enquiry" aria-labelledby="finance-contact-title" className="bg-[#F1E6D2] py-16 lg:py-20">
      <div className="shell">
        <div className="border-[6px] border-double border-[#B58A3A] bg-[#7A1F1F] p-8 text-center text-[#FAF4E8] sm:p-12">
          <h2 id="finance-contact-title" className={cn(serif, "text-[clamp(1.9rem,3.4vw,2.8rem)] font-bold")}>
            Need Financial Assistance?
          </h2>
          <BrassRule light className="mt-4 justify-center" />
          <p className="mt-5 text-[1.05rem] text-[#FAF4E8]/85">Talk to our team and understand the process.</p>
          <p className="mt-3 text-sm text-[#FAF4E8]/70">
            Phone: {phone ?? PLACEHOLDER}
            <span className="mx-3 opacity-50">|</span>
            Email: {email ?? PLACEHOLDER}
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center bg-[#D9B977] px-7 py-3.5 font-bold text-[#2B1D16] transition-colors hover:bg-[#F3DFA9]"
          >
            Contact Saptagiri Finance
          </Link>
        </div>
      </div>
    </section>
  );
}
