"use client";

import { contact, PLACEHOLDER } from "@/lib/content";
import { cn } from "@/lib/utils";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";

/**
 * Closing CTA. The form composes an email to MSP's enquiry address — no
 * backend is implied. Until the client supplies that address the form says so
 * plainly instead of pretending to send.
 */
export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-navy text-paper"
    >
      <div className="shell py-28 sm:py-36 lg:py-44">
        <Eyebrow className="mb-8 text-sand">Enquiries</Eyebrow>
        <SplitLines id="contact-title" lines={["Let’s do", "business."]} className="display-xl uppercase" />

        <div className="grid-12 mt-16 gap-y-16 lg:mt-24">
          <div className="col-span-12 lg:col-span-4">
            <Reveal>
              <p className="lede text-paper/70">
                Talk to MSP about transportation, wholesale supply, cargo movement, distribution or financial
                services.
              </p>
            </Reveal>
            <dl className="mt-12 divide-y divide-white/10 border-y border-white/10">
              <Detail label="Phone" value={contact.phone} href={contact.phone ? `tel:${contact.phone.replace(/\s/g, "")}` : undefined} />
              <Detail label="Email" value={contact.email} href={contact.email ? `mailto:${contact.email}` : undefined} />
              <Detail label="Address" value={contact.address} />
            </dl>
            {contact.social.length > 0 && (
              <ul className="mt-8 flex gap-6">
                {contact.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="eyebrow link-underline pb-1 text-paper/70 hover:text-paper">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function Detail({ label, value, href }: { label: string; value: string | null; href?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-5">
      <dt className="eyebrow text-paper/45">{label}</dt>
      <dd className={cn("text-right text-[0.95rem]", value ? "text-paper" : "text-paper/35")}>
        {href && value ? (
          <a href={href} className="link-underline pb-0.5">
            {value}
          </a>
        ) : (
          value ?? PLACEHOLDER
        )}
      </dd>
    </div>
  );
}
