"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { faq } from "@/content/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section aria-labelledby="faq-title" className="bg-cream py-24 text-ink sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <SectionLabel index="09">Časté otázky</SectionLabel>
          <h2 id="faq-title" className="display mt-6 text-[clamp(2.75rem,5vw,4.75rem)]">
            <SplitText lines={["Opýtajte sa.", "Radi odpovieme."]} />
          </h2>
        </div>

        <ul className="border-t border-ink/15 lg:col-span-7 lg:col-start-6">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-ink/15">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-bold tracking-tight sm:text-xl"
                  >
                    {item.q}
                    <span
                      aria-hidden
                      className={`relative flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        isOpen ? "bg-signal" : "bg-ink/5"
                      }`}
                    >
                      <span className="absolute h-0.5 w-3.5 bg-ink" />
                      <span
                        className={`absolute h-3.5 w-0.5 bg-ink transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`}
                      />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pr-12 text-base leading-relaxed text-muted sm:text-lg">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
