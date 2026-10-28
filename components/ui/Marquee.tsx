type Props = {
  items: string[];
  className?: string;
  duration?: number;
  reverse?: boolean;
};

/** Nekonečný pás textu. Pri `prefers-reduced-motion` stojí (globálne CSS). */
export function Marquee({ items, className = "", duration = 40, reverse = false }: Props) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="px-6 sm:px-10">{item}</span>
          <span aria-hidden className="size-2.5 rounded-full bg-signal sm:size-3" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`group relative flex overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
