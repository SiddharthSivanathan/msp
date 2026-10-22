# MSP — Corporate Brand Website (Phase 1)

**One Group. Many Possibilities.**

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lenis

```bash
npm install
npm run dev     # http://localhost:3000 (or -p 3400)
npm run build   # production build
```

## Structure

```
src/
  app/
    page.tsx                     Homepage — the MSP business world (see "Business order and homepage positioning")
    about/page.tsx               /about — business-house profile
    businesses/[slug]/page.tsx   Dedicated pages: /businesses/{store,traders,cargo,sons,finance}
    sitemap.ts · robots.ts · opengraph-image.tsx · icon.svg
  lib/businesses.ts              The six businesses (in display order): hero, about, services, process, audience, visuals, gallery, CTA
  lib/content.ts                 Group content (partners, team, story, stats, contact, gallery) + feature flags
  lib/media.ts                   ImageAsset type, ph() for interim photos, placeholder tokens
  lib/photos.ts                  Interim photo registry (Unsplash) with credits
  lib/themes.ts                  Per-business palette (CSS variables) — one master brand, six expressions
  components/
    chrome/      Navbar, Footer, CustomCursor, ScrollProgress
    sections/    One file per homepage section
    business/       Shared business-section header/copy (homepage previews)
    business-page/  Dedicated-page blocks (Hero, About+Flow, Offer, Process, CargoStages, Audience,
                    BrandWall, VisualCollage, Gallery, Enquiry, Related, Next) and pages.tsx, which
                    composes a different narrative per business
    contact/        EnquiryForm — the one MSP contact system, preset per business
    ui/          ImageSlot, Motif, SplitLines, WordReveal, Reveal, ArrowLink, Counter,
                 TeamCard, BrandLogo, RouteMap, Logo, Eyebrow
    providers/   SmoothScroll (Lenis + reduced-motion aware MotionConfig)
```

## Brand logo

The official MSP logo (client artwork) is the Ganesha emblem in a green rounded frame, with the red **M.S.P**
wordmark inside. It is used unaltered in the header, mobile menu, footer, favicon (`app/icon.png`,
`app/apple-icon.png`) and the social preview image.

- `public/brand/msp-logo-original.jpg` is the file exactly as supplied.
- `public/brand/msp-logo.png` is identical, except that the white corners **outside** the rounded frame are
  transparent (1,719 px), so the badge sits on dark and light sections without a white box.
- Never re-type, redraw, recolour or stretch it. Scale by height only (ratio 365:441). Don't add "MSP" text
  beside it, because the wordmark is already in the badge.
- Header and footer use `BrandLockup`: logo | **M Sevugaperumal / & Sons** (two lines, inherits text colour).

## Business order and homepage positioning

01 M Sevugaperumal & Sons (Distribution & Dealership) · 02 MSP Traders (Wholesale Trade) ·
03 MSP Fresh Products (MSP-owned products) · 04 MSP Store (Transportation) ·
05 MSP Cargo Service (Cargo & Shipping) · 06 Saptagiri Finance (Financial Services).

The homepage is **"the MSP business world"**: an impression, not an explanation. Wholesale, distribution and
products lead; transport, cargo and finance follow.

1. Hero: a warm product mosaic (wholesale market sacks, spices, stocked shelves), "Wholesale. Distribution.
   Business." / "One group. Different businesses.", and the six business names along the bottom as links
2. Our businesses: an asymmetric editorial layout of six tiles, each tinted to its business's world
   (`HomeBusinesses.tsx`). This is the main story.
3. Wholesale & Supply moment → MSP Traders
4. Brands. Products. Markets. moment (sliding product strip) → M Sevugaperumal & Sons
5. MSP Fresh Products moment
6. Moving the goods: MSP Store + MSP Cargo Service, plus a one-line "Track your consignment" link
7. Closing: "One group. Different businesses." → /businesses

No intro slideshow or conceptual "explainer" before the businesses: the hero leads straight into them.

