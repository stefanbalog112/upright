"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ctaLabel, nav, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { scrollToId, useLenis } from "@/components/ui/SmoothScroll";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Z mobilného menu: najprv zavrieť (odomknúť scroll), potom posunúť na sekciu
  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => scrollToId(lenis, href.slice(1)), 350);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pri otvorenom menu zastaviť scroll stránky a zavrieť na Esc
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative z-10 mx-auto flex items-center justify-between gap-6 px-4 transition-[height,background-color] duration-500 sm:px-6 lg:px-10 ${
          scrolled || open
            ? "h-16 bg-ink/90 backdrop-blur-md lg:h-[4.5rem]"
            : "h-20 bg-transparent lg:h-24"
        }`}
      >
        <a href="#top" aria-label="Upright – na začiatok stránky" className="relative z-10 shrink-0">
          <Logo
            variant="light"
            className={`w-auto transition-all duration-500 ${scrolled ? "h-7" : "h-8 lg:h-9"}`}
          />
        </a>

        <nav aria-label="Hlavná navigácia" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-4 py-2 text-[15px] font-medium text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href="#kontakt" variant="primary" className="!min-h-11 !py-2.5 text-[15px]">
            {ctaLabel}
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="relative z-10 flex size-12 items-center justify-center rounded-full bg-cream/10 text-cream lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Zavrieť menu" : "Otvoriť menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3.5 w-5" aria-hidden>
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 flex flex-col bg-ink px-4 pb-8 pt-24 sm:px-6 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobilná navigácia" className="flex-1">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
                    className="border-b border-cream/10"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => go(e, item.href)}
                      className="display flex items-baseline justify-between py-4 text-4xl text-cream sm:text-5xl"
                    >
                      {item.label}
                      <span className="text-sm font-semibold tracking-normal text-muted-dark">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col gap-6">
              <Button href="#kontakt" onClick={(e) => e && go(e, "#kontakt")} full>
                {ctaLabel}
              </Button>
              <p className="text-sm text-muted-dark">{site.region}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
