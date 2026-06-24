"use client";

import { useEffect, useState } from "react";

export function LiveFeed() {
  const [viewers, setViewers] = useState<number | null>(null);

  useEffect(() => {
    const es = new EventSource("/api/stream");
    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setViewers(data.viewers);
      } catch { /* skip */ }
    };
    es.onerror = () => es.close();
    return () => es.close();
  }, []);

  if (viewers === null)
    return <span className="inline-block w-8 h-2 shimmer rounded align-middle" />;
  return <span>{viewers.toLocaleString()}</span>;
}
