import { Suspense } from "react";
import { Header } from "./layout/Header";
import HeroSection from "./components/HeroSection";
import MoviesGrid from "./components/MoviesGrid";
import { MovieSkeleton } from "./components/MovieSkeleton";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Header />
      <HeroSection />

      <main className="flex-1">
        <Suspense fallback={<MovieSkeleton />}>
          <MoviesGrid />
        </Suspense>
      </main>

      <footer className="max-w-4xl mx-auto w-full px-6 py-6">
        <div className="divider mb-4" />
        <p style={{ fontSize: "0.68rem", color: "var(--accent-faint)", textAlign: "center" }}>
          Data from TMDB · Served from nearest edge node
        </p>
      </footer>
    </div>
  );
}
