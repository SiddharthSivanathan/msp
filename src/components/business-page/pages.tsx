import type { Business, BusinessSlug } from "@/lib/businesses";
import { RouteMap } from "@/components/ui/RouteMap";
import { Reveal } from "@/components/ui/Reveal";
import { TrackingBand } from "@/components/sections/TrackingBand";
import { AboutBlock } from "./AboutBlock";
import { AudienceBlock } from "./AudienceBlock";
import { BrandShowcase } from "./BrandShowcase";
import { BusinessGallery } from "./BusinessGallery";
import { BusinessHero } from "./BusinessHero";
import { CategoryStack } from "./CategoryStack";
import { EnquiryBlock } from "./EnquiryBlock";
import { FinanceContact, FinanceCounter, FinanceHelp, FinanceRelationships, FinanceSteps, FinanceValuables } from "./FinanceSections";
import { NextBusiness, RelatedBusinesses } from "./EcosystemNav";
import { IslandMap } from "./IslandMap";
import { JourneyTrack } from "./JourneyTrack";
import { OfferBlock } from "./OfferBlock";
import { ProcessTimeline } from "./ProcessTimeline";
import { ProductBanners } from "./ProductBanners";
import { ProductShowcase } from "./ProductShowcase";
import { ProductStrip } from "./ProductStrip";
import { Statement } from "./Statement";
import { VisualCollage } from "./VisualCollage";
import { VoyageJourney } from "./VoyageJourney";

/**
 * Six business worlds. Each page has its own hero, signature section and
 * motion language; only the MSP chrome, type system and enquiry tail are shared.
 */

/** 01 — Distribution world: brands → warehouse → market. Products slide; brands reveal in turn. */
function DistributionPage({ b }: { b: Business }) {
  return (
    <>
      <BusinessHero b={b} />
      <AboutBlock b={b} />
      <BrandShowcase />
      <JourneyTrack id="journey" object="carton" eyebrow="The distribution journey" heading={["Brand to", "customer."]} steps={b.process.steps} />
      <Statement b={b} />
      <OfferBlock b={b} variant="rows" />
      <ProductStrip heading={["In the", "market."]} images={[...b.visuals.images, ...b.gallery]} />
    </>
  );
}

/** 02 — Transport world: the road. Directional motion, a truck on the route, the islands. */
function TransportPage({ b }: { b: Business }) {
  return (
    <>
      <BusinessHero b={b} />
      <AboutBlock b={b} />
      <OfferBlock b={b} variant="rows" id="services" surface="alt" />
      <JourneyTrack object="truck" eyebrow={b.process.eyebrow} heading={["Pickup to", "destination."]} steps={b.process.steps} />
      <Statement b={b} />
      <IslandMap />
      <VisualCollage b={b} />
      <BusinessGallery b={b} surface="alt" />
    </>
  );
}

/** 03 — Wholesale world: the warehouse. Categories stack like aisles; the process is an order docket. */
function WholesalePage({ b }: { b: Business }) {
  return (
    <>
      <BusinessHero b={b} />
      <AboutBlock b={b} />
      <CategoryStack b={b} />
      <ProcessTimeline b={b} variant="ledger" surface="alt" />
      <Statement b={b} />
      <AudienceBlock b={b} />
      <VisualCollage b={b} surface="alt" />
      <BusinessGallery b={b} />
    </>
  );
}

/** 04 — Maritime world: tracking first, then the route, the services and the voyage. */
function CargoPage({ b }: { b: Business }) {
  return (
    <>
      <BusinessHero b={b} />
      <TrackingBand tone="dark" />
      <AboutBlock b={b}>
        <Reveal className="-mx-4 mt-16 sm:mx-0 lg:mt-24">
          <RouteMap />
          <p className="mt-4 text-xs opacity-50">Chart is illustrative and not for navigation.</p>
        </Reveal>
      </AboutBlock>
      <OfferBlock b={b} variant="rows" surface="alt" />
      <VoyageJourney b={b} />
      <BusinessGallery b={b} surface="bg" />
    </>
  );
}

/** 05 — Consumer-product world: packaging, kitchen, shelves. Elegant product reveals. */
function ProductsPage({ b }: { b: Business }) {
  return (
    <>
      <BusinessHero b={b} />
      <AboutBlock b={b} />
      <OfferBlock b={b} variant="categories" id="products" />
      <ProductShowcase b={b} />
      <ProductBanners b={b} />
      <ProcessTimeline b={b} variant="horizontal" surface="alt" />
      <Statement b={b} />
      <VisualCollage b={b} />
    </>
  );
}

/**
 * 06 — Saptagiri Finance: a traditional local finance shop — maroon, cream and
 * brass; signboard hero; money, weighing and ornament photography; plain words.
 * No products, rates or claims.
 */
function FinancePage({ b }: { b: Business }) {
  return (
    <>
      <BusinessHero b={b} />
      <FinanceHelp />
      <FinanceCounter b={b} />
      <FinanceValuables b={b} />
      <FinanceSteps b={b} />
      <FinanceRelationships b={b} />
    </>
  );
}

const PAGES: Record<BusinessSlug, (p: { b: Business }) => React.ReactNode> = {
  "m-sevugaperumal-and-sons": DistributionPage,
  "msp-store": TransportPage,
  "msp-traders": WholesalePage,
  "msp-cargo-service": CargoPage,
  "msp-fresh-products": ProductsPage,
  "saptagiri-finance": FinancePage,
};

/** Shared tail for every business page: enquiry → business network → next business. */
export function BusinessPageBody({ b }: { b: Business }) {
  const Page = PAGES[b.slug];
  return (
    <>
      <Page b={b} />
      {b.slug === "saptagiri-finance" ? <FinanceContact b={b} /> : <EnquiryBlock b={b} />}
      <RelatedBusinesses b={b} />
      <NextBusiness b={b} />
    </>
  );
}
