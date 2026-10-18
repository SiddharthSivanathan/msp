import { ph, team } from "@/lib/content";
import { ImageSlot } from "@/components/ui/ImageSlot";

const operations = [
  { label: "Warehouse operations", image: ph("workersWalk", "MSP warehouse team at work", "Warehouse workers walking through an aisle", "people") },
  { label: "Loading & delivery", image: ph("workersUnload", "MSP crew loading a vehicle", "People loading sacks into a delivery truck", "people") },
];
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { TeamCard } from "@/components/ui/TeamCard";

export function PeopleSection() {
  return (
    <section id="team" aria-labelledby="team-title" className="relative bg-navy text-paper">
      <div className="shell py-28 sm:py-36 lg:py-44">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-8">
            <Eyebrow className="mb-8 text-sand">The People</Eyebrow>
            <SplitLines id="team-title" lines={["The people", "behind the movement."]} className="display-lg uppercase" />
          </div>
          <Reveal className="col-span-12 lg:col-span-4 lg:pb-3">
            <p className="lede text-paper/65">
              Drivers, warehouse staff, cargo teams, office staff and management — real people running real
              operations, every day.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-6 gap-3 lg:mt-24 lg:gap-4">
          {operations.map((o, i) => (
            <Reveal key={o.label} delay={i * 0.1} className="col-span-6 md:col-span-3">
              <figure>
                <ImageSlot asset={o.image} seed={60 + i} parallax={4} className="aspect-[16/10]" sizes="(min-width:768px) 50vw, 100vw" />
                <figcaption className="eyebrow mt-3 text-paper/55">{o.label}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="eyebrow mt-20 text-paper/50 lg:mt-28">The team — profiles to be supplied by MSP</p>
        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal as="li" key={`${m.department}-${i}`} delay={(i % 4) * 0.08} className={i % 4 === 1 || i % 4 === 3 ? "lg:mt-16" : ""}>
              <TeamCard member={m} seed={70 + i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
