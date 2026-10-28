"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Vlastný kurzor – iba na zariadeniach s myšou a bez `prefers-reduced-motion`.
 * Nad odkazmi a tlačidlami sa zväčší; prvky s `data-cursor="Text"` zobrazia popisok.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? null);
      setHover(
        !!target?.closest("a, button, [role='button'], label, select, summary, [data-cursor]"),
      );
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = label ? 88 : hover ? 44 : 12;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[11px] font-bold uppercase tracking-wider text-ink ${label || !hover ? "bg-signal" : "bg-signal/30 ring-1 ring-signal"}`}
        animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
