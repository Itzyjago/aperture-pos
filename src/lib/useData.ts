import { useEffect, useState } from "react";
import { seedData } from "../data/seed";
import type { ApertureData } from "../data/types";

// Prefer the live Node API; fall back to the bundled snapshot so the UI never
// blanks (and screenshots are reliable even if the API is still warming up).
export function useData(): { data: ApertureData; live: boolean } {
  const [data, setData] = useState<ApertureData>(seedData);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch("/api/overview").then((r) => r.json()),
      fetch("/api/analytics").then((r) => r.json()),
    ])
      .then(([overview, analytics]) => {
        if (cancelled) return;
        setData({ ...seedData, ...overview, ...analytics });
        setLive(true);
      })
      .catch(() => {
        /* keep bundled snapshot */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, live };
}
