import { useCallback, useEffect, useState } from "react";
import type { IpData, LookupStatus } from "../types/ip";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

export function useIpLookup() {
  const [data, setData] = useState<IpData | null>(null);
  const [status, setStatus] = useState<LookupStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const lookup = useCallback(async (query: string) => {
    setStatus("loading");
    setError(null);

    try {
      const url = new URL(`${API_BASE}/api/ip`);
      if (query) url.searchParams.set("query", query);

      const response = await fetch(url.toString());
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "That address couldn't be found.");
      }

      setData(payload as IpData);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }, []);

  // On first load, resolve the visitor's own IP so the map isn't empty.
  useEffect(() => {
    lookup("");
  }, [lookup]);

  return { data, status, error, lookup };
}
