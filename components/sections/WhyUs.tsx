import { whyUs } from "@/content/site";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";

export function WhyUs() {
  return (
    <section aria-labelledby="preco-title" className="bg-ink py-24 text-cream sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <SectionLabel index="07" tone="dark">
          Prečo my
        </SectionLabel>
        <h2 id="preco-title" className="display mt-6 text-[clamp(2.75rem,7vw,6rem)]">
          <SplitText lines={["Malý tím.", "Veľký záber."]} accentLine={1} />
        </h2>

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-cream/10 lg:mt-20 lg:grid-cols-4">
          {whyUs.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="flex flex-col-reverse bg-ink p-6 sm:p-9">
              <dt className="mt-3 text-sm text-muted-dark sm:text-base">{s.label}</dt>
              <dd className="display text-5xl text-cream sm:text-7xl">
                {s.value === null ? (
                  <span>{s.display}</span>
                ) : (
                  <AnimatedNumber value={s.value} onView suffix={s.suffix} />
                )}
              </dd>
            </Reveal>
          ))}
        </dl>

        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {whyUs.benefits.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 0.08}>
              {/* vertikálny pruh – motív 9:16 */}
              <span aria-hidden className="block h-14 w-2 rounded-full bg-signal" />
              <h3 className="mt-6 text-2xl font-extrabold tracking-tight">{b.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-cream/70">{b.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
