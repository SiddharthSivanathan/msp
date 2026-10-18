"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/utils";

/**
 * Nautical-chart style route: Chennai → Bay of Bengal → Port Blair → Andaman & Nicobar.
 * Simplified equirectangular projection (x=(lon-78)*60, y=(15-lat)*60).
 * Illustrative only — coastline and islands are deliberately abstracted.
 */
export const P = (lon: number, lat: number) => [(lon - 78) * 60, (15 - lat) * 60] as const;
const poly = (pts: [number, number][]) => "M" + pts.map(([lo, la]) => P(lo, la).join(" ")).join(" L") + " Z";

const mainland = poly([
  [77.3, 15], [80.0, 15], [80.15, 14.4], [80.3, 13.5], [80.28, 13.08], [80.2, 12.6], [79.83, 11.93],
  [79.77, 11.75], [79.85, 10.77], [79.87, 10.28], [79.3, 10.3], [79.0, 10.0], [79.1, 9.28], [78.6, 9.1],
  [78.15, 8.8], [77.55, 8.08], [77.3, 8.08],
]);
const lanka = poly([
  [79.9, 9.8], [80.3, 9.6], [80.9, 8.9], [81.4, 8.1], [81.85, 7.2], [81.7, 6.5], [81.1, 6.1], [80.6, 5.95],
  [80.1, 6.4], [79.85, 7.2], [79.8, 8.1], [79.95, 8.9],
]);
export const islands: { lon: number; lat: number; rx: number; ry: number }[] = [
  { lon: 92.95, lat: 13.2, rx: 6, ry: 26 },
  { lon: 92.85, lat: 12.45, rx: 8, ry: 24 },
  { lon: 92.68, lat: 11.75, rx: 7, ry: 21 },
  { lon: 93.02, lat: 12.0, rx: 2.5, ry: 6 },
  { lon: 92.5, lat: 10.65, rx: 7, ry: 12 },
  { lon: 92.8, lat: 9.17, rx: 5, ry: 5 },
  { lon: 93.45, lat: 7.98, rx: 5, ry: 9 },
  { lon: 93.65, lat: 7.35, rx: 4, ry: 5 },
  { lon: 93.85, lat: 7.0, rx: 10, ry: 21 },
];

const [cx, cy] = P(80.27, 13.08);
const [px, py] = P(92.73, 11.62);
const route = `M ${cx} ${cy} Q ${(cx + px) / 2} ${cy + 150} ${px - 6} ${py}`;

export function RouteMap() {
  const reduce = useReducedMotion();
  const ink = "#20272B";
  return (
    <svg viewBox="-40 -20 1080 600" className="h-auto w-full" role="img" aria-labelledby="map-title map-desc">
      <title id="map-title">MSP shipping route</title>
      <desc id="map-desc">An illustrative chart of the sea route from Chennai on the Indian mainland, across the Bay of Bengal, to Port Blair in the Andaman &amp; Nicobar Islands.</desc>
      <defs>
        <mask id="route-reveal">
          <motion.path
            d={route}
            fill="none"
            stroke="white"
            strokeWidth="8"
            initial={{ pathLength: reduce ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 3.2, ease: EASE, delay: 0.3 }}
          />
        </mask>
        <path id="msp-route" d={route} />
      </defs>

      {/* sea */}
      <rect x="-40" y="-20" width="1080" height="600" fill="#E9EEF0" />
      {/* graticule, chart-style */}
      {[6, 8, 10, 12, 14].map((lat) => (
        <g key={lat}>
          <line x1="-40" x2="1040" y1={P(0, lat)[1]} y2={P(0, lat)[1]} stroke={ink} strokeOpacity="0.08" />
          <text x="1032" y={P(0, lat)[1] - 6} fill={ink} fillOpacity="0.45" fontSize="10" textAnchor="end" letterSpacing="1.5">{lat}°N</text>
        </g>
      ))}
      {[80, 84, 88, 92].map((lon) => (
        <g key={lon}>
          <line y1="-20" y2="580" x1={P(lon, 0)[0]} x2={P(lon, 0)[0]} stroke={ink} strokeOpacity="0.08" />
          <text x={P(lon, 0)[0] + 6} y="572" fill={ink} fillOpacity="0.45" fontSize="10" letterSpacing="1.5">{lon}°E</text>
        </g>
      ))}

      {/* land */}
      <path d={mainland} fill="#D8C7A3" stroke={ink} strokeOpacity="0.45" strokeWidth="1" />
      <path d={lanka} fill="#D8C7A3" fillOpacity="0.6" stroke={ink} strokeOpacity="0.3" strokeWidth="1" />
      {islands.map((i, k) => {
        const [x, y] = P(i.lon, i.lat);
        return <ellipse key={k} cx={x} cy={y} rx={i.rx} ry={i.ry} transform={`rotate(-8 ${x} ${y})`} fill="#D8C7A3" stroke={ink} strokeOpacity="0.5" />;
      })}

      <text x="470" y="420" fill={ink} fillOpacity="0.5" fontSize="15" fontStyle="italic" letterSpacing="9" textAnchor="middle">BAY OF BENGAL</text>
      <text x={P(78.4, 11.2)[0]} y={P(0, 11.2)[1]} fill={ink} fillOpacity="0.45" fontSize="10" letterSpacing="3">INDIA</text>

      {/* compass */}
      <g transform="translate(960 70)" fill="none" stroke={ink} strokeOpacity="0.55">
        <circle r="26" />
        <path d="M0 -34 L5 0 L0 34 L-5 0 Z" fill={ink} fillOpacity="0.15" />
        <text y="-40" textAnchor="middle" fontSize="11" fill={ink} stroke="none" fontWeight="700">N</text>
      </g>

      {/* shipping lane */}
      <path d={route} fill="none" stroke="#9A4B32" strokeWidth="2.2" strokeDasharray="7 7" strokeLinecap="round" mask="url(#route-reveal)" />
      {!reduce && (
        <g>
          <path d="M-9 -3 L7 -3 L11 0 L7 3 L-9 3 Z" fill="#20272B" />
          <animateMotion dur="9s" repeatCount="indefinite" begin="3.4s" rotate="auto">
            <mpath href="#msp-route" />
          </animateMotion>
        </g>
      )}

      <Port x={cx} y={cy} label="CHENNAI" sub="Mainland port" align="start" />
      <Port x={px} y={py} label="PORT BLAIR" sub="Island port" align="end" />
      <text x={P(92.3, 8.5)[0]} y={P(0, 8.5)[1]} fill={ink} fillOpacity="0.7" fontSize="11" letterSpacing="3" textAnchor="end">
        <tspan x={P(92.3, 8.5)[0]}>ANDAMAN &amp;</tspan>
        <tspan x={P(92.3, 8.5)[0]} dy="16">NICOBAR ISLANDS</tspan>
      </text>
    </svg>
  );
}

function Port({ x, y, label, sub, align }: { x: number; y: number; label: string; sub: string; align: "start" | "end" }) {
  const dx = align === "start" ? 18 : -18;
  return (
    <g>
      <circle cx={x} cy={y} r="9" fill="none" stroke="#20272B" strokeOpacity="0.6" />
      <circle cx={x} cy={y} r="4" fill="#9A4B32" />
      <text x={x + dx} y={y - 5} textAnchor={align} fill="#20272B" fontSize="15" fontWeight="800" letterSpacing="2.5">{label}</text>
      <text x={x + dx} y={y + 12} textAnchor={align} fill="#20272B" fillOpacity="0.6" fontSize="10" letterSpacing="2">{sub.toUpperCase()}</text>
    </g>
  );
}
