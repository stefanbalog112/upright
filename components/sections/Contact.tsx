"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { contact, site, type ServiceId } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { RecDot } from "@/components/ui/RecDot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { usePrefill } from "@/components/ui/PrefillContext";

type Form = {
  name: string;
  company: string;
  email: string;
  phone: string;
  services: ServiceId[];
  budget: string;
  message: string;
  consent: boolean;
};

type Errors = Partial<Record<"name" | "email" | "phone" | "message" | "consent", string>>;

const empty: Form = {
  name: "",
  company: "",
  email: "",
  phone: "",
  services: [],
  budget: "",
  message: "",
  consent: false,
};

function validate(f: Form): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Napíšte, prosím, vaše meno.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
    e.email = "Zadajte platný e-mail, napr. meno@firma.sk.";
  if (f.phone.trim() && !/^[+\d][\d\s/-]{7,}$/.test(f.phone.trim()))
    e.phone = "Telefón v tvare +421 9xx xxx xxx.";
  if (f.message.trim().length < 10) e.message = "Napíšte nám aspoň pár slov o vašej firme.";
  if (!f.consent) e.consent = "Bez súhlasu vám nemôžeme odpovedať.";
  return e;
}

const inputCls =
  "mt-2 block w-full rounded-2xl border-0 bg-cream/5 px-5 py-4 text-base text-cream ring-1 ring-cream/15 transition placeholder:text-cream/50 hover:ring-cream/30 focus:bg-cream/10 focus:outline-none focus:ring-2 focus:ring-signal aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-signal";

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {optional && <span className="font-normal text-muted-dark"> (nepovinné)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-signal">
          {error}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const { prefill } = usePrefill();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Predvyplnenie z kalkulačky
  useEffect(() => {
    if (!prefill) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- synchronizácia s kalkulačkou
    setSent(false);
    setForm((f) => ({
      ...f,
      services: prefill.services,
      budget: prefill.budget,
      message: prefill.message,
    }));
  }, [prefill]);

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as keyof Errors]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleService = (id: ServiceId) =>
    set(
      "services",
      form.services.includes(id) ? form.services.filter((s) => s !== id) : [...form.services, id],
    );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#contact-${first}`)?.focus();
      return;
    }
    // TODO: napojiť odosielanie (napr. Formspree, Web3Forms alebo vlastný e-mailový endpoint).
    // Dáta formulára sú v premennej `form`.
    setSent(true);
    setForm(empty);
  };

  const err = (k: keyof Errors) =>
    errors[k] ? { "aria-invalid": true, "aria-describedby": `contact-${k}-error` } : {};

  return (
    <section
      id="kontakt"
      aria-labelledby="kontakt-title"
      className="relative overflow-hidden bg-ink py-24 text-cream sm:py-32 lg:py-40"
    >
      <div className="mx-auto grid max-w-[90rem] gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <SectionLabel index="10" tone="dark">
            {contact.label}
          </SectionLabel>
          <h2 id="kontakt-title" className="display mt-6 text-[clamp(3rem,6vw,6rem)]">
            <SplitText lines={contact.title} accentLine={1} />
          </h2>
          <Reveal>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-cream/75">{contact.text}</p>
            <dl className="mt-12 grid gap-6 text-base">
              <div>
                <dt className="text-sm text-muted-dark">E-mail</dt>
                <dd className="mt-1 text-xl font-bold">{site.contact.email}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-dark">Telefón</dt>
                <dd className="mt-1 text-xl font-bold">{site.contact.phone}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-dark">Kde nás nájdete</dt>
                <dd className="mt-1 text-xl font-bold">{site.contact.address}</dd>
              </div>
            </dl>
            <RecDot className="mt-12 text-cream" />
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7">
          <div className="rounded-[2rem] bg-ink-2 p-6 ring-1 ring-cream/10 sm:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="ok"
                  ref={successRef}
                  tabIndex={-1}
                  role="status"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex min-h-[28rem] flex-col items-start justify-center gap-6 focus:outline-none"
                >
                  <span className="flex size-16 items-center justify-center rounded-full bg-signal text-3xl text-ink">
                    ✓
                  </span>
                  <h3 className="display text-4xl sm:text-5xl">{contact.success.title}</h3>
                  <p className="max-w-md text-lg text-cream/75">{contact.success.text}</p>
                  <Button variant="ghost-light" onClick={() => setSent(false)} arrow={false}>
                    Poslať ďalšiu správu
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={onSubmit}
                  noValidate
                  exit={{ opacity: 0, y: -16 }}
                  className="grid gap-6"
                  aria-label="Kontaktný formulár"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field id="contact-name" label="Meno a priezvisko" error={errors.name}>
                      <input
                        id="contact-name"
                        name="name"
                        autoComplete="name"
                        required
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        className={inputCls}
                        {...err("name")}
                      />
                    </Field>
                    <Field id="contact-company" label="Firma" optional>
                      <input
                        id="contact-company"
                        name="company"
                        autoComplete="organization"
                        value={form.company}
                        onChange={(e) => set("company", e.target.value)}
                        className={inputCls}
                      />
                    </Field>
                    <Field id="contact-email" label="E-mail" error={errors.email}>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        required
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        className={inputCls}
                        {...err("email")}
                      />
                    </Field>
                    <Field id="contact-phone" label="Telefón" optional error={errors.phone}>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        className={inputCls}
                        {...err("phone")}
                      />
                    </Field>
                  </div>

                  <fieldset>
                    <legend className="text-sm font-semibold">O čo máte záujem?</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {contact.serviceOptions.map((s) => {
                        const on = form.services.includes(s.id);
                        return (
                          <label
                            key={s.id}
                            className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal ${
                              on
                                ? "bg-signal text-ink ring-signal"
                                : "text-cream ring-cream/20 hover:ring-cream/50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              name="services"
                              value={s.id}
                              checked={on}
                              onChange={() => toggleService(s.id)}
                              className="sr-only"
                            />
                            <span aria-hidden>{on ? "✓" : "+"}</span>
                            {s.label}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-sm font-semibold">Mesačný rozpočet</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {contact.budgets.map((b) => {
                        const on = form.budget === b;
                        return (
                          <label
                            key={b}
                            className={`flex min-h-11 cursor-pointer items-center rounded-full px-4 py-2 text-sm font-semibold ring-1 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal ${
                              on ? "bg-cream text-ink ring-cream" : "text-cream ring-cream/20 hover:ring-cream/50"
                            }`}
                          >
                            <input
                              type="radio"
                              name="budget"
                              value={b}
                              checked={on}
                              onChange={() => set("budget", b)}
                              className="sr-only"
                            />
                            {b}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <Field id="contact-message" label="Správa" error={errors.message}>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder="Čím sa zaoberáte a čo by ste chceli dosiahnuť?"
                      className={`${inputCls} resize-y`}
                      {...err("message")}
                    />
                  </Field>

                  <div>
                    <label className="flex cursor-pointer items-start gap-3 text-sm text-cream/80">
                      <input
                        id="contact-consent"
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => set("consent", e.target.checked)}
                        className="mt-0.5 size-5 shrink-0 accent-signal"
                        {...err("consent")}
                      />
                      <span>
                        Súhlasím so spracovaním osobných údajov za účelom odpovede na dopyt.{" "}
                        <a href={site.privacyHref} className="underline underline-offset-2 hover:text-signal">
                          Ochrana osobných údajov
                        </a>
                      </span>
                    </label>
                    {errors.consent && (
                      <p id="contact-consent-error" className="mt-2 text-sm font-medium text-signal">
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <Button type="submit" variant="primary">
                      Odoslať správu
                    </Button>
                    <p className="text-sm text-muted-dark">Odpovieme do 24 hodín.</p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
