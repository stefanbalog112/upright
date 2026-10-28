"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { goals, services } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";

export function Services() {
  const [goal, setGoal] = useState<number | null>(null);
  const active = goal === null ? null : goals[goal].services;

  return (
    <section
      id="sluzby"
      aria-labelledby="sluzby-title"
      className="bg-ink py-24 text-cream sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="01" tone="dark">
              Služby
            </SectionLabel>
            <h2 id="sluzby-title" className="display mt-6 text-[clamp(2.75rem,7vw,6rem)]">
              <SplitText lines={["Všetko, čo potrebujete", "na sieťach."]} accentLine={1} />
            </h2>
          </div>
          <Reveal className="lg:col-span-5">
            <fieldset>
              <legend className="mb-4 text-lg font-semibold">Čo potrebujete dosiahnuť?</legend>
              <div className="flex flex-wrap gap-2">
                {goals.map((g, i) => {
                  const on = goal === i;
                  return (
                    <button
                      key={g.label}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setGoal(on ? null : i)}
                      className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                        on
                          ? "border-signal bg-signal text-ink"
                          : "border-cream/25 text-cream hover:border-cream"
                      }`}
                    >
                      {g.label}
                    </button>
                  );
                })}
              </div>
              <p aria-live="polite" className="mt-3 min-h-6 text-sm text-muted-dark">
                {active
                  ? `Zvýraznili sme ${active.length} ${active.length > 1 ? "služby" : "službu"}, ktoré vám pomôžu najviac.`
                  : "Vyberte cieľ a zvýrazníme služby, ktoré k nemu vedú."}
              </p>
            </fieldset>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-cream/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {services.map((s, i) => {
            const highlighted = active?.includes(s.id);
            const dimmed = active && !highlighted;
            return (
              <Reveal as="li" key={s.id} delay={(i % 3) * 0.08} className="bg-ink">
                <motion.article
                  animate={{ opacity: dimmed ? 0.35 : 1 }}
                  transition={{ duration: 0.4 }}
                  className={`group relative flex h-full flex-col p-7 transition-colors duration-500 sm:p-9 ${
                    highlighted ? "bg-signal text-ink" : "hover:bg-ink-2"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`text-sm font-bold tabular-nums ${highlighted ? "text-ink" : "text-signal"}`}
                    >
                      0{i + 1}
                    </span>
                    {/* vertikálny 9:16 symbol */}
                    <span
                      aria-hidden
                      className={`h-10 w-[1.4rem] rounded-md border-2 transition-transform duration-500 group-hover:-rotate-6 ${
                        highlighted ? "border-ink" : "border-cream/30"
                      }`}
                    />
                  </div>
                  <h3 className="mt-10 text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {s.title}
                  </h3>
                  <p
                    className={`mt-4 text-base leading-relaxed ${highlighted ? "text-ink/80" : "text-cream/70"}`}
                  >
                    {s.text}
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                          highlighted ? "border-ink/30" : "border-cream/15 text-cream/80"
                        }`}
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
