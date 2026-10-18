import type { Business } from "@/lib/businesses";
import { contact, PLACEHOLDER } from "@/lib/content";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { cargoFields, StructuredForm, wholesaleFields } from "@/components/contact/StructuredForm";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { toLines } from "./shared";

/** Each environment closes on its own deep tone; the form itself is the shared MSP contact system. */
const ENQUIRY_BG: Record<Business["slug"], string> = {
  "m-sevugaperumal-and-sons": "#3A231A",
  "msp-store": "#1A2024",
  "msp-traders": "#2B2419",
  "msp-cargo-service": "#051320",
  "msp-fresh-products": "#3B1F12",
  "saptagiri-finance": "#0A1018",
};

/** Business-specific CTA using the shared MSP enquiry form, pre-set to this business. */
export function EnquiryBlock({ b }: { b: Business }) {
  const phone = b.contact.phone ?? contact.phone;
  const email = b.contact.email ?? contact.email;
  return (
    <section
      id="enquiry"
      aria-labelledby="enquiry-title"
      className="relative overflow-hidden text-paper"
      style={{ background: ENQUIRY_BG[b.slug] }}
    >
      <div className="shell py-28 sm:py-36 lg:py-44">
        <p className="eyebrow mb-8 flex items-center gap-3" style={{ color: b.slug === "saptagiri-finance" ? "#BFA67A" : "#D8C7A3" }}>
          <span aria-hidden className="h-px w-8 bg-current opacity-60" />
          Enquire — {b.name}
        </p>
        <SplitLines id="enquiry-title" lines={toLines(b.enquiry.heading)} className="b-heading text-[clamp(2.5rem,8vw,8rem)] leading-[0.92]" />

        <div className="grid-12 mt-16 gap-y-14 lg:mt-20">
          <Reveal className="col-span-12 lg:col-span-4">
            <p className="font-display text-xl font-extrabold uppercase tracking-[-0.02em]">{b.enquiry.label} →</p>
            <dl className="mt-8 divide-y divide-white/10 border-y border-white/10 text-[0.95rem]">
              <div className="flex justify-between gap-6 py-4">
                <dt className="eyebrow text-paper/45">Phone</dt>
                <dd className={phone ? "" : "text-paper/35"}>{phone ? <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a> : PLACEHOLDER}</dd>
              </div>
              <div className="flex justify-between gap-6 py-4">
                <dt className="eyebrow text-paper/45">Email</dt>
                <dd className={email ? "" : "text-paper/35"}>{email ? <a href={`mailto:${email}`}>{email}</a> : PLACEHOLDER}</dd>
              </div>
            </dl>
          </Reveal>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            {b.enquiry.form === "wholesale" ? (
              <StructuredForm fields={wholesaleFields} submitLabel="Send wholesale enquiry" subject="Wholesale enquiry — MSP Traders" email={email} />
            ) : b.enquiry.form === "cargo" ? (
              <StructuredForm fields={cargoFields} submitLabel="Request cargo quote" subject="Cargo quote request — MSP Cargo Service" email={email} />
            ) : (
              <EnquiryForm defaultTopic={b.topic} email={email} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
