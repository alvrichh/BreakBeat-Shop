type Props = {
  words: string[];
  className?: string;
  reverse?: boolean;
};

/** Cinta de texto infinita, como un rótulo de tren pasando. */
export function Marquee({ words, className = "", reverse = false }: Props) {
  const run = (hidden: boolean) => (
    <span className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="flex items-center">
          <span className="px-5">{word}</span>
          <span aria-hidden="true">✦</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className={`overflow-hidden border-y-3 border-black py-2 ${className}`}>
      <div
        className="flex w-max animate-marquee font-display text-xl uppercase sm:text-2xl"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
