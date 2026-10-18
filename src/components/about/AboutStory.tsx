import Link from "next/link";
import { features } from "@/lib/content";
import { closing, earlyDays, founder, growth, message, opening, people, struggle, type OwnerAnswer } from "@/lib/about";
import { heroSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The About page as a story told by a real businessman: warm, plain words,
 * big photographs, short paragraphs. Unverified details are owner questions,
 * shown as dashed placeholders in review mode and hidden at launch.
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

/** An owner's answer, published in their words — or, until then, the question as a review-mode placeholder. */
function Answers({ items, dark = false }: { items: OwnerAnswer[]; dark?: boolean }) {
  return (
    <>
      {items.map((a) =>
        a.answer ? (
          <Reveal key={a.question}>
            <p className={cn(body, "mt-5", dark ? "text-paper/80" : "text-ink/75")}>{a.answer}</p>
          </Reveal>
        ) : features.showUnconfirmed ? (
          <p
            key={a.question}
            className={cn(
              "mt-4 rounded-sm border border-dashed px-4 py-3 text-sm leading-relaxed",
              dark ? "border-paper/30 text-paper/55" : "border-ink/25 text-ink/50",
            )}
          >
            <span className="eyebrow mr-2 !text-[9px] text-rust">Owner to answer</span>
            {a.question}
          </p>
        ) : null,
      )}
    </>
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

/* 2 ─ The early days -------------------------------------------------------- */

export function StoryEarlyDays() {
  return (
    <section aria-labelledby="early-title" className="bg-paper text-ink">
      <div className="shell grid-12 gap-y-12 py-24 sm:py-32 lg:py-40">
        <div className="order-2 col-span-12 lg:order-none lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal y={30}>
              <ImageSlot asset={earlyDays.image} caption={false} seed={21} className="aspect-[4/5]" sizes="(min-width:1024px) 40vw, 100vw" />
            </Reveal>
            <Reveal delay={0.1} className="mt-5 flex items-center gap-4">
              <ImageSlot asset={founder.portrait} caption={false} seed={22} className="aspect-square w-16 shrink-0 rounded-full" sizes="64px" />
              <div>
                <p className="eyebrow !text-[10px] text-ink/45">Founder</p>
                <p className="mt-1 font-display font-bold">{founder.name}</p>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-10">
          <Kicker>The early days</Kicker>
          <Reveal>
            <h2 id="early-title" className={h2}>{earlyDays.heading}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={cn(body, "mt-8 text-ink/75")}>{earlyDays.intro}</p>
          </Reveal>
          <Answers items={earlyDays.answers} />
        </div>
      </div>
    </section>
  );
}

/* 3 ─ What it takes to grow ------------------------------------------------- */

export function StoryStruggle() {
  return (
    <section aria-labelledby="struggle-title" className="bg-[#2E1C11] text-paper">
      <div className="shell grid-12 items-center gap-y-12 py-24 sm:py-32 lg:py-40">
        <div className="col-span-12 lg:col-span-6">
          <Kicker className="text-[#E9C27A]">The hard part</Kicker>
          <Reveal>
            <h2 id="struggle-title" className={h2}>{struggle.heading}</h2>
          </Reveal>
          <div className="mt-8 space-y-5">
            {struggle.lines.map((l, i) => (
              <Reveal key={l} delay={0.08 * i}>
                <p className={cn(body, "text-paper/80")}>{l}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#E9C27A]">
              {struggle.values.map((v, i) => (
                <span key={v} className="flex items-center gap-4">
                  {i > 0 && <span aria-hidden className="size-1 rounded-full bg-current opacity-60" />}
                  {v}
                </span>
              ))}
            </p>
          </Reveal>
          <Answers items={struggle.answers} dark />
        </div>
        <Reveal y={40} className="col-span-12 lg:col-span-5 lg:col-start-8">
          <ImageSlot asset={struggle.image} caption={false} parallax={5} className="aspect-[4/5]" sizes="(min-width:1024px) 40vw, 100vw" />
        </Reveal>
      </div>
    </section>
  );
}

/* 4 ─ How MSP grew ---------------------------------------------------------- */

export function StoryGrowth() {
  return (
    <section aria-labelledby="growth-title" className={cn(CREAM, "text-ink")}>
      <div className="shell py-24 sm:py-32 lg:py-40">
        <div className="grid-12 gap-y-8">
          <div className="col-span-12 lg:col-span-5">
            <Kicker>Growing step by step</Kicker>
            <Reveal>
              <h2 id="growth-title" className={h2}>{growth.heading}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-14">
            <p className={cn(body, "text-ink/75")}>{growth.intro}</p>
          </Reveal>
        </div>

        <ul className="mt-14 border-t border-ink/15 lg:mt-20">
          {growth.areas.map((a, i) => (
            <Reveal as="li" key={a.slug} y={14} delay={i * 0.04} className="border-b border-ink/15">
              <Link href={`/businesses/${a.slug}`} className="group grid gap-1 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6 lg:py-6">
                <span className={cn(serif, "text-[clamp(1.35rem,2.2vw,1.9rem)] font-medium leading-tight transition-colors group-hover:text-rust sm:col-span-5")}>{a.name}</span>
                <span className={cn(body, "text-ink/65 sm:col-span-7")}>{a.line}</span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-3">
          {growth.images.map((im, i) => (
            <Reveal key={im.src} delay={i * 0.08} className={cn(i === 0 && "col-span-2 lg:col-span-1")}>
              <ImageSlot asset={im} caption={false} seed={40 + i} className="aspect-[4/3]" sizes="(min-width:1024px) 33vw, 50vw" />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 max-w-3xl">
          <p className={cn(serif, "text-[clamp(1.35rem,2.2vw,1.85rem)] italic leading-snug text-ink/80")}>{growth.closing}</p>
        </Reveal>
        <div className="max-w-3xl">
          <Answers items={growth.answers} />
        </div>
      </div>
    </section>
  );
}

/* 5 ─ The people behind the business ---------------------------------------- */

export function StoryPeople() {
  const [lead, ...rest] = people.images;
  return (
    <section aria-labelledby="people-title" className="bg-paper text-ink">
      <div className="shell grid-12 gap-y-12 py-24 sm:py-32 lg:py-40">
        <div className="col-span-12 lg:col-span-5">
          <Kicker>The people</Kicker>
          <Reveal>
            <h2 id="people-title" className={h2}>{people.heading}</h2>
          </Reveal>
          <div className="mt-8 space-y-5">
            {people.lines.map((l, i) => (
              <Reveal key={l} delay={0.08 * i}>
                <p className={cn(body, "text-ink/75")}>{l}</p>
              </Reveal>
            ))}
          </div>
          <dl className="mt-10 space-y-5">
            {people.groups.map((g, i) => (
              <Reveal key={g.title} delay={0.06 * i} className="border-t border-ink/15 pt-4">
                <dt className="font-display font-bold">{g.title}</dt>
                <dd className="mt-1 text-ink/65">{g.line}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
        <div className="col-span-12 grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-6 lg:col-start-7">
          <Reveal y={40} className="col-span-2">
            <ImageSlot asset={lead} caption={false} seed={50} parallax={4} className="aspect-[16/10]" sizes="(min-width:1024px) 50vw, 100vw" />
          </Reveal>
          {rest.map((im, i) => (
            <Reveal key={im.src} y={30} delay={0.1 + i * 0.08}>
              <ImageSlot asset={im} caption={false} seed={51 + i} className="aspect-square" sizes="(min-width:1024px) 25vw, 50vw" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 6 ─ A message from us ----------------------------------------------------- */

export function StoryMessage() {
  return (
    <section aria-labelledby="message-title" className={cn(CREAM, "text-ink")}>
      <div className="shell py-24 sm:py-32 lg:py-40">
        <Reveal y={30}>
          <article className="relative mx-auto max-w-3xl border border-[#B58A3A]/30 bg-[#FBF7F0] px-6 py-12 shadow-[0_40px_80px_-50px_rgba(46,28,17,0.45)] sm:px-14 sm:py-16">
            {features.showUnconfirmed && !message.approved && (
              <span className="absolute right-4 top-4 rounded-full border border-dashed border-rust/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-rust">
                Sample draft — needs owner approval
              </span>
            )}
            <p className="eyebrow text-center text-rust">In our own words</p>
            <h2 id="message-title" className={cn(h2, "mt-4 text-center")}>{message.heading}</h2>
            <span aria-hidden className="mx-auto mt-6 block h-px w-16 bg-[#B58A3A]" />
            <div className="mt-10 space-y-6">
              {message.paragraphs.map((p) => (
                <p key={p} className={cn(serif, "text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.75] text-ink/80")}>{p}</p>
              ))}
            </div>
            <p className={cn(serif, "mt-10 text-right text-lg italic text-ink/70")}>
              — {message.approved ? founder.name : "The MSP family"}
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

/* 7 ─ Our journey continues ------------------------------------------------- */

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
