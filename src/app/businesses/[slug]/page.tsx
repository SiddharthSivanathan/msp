import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { businesses, getBusiness } from "@/lib/businesses";
import { themes, themeVars } from "@/lib/themes";
import { BusinessPageBody } from "@/components/business-page/pages";

/**
 * Dedicated business pages. /businesses/cargo is also where the Phase 2 Cargo
 * Tracking System will attach (see `features.cargoTracking`).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/businesses/[slug]">): Promise<Metadata> {
  const b = getBusiness((await params).slug);
  if (!b) return {};
  const title = `${b.name} — ${b.category}`;
  return {
    title,
    description: `${b.positioning} ${b.summary}`,
    alternates: { canonical: `/businesses/${b.slug}` },
    openGraph: { title: `${title} | MSP`, description: b.summary, url: `/businesses/${b.slug}` },
  };
}

export default async function BusinessPage({ params }: PageProps<"/businesses/[slug]">) {
  const b = getBusiness((await params).slug);
  if (!b) notFound();
  const theme = themes[b.slug];

  return (
    <article style={themeVars(theme)} data-weight={theme.weight} className="bg-(--b-bg) text-(--b-ink)">
      <BusinessPageBody b={b} />
    </article>
  );
}
