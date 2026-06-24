import Image from "next/image";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview?: string;
}

export function MovieCard({ title, poster_path, vote_average, release_date, overview }: Movie) {
  const year  = release_date?.slice(0, 4) ?? "—";
  const score = Math.round(vote_average * 10);
  const scoreColor =
    score >= 70 ? "var(--green)" : score >= 50 ? "var(--yellow)" : "var(--red)";

  return (
    <article
      className="banner-card flex items-center gap-4 rounded-xl px-4 py-3 cursor-pointer"
      style={{ background: "var(--surface)" }}
    >
      {}
      <div
        className="poster-thumb relative flex-shrink-0 rounded-lg overflow-hidden"
        style={{ width: 56, height: 80 }}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          alt={title}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>

      {/* Orta: mətn bloku */}
      <div className="flex-1 min-w-0">
        <p
          className="font-semibold leading-snug line-clamp-1"
          style={{ fontSize: "0.88rem", color: "var(--accent)" }}
        >
          {title}
        </p>

        {overview && (
          <p
            className="mt-1 line-clamp-2 leading-relaxed"
            style={{ fontSize: "0.7rem", color: "var(--accent-dim)" }}
          >
            {overview}
          </p>
        )}

        <div className="flex items-center gap-3 mt-2">
          <span style={{ fontSize: "0.65rem", color: "var(--accent-faint)" }}>
            {year}
          </span>
          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              color: scoreColor,
              letterSpacing: "0.04em",
            }}
          >
            {score}%
          </span>
        </div>
      </div>

      {/* Sağ: ox ikonu */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{ color: "var(--accent-faint)", flexShrink: 0 }}
      >
        <path
          d="M6 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </article>
  );
}
