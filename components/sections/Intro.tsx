"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { intro } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

function RotatingGreeting() {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % intro.greetings.length), 2000);
    return () => window.clearInterval(t);
  }, [reduced]);

  return (
    <span className="relative inline-flex h-[1.05em] overflow-hidden align-bottom">
      <span className="sr-only">{intro.greetings[0]}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          aria-hidden
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="inline-block whitespace-nowrap"
        >
          {intro.greetings[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="bg-cream py-24 text-ink sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <SectionLabel index="00">{intro.label}</SectionLabel>
        <h2
          id="intro-title"
          className="display mt-8 text-[clamp(4rem,16vw,13rem)] text-ink"
        >
          <RotatingGreeting />
        </h2>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-2xl font-medium leading-snug tracking-tight sm:text-3xl lg:text-4xl">
              {intro.text}
            </p>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9 lg:pt-2">
            <p className="text-lg leading-relaxed text-muted">{intro.text2}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
