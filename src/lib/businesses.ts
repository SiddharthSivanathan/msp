/**
 * The six MSP businesses — everything their homepage sections and dedicated
 * pages render comes from here.
 *
 * Every list item carries a `status`:
 *  - "confirmed"   → stated by the client; always shown.
 *  - "suggested"   → listed in the brief as a *possible* item; shown with a
 *                    "To confirm" badge while `features.showUnconfirmed` is on,
 *                    hidden entirely when it is off.
 *  - "placeholder" → a slot the client must fill (e.g. finance services).
 * Never upgrade an item to "confirmed" without the client's say-so.
 *
 * Images use `ph()` — interim licensed photography, flagged in review mode,
 * with a `direction` brief for the MSP photograph that should replace it.
 */
import { own, ph, TODO, type ImageAsset } from "./media";

export type Status = "confirmed" | "suggested" | "placeholder";
export type Item = { title: string; body?: string; status: Status; image?: ImageAsset };
export type Step = { step: string; note: string };

/** An own-brand product card. Every field stays null until the client supplies it. */
export type Product = {
  name: string | null;
  category: string;
  packSize: string | null;
  description: string | null;
  /** Only when supplied by the client — never invented. */
  ingredients?: string | null;
  usage?: string | null;
  image: ImageAsset;
};

export type BusinessSlug =
  | "m-sevugaperumal-and-sons"
  | "msp-store"
  | "msp-traders"
  | "msp-cargo-service"
  | "msp-fresh-products"
  | "saptagiri-finance";

export type Business = {
  slug: BusinessSlug;
  index: string;
  name: string;
  category: string;
  positioning: string;
  /** Homepage division section. */
  /** Homepage card: very short category + one tagline. No paragraphs. */
  card: { category: string; tagline: string };
  /** `href` defaults to the business page. */
  home: { lines: string[]; text: string; cta: string; href?: string };
  /** Dedicated page hero. */
  heroLines: string[];
  heroSupporting: string;
  /** Hero label, e.g. "Distribution & Dealership". */
  heroLabel: string;
  /** Hero calls to action — each business has its own user journey. */
  ctas: { primary: { label: string; href: string }; secondary?: { label: string; href: string } };
  /** Short introduction (navigation, metadata, related cards). */
  summary: string;
  topic: string;
  accent: string;
  image: ImageAsset;
  about: { heading: string; body: string[]; flow: string[]; flowLabel: string };
  /** Large full-bleed photographic statement on the dedicated page. */
  statement?: { lines: string[]; image: ImageAsset };
  offer?: { eyebrow: string; heading: string; items: Item[] };
  process: { eyebrow: string; heading: string; steps: Step[] };
  audience?: { heading: string; items: Item[] };
  /** Finance: valuables journey (status-gated until the client confirms the service). */
  valuables?: { status: Status; steps: { stage: string; note: string; image: ImageAsset }[] };
  /** Signature cargo voyage — stage, note, image. */
  journey?: { stage: string; note: string; image: ImageAsset }[];
  /** Own-brand product showcase (MSP Fresh Products). */
  products?: Product[];
  visuals: { heading: string; images: ImageAsset[] };
  gallery: ImageAsset[];
  /** Client-supplied product artwork shown uncropped (text is part of the image). */
  banners?: ImageAsset[];
  enquiry: { heading: string; label: string; form?: "general" | "wholesale" | "cargo" };
  /** Per-division contact overrides; falls back to the group contact. */
  contact: { phone: string | null; email: string | null };
};

const noContact = { phone: null, email: null };

