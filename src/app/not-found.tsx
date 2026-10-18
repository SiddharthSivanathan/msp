import { ArrowLink } from "@/components/ui/ArrowLink";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col justify-center pt-32 text-paper">
      <p className="eyebrow mb-6 text-accent-soft">404</p>
      <h1 className="display-lg uppercase">This route doesn’t exist.</h1>
      <ArrowLink href="/" variant="solid" className="mt-10 self-start">Back to MSP</ArrowLink>
    </section>
  );
}
