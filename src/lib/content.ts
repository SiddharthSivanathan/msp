/**
 * MSP — single source of truth for site content.
 *
 * RULE: nothing in this file may be invented. Anything the client has not
 * confirmed is `null` (hidden in the UI) or marked with PLACEHOLDER so it is
 * easy to find with a search. Replace values here; components never need
 * to change for a content update.
 */

import { img, ph, type ImageAsset } from "./media";

export * from "./media";
export * from "./businesses";

/* -------------------------------------------------------------------------- */
/* Site                                                                        */
/* -------------------------------------------------------------------------- */

export const site = {
  name: "MSP",
  fullName: "MSP Business Group",
  tagline: "One Group. Many Possibilities.",
  headline: ["Wholesale.", "Distribution.", "Business."],
  heroLine: "One group. Different businesses.",
  supporting: "Building Business. Connecting Islands.",
  divisions: ["Wholesale", "Distribution", "Products", "Transport", "Cargo", "Finance"],
  title: "MSP — Wholesale. Distribution. Business Supply.",
  description:
    "MSP is a wholesale, trading and distribution business group — supplying rice, groceries and everyday essentials, representing established brands, and connecting businesses through transportation, cargo and financial services.",
  /** Set to the production domain once confirmed. Used for canonical / OG / sitemap. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3400",
};

/**
 * Future product modules. Kept here so navigation and routes can light them up
 * without restructuring. Nothing is rendered for a disabled feature.
 */
export const features = {
  /** Phase 2 — Cargo Tracking System (tracking, booking, customer login…). */
  cargoTracking: false,
  /**
   * Review mode: show items the brief lists as *possible* (status "suggested")
   * with a "To confirm" badge. Set false at launch to hide anything unconfirmed.
   */
  showUnconfirmed: true,
};

export const nav = [
  { label: "About", href: "/about" },
  { label: "Businesses", href: "/businesses" },
  { label: "Track Consignment", href: "/track-consignment" },
  { label: "Our Team", href: "/team" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

/* -------------------------------------------------------------------------- */
/* Brand partners (M Sevugaperumal & Sons) — ONLY confirmed brands.           */
/* -------------------------------------------------------------------------- */

export type Partner = {
  name: string;
  /** Registered company behind the brand. */
  company?: string;
  /** Official logo file in /public/brands once supplied; wordmark shown until then. */
  logo: string | null;
  /** Client-supplied only — never written for the brand. */
  description: string | null;
  /** Product imagery for the brand, once supplied / cleared for use. */
  image: ImageAsset;
};

export const partners: Partner[] = [
  {
    name: "Aachi Masala",
    company: "Aachi Masala Foods (P) Ltd",
    // The only logo on aachifoods.com is the online-shop mark, so the wordmark is used until the client supplies the brand logo.
    logo: null,
    description: null,
    // Official Aachi product artwork from aachifoods.com ("Authentic taste of Indian Cuisine"), cropped to the packs.
    image: { src: "/brands/aachi-masala-range.jpg", alt: "Aachi masala range — Garam Masala, Coriander, Chilli and Turmeric Powder, Sambar, Biryani, Mutton and Chicken Masala", direction: "Official Aachi product artwork", motif: "products", artwork: true },
  },
  {
    name: "Bhole Baba",
    company: "Bhole Baba Milk Food Industries (Dholpur) Pvt. Ltd.",
    // Logo and packshots from the company's official site, bholebabadlp.com (its "Dholpur Fresh" range).
    logo: "/brands/dholpur-fresh-logo.png",
    description: null,
    image: { src: "/brands/bhole-baba-ghee.jpg", alt: "Dholpur Fresh desi ghee and cow ghee jars", direction: "Bhole Baba / Dholpur Fresh packshots", motif: "products", contain: true, artwork: true },
  },
  // Add further brands here only once the client confirms them.
];

/* -------------------------------------------------------------------------- */
/* People — real names, roles and portraits only.                              */
/* -------------------------------------------------------------------------- */

export const teamDepartments = [
  "Leadership",
  "Operations",
  "Cargo",
  "Trading",
  "Distribution",
  "Finance",
  "Administration",
] as const;

export type TeamMember = {
  name: string | null;
  designation: string | null;
  department: (typeof teamDepartments)[number];
  business: string | null;
  portrait: ImageAsset;
};

const portrait = (department: string) =>
  img("portrait", `Portrait — ${department}. Natural light, neutral backdrop, waist up`, `Portrait of an MSP team member, ${department}`, "navy");

/** One slot per department until real profiles arrive. */
export const team: TeamMember[] = teamDepartments.map((department) => ({
  name: null,
  designation: null,
  department,
  business: null,
  portrait: portrait(department),
}));

/* -------------------------------------------------------------------------- */
/* Gallery                                                                     */
/* -------------------------------------------------------------------------- */

export const galleryCategories = [
  "All",
  "Warehouse",
  "Trade",
  "Distribution",
  "People",
  "Operations",
  "Transport",
  "Cargo",
  "Port",
] as const;

export type GalleryItem = ImageAsset & {
  category: Exclude<(typeof galleryCategories)[number], "All">;
  ratio: "tall" | "wide" | "square";
};

const g = (category: GalleryItem["category"], ratio: GalleryItem["ratio"], asset: ImageAsset): GalleryItem => ({
  ...asset,
  category,
  ratio,
});

export const gallery: GalleryItem[] = [
  g("Warehouse", "wide", ph("warehouseAisle", "Warehouse aisle", "A warehouse aisle with cartons", "warehouse")),
  g("Trade", "tall", ph("chillies", "Spices and essentials", "A sack of dried red chillies", "products")),
  g("Distribution", "square", ph("groceryShelves", "Products on shelf", "Stocked retail shelves", "products")),
  g("People", "square", ph("loadingVan", "Delivery crew", "Workers beside a delivery truck", "people")),
  g("Trade", "wide", ph("spiceMarket", "Market", "Colourful spice powders at a market", "products")),
  g("Operations", "tall", ph("workersUnload", "Loading operation", "People loading sacks into a truck", "people")),
  g("Warehouse", "square", ph("warehouseRacks", "Racks", "Cartons stacked high", "warehouse")),
  g("Transport", "wide", ph("truckTarp", "MSP truck", "A loaded truck with a tarpaulin cover", "road")),
  g("Distribution", "square", ph("cartons", "Cartons for dispatch", "Cartons ready for dispatch", "products")),
  g("Cargo", "wide", ph("portYard", "Container yard at dusk", "A container port at dusk", "containers")),
  g("Port", "square", ph("hero", "Vessel at port", "A container ship with hills behind", "sea")),
  g("Transport", "square", ph("truckEicher", "Vehicle on site", "A goods truck", "road")),
];

/* -------------------------------------------------------------------------- */
/* Contact — use ONLY client-supplied details. null = hidden / placeholder.    */
/* -------------------------------------------------------------------------- */

export const contact = {
  phone: null as string | null,
  email: null as string | null,
  address: null as string | null,
  social: [] as { label: string; href: string }[],
  categories: ["Distribution", "Transportation", "Wholesale", "Cargo", "Fresh Products", "Finance", "General"],
};
