import type { Metadata } from "next";
import { StoryClosing, StoryFounder, StoryOpening, StoryPurpose } from "@/components/about/AboutStory";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story of MSP — how Mr. M Sevugaperumal's business grew, through hard work and relationships, into a group of six businesses.",
  alternates: { canonical: "/about" },
};

/** The MSP story: the beginning → the founder → what we stand for → onward. */
export default function AboutPage() {
  return (
    <>
      <StoryOpening />
      <StoryFounder />
      <StoryPurpose />
      <StoryClosing />
    </>
  );
}