Do not add explanations, service lists, product lists or company history here. That depth belongs on the
business pages, `/businesses`, `/about`, `/team` and `/gallery`.

Shipping imagery, the Chennai → Port Blair route and tracking belong mainly on the MSP Cargo Service page.
Order, numbering, menus, footer, related cards and the next-business chain all follow the array order in
`businesses.ts`.

Keep three of these clearly separate. **M Sevugaperumal & Sons** distributes other companies' brands.
**MSP Traders** trades rice, groceries and essentials wholesale. **MSP Fresh Products** is MSP's own label.

## Visual direction

A premium modern **trading & logistics house**, not a tech company:
navy `#071A2B` · maritime `#123B55` · off-white `#F4F1EA` · sand `#D8C7A3` · charcoal `#20272B` ·
steel `#66727A`, with rust `#9A4B32` used sparingly. One typeface (Manrope), large editorial headlines.
Photography carries the design, and the route map is drawn as a nautical chart.

## Photography — MSP-supplied images

`public/images/msp/` holds the 13 images the client supplied (resized to 2400px JPEG; the two 4-panel
collages are split into single frames). They are used through `own()` in `src/lib/media.ts` and never
show the "Interim photo" tag. **They are AI-generated (Gemini)**: background shop signboards contain
garbled text and the number plates are invented — the client should confirm they're happy to publish them.

| File | Where it's used |
|---|---|
| hero-fresh-full (hero-still with the wall extended upward, 2339×1481) | Homepage hero — full product scene as background, message centred above packs |
| warehouse-loading | MSP Traders hero |
| market-delivery | Homepage hero side tile, M Sevugaperumal & Sons hero |
| market-unloading | Homepage tile (MSP Traders), MSP Traders statement |
| street-loading, lorry-inside, lorry-street | Homepage tile / distribution strip, Sons page, Traders gallery |
| sack-carry | Homepage wholesale moment, MSP Traders visuals |
| fleet-yard, fleet-yard-wide | Homepage tile (MSP Store), MSP Store hero + gallery |
| vans-front / side / rear / pair | MSP Store visuals + gallery, homepage transport, Cargo final-delivery step |
| warehouse-aisle | Homepage wholesale moment, MSP Traders visuals (lead) |
| warehouse-stock-check, warehouse-floor | MSP Traders category stack (Grocery essentials, Wider range) |
| packaged-sweets (real WhatsApp photo) | MSP Traders gallery |
| fresh-banner-home, fresh-banner-spices, fresh-banner-soya | MSP Fresh "Fresh from MSP" section — shown uncropped (`ProductBanners`); home banner leads full width |
| fresh-chilli-scene, fresh-range, pack-*, soya-* (crops of the two banners) | MSP Fresh hero, product cards, categories, visuals; homepage Fresh moment + tile |

MSP Fresh product names / pack sizes (White Pepper Powder 100 g, Kashmiri Chilli Powder, Pickle Masala 100 g,
Soya Chunks Mini 200 g) are taken from the client's packaging artwork. The warehouse photos and the sweets photo
show **third-party brands (Aachi, Twinkle)** — confirm MSP is comfortable showing them before launch.

## Photography — interim stock until MSP supplies its own

`src/lib/photos.ts` holds ~40 **interim** photographs from Unsplash (Unsplash License: free for
commercial use). They are **not** pictures of MSP's people, vehicles, cargo or premises.

- In review mode every interim photo shows an "Interim photo" tag.
- Each slot also has a `direction`: the brief for the MSP photograph that should replace it.
- Some stock images show third-party branding (e.g. shipping-line names on containers, retail packaging).
  Replace these before launch. MSP shouldn't appear to be associated with brands it doesn't work with.
- To replace one: put the file in `public/images/…` and change that asset to `src: "/images/…"`, removing
  `interim: true` (or swap the `ph(...)` call for a plain object).
- The team grid stays as portrait placeholders on purpose. Never use stock people as named staff.

## Confirmation status (review mode)

Lists on the business pages carry a `status`:

