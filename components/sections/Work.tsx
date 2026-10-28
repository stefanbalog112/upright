"use client";

/* eslint-disable @next/next/no-img-element -- placeholdery sú SVG v public/ */
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { work } from "@/content/site";
import { asset } from "@/lib/asset";
import { RecDot } from "@/components/ui/RecDot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";

const pad = (n: number) => String(n).padStart(2, "0");

export function Work() {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const drag = useRef({ active: false, moved: false, startX: 0, scroll: 0 });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement | undefined;
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : 1;
    setIndex(Math.min(work.length - 1, Math.round(el.scrollLeft / step)));
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.children[0] as HTMLElement | undefined;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  // Ťahanie myšou (na dotyku funguje natívny scroll)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { active: true, moved: false, startX: e.clientX, scroll: track.current.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active || !track.current) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 4 && !d.moved) {
      d.moved = true;
      track.current.style.scrollSnapType = "none";
      track.current.setPointerCapture(e.pointerId);
    }
    if (d.moved) track.current.scrollLeft = d.scroll - dx;
  };
  const endDrag = () => {
    const el = track.current;
    if (!drag.current.active || !el) return;
    drag.current.active = false;
    if (drag.current.moved) {
      // dosnapovanie na najbližšiu kartu
      const card = el.children[0] as HTMLElement;
      const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
      const target = Math.round(el.scrollLeft / step) * step;
      el.scrollTo({ left: target, behavior: "smooth" });
      window.setTimeout(() => (el.style.scrollSnapType = ""), 500);
    }
  };

  return (
    <section
      id="prace"
      aria-labelledby="prace-title"
      className="overflow-hidden bg-ink py-24 text-cream sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="03" tone="dark">
              Vybrané práce
            </SectionLabel>
            <h2 id="prace-title" className="display mt-6 text-[clamp(2.75rem,7vw,6rem)]">
              <SplitText lines={["Videá, ktoré", "ľudia dopozerajú."]} accentLine={1} />
            </h2>
          </div>

          <Reveal className="flex items-center gap-6">
            <p className="text-lg font-bold tabular-nums" aria-live="polite">
              <span className="sr-only">Projekt </span>
              {pad(index + 1)} <span className="text-muted-dark">/ {pad(work.length)}</span>
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={atStart}
                aria-label="Predchádzajúci projekt"
                className="flex size-12 items-center justify-center rounded-full border border-cream/25 text-xl transition-colors hover:bg-cream hover:text-ink disabled:pointer-events-none disabled:opacity-30"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={atEnd}
                aria-label="Ďalší projekt"
                className="flex size-12 items-center justify-center rounded-full border border-cream/25 text-xl transition-colors hover:bg-cream hover:text-ink disabled:pointer-events-none disabled:opacity-30"
              >
                →
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <ul
        ref={track}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        data-cursor="Ťahaj"
        data-lenis-prevent-wheel
        aria-label="Vybrané práce"
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 select-none sm:mt-16 sm:gap-6 sm:scroll-px-6 sm:px-6 lg:scroll-px-10 lg:px-10"
      >
        {work.map((w, i) => (
          <li
            key={w.title}
            className="w-[72vw] max-w-[22rem] shrink-0 snap-start sm:w-[19rem] lg:w-[21rem]"
            aria-label={`${pad(i + 1)} z ${pad(work.length)}: ${w.title}`}
          >
            <motion.article
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group"
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] bg-ink-2">
                <img
                  src={asset(w.src)}
                  alt={w.alt}
                  width={540}
                  height={960}
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                  <RecDot className="rounded-full bg-ink/60 px-2.5 py-1 text-cream" />
                  <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-ink">
                    {w.category}
                  </span>
                </div>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight">{w.title}</h3>
                  <p className="mt-1 text-sm text-muted-dark">{w.client}</p>
                </div>
                <span className="text-sm font-bold text-signal tabular-nums">{pad(i + 1)}</span>
              </div>
            </motion.article>
          </li>
        ))}
        <li aria-hidden className="w-px shrink-0" />
      </ul>
    </section>
  );
}
