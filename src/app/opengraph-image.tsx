import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "MSP Group — Wholesale. Distribution. Business.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  // Official MSP logo (client artwork), embedded unaltered.
  const logo = `data:image/png;base64,${(await readFile(join(process.cwd(), "public/brand/msp-logo.png"))).toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#071A2B",
          color: "#F4F1EA",
          fontFamily: "sans-serif",
        }}
      >
        <img src={logo} width={96} height={116} alt="" />
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, lineHeight: 0.98, letterSpacing: -3 }}>
          <span>WHOLESALE.</span>
          <span>DISTRIBUTION.</span>
          <span style={{ color: "rgba(245,247,249,0.55)" }}>BUSINESS.</span>
        </div>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 5, color: "rgba(245,247,249,0.6)" }}>
          ONE GROUP. DIFFERENT BUSINESSES.
        </div>
      </div>
    ),
    size,
  );
}
