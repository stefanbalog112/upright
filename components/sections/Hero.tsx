"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { hero, marquee } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { RecDot } from "@/components/ui/RecDot";
import { SplitText } from "@/components/ui/SplitText";

const ease = [0.22, 1, 0.36, 1] as const;

type FloatingPhoneProps = {
  phone: (typeof hero.phones)[number];
  time: string;
  className: string;
  frameClassName?: string;
  progress: MotionValue<number>;
  /** posun v px a pootočenie v stupňoch na konci scrollu hero sekcie */
  scroll: [y: number, rotate: number];
  mouse: { x: MotionValue<number>; y: MotionValue<number>; depth: number };
  float: { amp: number; rotate: number; duration: number; delay: number };
  rotate: number;
  intro: { y: number; delay: number };
};

/**
 * Telefón s ukážkou, ktorý sa jemne vznáša. Vrstvy (zvonka dnu):
 * scroll parallax → reakcia na kurzor (posun + 3D náklon) → nekonečné vznášanie → úvodná animácia a hover.
 */
function FloatingPhone({
  phone,
  time,
  className,
  frameClassName,
  progress,
  scroll,
  mouse,
  float,
  rotate,
  intro,
}: FloatingPhoneProps) {
  const sy = useTransform(progress, [0, 1], [0, scroll[0]]);
  const sr = useTransform(progress, [0, 1], [0, scroll[1]]);
  const x = useTransform(mouse.x, (v) => v * mouse.depth);
  const y = useTransform(mouse.y, (v) => v * mouse.depth);
  const rotateY = useTransform(mouse.x, (v) => v * mouse.depth * 0.35);
  const rotateX = useTransform(mouse.y, (v) => v * mouse.depth * -0.35);

  return (
    <motion.div className={className} style={{ y: sy, rotate: sr }}>
      <motion.div style={{ x, y, rotateX, rotateY, transformPerspective: 900 }}>
        <motion.div
          animate={{ y: [0, -float.amp, 0], rotate: [0, float.rotate, 0] }}
          transition={{
            duration: float.duration,
            delay: float.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: intro.y, rotate: rotate * 1.2 }}
            animate={{ opacity: 1, y: 0, rotate }}
            transition={{ duration: 1, delay: intro.delay, ease }}
            whileHover={{ scale: 1.05, rotate: rotate / 2 }}
          >
            <PhoneFrame {...phone} time={time} priority className={frameClassName} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bars = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const [a, b, c] = hero.phones;

  // Pozícia kurzora v rámci kompozície (-0.5 až 0.5), jemne vyhladená pružinou
  const reduced = useReducedMotion();
  const mx = useSpring(0, { stiffness: 50, damping: 18, mass: 0.8 });
  const my = useSpring(0, { stiffness: 50, damping: 18, mass: 0.8 });
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const resetPointer = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-ink text-cream"
    >
      {/* Vertikálne pruhy na pozadí – motív „na výšku“ */}
      <motion.div
        aria-hidden
        style={{ y: bars }}
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 justify-end gap-6 pr-10 opacity-[0.05] lg:flex"
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={i} className="h-full w-12 rounded-full bg-cream" />
        ))}
      </motion.div>

      <div className="relative mx-auto grid max-w-[90rem] gap-14 px-4 pb-16 pt-32 sm:px-6 sm:pt-36 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-10 lg:px-10 lg:pb-20 lg:pt-36">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted-dark"
          >
            <RecDot label={false} />
            {hero.eyebrow}
          </motion.p>

          <h1
            id="hero-title"
            className="display text-[clamp(3.25rem,min(11vw,12.5vh),8.5rem)] text-cream"
          >
            <SplitText lines={hero.title} immediate delay={0.15} accentLine={2} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-cream/75 sm:text-xl"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="ghost-light">
              {hero.secondaryCta.label}
            </Button>
          </motion.div>
        </div>

        {/* Kompozícia vertikálnych telefónov – vznášajú sa, reagujú na kurzor aj scroll */}
        <div
          onPointerMove={onPointerMove}
          onPointerLeave={resetPointer}
          className="relative mx-auto flex h-[26rem] w-full max-w-[34rem] items-center justify-center sm:h-[34rem] lg:h-[40rem]"
        >
          <FloatingPhone
            phone={a}
            time="00:12"
            className="absolute left-0 top-10 w-[36%] sm:top-12"
            progress={scrollYProgress}
            scroll={[-90, -8]}
            mouse={{ x: mx, y: my, depth: 26 }}
            float={{ amp: 12, rotate: 1.5, duration: 6, delay: 0 }}
            rotate={-7}
            intro={{ y: 60, delay: 0.4 }}
          />
          <FloatingPhone
            phone={b}
            time="00:27"
            className="relative z-10 w-[44%]"
            frameClassName="border-ink-2"
            progress={scrollYProgress}
            scroll={[-40, 0]}
            mouse={{ x: mx, y: my, depth: 14 }}
            float={{ amp: 9, rotate: -1, duration: 7, delay: 0.8 }}
            rotate={0}
            intro={{ y: 80, delay: 0.25 }}
          />
          <FloatingPhone
            phone={c}
            time="00:09"
            className="absolute bottom-6 right-0 w-[36%] sm:bottom-4"
            progress={scrollYProgress}
            scroll={[-130, 8]}
            mouse={{ x: mx, y: my, depth: 34 }}
            float={{ amp: 14, rotate: -1.5, duration: 5.5, delay: 1.6 }}
            rotate={6}
            intro={{ y: 60, delay: 0.55 }}
          />

          {/* Štítok 9:16 */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute right-4 top-4 z-20 sm:right-8 sm:top-8 rounded-full bg-signal px-4 py-2 text-sm font-extrabold text-ink sm:right-10"
          >
            9:16
          </motion.span>
        </div>
      </div>

      <div className="border-y border-cream/10 bg-ink py-6 sm:py-8">
        <Marquee
          items={marquee}
          className="display text-3xl text-cream sm:text-5xl"
          duration={45}
        />
      </div>
    </section>
  );
}
