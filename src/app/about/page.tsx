import type { Metadata } from "next";
import {
  StoryClosing,
  StoryEarlyDays,
  StoryGrowth,
  StoryMessage,
  StoryOpening,
  StoryPeople,
  StoryStruggle,
} from "@/components/about/AboutStory";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story of MSP — how Mr. M Sevugaperumal's business grew, through hard work and relationships, into a group of six businesses.",
  alternates: { canonical: "/about" },
};

/** The MSP story, told simply: beginning → early days → growing → the group → people → a message → onward. */
export default function AboutPage() {
  return (
    <>
      <StoryOpening />
      <StoryEarlyDays />
      <StoryStruggle />
      <StoryGrowth />
      <StoryPeople />
      <StoryMessage />
      <StoryClosing />
    </>
  );
}
