"use client";

import { motion } from "motion/react";
import { islands } from "@/components/ui/RouteMap";
import { EASE } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "./shared";

/**
 * Andaman & Nicobar, zoomed in — the islands MSP Store works across.
 * Routes and service locations are NOT drawn until MSP supplies them; only
 * Port Blair is labelled, as a geographic reference.
 */
const X = (lon: number) => (lon - 91.6) * 230;
const Y = (lat: number) => (14 - lat) * 115;

export function IslandMap() {
  return (
    <section aria-labelledby="islands-title" className="relative bg-(--b-alt) text-(--b-ink)">
      <div className="shell grid-12 gap-y-14 py-28 sm:py-36 lg:py-44">
        <div className="col-span-12 lg:col-span-4">
          <SectionHead id="islands-title" eyebrow="Where we move" lines={["Across", "the islands."]} size="md" />
          <Reveal className="mt-8">
            <p className="leading-relaxed opacity-70">
              MSP Store operates transportation across the Andaman &amp; Nicobar Islands. Service routes and locations
              will be marked on this map once confirmed by MSP Store.
            </p>
          </Reveal>
        </div>
        <Reveal className="col-span-12 lg:col-span-7 lg:col-start-6">
          <svg viewBox="0 0 600 900" className="mx-auto h-auto w-full max-w-[520px]" role="img" aria-label="Map of the Andaman and Nicobar Islands with Port Blair marked">
            <rect width="600" height="900" fill="#1A2024" />
            {[8, 10, 12].map((lat) => (
              <g key={lat}>
                <line x1="0" x2="600" y1={Y(lat)} y2={Y(lat)} stroke="#EEF0EF" strokeOpacity="0.08" />
                <text x="592" y={Y(lat) - 6} textAnchor="end" fontSize="11" fill="#EEF0EF" fillOpacity="0.4">{lat}°N</text>
              </g>
            ))}
            {islands.map((i, k) => (
              <motion.ellipse
                key={k}
                cx={X(i.lon)}
                cy={Y(i.lat)}
                rx={i.rx * 3.8}
                ry={i.ry * 3.8}
                transform={`rotate(-8 ${X(i.lon)} ${Y(i.lat)})`}
                fill="#3A444B"
                stroke="#D9B44A"
                strokeOpacity="0.6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE, delay: k * 0.08 }}
              />
            ))}
            <g>
              <circle cx={X(92.73)} cy={Y(11.62)} r="7" fill="#D9B44A" />
              <circle cx={X(92.73)} cy={Y(11.62)} r="14" fill="none" stroke="#D9B44A" strokeOpacity="0.5" />
              <text x={X(92.73) - 22} y={Y(11.62) + 5} textAnchor="end" fontSize="16" fontWeight="800" letterSpacing="2" fill="#EEF0EF">PORT BLAIR</text>
            </g>
            <text x="40" y="70" fontSize="13" letterSpacing="4" fill="#EEF0EF" fillOpacity="0.55">ANDAMAN ISLANDS</text>
            <text x="40" y="640" fontSize="13" letterSpacing="4" fill="#EEF0EF" fillOpacity="0.55">NICOBAR ISLANDS</text>
          </svg>
          <p className="mt-4 text-center text-xs opacity-45">Illustrative. Routes to be added once confirmed.</p>
        </Reveal>
      </div>
    </section>
  );
}
