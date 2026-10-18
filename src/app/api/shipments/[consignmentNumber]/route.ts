import { NextResponse, type NextRequest } from "next/server";

/**
 * GET /api/shipments/:consignmentNumber
 *
 * Integration point for the Phase 2 tracking backend. When TRACKING_API_URL is
 * set, the request is proxied to `${TRACKING_API_URL}/api/shipments/:n` and its
 * status/body are passed through (200 shipment JSON, 404 not found).
 * Until then it returns 503 — the site never fabricates a shipment.
 */
export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/shipments/[consignmentNumber]">) {
  const { consignmentNumber } = await ctx.params;
  const base = process.env.TRACKING_API_URL;

  if (!base) {
    return NextResponse.json({ error: "tracking_not_connected" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }

  try {
    const upstream = await fetch(`${base.replace(/\/$/, "")}/api/shipments/${encodeURIComponent(consignmentNumber)}`, {
      headers: {
        Accept: "application/json",
        ...(process.env.TRACKING_API_KEY ? { Authorization: `Bearer ${process.env.TRACKING_API_KEY}` } : {}),
      },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    const body = await upstream.text();
    return new NextResponse(body, {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("content-type") ?? "application/json", "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "tracking_unreachable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
