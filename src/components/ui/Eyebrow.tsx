import { cn } from "@/lib/utils";

/** Small uppercase label with an index rule — used to open every section. */
export function Eyebrow({ children, index, className }: { children: React.ReactNode; index?: string; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      {index && <span className="tabular-nums opacity-60">{index}</span>}
      <span aria-hidden className="h-px w-8 bg-current opacity-40" />
      <span>{children}</span>
    </p>
  );
}
