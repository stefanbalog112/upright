"use client";

import { motion } from "motion/react";

type Props = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** animovať hneď po načítaní (hero), inak pri vstupe do viewportu */
  immediate?: boolean;
  /** index riadku, ktorý sa zvýrazní */
  accentLine?: number;
};

/** Nadpis, ktorý sa odhaľuje po slovách. Pre čítačky obrazovky ostáva jeden súvislý text. */
export function SplitText({
  lines,
  className,
  lineClassName,
  delay = 0,
  immediate = false,
  accentLine,
}: Props) {
  let i = 0;
  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <motion.span className={className} initial="hidden" {...trigger}>
      <span className="sr-only">{lines.join(" ")}</span>
      {lines.map((line, li) => (
        <span key={li} aria-hidden className={`block ${lineClassName ?? ""}`}>
          {line.split(" ").map((word, wi) => {
            const index = i++;
            return (
              <span key={wi} className="inline-block overflow-hidden pb-[0.08em] align-top">
                <motion.span
                  className={`inline-block ${li === accentLine ? "text-signal" : ""}`}
                  variants={{
                    hidden: { y: "110%" },
                    show: {
                      y: "0%",
                      transition: {
                        duration: 0.9,
                        delay: delay + index * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                >
                  {word}
                </motion.span>
                {wi < line.split(" ").length - 1 && " "}
              </span>
            );
          })}
        </span>
      ))}
    </motion.span>
  );
}