- `confirmed`: stated by the client. Always shown.
- `suggested`: listed in the brief as *possible* (Store services, cargo types, who Traders serves, Sons operations). Shown with a **To confirm** badge.
- `placeholder`: a slot for the client to fill, e.g. the three Saptagiri Finance services.

`features.showUnconfirmed` in `content.ts` is `true` for client review. **Set it to `false` before launch.**
That hides every unconfirmed item and the "Interim photo" tags. Any section left empty disappears automatically.

## Content policy — nothing is invented

Everything unconfirmed is `null` in `src/lib/content.ts` and either hidden or shown as
`[CLIENT TO PROVIDE]`. Search the codebase for `PLACEHOLDER` / `null` to find every gap.

### Client checklist

| Item | Where in `content.ts` | Current state |
| --- | --- | --- |
| Official MSP logo, vector (SVG/AI/PDF) | `public/brand/` | ✅ supplied as JPEG (365×441) and in use; a vector original would sharpen it at large sizes |
| Photography (all sections) | every `ImageAsset.src` | art-directed placeholders showing the shot brief |
| Partner descriptions; official Aachi brand logo (Aachi Masala, Bhole Baba) | `partners[]` | Aachi wordmark + official Aachi masala artwork from aachifoods.com (cropped, model removed); Bhole Baba logo + packshots from bholebabadlp.com (public/brands); `[BRAND DESCRIPTION TO BE ADDED]` |
| MSP Store service routes / locations | `components/business-page/IslandMap.tsx` | none drawn, only Port Blair labelled |
| Consignment number format | `lib/tracking.ts › validateConsignment` | loose |
| Further confirmed partner brands | `partners` | only the two confirmed brands listed |
| History: years + milestones | `story` | `[CLIENT TO PROVIDE]` |
| Team: names, designations, portraits | `team` | one slot per department |
| Stats (years, locations, partner count) | `stats[].value` | hidden until supplied (only “5 business verticals” shown) |
| Phone, email, address, social | `contact` | `[CLIENT TO PROVIDE]`; enquiry form activates when `email` is set |
| Saptagiri Finance services | `businesses.ts › finance.offer` | 3 placeholder slots, no products or claims |
| Saptagiri Finance: exact service wording (e.g. whether to say "gold loan") | `businesses.ts › saptagiri-finance` | The page shows valuables visually but names no product. Never add rates, amounts, tenure, schemes or licences without written confirmation |
| Confirm / remove suggested services | `businesses.ts › *.offer`, `traders.audience` | "To confirm" badges |
| MSP Fresh Products: product names, pack sizes, descriptions, packshots | `businesses.ts › fresh-products.products` | `[PRODUCT INFORMATION TO BE ADDED]` cards |
| MSP Fresh Products: cooking-oil types | `fresh-products.offer` | "Oil types to be confirmed" |
| Traders product range beyond rice & groceries | `traders.offer` | `[ADD PRODUCT CATEGORIES]` |
| Per-business phone / email | `businesses.ts › *.contact` | falls back to group contact |
| Production domain | `NEXT_PUBLIC_SITE_URL` env | localhost |

### Swapping in a photo

1. Put the optimised file in `public/images/...` (JPG/PNG are fine; Next serves AVIF/WebP automatically).
2. Set `src: "/images/..."` on the matching asset in `content.ts` and check the `alt` text.

The placeholder's `direction` text is the brief for that photograph.

## Site map

```
/                                      Home (hero → tracking → group → business network → quick actions → …)
/about                                 Business-house profile
/businesses                            The MSP Business Network
/businesses/m-sevugaperumal-and-sons   Distribution world
/businesses/msp-store                  Transportation world
/businesses/msp-traders                Wholesale world (wholesale enquiry form)
/businesses/msp-cargo-service          Maritime world (tracking + cargo quote form)
/businesses/msp-fresh-products         Consumer-product world
/businesses/saptagiri-finance          Financial-business world
/track-consignment                     Consignment tracking
/team  /gallery  /contact
```

