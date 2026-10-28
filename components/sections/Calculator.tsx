"use client";

import { useState } from "react";
import { calculator, pricing, type ServiceId } from "@/content/site";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { usePrefill } from "@/components/ui/PrefillContext";
import { scrollToId, useLenis } from "@/components/ui/SmoothScroll";

type WebOption = (typeof calculator.webOptions)[number]["id"];

const P = calculator.prices;

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex min-h-14 cursor-pointer items-center justify-between gap-4 rounded-2xl bg-cream/5 px-5 py-4 ring-1 ring-cream/10 transition-colors hover:bg-cream/10 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal">
      <span>
        <span className="block font-semibold">{label}</span>
        <span className="block text-sm text-muted-dark">{hint}</span>
      </span>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className="relative h-7 w-12 shrink-0 rounded-full bg-cream/20 transition-colors after:absolute after:left-1 after:top-1 after:size-5 after:rounded-full after:bg-cream after:transition-transform peer-checked:bg-signal peer-checked:after:translate-x-5"
      />
    </label>
  );
}

function Slider({
  id,
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
        <output htmlFor={id} className="display text-3xl text-signal">
          {value} <span className="text-base font-semibold tracking-normal text-cream">{unit}</span>
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range mt-2"
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
      />
      <div aria-hidden className="flex justify-between text-xs text-muted-dark">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

const plural = (n: number, one: string, few: string, many: string) =>
  n === 1 ? one : n >= 2 && n <= 4 ? few : many;

export function Calculator() {
  const [videos, setVideos] = useState(calculator.videos.default);
  const [days, setDays] = useState(calculator.days.default);
  const [management, setManagement] = useState(false);
  const [ads, setAds] = useState(false);
  const [graphics, setGraphics] = useState(false);
  const [logo, setLogo] = useState(false);
  const [web, setWeb] = useState<WebOption>("none");
  const { setPrefill } = usePrefill();
  const lenis = useLenis();

  const monthly =
    videos * P.video +
    days * P.shootingDay +
    (management ? P.management : 0) +
    (ads ? P.ads : 0) +
    (graphics ? P.graphics : 0);

  const webPrice = web === "onepage" ? P.webOnePage : web === "presentation" ? P.webPresentation : 0;
  const oneOffRaw = (logo ? P.logo : 0) + webPrice;
  const bundle = logo && web !== "none";
  const oneOff = bundle ? Math.round(oneOffRaw * (1 - P.brandBundleDiscount)) : oneOffRaw;

  // Odporúčaný balík podľa výberu
  const recommended =
    ads || graphics
      ? "Komplet"
      : management
        ? "Správa"
        : videos >= 8 || days >= 2
          ? "Rast"
          : "Štart";
  const plan = pricing.monthly.find((p) => p.name === recommended);

  const send = () => {
    const services: ServiceId[] = ["video"];
    if (management) services.push("social");
    if (ads) services.push("ads");
    if (logo) services.push("branding");
    if (web !== "none") services.push("web");

    const lines = [
      "Dobrý deň, zaujíma ma táto konfigurácia z kalkulačky:",
      `• ${videos} ${plural(videos, "video", "videá", "videí")} mesačne, ${days} ${plural(days, "natáčací deň", "natáčacie dni", "natáčacích dní")}`,
      management && "• Správa sociálnych sietí",
      ads && "• Meta reklama",
      graphics && "• Grafika navyše",
      logo && "• Logo a identita",
      web !== "none" &&
        `• Web: ${calculator.webOptions.find((w) => w.id === web)?.label.toLowerCase()}`,
      `Odhad: ${monthly} € mesačne${oneOff ? ` + ${oneOff} € jednorazovo` : ""} (bez DPH).`,
    ].filter(Boolean);

    const budget =
      monthly < 300 ? "do 300 €" : monthly < 600 ? "300–600 €" : monthly < 1000 ? "600–1 000 €" : "1 000 € +";

    setPrefill({ services, budget, message: lines.join("\n") });
    scrollToId(lenis, "kontakt");
  };

  return (
    <section
      id="kalkulacka"
      aria-labelledby="kalkulacka-title"
      className="bg-cream py-24 text-ink sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="06">Kalkulačka</SectionLabel>
            <h2 id="kalkulacka-title" className="display mt-6 text-[clamp(2.75rem,7vw,6rem)]">
              <SplitText lines={["Spočítajte si", "to sami."]} />
            </h2>
          </div>
          <Reveal className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-muted">
              Nastavte, čo potrebujete, a hneď uvidíte orientačnú cenu. Konfiguráciu nám potom
              môžete poslať jedným klikom.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14 lg:mt-20">
          <div className="grid overflow-hidden rounded-[2rem] bg-ink text-cream lg:grid-cols-[1.4fr_1fr]">
            {/* Vstupy */}
            <div className="flex flex-col gap-10 p-6 sm:p-10 lg:p-12">
              <fieldset className="flex flex-col gap-8">
                <legend className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-muted-dark">
                  Mesačne
                </legend>
                <Slider
                  id="calc-videos"
                  label="Počet videí mesačne"
                  value={videos}
                  min={calculator.videos.min}
                  max={calculator.videos.max}
                  unit={plural(videos, "video", "videá", "videí")}
                  onChange={setVideos}
                />
                <Slider
                  id="calc-days"
                  label="Natáčacie dni"
                  value={days}
                  min={calculator.days.min}
                  max={calculator.days.max}
                  unit={plural(days, "deň", "dni", "dní")}
                  onChange={setDays}
                />
                <div className="grid gap-3 sm:grid-cols-3">
                  <Toggle
                    label="Správa sietí"
                    hint={`+${P.management} € / mes.`}
                    checked={management}
                    onChange={setManagement}
                  />
                  <Toggle
                    label="Meta reklama"
                    hint={`+${P.ads} € / mes.`}
                    checked={ads}
                    onChange={setAds}
                  />
                  <Toggle
                    label="Grafika navyše"
                    hint={`+${P.graphics} € / mes.`}
                    checked={graphics}
                    onChange={setGraphics}
                  />
                </div>
              </fieldset>

              <fieldset className="flex flex-col gap-6">
                <legend className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-muted-dark">
                  Jednorazovo
                </legend>
                <Toggle
                  label="Logo a vizuálna identita"
                  hint={`${P.logo} €`}
                  checked={logo}
                  onChange={setLogo}
                />
                <div>
                  <p id="calc-web-label" className="mb-3 font-semibold">
                    Webová stránka
                  </p>
                  <div
                    role="radiogroup"
                    aria-labelledby="calc-web-label"
                    className="grid gap-1 rounded-2xl bg-cream/5 p-1.5 sm:grid-cols-3 ring-1 ring-cream/10"
                  >
                    {calculator.webOptions.map((o) => (
                      <label
                        key={o.id}
                        className={`flex min-h-11 cursor-pointer items-center justify-center rounded-xl px-2 py-2 text-center text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-signal ${
                          web === o.id ? "bg-cream text-ink" : "text-cream/75 hover:text-cream"
                        }`}
                      >
                        <input
                          type="radio"
                          name="calc-web"
                          value={o.id}
                          checked={web === o.id}
                          onChange={() => setWeb(o.id)}
                          className="sr-only"
                        />
                        {o.label}
                      </label>
                    ))}
                  </div>
                  {bundle && (
                    <p className="mt-3 text-sm font-semibold text-signal">
                      Identita + web spolu: zľava {P.brandBundleDiscount * 100} %
                    </p>
                  )}
                </div>
              </fieldset>
            </div>

            {/* Výsledok */}
            <div className="relative flex flex-col bg-signal p-6 text-ink sm:p-10 lg:p-12">
              <div aria-live="polite" aria-atomic="true">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink/70">
                  Mesačne
                </p>
                <p className="display mt-2 text-[clamp(3.5rem,8vw,5.5rem)]">
                  <AnimatedNumber value={monthly} suffix=" €" />
                </p>
                <div className="mt-8 border-t border-ink/20 pt-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink/70">
                    Jednorazovo
                  </p>
                  <p className="display mt-2 text-5xl">
                    <AnimatedNumber value={oneOff} suffix=" €" />
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm font-medium text-ink/75">{calculator.note}</p>

              <div className="mt-8 rounded-2xl bg-ink/10 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ink/70">
                  Odporúčaný balík
                </p>
                <p className="mt-1 text-2xl font-extrabold">
                  {recommended}
                  {plan && (
                    <span className="ml-2 text-base font-semibold text-ink/75">
                      od {plan.price} € / mes.
                    </span>
                  )}
                </p>
              </div>

              <div className="mt-auto pt-10">
                <Button variant="dark" onClick={send} full>
                  Poslať túto konfiguráciu
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
