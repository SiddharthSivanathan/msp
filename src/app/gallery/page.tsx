import type { Metadata } from "next";
import { Gallery } from "@/components/sections/Gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "MSP on the ground — cargo, transport, warehouses, trade, distribution, people and port operations.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <div className="bg-navy pt-16">
      <Gallery />
    </div>
  );
}
