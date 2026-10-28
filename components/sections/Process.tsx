"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { process } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";

export function Process() {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section
      id="postup"
      aria-labelledby="postup-title"
      className="bg-cream py-24 text-ink sm:py-32 lg:py-40"
    >
      <div className="mx-auto grid max-w-[90rem] gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionLabel index="04">Ako pracujeme</SectionLabel>
            <h2 id="postup-title" className="display mt-6 text-[clamp(2.75rem,7vw,6rem)]">
              <SplitText lines={["Od kávy", "k prvým videám."]} />
            </h2>
            <Reveal>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
                Päť jasných krokov, žiadne prekvapenia. Prvé videá máte zvyčajne do dvoch týždňov
                od konzultácie.
              </p>
            </Reveal>
          </div>
        </div>

        <ol ref={list} className="relative lg:col-span-6 lg:col-start-7">
          {/* časová os */}
          <span aria-hidden className="absolute bottom-6 left-[1.4rem] top-6 w-0.5 bg-ink/10" />
          <motion.span
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute bottom-6 left-[1.4rem] top-6 w-0.5 origin-top bg-signal"
          />
          {process.map((step, i) => (
            <Reveal as="li" key={step.title} className="relative flex gap-6 pb-14 last:pb-0 sm:gap-8">
              <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-ink text-base font-extrabold text-cream ring-8 ring-cream">
                {i + 1}
              </span>
              <div className="pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {step.title}
                  </h3>
                  {step.badge && (
                    <span className="rounded-full bg-signal px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
                      {step.badge}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-signal-dark">
                  {step.time}
                </p>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
