/** Blikajúca bodka nahrávania – podpis značky. */
export function RecDot({ className = "", label = true }: { className?: string; label?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span aria-hidden className="size-2.5 animate-rec rounded-full bg-signal" />
      {label && <span className="text-xs font-bold uppercase tracking-[0.2em]">Rec</span>}
    </span>
  );
}