export const businesses: Business[] = [
  /* ------------------------------------------------------------------ 01 */
  {
    slug: "m-sevugaperumal-and-sons",
    index: "01",
    name: "M Sevugaperumal & Sons",
    category: "Distribution",
    positioning: "Bringing brands closer.",
    card: { category: "Distribution", tagline: "Bringing brands closer." },
    home: {
      lines: ["Bringing", "brands closer."],
      text: "Bringing established brands closer to the market — distribution and dealership for brands such as Aachi Masala and Bhole Baba.",
      cta: "Explore distribution",
    },
    heroLines: ["Bringing", "brands closer."],
    heroLabel: "Distribution & Dealership",
    ctas: { primary: { label: "Explore our brands", href: "#brands" }, secondary: { label: "Enquire", href: "#enquiry" } },
    heroSupporting: "Distribution and dealership operations connecting established consumer brands with markets and customers.",
    summary:
      "M Sevugaperumal & Sons works in distribution and dealership, connecting established consumer brands with markets and customers through an organized distribution network.",
    topic: "Distribution",
    accent: "#A4472A",
    image: own("market-delivery", "MSP team delivering sacks from an MSP lorry at a busy market", "people"),
    about: {
      heading: "From the brand to the shelf.",
      body: [
        "M Sevugaperumal & Sons is the distribution and dealership business of the MSP group — bringing established brands such as Aachi Masala and Bhole Baba to the market.",
        "Its role is to help move products from brands into the markets where they are needed.",
      ],
      flow: ["Brands", "Distribution", "Market"],
      flowLabel: "The movement",
    },
    statement: {
      lines: ["Brands", "in motion."],
      image: own("lorry-street", "MSP lorry delivering at a market street", "road"),
    },
    offer: {
      eyebrow: "Distribution operations",
      heading: "What distribution involves.",
      items: [
        { title: "Product handling", status: "suggested" },
        { title: "Wholesale distribution", status: "suggested" },
        { title: "Market supply", status: "suggested" },
        { title: "Stock movement", status: "suggested" },
        { title: "Business relationships", status: "suggested" },
      ],
    },
    process: {
      eyebrow: "Distribution process",
      heading: "Brand to customer.",
      steps: [
        { step: "Brand", note: "Established consumer brands." },
        { step: "Product", note: "Products received from the brand." },
        { step: "Warehouse", note: "Stored and handled." },
        { step: "Distribution", note: "Moved through the distribution network." },
        { step: "Market", note: "Supplied to retailers and markets." },
        { step: "Customer", note: "On the shelf for the people who buy them." },
      ],
    },
    visuals: {
      heading: "On the shelf.",
      images: [
        ph("groceryShelves", "Partner-brand products in a retail store", "Stocked grocery store shelves", "products"),
        ph("warehouseBoxes", "Distribution stock in the warehouse", "Boxes in a distribution warehouse"),
        own("street-loading", "Stock being unloaded from an MSP truck at a market street", "people"),
        ph("shopShelves", "A retailer stocked by M Sevugaperumal & Sons", "A shopkeeper in a stocked store", "products"),
      ],
    },
    gallery: [
      ph("workersWalk", "Distribution warehouse at work", "Workers in a warehouse aisle", "people"),
      ph("cartons", "Cartons ready for dispatch", "Cartons ready for dispatch", "products"),
      own("lorry-inside", "MSP team unloading sacks from inside an MSP lorry", "people"),
      ph("spiceSeller", "Product reaching the market", "A vendor surrounded by spices", "products"),
    ],
    enquiry: { heading: "Looking for distribution support?", label: "Contact M Sevugaperumal & Sons" },
    contact: noContact,
  },

  /* ------------------------------------------------------------------ 02 */
  {
    slug: "msp-traders",
    index: "02",
    name: "MSP Traders",
    category: "Wholesale Trade",
    positioning: "Powering the everyday supply.",
    card: { category: "Wholesale", tagline: "Powering everyday supply." },
    home: {
      lines: ["Powering the", "everyday supply."],
      text: "Wholesale trading of rice, groceries and everyday essential products — supplying the businesses that serve their own customers.",
      cta: "Wholesale enquiry",
      href: "/businesses/msp-traders#enquiry",
    },
    heroLines: ["Powering the", "everyday supply."],
    heroLabel: "MSP Traders / Wholesale Trade",
    ctas: { primary: { label: "Explore products", href: "#products" }, secondary: { label: "Wholesale enquiry", href: "#enquiry" } },
    heroSupporting: "Wholesale supply of rice, groceries and everyday essential products.",
    summary:
      "MSP Traders operates in the wholesale supply of rice, groceries and everyday essential products, helping businesses access the products they need through a reliable supply network.",
    topic: "Wholesale",
    accent: "#B8894F",
    image: own("warehouse-loading", "MSP team loading rice and grocery sacks onto MSP trucks in the warehouse", "warehouse"),
    about: {
      heading: "A wholesale trading house for everyday essentials.",
      body: [
        "MSP Traders operates as a wholesale supply business, helping businesses source essential products in larger quantities.",
        "When essentials are supplied reliably they stay available — and when they are available, businesses can keep serving their own customers.",
      ],
      flow: ["Source", "Stock", "Wholesale", "Market"],
      flowLabel: "The supply chain",
    },
    statement: {
      lines: ["Supplying what", "business needs."],
      image: own("market-unloading", "Rice sacks unloaded from an MSP lorry at the market", "grain"),
    },
    offer: {
      eyebrow: "Product categories",
      heading: "What we supply.",
      items: [
        {
          title: "Rice",
          body: "Wholesale rice supply.",
          status: "confirmed",
          image: ph("riceScoop", "MSP rice — sacks and loose grain, warm light", "A scoop of white rice", "grain"),
        },
        {
          title: "Groceries",
          body: "Everyday grocery and essential products.",
          status: "confirmed",
          image: own("warehouse-stock-check", "Grocery stock being checked in the warehouse — rice sacks and cartons", "warehouse"),
        },
        {
          title: "Essentials",
          body: TODO.products,
          status: "placeholder",
          image: own("warehouse-floor", "Cartons of packaged products on pallets in the warehouse", "warehouse"),
        },
      ],
    },
    process: {
      eyebrow: "How wholesale works",
      heading: "From requirement to supply.",
      steps: [
        { step: "Requirement", note: "What you need, and for when." },
        { step: "Product selection", note: "The right products are identified." },
        { step: "Quantity", note: "Quantities are agreed." },
        { step: "Order", note: "The order is placed." },
        { step: "Supply", note: "Stock is prepared for you." },
        { step: "Delivery / collection", note: "Delivered, or ready to collect." },
      ],
    },
    audience: {
      heading: "Who we serve.",
      items: [
        { title: "Retailers", status: "suggested" },
        { title: "Businesses", status: "suggested" },
        { title: "Wholesale buyers", status: "suggested" },
        { title: "Local markets", status: "suggested" },
        { title: "Institutional customers", status: "suggested" },
      ],
    },
    visuals: {
      heading: "In the warehouse.",
      images: [
        own("warehouse-aisle", "Warehouse aisle with rice sacks on racks and cartons on pallets", "warehouse"),
        ph("riceGrain", "Rice, close detail", "A pile of rice grains", "grain"),
        own("sack-carry", "An MSP team member carrying a rice sack down the loading ramp", "people"),
        ph("spiceMarket", "Essentials at market", "A vendor selling spices at a market", "products"),
      ],
    },
    gallery: [
      own("street-loading", "Sacks being unloaded from an MSP truck", "people"),
      own("packaged-sweets", "Boxes of packaged sweets stacked on a shop shelf", "products"),
      ph("chillies", "Product detail", "A sack of dried red chillies", "products"),
      ph("shelvesTall", "Warehouse aisle", "Tall warehouse racks"),
      ph("truckTarp", "Dispatch vehicle", "A loaded truck", "road"),
    ],
    enquiry: { heading: "Looking for wholesale supply?", label: "Send a wholesale enquiry", form: "wholesale" },
    contact: noContact,
  },

  /* ------------------------------------------------------------------ 03 */
  {
    slug: "msp-fresh-products",
    index: "03",
    name: "MSP Fresh Products",
    category: "Own Products",
    positioning: "Everyday essentials. The MSP way.",
    card: { category: "Own products", tagline: "Everyday essentials." },
    home: {
      lines: ["Everyday essentials.", "The MSP way."],
      text: "MSP Fresh Products represents the group’s own product line, bringing everyday cooking essentials such as spice powders and cooking oils to the market under the MSP brand.",
      cta: "Explore products",
      href: "/businesses/msp-fresh-products#products",
    },
    heroLines: ["Everyday essentials.", "The MSP way."],
    heroLabel: "MSP Fresh Products / Own Products",
    ctas: { primary: { label: "Explore products", href: "#products" }, secondary: { label: "Product enquiry", href: "#enquiry" } },
    heroSupporting: "Everyday cooking essentials brought to market under the MSP brand.",
    summary:
      "MSP Fresh Products is the group’s own branded product line — everyday cooking essentials such as spice powders and cooking oils, sold under the MSP label.",
    topic: "Fresh Products",
    accent: "#C7541F",
    image: own("fresh-chilli-scene", "MSP Fresh Kashmiri Chilli Powder pack with dried chillies and chilli powder", "products"),
    about: {
      heading: "Our own products, under our own name.",
      body: [
        "MSP Fresh Products is the MSP group’s own branded product line. Unlike the brands distributed by M Sevugaperumal & Sons, or the wholesale goods traded by MSP Traders, these are products brought to market under the MSP label.",
        "The range begins with everyday cooking essentials: cooking powders, spice and masala products, and cooking oil. Further products will be added as the range grows.",
      ],
      flow: [],
      flowLabel: "",
    },
    statement: {
      lines: ["Quality for", "every kitchen."],
      image: ph("chillies", "MSP spice products in a home kitchen", "A sack of dried red chillies", "products"),
    },
    offer: {
      eyebrow: "Our products",
      heading: "The MSP range.",
      items: [
        {
          title: "Cooking powders",
          body: "Spice and cooking powder products.",
          status: "confirmed",
          image: own("pack-chilli", "MSP Fresh Kashmiri Chilli Powder pack", "products"),
        },
        {
          title: "Masala products",
          body: "MSP-branded masala products.",
          status: "confirmed",
          image: own("pack-pickle", "MSP Fresh Pickle Masala pack", "products"),
        },
        {
          title: "Neem oil",
          body: "MSP Fresh neem oil.",
          status: "confirmed",
          image: own("neem-oil", "A bottle of MSP Fresh Neem Oil with neem leaves and a bowl of oil", "products"),
        },
      ],
    },
    process: {
      eyebrow: "From MSP to your kitchen",
      heading: "From MSP to your kitchen.",
      steps: [
        { step: "MSP", note: "Products brought to market under the MSP label." },
        { step: "Product", note: "Cooking powders, spice products and cooking oil." },
        { step: "Packaging", note: "Packed under the MSP brand." },
        { step: "Distribution", note: "Moved to market through the MSP network." },
        { step: "Customer", note: "On the shelf, and into the kitchen." },
      ],
    },
    products: [
      // Names and pack sizes as printed on the client-supplied MSP Fresh packaging artwork.
      { name: "White Pepper Powder (Compounded)", category: "Cooking powders", packSize: "100 g", description: null, image: own("pack-pepper", "MSP Fresh White Pepper Powder pack", "products") },
      { name: "Kashmiri Chilli Powder", category: "Cooking powders", packSize: null, description: null, image: own("pack-chilli", "MSP Fresh Kashmiri Chilli Powder pack", "products") },
      { name: "Pickle Masala", category: "Masala products", packSize: "100 g", description: null, image: own("pack-pickle", "MSP Fresh Pickle Masala pack", "products") },
      { name: "Soya Chunks Mini", category: "Soya chunks", packSize: "200 g", description: null, image: own("pack-soya", "MSP Fresh Soya Chunks Mini pack", "products") },
    ],
    visuals: {
      heading: "In every kitchen.",
      images: [
        own("soya-scene", "MSP Fresh Soya Chunks Mini with soya chunks and a bowl of vegetable pulao", "products"),
        own("soya-bowl", "A bowl of pulao made with soya chunks", "products"),
        ph("chillies", "Raw ingredients", "A sack of dried red chillies", "products"),
      ],
    },
    gallery: [],
    banners: [
      own("fresh-banner-home", "MSP Fresh and Thara home & kitchen essentials — mustard oil, vinegar, rose water, neem oil, masalas and home-care products — “Your everyday home & kitchen essentials”", "products"),
      own("fresh-banner-spices", "MSP Fresh White Pepper Powder, Kashmiri Chilli Powder and Pickle Masala — “Sourced from the finest ingredients”", "products"),
      own("fresh-banner-soya", "MSP Fresh Soya Chunks Mini — “Tender, juicy & high in protein for everyday meals”", "products"),
    ],
    enquiry: { heading: "Interested in MSP products?", label: "Contact MSP Fresh Products" },
    contact: noContact,
  },

  /* ------------------------------------------------------------------ 04 */
  {
    slug: "msp-store",
    index: "04",
    name: "MSP Store",
    category: "Transportation",
    positioning: "Keeping the islands moving.",
    card: { category: "Transportation", tagline: "Keeping the islands moving." },
    home: {
      lines: ["Keeping the", "islands moving."],
      text: "Transportation that supports the MSP supply network — moving goods and business requirements across the Andaman & Nicobar Islands.",
      cta: "Explore transportation",
    },
    heroLines: ["Keeping the", "islands moving."],
    heroLabel: "MSP Store / Transportation",
    ctas: { primary: { label: "Our transport services", href: "#services" }, secondary: { label: "Request transport", href: "#enquiry" } },
    heroSupporting:
      "Transportation services supporting the movement of goods and business requirements across the Andaman & Nicobar Islands.",
    summary:
      "MSP Store provides transportation solutions across the Andaman & Nicobar Islands, helping businesses, goods and everyday requirements move efficiently from one destination to another.",
    topic: "Transportation",
    accent: "#D9B44A",
    image: own("fleet-yard", "MSP vans and goods carriers lined up at the depot", "road"),
    about: {
      heading: "Movement that keeps business going.",
      body: [
        "MSP Store focuses on transportation services across the Andaman & Nicobar Islands.",
        "On the islands, transport is what links a business to its locations, goods to the people waiting for them, and everyday requirements to where they are needed.",
      ],
      flow: ["Vehicle", "Road", "Cargo", "Destination"],
      flowLabel: "The journey",
    },
    statement: {
      lines: ["From here.", "To there."],
      image: ph("islandRoad", "Island road, MSP vehicle in the distance", "A paved road through tropical greenery", "road"),
    },
    offer: {
      eyebrow: "What MSP Store does",
      heading: "Transport, arranged around the requirement.",
      items: [
        { title: "Local transport", body: "Movement of goods between destinations across the islands.", status: "suggested" },
        { title: "Business transport", body: "Transportation support for businesses requiring regular movement of goods.", status: "suggested" },
        { title: "Goods movement", body: "Movement of products and materials to their required destinations.", status: "suggested" },
        { title: "Delivery support", body: "Transportation coordination based on customer requirements.", status: "suggested" },
      ],
    },
    process: {
      eyebrow: "The transport journey",
      heading: "Pickup to destination.",
      steps: [
        { step: "Pickup", note: "Goods are collected from the origin." },
        { step: "Loading", note: "Loaded and secured for the journey." },
        { step: "Transport", note: "On the road across the islands." },
        { step: "Destination", note: "Delivered where they are needed." },
      ],
    },
    visuals: {
      heading: "Transport in motion.",
      images: [
        own("vans-side", "MSP vans parked, side view", "road"),
        ph("loadingTempo", "Goods being loaded into an MSP vehicle", "Boxes being unloaded from a truck onto a trolley"),
        own("vans-rear", "MSP vans, rear view with cargo doors", "road"),
        own("vans-front", "Two MSP vans on Andaman & Nicobar registration", "road"),
      ],
    },
    gallery: [
      own("fleet-yard-wide", "MSP fleet lined up at the depot", "road"),
      own("vans-pair", "Two MSP vans parked side by side", "road"),
      ph("cartonsCart", "Goods ready for transport", "A trailer loaded with cardboard boxes", "products"),
      ph("islandRoad", "Island road, wide", "A road through tropical greenery", "road"),
      ph("loadingTempo", "Loading bay", "Boxes being unloaded from a truck"),
    ],
    enquiry: { heading: "Need to move something?", label: "Contact MSP Store" },
    contact: noContact,
  },

  /* ------------------------------------------------------------------ 05 */
  {
    slug: "msp-cargo-service",
    index: "05",
    name: "MSP Cargo Service",
    category: "Cargo & Shipping",
    positioning: "Mainland to island.",
    card: { category: "Cargo & Shipping", tagline: "Mainland to island." },
    home: {
      lines: ["Mainland", "to island."],
      text: "Moving goods between mainland and island — cargo transportation from Chennai to Port Blair.",
      cta: "Explore cargo services",
    },
    heroLines: ["Mainland", "to island."],
    heroLabel: "MSP Cargo Service / Cargo & Shipping",
    ctas: { primary: { label: "Track your consignment", href: "/track-consignment" }, secondary: { label: "Ship your cargo", href: "#enquiry" } },
    heroSupporting: "Cargo transportation connecting Chennai with Port Blair.",
    summary:
      "MSP Cargo Service handles cargo movement between Chennai and Port Blair, supporting customers with the transportation of different types of cargo from mainland to island.",
    topic: "Cargo",
    accent: "#8FB3C9",
    image: ph("portDusk", "Port cranes at Chennai, dusk", "Container cranes at a port at dusk", "containers"),
    about: {
      heading: "Where we connect.",
      body: [
        "MSP Cargo Service handles cargo movement from Chennai to Port Blair.",
        "Every shipment follows the same journey — from the first enquiry on the mainland to its arrival at Port Blair — and we want every customer to understand each stage of it.",
      ],
      flow: ["Chennai", "Port", "Sea", "Port Blair", "Destination"],
      flowLabel: "The route",
    },
    offer: {
      eyebrow: "Cargo services",
      heading: "What we handle.",
      items: [
        { title: "Cargo booking", status: "suggested" },
        { title: "Cargo transportation", status: "suggested" },
        { title: "Shipment coordination", status: "suggested" },
        { title: "Chennai → Port Blair movement", status: "suggested" },
        { title: "Cargo handling", status: "suggested" },
      ],
    },
    process: {
      eyebrow: "How cargo works",
      heading: "Six stages. One crossing.",
      steps: [
        { step: "Enquiry", note: "Customer shares cargo requirements." },
        { step: "Cargo assessment", note: "Cargo details, dimensions, quantity and requirements are reviewed." },
        { step: "Booking", note: "Transportation arrangements are confirmed." },
        { step: "Loading", note: "Cargo is prepared and loaded for shipment." },
        { step: "Shipment", note: "Cargo moves from Chennai towards Port Blair." },
        { step: "Destination", note: "Cargo reaches Port Blair for the next stage of delivery/collection." },
      ],
    },
    journey: [
      { stage: "Chennai", note: "Mainland origin.", image: ph("portYard", "Chennai port, wide at dusk", "A container port at dusk", "containers") },
      { stage: "Cargo received", note: "Cargo handed over and documented.", image: ph("documents", "Cargo paperwork at the MSP Chennai office", "Paperwork being filled in", "products") },
      { stage: "Loading", note: "Prepared and loaded.", image: ph("workersUnload", "MSP cargo being loaded", "Workers loading sacks into a truck", "people") },
      { stage: "Port", note: "Moved to the port for shipment.", image: ph("craneLoading", "Cargo at the quayside, Chennai", "Cranes loading a container ship", "containers") },
      { stage: "Vessel", note: "On board for the crossing.", image: ph("shipPort", "Vessel alongside, Chennai", "A container ship at port", "containers") },
      { stage: "Sea journey", note: "Across the Bay of Bengal.", image: ph("shipSea", "Vessel at sea, Bay of Bengal", "A container ship at sea", "sea") },
      { stage: "Port Blair", note: "Arrival at the island port.", image: ph("hero", "Arrival at Port Blair beneath the hills", "A ship arriving beneath green hills", "sea") },
      { stage: "Destination", note: "Delivery or collection.", image: own("vans-front", "MSP vans for final delivery on the island", "road") },
    ],
    visuals: {
      heading: "From mainland to island.",
      images: [
        ph("documents", "Cargo enquiry and paperwork at the MSP Chennai office", "Paperwork being filled in at a desk", "products"),
        ph("cartons", "Cargo being checked and measured", "Packed cartons ready for assessment", "products"),
        ph("portYard", "Booked cargo staged at Chennai port", "A container port at dusk", "containers"),
        ph("craneLoading", "Crane loading cargo aboard, Chennai", "Cranes loading a container ship", "containers"),
        ph("shipSea", "Vessel at sea, Bay of Bengal", "A container ship at sea", "sea"),
        ph("andamanHarbour", "Arrival at Port Blair harbour", "Boats in an island harbour", "sea"),
      ],
    },
    gallery: [
      ph("shipPort", "Vessel alongside at port", "A container ship at a port", "containers"),
      ph("portYard", "Container yard", "Container yard and cranes", "containers"),
      ph("workersUnload", "Cargo team loading", "Workers loading sacks into a truck", "people"),
      ph("harbourSunset", "Harbour at sunset", "A ship in harbour at sunset", "sea"),
      ph("forklift", "Cargo warehouse", "A forklift in a cargo warehouse"),
      ph("hero", "Ship arriving under island hills", "A container ship with hills behind", "sea"),
    ],
    enquiry: { heading: "Ship your cargo.", label: "Request a cargo quote", form: "cargo" },
    contact: noContact,
  },

  /* ------------------------------------------------------------------ 06 */
  {
    slug: "saptagiri-finance",
    index: "06",
    name: "Saptagiri Finance",
    category: "Finance",
    positioning: "Financial support. Built on trust.",
    card: { category: "Financial services", tagline: "Supporting financial needs with trust." },
    home: {
      lines: ["Financial support.", "Built on trust."],
      text: "The financial-services business of the MSP group — supporting people’s financial needs with care.",
      cta: "Explore financial services",
    },
    heroLines: ["Financial Support,", "Built on Trust."],
    heroLabel: "Saptagiri Finance",
    ctas: { primary: { label: "Know More", href: "#trust" }, secondary: { label: "Contact Us", href: "#enquiry" } },
    heroSupporting: "Simple, dependable financial services for everyday needs.",
    summary:
      "Saptagiri Finance represents the financial-services side of the MSP group, focused on supporting customers and businesses through its financial operations.",
    topic: "Finance",
    accent: "#7A1F1F",
    image: ph("finBanglesRed", "Customer ornaments at the Saptagiri Finance counter", "Gold bangles on a red cloth", "products"),
    about: {
      heading: "Trust comes first.",
      body: [
        "Saptagiri Finance is the financial-services business of the MSP group.",
        "It exists to support people’s real financial needs — with care, security and respect. Details of its services are provided directly by Saptagiri Finance.",
      ],
      flow: [],
      flowLabel: "",
    },
    offer: {
      eyebrow: "Our services",
      heading: "Financial services.",
      items: [
        { title: "[Client-provided financial service]", body: TODO.service, status: "placeholder" },
        { title: "[Client-provided financial service]", body: TODO.service, status: "placeholder" },
        { title: "[Client-provided financial service]", body: TODO.service, status: "placeholder" },
      ],
    },
    process: {
      eyebrow: "Customer experience",
      heading: "A considered process.",
      steps: [
        { step: "Discuss", note: "Understand the customer’s requirement." },
        { step: "Assess", note: "Review the relevant details and valuables, where applicable." },
        { step: "Process", note: "Complete the required documentation." },
        { step: "Support", note: "Provide continued assistance throughout the process." },
      ],
    },
    /**
     * Valuables are part of the business (per the client brief), but the
     * product itself is NOT named: no "gold loan", rates, amounts, tenure or
     * schemes until Saptagiri Finance confirms the exact wording in writing.
     */
    valuables: {
      status: "confirmed",
      steps: [
        { stage: "Ornaments", note: "Customer valuables", image: ph("finTemple", "Customer’s gold ornament", "A traditional gold necklace", "products") },
        { stage: "Weighed & checked", note: "Examined carefully", image: ph("finScale", "Ornaments weighed at the counter", "A traditional weighing scale with brass pans", "products") },
        { stage: "Safe keeping", note: "Stored securely", image: ph("finLockers", "Secure storage", "Brass safe-deposit boxes", "architecture") },
        { stage: "Documentation", note: "Clearly recorded", image: ph("finWriting", "Documentation completed at the desk", "A man writing at a desk", "people") },
      ],
    },
    visuals: {
      heading: "Simple. Clear. Dependable.",
      images: [
        ph("finNotes", "Financial assistance handed to the customer", "A hand holding Indian rupee notes", "products"),
        ph("finHandover", "Money handed over at the counter", "Rupee notes being handed from one person to another", "people"),
        ph("finAssess", "Ornaments examined at the counter", "Jewellery being examined at a counter", "products"),
        ph("finDesk", "Saptagiri Finance staff at the customer desk", "A staff member at a desk in a simple office", "people"),
      ],
    },
    gallery: [],
    enquiry: { heading: "Let’s talk about your needs.", label: "Contact Saptagiri Finance" },
    contact: noContact,
  },
];

export const getBusiness = (slug: string) => businesses.find((b) => b.slug === slug);

/** Sons → Traders → Fresh Products → Store → Cargo → Finance → back to MSP. */
export const nextBusiness = (slug: BusinessSlug) => {
  const i = businesses.findIndex((b) => b.slug === slug);
  return businesses[i + 1] ?? null;
};
