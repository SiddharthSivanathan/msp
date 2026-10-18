import { own } from "./media";

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
  /** A statement about the business today — not a quotation from the founder. */
  statement:
    "Every business carries something of the person who started it. Ours carries his name — and with it, a simple responsibility: work hard, deal fairly, and keep our word.",
  /** Profile facts — verified only. */
  facts: [
    { label: "The company", value: "M Sevugaperumal & Sons" },
    { label: "The group today", value: "Six businesses" },
    { label: "Where we work", value: "Mainland India and the Andaman & Nicobar Islands" },
  ],
  /** Published in this section only once answered — unanswered questions are not shown here. */
  answers: [
    { question: "What inspired you to start the business? What were you doing before?", answer: null },
    { question: "Where and when did it begin — what was the very first business, shop or office like?", answer: null },
    { question: "What was hard in the early days? What were you unsure about?", answer: null },
    { question: "How did you win your first customers and earn their trust?", answer: null },
    { question: "On difficult days, what kept you going?", answer: null },
  ] as OwnerAnswer[],
  image: own("founder", "Mr. M Sevugaperumal, founder of MSP", "portrait"),
};

/**
 * Vision & mission — DRAFT wording for the owner to approve (like Aachi's About
 * page). Statements of intent, not claims of fact. Set `approved: true` once
 * the owner has read and agreed them; until then review mode marks them "draft".
 */
export const purpose = {
  approved: false,
  image: own("market-unloading", "MSP team unloading rice sacks at a busy market", "grain"),
  vision: {
    title: "Our Vision",
    text: "To be a name people trust in every market we serve — bringing everyday essentials, good products and dependable services within reach of every business and every home, from mainland India to the Andaman & Nicobar Islands.",
  },
  mission: {
    title: "Our Mission",
    text: "To supply quality products at fair prices, do our work properly and on time, and deal with every customer, partner and member of our team honestly — building relationships that last.",
  },
  values: [
    { title: "Trust", line: "We keep our word." },
    { title: "Quality", line: "Products we would use at home." },
    { title: "Fair dealing", line: "Honest prices, honest business." },
    { title: "Service", line: "Doing the work properly, every day." },
  ],
};

export const closing = {
  heading: "Our journey continues.",
  line: "What began as one man’s business journey continues to grow — shaped by the people we serve and the relationships we build along the way.",
  image: own("fleet-yard-wide", "The MSP fleet lined up at the depot", "road"),
};
