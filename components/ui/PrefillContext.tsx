"use client";

import { createContext, useContext, useState } from "react";
import type { ServiceId } from "@/content/site";

export type Prefill = {
  services: ServiceId[];
  budget: string;
  message: string;
  /** zmena kľúča povie formuláru, že má prevziať nové hodnoty */
  key: number;
};

type Ctx = {
  prefill: Prefill | null;
  setPrefill: (p: Omit<Prefill, "key">) => void;
};

const PrefillContext = createContext<Ctx>({ prefill: null, setPrefill: () => {} });

export const usePrefill = () => useContext(PrefillContext);

/** Prenáša konfiguráciu z kalkulačky do kontaktného formulára. */
export function PrefillProvider({ children }: { children: React.ReactNode }) {
  const [prefill, set] = useState<Prefill | null>(null);
  const setPrefill = (p: Omit<Prefill, "key">) => set({ ...p, key: Date.now() });
  return (
    <PrefillContext.Provider value={{ prefill, setPrefill }}>{children}</PrefillContext.Provider>
  );
}
