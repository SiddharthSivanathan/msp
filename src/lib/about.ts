import { own, type ImageAsset } from "./media";

/**
 * About page — the MSP story, told simply, in the owner's voice.
 *
 * Rules: only verified facts are written as fact. Anything about the founder's
 * personal history (dates, places, struggles, incidents) is an OWNER ANSWER —
 * `answer: null` shows the question as an editable placeholder in review mode
 * and is hidden at launch. Fill `answer` with the owner's own words to publish it.
 */

export type OwnerAnswer = { question: string; answer: string | null };

export const founder = {
  name: "Mr. M Sevugaperumal",
  /** Real photograph only — never a stand-in. */
  portrait: own("founder", "Mr. M Sevugaperumal, founder of MSP", "portrait"),
};

export const opening = {
  heading: ["Every business has a beginning.", "This is ours."],
  message:
    "MSP did not become what it is today overnight. Like every business, our journey has had its own challenges, lessons and turning points. What started with a vision grew slowly — through hard work, relationships, and the determination to keep moving forward.",
  image: own("warehouse-loading", "The MSP team loading sacks onto MSP trucks in the warehouse", "warehouse"),
};

export const earlyDays = {
  heading: "Where it all started.",
  /** Verified: the founder's name (it is the company's name). */
  intro: "MSP was started by Mr. M Sevugaperumal. His name is still on the business today — M Sevugaperumal & Sons.",
  answers: [
    { question: "What inspired you to start the business? What were you doing before?", answer: null },
    { question: "Where and when did it begin — what was the very first business, shop or office like?", answer: null },
    { question: "What was hard in the early days? What were you unsure about?", answer: null },
    { question: "How did you win your first customers and earn their trust?", answer: null },
    { question: "On difficult days, what kept you going?", answer: null },
  ] as OwnerAnswer[],
  image: own("founder", "Mr. M Sevugaperumal, founder of MSP", "portrait"),
};

export const struggle = {
  heading: "What it takes to grow.",
  /** General truths about building a business — not claims about specific events. */
  lines: [
    "A business does not grow in a straight line. There are slow seasons, hard decisions, and days when the work is simply heavy.",
    "What carries it through is rarely one big moment. It is showing up every day, doing the work properly, keeping your word, and learning from what goes wrong.",
    "Trust takes years to earn. Every order delivered on time and every promise kept adds a little to it.",
  ],
  values: ["Hard work", "Patience", "Learning", "Responsibility", "Trust"],
  /** Specific challenges the owner chooses to share — published only once written by the owner. */
  answers: [
    { question: "Is there a moment or a challenge from the journey you would like to share in your own words?", answer: null },
  ] as OwnerAnswer[],
  image: own("sack-carry", "An MSP team member carrying a rice sack down the loading ramp", "people"),
};

export const growth = {
  heading: "How MSP grew.",
  intro:
    "Over time, the work led to new needs — and new needs led to new businesses. Today the MSP group works in six areas, each serving a different need, and each supporting the others.",
  /** Current business areas. The order they were started in is NOT verified — do not present this as a timeline. */
  areas: [
    { slug: "m-sevugaperumal-and-sons", name: "M Sevugaperumal & Sons", line: "brings established brands to the market through distribution and dealership." },
    { slug: "msp-traders", name: "MSP Traders", line: "supplies rice, groceries and everyday essentials in wholesale." },
    { slug: "msp-fresh-products", name: "MSP Fresh Products", line: "is our own brand — everyday products for the kitchen." },
    { slug: "msp-store", name: "MSP Store", line: "provides transportation across the Andaman & Nicobar Islands." },
    { slug: "msp-cargo-service", name: "MSP Cargo Service", line: "carries cargo between Chennai and Port Blair." },
    { slug: "saptagiri-finance", name: "Saptagiri Finance", line: "offers simple financial services for everyday needs." },
  ],
  closing: "Different businesses, one way of working — and one network that keeps goods, people and trust moving.",
  answers: [{ question: "In what order did the businesses start, and roughly when? (Only add this if you want a timeline shown.)", answer: null }] as OwnerAnswer[],
  images: [
    own("market-delivery", "MSP team delivering sacks at a busy market", "people"),
    own("fresh-range", "MSP Fresh spice packs on a wooden table", "products"),
    own("fleet-yard", "MSP vans and goods carriers at the depot", "road"),
  ] as ImageAsset[],
};

export const people = {
  heading: "More than business, it’s about people.",
  lines: [
    "Behind every delivery there is a customer waiting for it, a partner who trusted us with their brand, and a team who did the lifting, the driving and the counting.",
    "These relationships were built slowly, over years. Looking after them is the most important part of our work.",
  ],
  groups: [
    { title: "Our customers", line: "who keep coming back — and tell others about us." },
    { title: "Our partners", line: "the brands and businesses who work alongside us." },
    { title: "Our team", line: "the people who do the work, every single day." },
  ],
  images: [
    own("market-unloading", "MSP team unloading rice sacks at the market", "people"),
    own("warehouse-stock-check", "Stock being checked in the warehouse", "warehouse"),
    own("lorry-inside", "MSP team unloading sacks from inside a lorry", "people"),
  ] as ImageAsset[],
};

/**
 * A SAMPLE DRAFT, not the founder's words. While `approved` is false it is
 * signed by the MSP family and marked "draft" in review mode. Set `approved:
 * true` only after the owner has read and approved it (edit freely first).
 */
export const message = {
  heading: "A message from us.",
  approved: false,
  paragraphs: [
    "When we look back at our journey, we see more than the business we have built. We see the people who trusted us, the lessons we learned, and the experiences that helped us grow.",
    "Every step has taught us something. Building a business is not only about expanding into new areas. It is also about keeping relationships, taking responsibility, and doing our work with sincerity.",
    "As we move forward, our aim is to keep learning, keep growing, and keep serving the people who have been part of our journey.",
  ],
};

export const closing = {
  heading: "Our journey continues.",
  line: "What began as one man’s business journey continues to grow — shaped by the people we serve and the relationships we build along the way.",
  image: own("fleet-yard-wide", "The MSP fleet lined up at the depot", "road"),
};
