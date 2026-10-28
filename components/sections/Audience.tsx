import { audience } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";

export function Audience() {
  return (
    <section aria-labelledby="pre-koho-title" className="bg-cream py-24 text-ink sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="02">Pre koho</SectionLabel>
            <h2 id="pre-koho-title" className="display mt-6 text-[clamp(2.75rem,7vw,6rem)]">
              <SplitText lines={["Pre firmy,", "ktoré ľudia poznajú", "po mene."]} />
            </h2>
          </div>
          <Reveal className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-muted">
              Pracujeme s lokálnymi podnikmi z Rožňavy, Gemera a Košíc. Rozumieme, ako sa u nás
              nakupuje, kde sa chodí na obed a prečo turisti hľadajú ubytovanie na Instagrame.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 border-t border-ink/15 lg:mt-20">
          {audience.map((a, i) => (
            <Reveal as="li" key={a.title} className="border-b border-ink/15">
              <div className="group grid gap-4 py-8 transition-colors sm:py-10 lg:grid-cols-12 lg:items-center lg:gap-8">
                <span className="text-sm font-bold text-signal-dark lg:col-span-1">0{i + 1}</span>
                <h3 className="display text-4xl transition-transform duration-500 group-hover:translate-x-2 sm:text-5xl lg:col-span-4 lg:text-6xl">
                  {a.title}
                </h3>
                <p className="text-base leading-relaxed text-muted sm:text-lg lg:col-span-4">
                  {a.text}
                </p>
                <ul className="flex flex-wrap gap-2 lg:col-span-3 lg:justify-end">
                  {a.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-cream"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
