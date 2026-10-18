import { Fraunces, Noto_Serif } from "next/font/google";

/** Traditional serif used ONLY on the Saptagiri Finance page (shop-signboard character). */
export const financeSerif = Noto_Serif({ subsets: ["latin"], weight: ["600", "700"], display: "swap" });

/** Display serif for the homepage hero only — a warm, premium FMCG character. */
export const heroSerif = Fraunces({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], display: "swap" });
