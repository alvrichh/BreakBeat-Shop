const BARS = [
  { color: "bg-pink", delay: "0s" },
  { color: "bg-yolk", delay: "-0.45s" },
  { color: "bg-acid", delay: "-0.2s" },
  { color: "bg-cyan", delay: "-0.7s" },
  { color: "bg-violet", delay: "-0.35s" },
];

/** Barras de ecualizador que botan al ritmo (decorativo). */
export function Equalizer({ className = "h-8" }: { className?: string }) {
  return (
    <span className={`flex items-end gap-[3px] ${className}`} aria-hidden="true">
      {BARS.map((bar) => (
        <span
          key={bar.color}
          className={`block h-full w-[5px] origin-bottom animate-eq border border-black ${bar.color}`}
          style={{ animationDelay: bar.delay }}
        />
      ))}
    </span>
  );
}
