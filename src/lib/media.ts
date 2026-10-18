import { photos, type PhotoKey } from "./photos";

/**
 * Every image on the site goes through an ImageAsset. While `src` is null the
 * site renders an art-directed placeholder that shows the brief for the shot
 * (`direction`). To go live: drop the photo in /public/images/... and set `src`.
 */
export type Motif =
  | "containers"
  | "road"
  | "sea"
  | "grain"
  | "warehouse"
  | "architecture"
  | "portrait"
  | "route"
  | "products"
  | "people";

export type Tone = "navy" | "ocean" | "steel" | "sand" | "paper" | "night";

export type ImageAsset = {
  src: string | null;
  alt: string;
  /** Brief for the MSP photograph that should ultimately fill this slot. */
  direction: string;
  motif: Motif;
  tone?: Tone;
  /** True while `src` is interim stock photography, not MSP's own. */
  interim?: boolean;
  credit?: string;
  /** Show the whole image (logos, small packshots) instead of cropping to fill. */
  contain?: boolean;
  /** Official brand artwork — shown with its own colours (no photo grade). */
  artwork?: boolean;
};

export const img = (motif: Motif, direction: string, alt: string, tone?: Tone): ImageAsset => ({
  src: null,
  alt,
  direction,
  motif,
  tone,
});

/**
 * An interim photograph for a slot. `alt` describes what is shown; `direction`
 * is the brief for the real MSP photo that replaces it.
 */
export const ph = (key: PhotoKey, direction: string, alt?: string, motif: Motif = "warehouse"): ImageAsset => ({
  src: photos[key].src,
  alt: alt ?? photos[key].stockAlt,
  direction,
  motif,
  interim: true,
  credit: photos[key].credit,
});

/** Placeholder tokens — search for these to find every gap the client must fill. */
export const PLACEHOLDER = "[CLIENT TO PROVIDE]";
export const TODO = {
  service: "[ADD SERVICE DETAILS]",
  photos: "[ADD BUSINESS PHOTOS]",
  staff: "[ADD STAFF INFORMATION]",
  brands: "[ADD CONFIRMED BRAND PARTNERS]",
  contact: "[ADD CONTACT DETAILS]",
  products: "[ADD PRODUCT CATEGORIES]",
  productInfo: "[PRODUCT INFORMATION TO BE ADDED]",
} as const;

/** MSP's own photography, supplied by the client (public/images/msp). Never flagged as interim. */
export const own = (file: string, alt: string, motif: Motif = "warehouse"): ImageAsset => ({
  src: `/images/msp/${file}.jpg`,
  alt,
  direction: alt,
  motif,
});
