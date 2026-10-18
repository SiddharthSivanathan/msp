"use client";

import { useId, useState } from "react";
import { contact } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Arrow } from "@/components/ui/ArrowLink";

/**
 * The single MSP enquiry form, used on the homepage and every business page.
 * It composes an email (no backend implied). Until an address is supplied it
 * says so plainly instead of pretending to send.
 */
export function EnquiryForm({ defaultTopic, email = contact.email }: { defaultTopic?: string; email?: string | null }) {
  const id = useId();
  const [topic, setTopic] = useState(defaultTopic ?? contact.categories[0]);
  const [status, setStatus] = useState<"idle" | "unavailable">("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    if (!email) {
      setStatus("unavailable");
      return;
    }
    const data = new FormData(form);
    const body = [`Name: ${data.get("name")}`, `Phone / email: ${data.get("reach")}`, "", String(data.get("message") ?? "")].join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Enquiry — ${topic}`)}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "peer w-full border-0 border-b border-white/20 bg-transparent px-0 pb-3 pt-7 text-lg text-paper placeholder-transparent transition-colors focus:border-accent-soft focus:outline-none focus:ring-0";
  const label =
    "eyebrow pointer-events-none absolute left-0 top-7 text-paper/45 transition-all duration-300 peer-focus:top-0 peer-focus:!text-[10px] peer-focus:text-accent-soft peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:!text-[10px]";

  return (
    <form onSubmit={onSubmit} noValidate={false} aria-describedby={`${id}-status`}>
      <fieldset>
        <legend className="eyebrow mb-5 text-paper/45">Type of enquiry</legend>
        <div className="flex flex-wrap gap-2">
          {contact.categories.map((c) => (
            <label key={c} className="cursor-pointer">
              <input type="radio" name="topic" value={c} checked={topic === c} onChange={() => setTopic(c)} className="peer sr-only" />
              <span
                className={cn(
                  "eyebrow inline-block rounded-full border px-4 py-2.5 !tracking-[0.16em] transition-colors duration-500 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-soft",
                  topic === c ? "border-paper bg-paper text-ink" : "border-white/15 text-paper/65 hover:border-white/40",
                )}
              >
                {c} enquiry
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
        <div className="relative">
          <input id={`${id}-name`} name="name" required autoComplete="name" placeholder="Name" className={field} />
          <label htmlFor={`${id}-name`} className={label}>
            Your name
          </label>
        </div>
        <div className="relative">
          <input id={`${id}-reach`} name="reach" required autoComplete="email" placeholder="Phone or email" className={field} />
          <label htmlFor={`${id}-reach`} className={label}>
            Phone or email
          </label>
        </div>
        <div className="relative sm:col-span-2">
          <textarea id={`${id}-msg`} name="message" required rows={4} placeholder="Message" className={cn(field, "resize-none")} />
          <label htmlFor={`${id}-msg`} className={label}>
            How can we help?
          </label>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          data-cursor="arrow"
          className="group/arrow eyebrow inline-flex h-14 items-center justify-between gap-6 rounded-full bg-paper px-7 !tracking-[0.18em] text-ink transition-colors duration-500 hover:bg-white"
        >
          Contact MSP
          <Arrow />
        </button>
        <p id={`${id}-status`} role="status" className="max-w-xs text-sm text-paper/55">
          {status === "unavailable"
            ? "The MSP enquiry address is being confirmed. Please check back shortly."
            : ""}
        </p>
      </div>
    </form>
  );
}
