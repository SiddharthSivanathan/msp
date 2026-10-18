import type { MetadataRoute } from "next";
import { businesses, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...["about", "businesses", "track-consignment", "team", "gallery", "contact"].map((p) => ({
      url: `${site.url}/${p}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...businesses.map((b) => ({ url: `${site.url}/businesses/${b.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
