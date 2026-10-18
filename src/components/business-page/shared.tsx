import { features } from "@/lib/content";
import type { Item } from "@/lib/businesses";
import { cn } from "@/lib/utils";
import { SplitLines } from "@/components/ui/SplitLines";

/** Items the UI may render right now (review mode shows unconfirmed ones). */
export const visible = (items: Item[]) =>
  items.filter((i) => i.status === "confirmed" || features.showUnconfirmed);

export function StatusBadge({ status, className }: { status: Item["status"]; className?: string }) {
  if (status === "confirmed") return null;
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-dashed border-current px-2.5 py-1 !text-[9px] !tracking-[0.16em] opacity-55",
        className,
      )}
      title={status === "suggested" ? "Suggested in the brief — awaiting client confirmation" : "Client to provide"}
    >
      {status === "suggested" ? "To confirm" : "Client to provide"}
    </span>
  );
}

/** Eyebrow + masked headline used to open every business-page section. */
export function SectionHead({
  eyebrow,
  lines,
  id,
  className,
  size = "lg",
}: {
  eyebrow: string;
  lines: string[];
  id?: string;
  className?: string;
  size?: "lg" | "md";
}) {
  return (
    <div className={className}>
      <p className="eyebrow mb-8 flex items-center gap-3 text-(--b-accent)">
        <span aria-hidden className="h-px w-8 bg-current opacity-60" />
        {eyebrow}
      </p>
      <SplitLines
        id={id}
        lines={lines}
        className={cn(
          "b-heading",
          size === "lg" ? "text-[clamp(2.25rem,6vw,6rem)] leading-[0.95]" : "text-[clamp(1.9rem,4vw,4rem)] leading-none",
        )}
      />
    </div>
  );
}

/** Split a sentence into two balanced headline lines. */
export function toLines(text: string): string[] {
  const words = text.split(" ");
  if (words.length < 3) return [text];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}
