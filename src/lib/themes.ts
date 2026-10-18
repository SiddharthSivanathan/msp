import type { BusinessSlug } from "./businesses";

/**
 * One master brand, six expressions. Each dedicated page sets these as CSS
 * variables on its wrapper; shared components read them, so the system stays
 * identical while every business keeps its own palette.
 */
export type Theme = {
  bg: string;
  alt: string;
  ink: string;
  accent: string;
  dark: boolean;
  /** Finance uses a lighter, quieter heading weight. */
  weight: "bold" | "light";
};

export const themes: Record<BusinessSlug, Theme> = {
  // Distribution — warm, product-inspired
  "m-sevugaperumal-and-sons": { bg: "#F6EEE3", alt: "#EADBC6", ink: "#2A211B", accent: "#A4472A", dark: false, weight: "bold" },
  // Transportation — steel, road, industrial
  "msp-store": { bg: "#22292E", alt: "#2C353B", ink: "#EEF0EF", accent: "#D9B44A", dark: true, weight: "bold" },
  // Wholesale — earth, grain, warehouse
  "msp-traders": { bg: "#EFE7D8", alt: "#E2D6BF", ink: "#2B2419", accent: "#8A6534", dark: false, weight: "bold" },
  // Cargo — maritime navy, ocean, steel
  "msp-cargo-service": { bg: "#071A2B", alt: "#0C2638", ink: "#F4F1EA", accent: "#8FB3C9", dark: true, weight: "bold" },
  // Own products — fresh, natural, food-inspired
  "msp-fresh-products": { bg: "#FBF6EC", alt: "#F1E7D3", ink: "#2D2418", accent: "#C7541F", dark: false, weight: "bold" },
  // Finance — a traditional local finance shop: maroon, cream and brass
  "saptagiri-finance": { bg: "#FAF4E8", alt: "#F1E6D2", ink: "#2B1D16", accent: "#7A1F1F", dark: false, weight: "bold" },
};

export const themeVars = (t: Theme) =>
  ({
    "--b-bg": t.bg,
    "--b-alt": t.alt,
    "--b-ink": t.ink,
    "--b-accent": t.accent,
  }) as React.CSSProperties;
