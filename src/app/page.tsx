import { Hero } from "@/components/sections/Hero";
import { HomeBusinesses } from "@/components/sections/HomeBusinesses";
import { DistributionMoment, FreshMoment, GroupClosing, MovementPair, WholesaleMoment } from "@/components/sections/HomeMoments";

/**
 * "The MSP business world" — an impression, not an explanation.
 * One strong hero → our businesses (the main story) → wholesale → brands/products →
 * fresh products → transport + cargo → closing. Tracking lives in the nav, a link
 * under transport + cargo, and /track-consignment.
 * Wholesale, distribution and products lead; transport, cargo and finance follow.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <HomeBusinesses />
      <WholesaleMoment />
      <DistributionMoment />
      <FreshMoment />
      <MovementPair />
      <GroupClosing />
    </>
  );
}
