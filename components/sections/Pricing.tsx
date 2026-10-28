"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { pricing, type Plan } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";

const tabs = [
  { id: "monthly", label: "Mesačné balíky" },
  { id: "oneOff", label: "Jednorazové projekty" },
] as const;

const eur = (n: number) => new Intl.NumberFormat("sk-SK").format(n) + " €";

function PlanCard({ plan, i }: { plan: Plan; i: number }) {
  const featured = plan.featured;
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col rounded-3xl p-7 sm:p-8 ${
        featured ? "bg-signal text-ink" : "bg-ink-2 text-cream ring-1 ring-cream/10"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-7 rounded-full bg-cream px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
          {pricing.featuredLabel}
        </span>
      )}
      <h3 className="text-2xl font-extrabold tracking-tight">{plan.name}</h3>
      <p className={`mt-2 text-sm ${featured ? "text-ink/75" : "text-muted-dark"}`}>
        {plan.description}
      </p>
      <p className="mt-8 flex items-baseline gap-2">
        {plan.from && <span className="text-sm font-semibold">od</span>}
        <span className="display text-5xl">{eur(plan.price)}</span>
        {plan.period && (
          <span className={`text-sm ${featured ? "text-ink/75" : "text-muted-dark"}`}>
            {plan.period}
          </span>
        )}
      </p>
      <ul className="mt-8 flex flex-col gap-3 text-[15px]">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-3">
            <span
              aria-hidden
              className={`mt-2 size-2 shrink-0 rounded-full ${featured ? "bg-ink" : "bg-signal"}`}
            />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-10">
        <Button href="#kontakt" variant={featured ? "dark" : "ghost-light"} full>
          Mám záujem
        </Button>
      </div>
    </motion.li>
  );
}

export function Pricing() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("monthly");
  const plans = pricing[tab];

  return (
    <section
      id="cennik"
      aria-labelledby="cennik-title"
      className="bg-ink py-24 text-cream sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="05" tone="dark">
              Cenník
            </SectionLabel>
            <h2 id="cennik-title" className="display mt-6 text-[clamp(2.75rem,7vw,6rem)]">
              <SplitText lines={["Jasné ceny.", "Žiadne hviezdičky."]} accentLine={1} />
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Typ spolupráce"
            className="relative inline-flex self-start rounded-full bg-ink-2 p-1.5 ring-1 ring-cream/10 lg:self-auto"
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls="cennik-panel"
                onClick={() => setTab(t.id)}
                className={`relative min-h-11 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:px-6 sm:text-base ${
                  tab === t.id ? "text-ink" : "text-cream/75 hover:text-cream"
                }`}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="pricing-pill"
                    className="absolute inset-0 rounded-full bg-cream"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          id="cennik-panel"
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
          className="mt-14 lg:mt-20"
        >
          <AnimatePresence mode="wait">
            <motion.ul
              key={tab}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
              className={`grid gap-5 sm:grid-cols-2 ${
                tab === "monthly" ? "xl:grid-cols-4" : "lg:grid-cols-3"
              }`}
            >
              {plans.map((p, i) => (
                <PlanCard key={p.name} plan={p} i={i} />
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-cream/10 pt-8 text-sm text-muted-dark sm:flex-row sm:flex-wrap sm:gap-x-10">
          <p className="font-semibold text-cream">{pricing.note}</p>
          {pricing.notes.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
