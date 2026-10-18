"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { normalizeConsignment, validateConsignment } from "@/lib/tracking";
import { cn } from "@/lib/utils";
import { Arrow } from "@/components/ui/ArrowLink";

/**
 * Consignment number input. `onTrack` handles the lookup in place (tracking
 * page); without it the form navigates to /track-consignment?c=… (homepage,
 * cargo page).
 */
export function TrackingForm({
  initial = "",
  onTrack,
  busy = false,
  tone = "light",
  compact = false,
}: {
  initial?: string;
  onTrack?: (n: string) => void;
  busy?: boolean;
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  const id = useId();
  const router = useRouter();
  const [value, setValue] = useState(initial);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = normalizeConsignment(value);
    const err = validateConsignment(n);
    setError(err);
    if (err) return;
    if (onTrack) onTrack(n);
    else router.push(`/track-consignment?c=${encodeURIComponent(n)}`);
  };

  const dark = tone === "dark";
  return (
    <form onSubmit={submit} noValidate role="search" aria-label="Track a consignment">
      <label htmlFor={id} className={cn("eyebrow mb-3 block", dark ? "text-paper/60" : "text-ink/60")}>
        Enter consignment number
      </label>
      <div className={cn("flex flex-col gap-3 sm:flex-row", compact ? "" : "sm:items-stretch")}>
        <input
          id={id}
          name="consignment"
          inputMode="text"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="e.g. MSP2026XXXX"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={cn(
            "h-14 flex-1 border bg-transparent px-5 font-display text-lg font-bold uppercase tracking-[0.08em] placeholder:font-medium placeholder:normal-case placeholder:tracking-normal focus:outline-none",
            dark
              ? "border-paper/30 text-paper placeholder:text-paper/40 focus:border-sand"
              : "border-ink/25 bg-white text-ink placeholder:text-ink/40 focus:border-ocean",
          )}
        />
        <button
          type="submit"
          disabled={busy}
          className={cn(
            "group/arrow eyebrow inline-flex h-14 items-center justify-center gap-4 px-7 !tracking-[0.18em] transition-colors duration-500 disabled:opacity-60",
            dark ? "bg-sand text-ink hover:bg-paper" : "bg-navy text-paper hover:bg-ocean",
          )}
        >
          {busy ? "Checking…" : "Track shipment"}
          <Arrow />
        </button>
      </div>
      <p id={`${id}-err`} role="alert" className={cn("mt-3 min-h-5 text-sm", dark ? "text-sand" : "text-rust")}>
        {error}
      </p>
    </form>
  );
}
