import { features } from "@/lib/content";
import { closing, earlyDays, founder, opening, purpose } from "@/lib/about";
import { heroSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The About page: where MSP began, the man who started it, what MSP stands for.
 * Warm, plain words and big photographs. Only verified facts are written;
 * the founder's own story appears once he has told it (`earlyDays.answers`).
 */

const serif = heroSerif.className;
const CREAM = "bg-[#F6EEE3]";
const h2 = cn(serif, "text-[clamp(2.1rem,4.4vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.02em]");
const body = "text-[clamp(1.05rem,1.25vw,1.2rem)] leading-[1.7]";

function Kicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow mb-6 flex items-center gap-3 text-rust", className)}>
      <span aria-hidden className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

/* 1 ─ The story begins ------------------------------------------------------ */

export function StoryOpening() {
  return (
    <header className={cn(CREAM, "text-ink")}>
      <div className="shell grid-12 items-center gap-y-12 pb-20 pt-32 sm:pt-36 lg:min-h-[92svh] lg:pb-24 lg:pt-32">
        <div className="col-span-12 lg:col-span-6">
          <Reveal y={16}>
            <Kicker>Our story</Kicker>
          </Reveal>
          <Reveal y={24} delay={0.1}>
            <h1 className={cn(serif, "text-[clamp(2.6rem,5.6vw,5rem)] font-medium leading-[1.02] tracking-[-0.025em]")}>
              {opening.heading[0]} <em className="text-rust">{opening.heading[1]}</em>
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className={cn(body, "mt-8 max-w-[52ch] text-ink/75")}>{opening.message}</p>
          </Reveal>
        </div>
        <Reveal y={40} delay={0.2} className="col-span-12 lg:col-span-5 lg:col-start-8">
          <ImageSlot asset={opening.image} priority caption={false} className="aspect-[4/5] lg:aspect-[4/5]" sizes="(min-width:1024px) 40vw, 100vw" />
        </Reveal>
      </div>
    </header>
  );
}

/* 2 ─ The founder — a profile card beside his photograph -------------------- */

export function StoryFounder() {
  const told = earlyDays.answers.filter((a) => a.answer);
  return (
    <section aria-labelledby="founder-title" className="bg-paper text-ink">
      <div className="shell py-24 sm:py-32 lg:py-40">
        <Reveal className="mb-12 lg:mb-16">
          <Kicker>Where it all started</Kicker>
        </Reveal>
        <div className="grid-12 items-stretch gap-y-0">
          <Reveal y={30} className="col-span-12 lg:col-span-5">
            <ImageSlot asset={founder.portrait} caption={false} seed={21} className="aspect-[4/5] h-full" sizes="(min-width:1024px) 40vw, 100vw" />
          </Reveal>
          <Reveal y={30} delay={0.1} className="col-span-12 lg:col-span-7">
            <article className="flex h-full flex-col justify-center border border-[#B58A3A]/30 bg-[#FBF7F0] px-6 py-10 sm:px-12 sm:py-14 lg:border-l-0 lg:px-16">
              <p className="eyebrow text-rust">Founder</p>
              <h2 id="founder-title" className={cn(serif, "mt-4 text-[clamp(2.2rem,4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em]")}>
                {founder.name}
              </h2>
              <span aria-hidden className="mt-6 block h-px w-16 bg-[#B58A3A]" />
              <p className={cn(body, "mt-6 text-ink/75")}>{earlyDays.intro}</p>
              {told.map((a) => (
                <p key={a.question} className={cn(body, "mt-4 text-ink/75")}>{a.answer}</p>
              ))}
              <p className={cn(serif, "mt-6 text-[clamp(1.2rem,1.7vw,1.5rem)] italic leading-snug text-ink/85")}>{earlyDays.statement}</p>
              <dl className="mt-10 grid gap-5 border-t border-ink/15 pt-6 sm:grid-cols-3 sm:gap-6">
                {earlyDays.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="eyebrow !text-[10px] text-ink/45">{f.label}</dt>
                    <dd className="mt-2 font-display font-bold leading-snug">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* 3 ─ Vision & mission ------------------------------------------------------ */

export function StoryPurpose() {
  return (
    <section aria-labelledby="purpose-title" className="relative isolate overflow-hidden bg-[#2E1C11] text-paper">
      <ImageSlot asset={purpose.image} caption={false} parallax={6} className="!absolute inset-0 -z-10 h-full opacity-35" sizes="100vw" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(214,150,88,0.22),transparent_70%),linear-gradient(180deg,rgba(46,28,17,0.75),rgba(46,28,17,0.95))]" />
      <div className="shell py-24 sm:py-32 lg:py-40">
        <div className="text-center">
          <Kicker className="justify-center !text-[#E9C27A]">What we stand for</Kicker>
          <Reveal>
            <h2 id="purpose-title" className={cn(h2, "mx-auto max-w-3xl")}>
              Built on trust. <em className="text-[#E9C27A]">Guided by purpose.</em>
            </h2>
          </Reveal>
          {features.showUnconfirmed && !purpose.approved && (
            <p className="mx-auto mt-6 w-fit rounded-full border border-dashed border-[#E9C27A]/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#E9C27A]">
              Draft wording — owner to approve
            </p>
          )}
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-[#B58A3A]/35 bg-[#B58A3A]/35 lg:mt-20 lg:grid-cols-2">
          {[purpose.vision, purpose.mission].map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12} className="bg-[#2E1C11]/85 p-8 backdrop-blur-sm sm:p-12 lg:p-16">
              <p className={cn(serif, "text-6xl leading-none text-[#E9C27A]/40")} aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className={cn(serif, "mt-6 text-[clamp(1.8rem,3vw,2.6rem)] font-medium")}>{p.title}</h3>
              <span aria-hidden className="mt-5 block h-px w-14 bg-[#B58A3A]" />
              <p className={cn(body, "mt-6 text-paper/80")}>{p.text}</p>
            </Reveal>
          ))}
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-20 lg:grid-cols-4">
          {purpose.values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 0.08} className="text-center">
              <span aria-hidden className="mx-auto block size-2 rotate-45 bg-[#E9C27A]" />
              <p className={cn(serif, "mt-5 text-xl font-medium sm:text-2xl")}>{v.title}</p>
              <p className="mt-2 text-sm text-paper/65 sm:text-base">{v.line}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 4 ─ Our journey continues ------------------------------------------------- */

export function StoryClosing() {
  return (
    <section aria-labelledby="closing-title" className="relative isolate overflow-hidden bg-[#2E1C11] text-paper">
      <ImageSlot asset={closing.image} caption={false} parallax={6} className="!absolute inset-0 -z-10 h-full" sizes="100vw" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(46,28,17,0.55),rgba(46,28,17,0.85))]" />
      <div className="shell flex min-h-[70svh] flex-col items-center justify-center py-24 text-center">
        <Reveal>
          <h2 id="closing-title" className={cn(serif, "text-[clamp(2.4rem,5.4vw,4.75rem)] font-medium leading-[1.03] tracking-[-0.025em]")}>
            {closing.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={cn(body, "mx-auto mt-6 max-w-[48ch] text-paper/80")}>{closing.line}</p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          <ArrowLink href="/businesses" variant="solid">Explore our businesses</ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
