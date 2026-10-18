import type { Metadata } from "next";
import { BusinessNetwork } from "@/components/sections/BusinessNetwork";
import { QuickActions } from "@/components/sections/QuickActions";

export const metadata: Metadata = {
  title: "Businesses",
  description:
    "The MSP Business Network: M Sevugaperumal & Sons, MSP Store, MSP Traders, MSP Cargo Service, MSP Fresh Products and Saptagiri Finance.",
  alternates: { canonical: "/businesses" },
};

export default function BusinessesPage() {
  return (
    <div className="pt-16">
      <BusinessNetwork />
      <QuickActions />
    </div>
  );
}
