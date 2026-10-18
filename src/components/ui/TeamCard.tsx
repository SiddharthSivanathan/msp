import type { TeamMember } from "@/lib/content";
import { PLACEHOLDER } from "@/lib/content";
import { ImageSlot } from "./ImageSlot";

export function TeamCard({ member, seed }: { member: TeamMember; seed: number }) {
  return (
    <article className="group" tabIndex={0} aria-label={`${member.name ?? "Team member"} — ${member.department}`}>
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-[1.2s] ease-[var(--ease-brand)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04]">
          <ImageSlot asset={member.portrait} seed={seed} caption={false} className="aspect-[3/4]" sizes="(min-width:1024px) 22vw, 50vw" />
        </div>
        <div className="absolute inset-x-0 bottom-0 translate-y-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-transparent p-5 pt-16 transition-transform duration-700 ease-[var(--ease-brand)] lg:translate-y-6 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100">
          <p className="font-display text-lg font-semibold tracking-[-0.03em]">{member.name ?? <span className="text-paper/50">Name — {PLACEHOLDER}</span>}</p>
          <p className="mt-1 text-sm text-paper/60">{member.designation ?? "Designation"}{member.business ? ` · ${member.business}` : ""}</p>
        </div>
      </div>
      <p className="eyebrow mt-4 flex items-center justify-between text-paper/50">
        <span>{member.department}</span>
        <span aria-hidden className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10 group-hover:bg-accent-soft" />
      </p>
    </article>
  );
}
