/**
 * INTERIM PHOTOGRAPHY — licensed under the Unsplash License (free for
 * commercial use). These stand in until MSP supplies its own photographs and
 * are NOT pictures of MSP's people, vehicles or premises. In review mode each
 * one carries an "Interim photo" tag. Replace by setting `src` on the asset to
 * a file in /public/images — see README.
 */
type Stock = { src: string; credit: string; stockAlt: string };

const u = (id: string, credit: string, stockAlt: string): Stock => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2400&q=80`,
  credit,
  stockAlt,
});

export const photos = {
  hero: u("photo-1700114339471-9e90a155d4b7", "Howei Wang", "a large cargo ship in the middle of a body of water"),
  portDusk: u("photo-1596422572215-801e9c6beeaf", "Esmonde Yong", "red and blue crane under blue sky during daytime"),
  craneLoading: u("photo-1670121180530-cfcba4438038", "Nathan Cima", "a large cargo ship at a dock"),
  portYard: u("photo-1590496793907-4d66e2994b4d", "Timelab", "A container ship being loaded by cranes at a busy industrial port at dusk"),
  shipSea: u("photo-1715198749916-3fab2a14074f", "Hennie Stander", "a large cargo ship in the middle of the ocean"),
  shipPort: u("photo-1670121180583-39ab653a071c", "Nathan Cima", "a large ship in the water"),
  harbourSunset: u("photo-1640618428217-30131ccdfd7a", "Nabil Naidu", "a large boat floating on top of a body of water"),
  andamanHarbour: u("photo-1731934223456-8bc1ab67b9e5", "Debarghya Meikap", "A group of boats floating on top of a body of water"),
  andamanBeach: u("photo-1721834058855-b9d0570722b4", "Jayanth Muppaneni", "A white sandy beach surrounded by green trees"),
  islandRoad: u("photo-1768639401125-96b85fbf12f1", "Lisa van Vliet", "A paved road lined with lush green tropical foliage"),
  truckTarp: u("photo-1716512060259-d114cfba13e8", "Bernd 📷 Dittrich", "a man standing next to a truck with a tarp on it"),
  truckFront: u("photo-1762060853805-ac5a37f5de6c", "Bernd 📷 Dittrich", "A loaded truck drives on a desert road"),
  truckEicher: u("photo-1687226675098-82bfca59e5ba", "Shubham Rohilla", "a red truck parked next to a white wall"),
  truckOld: u("photo-1774020131204-9c8f2c779dd6", "Zoshua Colah", "A teal flatbed truck parked under trees"),
  loadingVan: u("photo-1785865032189-4dc3592748d3", "Alexander Jatskouskij", "Two people in orange vests standing by a white truck"),
  loadingTempo: u("photo-1769477145932-edd5a9d7567c", "chansu shin", "Man loading boxes from a truck onto a dolly"),
  riceShop: u("photo-1783309529161-a1a917bece7e", "Thilina Alagiyawanna", "Man stacking colorful bags and sacks on a truck"),
  riceSacks: u("photo-1775259608525-cf332eaf89d3", "Haydn", "Colorful bags of grains and legumes at a market"),
  riceScoop: u("photo-1643622357625-c013987d90e7", "Rens D", "a spoon filled with rice on top of a table"),
  riceGrain: u("photo-1723475158232-819e29803f4d", "Emma Miller", "A pile of rice sitting on top of a wooden cutting board"),
  warehouseAisle: u("photo-1587293852726-70cdb56c2866", "CHUTTERSNAP", "brown cardboard boxes on white metal rack"),
  warehouseBoxes: u("photo-1586528116311-ad8dd3c8310d", "Adrian Sulyok", "yellow and white plastic box lot"),
  warehouseRacks: u("photo-1709804945989-c8be542e04db", "Ali Mkumbwa", "a large stack of boxes in a warehouse"),
  warehouseCartons: u("photo-1570086625846-f33f679eb4f5", "Wonderlane", "brown cardboard box lot"),
  shelvesTall: u("photo-1553413077-190dd305871c", "Ruchindra Gunasekara", "large warhause"),
  workersWalk: u("photo-1586528116022-aeda1613c63d", "Adrian Sulyok", "workers walking through warehouse aisle"),
  workersLoading: u("photo-1786719664257-1bc47a776f4c", "Karata My", "A group of people loading cardboard boxes into the back of a truck"),
  workersUnload: u("photo-1786719665527-7f9a71964414", "Karata My", "People loading large sacks into the back of a white delivery truck"),
  forklift: u("photo-1740733448722-82e16d3468bb", "Duc LE", "A large warehouse filled with lots of machines"),
  groceryAisle: u("photo-1534723452862-4c874018d66d", "Fikri Rasyid", "A grocery store aisle with metal shelves stocked with various packaged food products"),
  groceryShelves: u("photo-1604719312566-8912e9227c6a", "Franki Chamaki", "grocery store aisle with stocked shelves"),
  spiceMarket: u("photo-1775433205046-86e060feff06", "Caitlin James", "Vendor selling colorful spices in a market"),
  spiceSeller: u("photo-1563884542782-13d6a05b17c0", "Urip Dunker", "man sitting on red mat surrounded by condiments"),
  chillies: u("photo-1723155182094-af2f63472d0b", "Colin White", "A sack full of dried red peppers sitting on top of a table"),
  shopShelves: u("photo-1552353289-97f99c442b3e", "Laurentiu Morariu", "man standing inside store"),
  cartonsCart: u("photo-1762381294795-8fa0e7f3e90c", "Bernd 📷 Dittrich", "Red trailer loaded with cardboard boxes on street"),
  cartons: u("photo-1766040923580-16ad32fae8b4", "Rohit Choudhari", "A large pile of brown cardboard boxes with blue tape"),
  meeting: u("photo-1577962917302-cd874c4e31d2", "Smartworks Coworking", "men and women having a meeting"),
  documents: u("photo-1450101499163-c8848c66ca85", "Scott Graham", "man writing on paper"),
  documentsSign: u("photo-1521791055366-0d553872125f", "Cytonn Photography", "person writing on white paper"),
  architecture: u("photo-1481253127861-534498168948", "Anthony Esau", "low angle photo of beige concrete building under cloudy sky"),
  architecture2: u("photo-1479293581560-aee98bb24f7f", "Joel Filipe", "gray glass building"),
  spiceJars: u("photo-1757802261994-3c31584daafd", "Zoshua Colah", "Jars of spices and seasonings neatly arranged on shelves"),
  finBangles: u("photo-1758995116383-f51775896add", "Zayed Ahmed Zadu", "A stack of ornate gold bangles on a dark surface"),
  finNecklace: u("photo-1601121141461-9d6647bca1ed", "Vaibhav Nagare", "gold and purple beaded necklace"),
  finAssess: u("photo-1640183295764-8dd9f9fd6139", "Shruti Singh", "a woman is putting a ring on another woman's finger"),
  finLockers: u("photo-1462045504115-6c1d931f07d1", "Tim Evans", "Numbers on metal deposit boxes in a bank"),
  finVault: u("photo-1609358905581-e5381612486e", "Brock Wegner", "brown wooden door with brass door knob"),
  finPaperwork: u("photo-1562564055-71e051d33c19", "Gabrielle Henderson", "woman signing on white printer paper beside woman about to touch the documents"),
  finDesk: u("photo-1770627016447-cb9d29ed0398", "Skytech Aviation", "A woman in a white blazer sits at a desk"),
  finDiscuss: u("photo-1658834113847-94412465e0ad", "Norbu GYACHUNG", "a man in a hat reading a book"),
  finWriting: u("photo-1747246680560-b4a84a925603", "Punit Chawla", "An elderly man is writing at a desk"),
  finOffice: u("photo-1771918521550-13c68e5d2173", "Wafiq Raza", "A reception desk with artwork on the wall"),
  finBanglesRed: u("photo-1612945578381-6481cdd73b0a", "Hush Naidoo Jade Photography", "gold and red floral textile"),
  finHandover: u("photo-1638544253786-ab3078fe2f3f", "Swastik Arora", "a person handing money to another person"),
  finNotes: u("photo-1729077555348-4ab768b4a90e", "Dileesh Kumar", "A person holding a bunch of money in their hand"),
  finScale: u("photo-1612012060851-20f943c02d3d", "Piret Ilver", "brown and beige weighing scale"),
  finTemple: u("photo-1601121141418-c1caa10a2a0b", "Vaibhav Nagare", "gold and purple beaded necklace"),
} satisfies Record<string, Stock>;

export type PhotoKey = keyof typeof photos;