The older `/businesses/{sons,store,traders,cargo,fresh-products,finance}` URLs redirect permanently.

Saptagiri Finance is intentionally different from the other pages: a traditional local finance shop with a
maroon, cream and brass palette, a signboard-style hero, a traditional serif (Noto Serif, `lib/fonts.ts`, used on
this page only), counter, money and ornament photography, and plain wording (`FinanceSections.tsx`).

Each business page has its own hero, signature section, palette (`lib/themes.ts`) and motion. Page
compositions live in `components/business-page/pages.tsx`.

## Consignment tracking: frontend done, backend to connect

No shipment data is stored or invented anywhere in this codebase.

- **UI:** `/track-consignment`, the homepage tracking band and the cargo page. Deep links work (`?c=MSP2026…`).
- **Service:** `src/lib/tracking.ts` (`trackingService.track()`) calls `GET /api/shipments/:consignmentNumber`.
- **Endpoint:** `src/app/api/shipments/[consignmentNumber]/route.ts`
  - Without `TRACKING_API_URL` → `503` → the UI shows "Tracking service is currently being connected…".
  - With `TRACKING_API_URL` (and optional `TRACKING_API_KEY`) → proxies to
    `${TRACKING_API_URL}/api/shipments/:n`, passing through the status and JSON.
- **Contract** (the `Shipment` type): `consignmentNumber, status, origin, destination, bookedAt, currentStage
  (booked | loaded | departed | in_transit | arrived | delivered), lastUpdated, events?[]`.
  Return `404` when a consignment doesn't exist.
- The consignment-number format check is loose (letters, digits, hyphens). Tighten `validateConsignment`
  once MSP confirms its format.

## Enquiry forms

- General: `components/contact/EnquiryForm.tsx`.
- Wholesale (MSP Traders) and cargo quote (MSP Cargo Service): `components/contact/StructuredForm.tsx`.
- All of them compose an email to the business address. Until an address is set in `content.ts` /
  `businesses.ts › contact`, they show a "being confirmed" message. Connect a form backend here later if wanted.

## Phase 2: Cargo Tracking System (backend not built)

Nothing in this phase pretends tracking exists. The Cargo section only says
*“A smarter cargo experience is coming next.”*

The system is set up to attach cleanly later:
- `features.cargoTracking` flag in `content.ts`, for nav items and CTAs once live
- Suggested routes: `/cargo/track`, `/cargo/book`, `/account`, `/admin` (new route groups; the homepage needs no restructuring)
- `/businesses/cargo` is the natural entry point for booking and tracking CTAs

## Accessibility & motion

- Respects `prefers-reduced-motion` (Lenis off, transforms off, counters jump to final value, map animation off)
- The custom cursor only runs for fine pointers and is never used on touch
- Skip link, focus-visible styles, keyboard-operable gallery lightbox (←/→/Esc) and menu (Esc)
- Scroll-linked values go through `lib/motion.ts › useRange` (JS-driven on purpose. See the comment there.)

## About page — the MSP story (`src/lib/about.ts`)

Four parts: opening ("Every business has a beginning") → founder profile card ("Where it all started") →
"What we stand for" (vision, mission, values — DRAFT wording, set `purpose.approved = true` once the owner
agrees) → "Our journey continues".
Only verified facts are written. The founder's own story goes into `earlyDays.answers[].answer`; answered
items appear on his profile card in his words, unanswered ones are never shown.

**Questions for the owner**
1. What inspired you to start the business? What were you doing before?
2. Where and when did it begin — what was the first business, shop or office like?
3. What was hard in the early days? What were you unsure about?
4. How did you win your first customers and earn their trust?
5. On difficult days, what kept you going?
6. Is there a moment or challenge you'd like to share in your own words?
7. In what order did the six businesses start, and roughly when? (only if a timeline is wanted)
8. Do you approve the "A message from us" draft — and may it be signed in your name?
9. Photos: a real photo of Mr. M Sevugaperumal, and any old photos of the first shop / early days.
