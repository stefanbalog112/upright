import { nav, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-cream/10 bg-ink text-cream">
      <div className="mx-auto max-w-[90rem] px-4 pb-10 pt-16 sm:px-6 lg:px-10 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a href="#top" aria-label="Upright – na začiatok stránky" className="inline-block">
              <Logo variant="light" className="h-12 w-auto sm:h-14" />
            </a>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-cream/70">
              Short form video, sociálne siete a značky pre lokálne firmy.
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-signal">
              {site.region}
            </p>
          </div>

          <nav aria-label="Odkazy v pätičke" className="lg:col-span-3">
            <h2 className="text-sm text-muted-dark">Sekcie</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 lg:grid-cols-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="inline-block py-1.5 font-semibold hover:text-signal">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="text-sm text-muted-dark">Sledujte nás</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-cream/20 transition-colors hover:bg-cream hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <h2 className="mt-10 text-sm text-muted-dark">Kontakt</h2>
            <p className="mt-3 font-semibold">{site.contact.email}</p>
            <p className="mt-1 font-semibold">{site.contact.phone}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream/10 pt-8 text-sm text-muted-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Upright · {site.contact.company}
          </p>
          <a href={site.privacyHref} className="hover:text-cream">
            Ochrana osobných údajov
          </a>
        </div>
      </div>
    </footer>
  );
}
