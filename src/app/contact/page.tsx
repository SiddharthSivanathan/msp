import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { TrackingBand } from "@/components/sections/TrackingBand";

export const metadata: Metadata = {
  title: "Contact",
  description: "Enquire with MSP about distribution, transportation, wholesale supply, cargo, MSP products or financial services.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="bg-navy pt-16">
      <ContactSection />
      <TrackingBand tone="dark" />
    </div>
  );
}
