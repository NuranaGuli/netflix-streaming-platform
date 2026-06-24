"use client";

import { useEffect, useState } from "react";

type GeoData = {
  city: string;
  country: string;
  region: string;
  nearestServer: string;
};

export default function HeroSection() {
  const [geo, setGeo] = useState<GeoData | null>(null);

  useEffect(() => {
    fetch("/api/geo")
      .then((r) => r.json())
      .then((d) =>
        setGeo({
          city:          d.city          || "Unknown",
          country:       d.country       || "Unknown",
          region:        d.region        || "Unknown",
          nearestServer: d.nearestServer || "Unknown",
        })
      )
      .catch(() =>
        setGeo({ city: "—", country: "—", region: "—", nearestServer: "—" })
      );
  }, []);

  return (
    <section className="pt-28 pb-8 px-6 max-w-4xl mx-auto w-full">
      {/* Thin label */}
      <p
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          color: "var(--accent-faint)",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        Edge Network Status
      </p>

      {}
      <div
        className="mt-3 grid grid-cols-2 sm:grid-cols-4 rounded-xl overflow-hidden"
        style={{ border: "1px solid var(--border)" }}
      >
        {[
          { label: "City",    value: geo?.city },
          { label: "Country", value: geo?.country },
          { label: "Region",  value: geo?.region },
          { label: "Server",  value: geo?.nearestServer },
        ].map((item, i, arr) => (
          <div
            key={item.label}
            className="flex flex-col justify-center px-4 py-3"
            style={{
              background: i % 2 === 0 ? "var(--surface)" : "var(--surface-2)",
              borderRight: i < arr.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            <span
              style={{
                fontSize: "0.58rem",
                letterSpacing: "0.14em",
                color: "var(--accent-faint)",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              {item.label}
            </span>
            <span
              className="mt-1 font-medium"
              style={{ fontSize: "0.82rem", color: "var(--accent)" }}
            >
              {item.value ?? <span className="inline-block w-14 h-2.5 rounded shimmer" />}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
