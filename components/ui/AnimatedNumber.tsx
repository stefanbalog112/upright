"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const format = (n: number) => new Intl.NumberFormat("sk-SK").format(Math.round(n));

type Props = {
  value: number;
  /** count up až keď je prvok vo viewporte */
  onView?: boolean;
  className?: string;
  suffix?: string;
};

/** Číslo, ktoré sa plynule dopočíta na novú hodnotu. */
export function AnimatedNumber({ value, onView = false, className, suffix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const current = useRef(onView ? 0 : value);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || (onView && !inView)) return;
    if (reduced) {
      el.textContent = format(value) + suffix;
      current.current = value;
      return;
    }
    const controls = animate(current.current, value, {
      duration: onView ? 1.8 : 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        current.current = v;
        el.textContent = format(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [value, inView, onView, reduced, suffix]);

  return (
    <span ref={ref} className={className}>
      {format(onView ? 0 : value) + suffix}
    </span>
  );
}
