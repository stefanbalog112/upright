/* eslint-disable @next/next/no-img-element -- placeholdery sú SVG v public/ */
import { asset } from "@/lib/asset";
import { RecDot } from "./RecDot";

type Props = {
  src: string;
  alt: string;
  tag?: string;
  className?: string;
  /** čas v rohu obrazovky ako pri nahrávaní */
  time?: string;
  priority?: boolean;
};

const icons = [
  "M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z",
  "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z",
  "M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13",
];

/** Vertikálny 9:16 rámik telefónu s ukážkou videa. */
export function PhoneFrame({ src, alt, tag, className = "", time = "00:15", priority }: Props) {
  return (
    <div
      className={`relative aspect-[9/16] overflow-hidden rounded-[1.75rem] border-[6px] border-ink-3 bg-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ${className}`}
    >
      <img
        src={asset(src)}
        alt={alt}
        width={540}
        height={960}
        loading={priority ? "eager" : "lazy"}
        className="absolute inset-0 size-full object-cover"
      />
      {/* UI vrstva ako pri nahrávaní */}
      <div aria-hidden className="absolute inset-x-0 top-0 flex items-center justify-between p-3 text-cream">
        <RecDot className="rounded-full bg-ink/60 px-2.5 py-1" />
        <span className="rounded-full bg-ink/60 px-2.5 py-1 text-[11px] font-semibold tabular-nums">
          {time}
        </span>
      </div>
      <div aria-hidden className="absolute left-1/2 top-1.5 h-1.5 w-12 -translate-x-1/2 rounded-full bg-ink/70" />
      {tag && (
        <span className="absolute left-3 top-12 rounded-full bg-cream px-3 py-1 text-xs font-bold text-ink">
          {tag}
        </span>
      )}
      <div aria-hidden className="absolute bottom-16 right-3 flex flex-col items-center gap-3 text-cream/90">
        {icons.map((d) => (
          <span key={d} className="flex size-8 items-center justify-center rounded-full bg-ink/50">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={d} />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
