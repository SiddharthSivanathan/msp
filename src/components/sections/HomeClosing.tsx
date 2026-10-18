import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";

/** Closing contact band — short; the full enquiry experience is on /contact and each business page. */
export function ContactCta() {
  return (
    <section id="contact" aria-labelledby="contact-cta-title" className="bg-navy text-paper">
      <div className="shell flex flex-col justify-between gap-8 py-24 lg:flex-row lg:items-end lg:py-32">
        <Reveal>
          <p className="eyebrow mb-5 text-sand">Contact</p>
          <h2 id="contact-cta-title" className="display-lg uppercase">
            Let’s do business.
          </h2>
        </Reveal>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:pb-3">
          <ArrowLink href="/contact" variant="solid">Contact us</ArrowLink>
          <ArrowLink href="/businesses/msp-traders#enquiry" className="text-paper">Wholesale enquiry</ArrowLink>
        </div>
      </div>
    </section>
  );
}
