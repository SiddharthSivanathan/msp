"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { trackingService, type TrackingResult } from "@/lib/tracking";
import { TrackingForm } from "./TrackingForm";
import { TrackingResultView } from "./TrackingResultView";

/** Full tracking experience for /track-consignment. Reads/writes ?c= so results are shareable. */
export function TrackingPanel() {
  const params = useSearchParams();
  const initial = params.get("c") ?? "";
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [busy, setBusy] = useState(false);
  const ctrl = useRef<AbortController | null>(null);

  const run = useCallback(async (n: string) => {
    ctrl.current?.abort();
    const c = new AbortController();
    ctrl.current = c;
    setBusy(true);
    try {
      const r = await trackingService.track(n, c.signal);
      setResult(r);
      const url = new URL(window.location.href);
      url.searchParams.set("c", n);
      window.history.replaceState(null, "", url);
    } catch {
      /* aborted by a newer lookup */
    } finally {
      if (ctrl.current === c) setBusy(false);
    }
  }, []);

  // Deep link (?c=…): look up once on arrival. State is only set in the async callback.
  useEffect(() => {
    if (!initial) return;
    const c = new AbortController();
    ctrl.current = c;
    trackingService
      .track(initial, c.signal)
      .then(setResult)
      .catch(() => {});
    return () => c.abort();
  }, [initial]);

  return (
    <div>
      <TrackingForm initial={initial} onTrack={run} busy={busy || (!!initial && !result)} />
      <div aria-live="polite" className="mt-8">
        {result && <TrackingResultView result={result} />}
      </div>
    </div>
  );
}
