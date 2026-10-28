type Props = {
  index: string;
  children: React.ReactNode;
  tone?: "light" | "dark" | "signal";
  className?: string;
};

/** Číslovaný štítok sekcie v štýle „01 ( Služby )“. */
export function SectionLabel({ index, children, tone = "light", className = "" }: Props) {
  const muted = { light: "text-muted", dark: "text-muted-dark", signal: "text-ink/75" }[tone];
  const accent = { light: "text-signal-dark", dark: "text-signal", signal: "text-ink" }[tone];
  return (
    <p
      className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] ${className}`}
    >
      <span className={accent}>{index}</span>
      <span className={muted}>( {children} )</span>
    </p>
  );
}
