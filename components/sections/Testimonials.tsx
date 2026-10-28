"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { testimonials } from "@/content/site";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const t = testimonials[i];
  const go = (d: 1 | -1) => {
    setDir(d);
    setI((v) => (v + d + testimonials.length) % testimonials.length);
  };

  return (
    <section
      aria-labelledby="referencie-title"
      aria-roledescription="carousel"
      className="bg-signal py-24 text-ink sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-6">
          <SectionLabel index="08" tone="signal">
            Referencie
          </SectionLabel>
          <p className="rounded-full border border-ink/30 px-3 py-1 text-xs font-semibold">
            Ukážkové texty – nahradiť reálnymi
          </p>
        </div>
        <h2 id="referencie-title" className="sr-only">
          Čo hovoria klienti
        </h2>

        <div className="relative mt-12 min-h-[22rem] sm:min-h-[20rem] lg:mt-16">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={i}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              aria-roledescription="slide"
              aria-label={`${i + 1} z ${testimonials.length}`}
            >
              <blockquote className="display max-w-5xl text-[clamp(1.85rem,4.6vw,4rem)] !leading-[1.05]">
                „{t.quote}“
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4">
                <span aria-hidden className="h-12 w-[1.7rem] rounded-md bg-ink" />
                <span>
                  <span className="block font-extrabold">{t.name}</span>
                  <span className="block text-sm text-ink/75">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-between gap-6">
          <div className="flex gap-2">
            {testimonials.map((_, n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setDir(n > i ? 1 : -1);
                  setI(n);
                }}
                aria-label={`Referencia ${n + 1}`}
                aria-current={n === i}
                className="flex h-11 items-center"
              >
                <span
                  className={`block h-1.5 rounded-full bg-ink transition-all duration-500 ${n === i ? "w-12" : "w-5 opacity-30"}`}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Predchádzajúca referencia"
              className="flex size-12 items-center justify-center rounded-full border border-ink/30 text-xl transition-colors hover:bg-ink hover:text-cream"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Ďalšia referencia"
              className="flex size-12 items-center justify-center rounded-full border border-ink/30 text-xl transition-colors hover:bg-ink hover:text-cream"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
