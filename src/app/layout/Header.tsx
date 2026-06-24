import { LiveFeed } from "../components/LiveFeed";

export function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{
        background: "linear-gradient(to bottom, rgba(15,15,15,0.97) 0%, rgba(15,15,15,0) 100%)",
        backdropFilter: "blur(2px)",
      }}
    >
      {}
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2.2rem",
          color: "var(--red)",
          letterSpacing: "0.02em",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        NETFLIX
      </span>

      {}
      <nav className="hidden md:flex items-center gap-6">
        {["Home", "TV Shows", "Movies", "New & Popular"].map((item) => (
          <span
            key={item}
            className="cursor-pointer"
            style={{ fontSize: "0.8rem", color: "var(--accent-dim)", transition: "color 150ms" }}
          >
            {item}
          </span>
        ))}
      </nav>

      {}
      <div className="flex items-center gap-2">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--green)", boxShadow: "0 0 5px var(--green)" }}
        />
        <span style={{ fontSize: "0.75rem", color: "var(--accent-dim)" }}>
          <LiveFeed />&nbsp;watching
        </span>
      </div>
    </header>
  );
}
