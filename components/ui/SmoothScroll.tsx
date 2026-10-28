"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

/** Plynulý scroll cez Lenis. Pri `prefers-reduced-motion` sa nespustí. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      // lerp (namiesto duration) – plynulé dobiehanie, prirodzené aj na trackpade
      lerp: 0.12,
      wheelMultiplier: 1,
      anchors: { offset: -64 },
      autoRaf: true,
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect -- inštancia vzniká až v prehliadači
    setLenis(instance);
    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

/** Posun na kotvu – cez Lenis, ak beží, inak natívne. */
export function scrollToId(lenis: Lenis | null, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -64 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}
