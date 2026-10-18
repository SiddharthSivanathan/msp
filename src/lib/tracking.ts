/**
 * Consignment tracking — the frontend half of the Phase 2 Cargo Tracking System.
 *
 * NOTHING here holds or invents shipment data. The UI calls `trackingService`,
 * which calls this site's own endpoint `GET /api/shipments/:consignmentNumber`.
 * That endpoint proxies to the real tracking backend once `TRACKING_API_URL`
 * is configured; until then it answers 503 and the UI shows the
 * "being connected" state.
 */

/** Stages in display order. The backend must report one of these keys. */
export const SHIPMENT_STAGES = [
  { key: "booked", label: "Booked" },
  { key: "loaded", label: "Loaded" },
  { key: "departed", label: "Departed Chennai" },
  { key: "in_transit", label: "In transit" },
  { key: "arrived", label: "Arrived Port Blair" },
  { key: "delivered", label: "Delivered" },
] as const;

export type StageKey = (typeof SHIPMENT_STAGES)[number]["key"];

/** The contract the backend is expected to return (JSON, ISO-8601 dates). */
export type Shipment = {
  consignmentNumber: string;
  status: string;
  origin: string;
  destination: string;
  bookedAt: string | null;
  currentStage: StageKey;
  lastUpdated: string | null;
  /** Per-stage timestamps, when the backend has them. */
  events?: { stage: StageKey; at: string; location?: string; note?: string }[];
};

export type TrackingResult =
  | { kind: "found"; shipment: Shipment }
  | { kind: "not_found"; consignmentNumber: string }
  | { kind: "unavailable" }
  | { kind: "invalid"; message: string }
  | { kind: "error" };

/** Accepts letters, digits and hyphens. Tighten once MSP confirms its number format. */
export function normalizeConsignment(input: string) {
  return input.trim().toUpperCase().replace(/\s+/g, "");
}

export function validateConsignment(value: string): string | null {
  if (!value) return "Please enter your consignment number.";
  if (!/^[A-Z0-9-]{4,30}$/.test(value)) return "Consignment numbers contain letters and numbers only.";
  return null;
}

function isShipment(x: unknown): x is Shipment {
  const s = x as Shipment;
  return !!s && typeof s.consignmentNumber === "string" && SHIPMENT_STAGES.some((st) => st.key === s.currentStage);
}

export const trackingService = {
  async track(raw: string, signal?: AbortSignal): Promise<TrackingResult> {
    const consignmentNumber = normalizeConsignment(raw);
    const invalid = validateConsignment(consignmentNumber);
    if (invalid) return { kind: "invalid", message: invalid };

    try {
      const res = await fetch(`/api/shipments/${encodeURIComponent(consignmentNumber)}`, {
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal,
      });
      if (res.status === 404) return { kind: "not_found", consignmentNumber };
      if (res.status === 503) return { kind: "unavailable" };
      if (!res.ok) return { kind: "error" };
      const data: unknown = await res.json();
      return isShipment(data) ? { kind: "found", shipment: data } : { kind: "error" };
    } catch (e) {
      if ((e as Error).name === "AbortError") throw e;
      return { kind: "error" };
    }
  },
};

export const stageIndex = (key: StageKey) => SHIPMENT_STAGES.findIndex((s) => s.key === key);
