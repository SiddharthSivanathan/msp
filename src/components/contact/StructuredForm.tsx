"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { Arrow } from "@/components/ui/ArrowLink";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  defaultValue?: string;
  autoComplete?: string;
  /** Grid span on wide screens. */
  wide?: boolean;
  hint?: string;
};

/**
 * Business-specific enquiry form (wholesale, cargo quote). Like EnquiryForm it
 * composes an email to the business — no backend is implied — and states
 * plainly when the receiving address hasn't been supplied yet.
 */
export function StructuredForm({
  fields,
  submitLabel,
  subject,
  email,
}: {
  fields: Field[];
  submitLabel: string;
  subject: string;
  email: string | null;
}) {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "unavailable">("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    if (!email) return setStatus("unavailable");
    const data = new FormData(form);
    const body = fields.map((f) => `${f.label}: ${String(data.get(f.name) ?? "").trim() || "—"}`).join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const input =
    "w-full border-0 border-b border-white/25 bg-transparent px-0 pb-3 pt-2 text-lg text-paper placeholder:text-paper/30 focus:border-sand focus:outline-none focus:ring-0";

  return (
    <form onSubmit={onSubmit} aria-describedby={`${id}-status`}>
      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className={cn(f.wide && "sm:col-span-2")}>
            <label htmlFor={`${id}-${f.name}`} className="eyebrow block text-paper/55">
              {f.label}
              {f.required && <span className="text-sand"> *</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea id={`${id}-${f.name}`} name={f.name} required={f.required} rows={4} defaultValue={f.defaultValue} className={cn(input, "resize-none")} />
            ) : (
              <input
                id={`${id}-${f.name}`}
                name={f.name}
                type={f.type ?? "text"}
                required={f.required}
                defaultValue={f.defaultValue}
                autoComplete={f.autoComplete}
                placeholder={f.hint}
                className={input}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          data-cursor="arrow"
          className="group/arrow eyebrow inline-flex h-14 items-center justify-between gap-6 rounded-full bg-paper px-7 !tracking-[0.18em] text-ink transition-colors duration-500 hover:bg-white"
        >
          {submitLabel}
          <Arrow />
        </button>
        <p id={`${id}-status`} role="status" className="max-w-xs text-sm text-paper/55">
          {status === "unavailable" ? "This enquiry address is being confirmed. Please check back shortly." : ""}
        </p>
      </div>
    </form>
  );
}

export const wholesaleFields: Field[] = [
  { name: "name", label: "Name", required: true, autoComplete: "name" },
  { name: "business", label: "Business name", autoComplete: "organization" },
  { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "product", label: "Product requirement", required: true, hint: "e.g. rice, groceries", wide: true },
  { name: "quantity", label: "Approximate quantity", wide: true },
  { name: "message", label: "Message", type: "textarea", wide: true },
];

export const cargoFields: Field[] = [
  { name: "name", label: "Name", required: true, autoComplete: "name" },
  { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", autoComplete: "email", wide: true },
  { name: "origin", label: "Origin", defaultValue: "Chennai", required: true },
  { name: "destination", label: "Destination", defaultValue: "Port Blair", required: true },
  { name: "cargoType", label: "Cargo type", required: true },
  { name: "quantity", label: "Quantity" },
  { name: "weight", label: "Weight", hint: "e.g. 500 kg" },
  { name: "dimensions", label: "Dimensions", hint: "L × W × H" },
  { name: "message", label: "Message", type: "textarea", wide: true },
];
