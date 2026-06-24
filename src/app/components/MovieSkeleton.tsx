export function MovieSkeleton() {
  return (
    <section className="max-w-4xl mx-auto px-6 pb-20">
      <div className="flex items-center justify-between py-5">
        <div className="shimmer h-4 w-36 rounded" />
      </div>
      <div className="divider mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl px-4 py-3"
            style={{ background: "var(--surface)" }}
          >
            <div className="shimmer flex-shrink-0 rounded-lg" style={{ width: 56, height: 80 }} />
            <div className="flex-1 space-y-2">
              <div className="shimmer h-3.5 w-3/4 rounded" />
              <div className="shimmer h-2.5 w-full rounded" />
              <div className="shimmer h-2.5 w-2/3 rounded" />
              <div className="flex gap-3 mt-1">
                <div className="shimmer h-2 w-8 rounded" />
                <div className="shimmer h-2 w-8 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
