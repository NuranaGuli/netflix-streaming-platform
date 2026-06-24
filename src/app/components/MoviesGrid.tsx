import { MovieCard, type Movie } from "./MovieCard";

export const dynamic = "force-dynamic";

export default async function MoviesGrid() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: { Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}` },
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!data.results) {
    return (
      <p className="text-center py-20" style={{ color: "var(--accent-dim)", fontSize: "0.85rem" }}>
        Couldn&apos;t load films — check your TMDB API key.
      </p>
    );
  }

  const movies: Movie[] = data.results;

  return (
    <section className="max-w-4xl mx-auto px-6 pb-20">
      {}
      <div className="flex items-center justify-between py-5">
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.1rem",
            letterSpacing: "0.12em",
            color: "var(--accent-dim)",
          }}
        >
          TRENDING NOW
        </h2>
        <span style={{ fontSize: "0.7rem", color: "var(--accent-faint)" }}>
          {movies.length} titles
        </span>
      </div>

      <div className="divider mb-4" />

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {movies.map((movie, index) => (
          <div key={movie.id} className="relative">
            {}
            <span
              className="rank-num absolute -left-1 top-1/2 -translate-y-1/2 select-none pointer-events-none"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="relative pl-10">
              <MovieCard {...movie} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
