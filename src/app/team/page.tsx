import type { Metadata } from "next";
import { PeopleSection } from "@/components/sections/PeopleSection";

export const metadata: Metadata = {
  title: "Our Team",
  description: "The people behind the movement — the teams across MSP's six businesses.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <div className="bg-navy pt-16">
      <PeopleSection />
    </div>
  );
}
