import Link from "next/link";
import { businesses, nav, site } from "@/lib/content";
import { BrandLockup } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-paper">
      <div className="shell pt-24 lg:pt-32">
        <div className="grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-5">
            <Link href="/" aria-label="MSP — M Sevugaperumal & Sons — home" className="mb-10 inline-block">
              <BrandLockup size="lg" logoClassName="h-20 lg:h-24" />
            </Link>
            <p className="font-display text-[clamp(1.4rem,2.4vw,2rem)] font-extrabold uppercase leading-tight tracking-[-0.02em]">
              MSP — Wholesale.
              <br />
              Distribution. Supply.
            </p>
            <p className="mt-4 text-paper/50">{site.tagline}</p>
          </div>
          <nav aria-label="Footer" className="col-span-6 sm:col-span-4 lg:col-span-2 lg:col-start-8">
            <p className="eyebrow mb-5 text-paper/40">Navigate</p>
            <ul className="space-y-3 text-[0.95rem] text-paper/75">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-underline pb-0.5 hover:text-paper">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Businesses" className="col-span-6 sm:col-span-5 lg:col-span-3">
            <p className="eyebrow mb-5 text-paper/40">Businesses</p>
            <ul className="space-y-3 text-[0.95rem] text-paper/75">
              {businesses.map((b) => (
                <li key={b.slug}>
                  <Link href={`/businesses/${b.slug}`} className="link-underline pb-0.5 hover:text-paper">
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-white/10 py-8 lg:mt-28 text-xs text-paper/40 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.fullName}. All rights reserved.</p>
          <a href="#main" className="link-underline self-start pb-0.5 hover:text-paper">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
