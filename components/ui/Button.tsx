"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

type Variant = "primary" | "dark" | "light" | "ghost-light" | "ghost-dark";

const styles: Record<Variant, string> = {
  primary: "bg-signal text-ink hover:bg-cream",
  dark: "bg-ink text-cream hover:bg-ink-3",
  light: "bg-cream text-ink hover:bg-signal",
  "ghost-light": "border border-cream/30 text-cream hover:border-cream hover:bg-cream hover:text-ink",
  "ghost-dark": "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream",
};

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  href?: string;
  type?: "button" | "submit";
  onClick?: (e?: React.MouseEvent) => void;
  className?: string;
  arrow?: boolean;
  /** na celú šírku */
  full?: boolean;
  disabled?: boolean;
};

/** Magnetické tlačidlo – jemne sa „prilepí“ ku kurzoru. */
export function Button({
  children,
  variant = "primary",
  href,
  type = "button",
  onClick,
  className = "",
  arrow = true,
  full = false,
  disabled,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const cls = `group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-base font-semibold transition-colors duration-300 sm:px-7 disabled:opacity-60 ${full ? "w-full" : ""} ${styles[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </>
  );

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={full ? "block w-full" : "inline-block"}
    >
      {href ? (
        <a href={href} className={cls} onClick={onClick}>
          {content}
        </a>
      ) : (
        <button type={type} className={cls} onClick={onClick} disabled={disabled}>
          {content}
        </button>
      )}
    </motion.span>
  );
}
