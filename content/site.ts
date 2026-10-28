/**
 * Všetok obsah webu na jednom mieste.
 * Texty, ceny, balíky aj hodnoty kalkulačky sa menia tu – bez zásahu do komponentov.
 * Údaje v hranatých zátvorkách [TAKTO] sú placeholdery, ktoré treba nahradiť reálnymi.
 */

export type ServiceId =
  | "video"
  | "social"
  | "ads"
  | "branding"
  | "web"
  | "photo";

export const site = {
  name: "Upright",
  // Doména webu bez cesty (Open Graph, canonical). Po kúpe domény nahradiť, napr. "https://upright.sk".
  // (globalThis – v tomto súbore je export s názvom `process`)
  url: globalThis.process?.env.NEXT_PUBLIC_SITE_URL ?? "https://stefanbalog112.github.io",
  title: "Upright – short form video a sociálne siete pre firmy z Gemera",
  description:
    "Kreatívna agentúra z Rožňavy. Natáčame Reels, TikToky a Shorts, spravujeme sociálne siete, robíme Meta reklamu, branding a weby pre lokálne firmy v Gemeri a Košiciach.",
  region: "Rožňava · Gemer · Košice",
  contact: {
    email: "[EMAIL]",
    phone: "[TELEFÓN]",
    address: "[ADRESA], Rožňava",
    company: "[OBCHODNÉ MENO] · IČO [IČO]",
  },
  socials: [
    { label: "Instagram", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "YouTube", href: "#" },
  ],
  privacyHref: "#",
};

export const nav = [
  { label: "Služby", href: "#sluzby" },
  { label: "Práce", href: "#prace" },
  { label: "Postup", href: "#postup" },
  { label: "Cenník", href: "#cennik" },
  { label: "Kalkulačka", href: "#kalkulacka" },
  { label: "Kontakt", href: "#kontakt" },
];

export const ctaLabel = "Nezáväzná konzultácia";

export const hero = {
  eyebrow: "Kreatívna agentúra · Rožňava",
  title: ["Obsah,", "ktorý zastaví", "palec."],
  subtitle:
    "Natáčame krátke videá, ktoré ľudia dopozerajú, a staráme sa o vaše sociálne siete tak, aby z nich chodili zákazníci. Pre firmy z Gemera a Košíc.",
  primaryCta: { label: ctaLabel, href: "#kontakt" },
  secondaryCta: { label: "Spočítať cenu", href: "#kalkulacka" },
  phones: [
    {
      src: "/placeholders/hero-01-kaviaren.svg",
      alt: "Placeholder: vertikálne video zo zákulisia kaviarne",
      tag: "Gastro",
    },
    {
      src: "/placeholders/hero-02-penzion.svg",
      alt: "Placeholder: vertikálne video s ranným výhľadom z penziónu",
      tag: "Ubytovanie",
    },
    {
      src: "/placeholders/hero-03-fitness.svg",
      alt: "Placeholder: vertikálne video z tréningu vo fitku",
      tag: "Fitness",
    },
  ],
};

export const marquee = [
  "Reels",
  "TikTok",
  "YouTube Shorts",
  "Správa sociálnych sietí",
  "Meta reklama",
  "Branding",
  "Webové stránky",
  "Foto a eventy",
];

export const intro = {
  greetings: ["Ahoj!", "Čau!", "Szia!", "Dobrý deň!", "Servus!"],
  label: "O nás",
  text: "Sme Upright – malý tím z Rožňavy, ktorý žije vertikálnym videom. Prídeme k vám, natočíme, čo robí vašu firmu výnimočnou, a zostrihame to do formátu, ktorý ľudia na Instagrame a TikToku naozaj pozerajú.",
  text2:
    "Hovoríme po slovensky aj po maďarsky, poznáme región a nemáme radi zbytočné reči. Jasná cena, rýchle natáčanie a výsledky, ktoré uvidíte v správach od zákazníkov.",
};

export const services: {
  id: ServiceId;
  title: string;
  text: string;
  points: string[];
}[] = [
  {
    id: "video",
    title: "Short form video",
    text: "Reels, TikToky a Shorts od scenára po titulky. Krátko, svižne a s háčikom v prvých sekundách.",
    points: ["Scenáre a hooky", "Natáčanie u vás", "Strih, titulky, hudba"],
  },
  {
    id: "social",
    title: "Správa sociálnych sietí",
    text: "Plán obsahu, publikovanie, texty a odpovede komunite. Vy robíte biznis, my držíme profil pri živote.",
    points: ["Obsahový kalendár", "Texty a publikovanie", "Mesačný report"],
  },
  {
    id: "ads",
    title: "Meta reklama",
    text: "Kampane na Facebooku a Instagrame, ktoré cielia na ľudí z vášho okolia a privádzajú dopyty.",
    points: ["Nastavenie kampaní", "Cielenie na región", "Ladenie podľa čísel"],
  },
  {
    id: "branding",
    title: "Branding a vizuálna identita",
    text: "Logo, farby, písmo a pravidlá, vďaka ktorým vás ľudia spoznajú na prvý pohľad.",
    points: ["Logo a varianty", "Farby a typografia", "Šablóny pre siete"],
  },
  {
    id: "web",
    title: "Webové stránky",
    text: "Rýchle a prehľadné weby, ktoré fungujú na mobile a premieňajú návštevníkov na rezervácie.",
    points: ["Jednostránkové aj prezentačné", "Mobil na prvom mieste", "Základné SEO"],
  },
  {
    id: "photo",
    title: "Foto a eventy",
    text: "Fotky jedál, izieb, ľudí aj priestorov. Aftermovie z eventu do pár dní.",
    points: ["Produktové a interiérové foto", "Eventy a aftermovie", "Cover fotky k videám"],
  },
];

export const goals: { label: string; services: ServiceId[] }[] = [
  { label: "Viac zákazníkov", services: ["video", "ads", "web"] },
  { label: "Silnejšia značka", services: ["branding", "video", "photo"] },
  { label: "Živý profil bez starostí", services: ["social", "video"] },
  { label: "Nábor ľudí", services: ["video", "ads"] },
  { label: "Nová firma od nuly", services: ["branding", "web", "social"] },
];

export const audience = [
  {
    title: "Gastro",
    text: "Reštaurácie, kaviarne, bistrá a cukrárne. Jedlo, ktoré sa na obrazovke takmer dá ochutnať, a denné menu, ktoré ľudia zdieľajú.",
    tags: ["Denné menu", "Zákulisie kuchyne", "Novinky"],
  },
  {
    title: "Ubytovanie a turizmus",
    text: "Penzióny, chaty a atrakcie v Gemeri. Ukážeme izby, výhľady aj zážitky tak, aby si hostia rezervovali priamo u vás.",
    tags: ["Room tour", "Okolie a výlety", "Sezónne ponuky"],
  },
  {
    title: "Beauty a fitness",
    text: "Salóny, barberi, štúdiá a fitká. Premeny, tréningy a ľudia za značkou – obsah, ktorý buduje dôveru.",
    tags: ["Pred a po", "Tipy od profíkov", "Tím a atmosféra"],
  },
  {
    title: "Firmy a nábor",
    text: "Výroba, služby a remeslá. Videá, ktoré ukážu, ako to u vás vyzerá, a pritiahnu nových kolegov aj zákazníkov.",
    tags: ["Náborové videá", "Ako to robíme", "Firemné eventy"],
  },
];

export const work = [
  {
    title: "Obedové menu, ktoré sa zdieľa",
    client: "[KLIENT] · Bistro",
    category: "Gastro · Reels",
    src: "/placeholders/work-01-bistro.svg",
    alt: "Placeholder: video s obedovým menu v bistre",
  },
  {
    title: "Tour po horskej chate",
    client: "[KLIENT] · Chata",
    category: "Ubytovanie · TikTok",
    src: "/placeholders/work-02-chata.svg",
    alt: "Placeholder: video prehliadky horskej chaty",
  },
  {
    title: "Premena za 30 sekúnd",
    client: "[KLIENT] · Kaderníctvo",
    category: "Beauty · Reels",
    src: "/placeholders/work-03-salon.svg",
    alt: "Placeholder: video premeny v kaderníctve",
  },
  {
    title: "Tréner, ktorého chcete poznať",
    client: "[KLIENT] · Fitness",
    category: "Fitness · Shorts",
    src: "/placeholders/work-04-fitness.svg",
    alt: "Placeholder: video predstavenia trénera vo fitku",
  },
  {
    title: "Festival v 60 sekundách",
    client: "[KLIENT] · Event",
    category: "Event · Aftermovie",
    src: "/placeholders/work-05-event.svg",
    alt: "Placeholder: aftermovie z mestského festivalu",
  },
  {
    title: "Hľadáme kolegov",
    client: "[KLIENT] · Výroba",
    category: "Nábor · Meta reklama",
    src: "/placeholders/work-06-nabor.svg",
    alt: "Placeholder: náborové video z výroby",
  },
];

export const process = [
  {
    title: "Úvodná konzultácia",
    badge: "Zadarmo",
    time: "30–45 min",
    text: "Stretneme sa u vás alebo online. Zistíme, čo potrebujete dosiahnuť, a navrhneme, ako na to.",
  },
  {
    title: "Stratégia a scenáre",
    time: "do 1 týždňa",
    text: "Pripravíme témy, hooky a krátke scenáre. Vy ich schválite – nič netočíme naslepo.",
  },
  {
    title: "Natáčací deň",
    time: "pol dňa až deň",
    text: "Prídeme s technikou a natočíme obsah na celý mesiac naraz. Rýchlo a bez stresu pre váš tím.",
  },
  {
    title: "Strih a schválenie",
    time: "3–5 pracovných dní",
    text: "Zostriháme, pridáme titulky a hudbu. Videá dostanete na schválenie s možnosťou úprav.",
  },
  {
    title: "Publikovanie, reporting a ladenie",
    time: "priebežne",
    text: "Publikujeme podľa plánu, sledujeme čísla a každý mesiac upravíme obsah podľa toho, čo funguje.",
  },
];

export type Plan = {
  name: string;
  price: number;
  from: boolean;
  period?: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export const pricing = {
  note: "Ceny sú uvedené bez DPH.",
  monthly: [
    {
      name: "Štart",
      price: 250,
      from: true,
      period: "/ mesiac",
      description: "Na rozbeh pravidelného obsahu.",
      features: ["4 videá mesačne", "1 natáčací deň", "Scenáre a hooky", "Strih a titulky"],
    },
    {
      name: "Rast",
      price: 400,
      from: true,
      period: "/ mesiac",
      description: "Pre firmy, ktoré chcú byť vidieť každý týždeň.",
      features: [
        "8 videí mesačne",
        "2 natáčacie dni",
        "Scenáre a hooky",
        "Strih a titulky",
        "Cover fotky k videám",
      ],
      featured: true,
    },
    {
      name: "Správa",
      price: 550,
      from: true,
      period: "/ mesiac",
      description: "Obsah aj profil v jedných rukách.",
      features: [
        "Všetko z balíka Rast",
        "Publikovanie podľa plánu",
        "Texty k príspevkom",
        "Komunikácia s komunitou",
        "Mesačný report",
      ],
    },
    {
      name: "Komplet",
      price: 700,
      from: true,
      period: "/ mesiac",
      description: "Celý marketing bez starostí.",
      features: [
        "Všetko z balíka Správa",
        "Grafika pre siete",
        "Drobné úpravy webu",
        "Správa Meta reklamy",
      ],
    },
  ] satisfies Plan[],
  oneOff: [
    {
      name: "Video",
      price: 80,
      from: true,
      description: "Jedno krátke video vrátane strihu a titulkov.",
      features: ["Scenár", "Strih a titulky", "Formát 9:16"],
    },
    {
      name: "Natáčací deň",
      price: 250,
      from: true,
      description: "Deň s kamerou u vás, materiál pre vlastný tím.",
      features: ["Až 8 hodín natáčania", "Video aj foto", "Surový materiál"],
    },
    {
      name: "Aftermovie z eventu",
      price: 150,
      from: true,
      description: "Atmosféra vášho podujatia v jednom videu.",
      features: ["Natáčanie na mieste", "Video do 60 s", "Rýchle dodanie"],
    },
    {
      name: "Logo a identita",
      price: 400,
      from: true,
      description: "Značka, ktorá vydrží roky.",
      features: ["Logo a varianty", "Farby a písmo", "Základný manuál"],
    },
    {
      name: "Web",
      price: 500,
      from: true,
      description: "Rýchly web, ktorý funguje na mobile.",
      features: ["Návrh na mieru", "Responzívny dizajn", "Základné SEO"],
    },
    {
      name: "Nová značka",
      price: 1500,
      from: true,
      description: "Identita a web v jednom balíku.",
      features: ["Logo a vizuálna identita", "Prezentačný web", "Šablóny pre siete"],
      featured: true,
    },
  ] satisfies Plan[],
  featuredLabel: "Najobľúbenejší",
  notes: [
    "Rozpočet na reklamu platíte priamo spoločnosti Meta – my účtujeme len prácu.",
    "Minimálna dĺžka mesačnej spolupráce sú 3 mesiace.",
    "Ceny sú orientačné, presnú ponuku pripravíme po konzultácii.",
  ],
};

export const calculator = {
  prices: {
    video: 40, // € za video
    shootingDay: 90, // € za natáčací deň
    management: 200, // € mesačne
    ads: 150, // € mesačne
    graphics: 100, // € mesačne
    logo: 900, // € jednorazovo
    webOnePage: 700, // € jednorazovo
    webPresentation: 1400, // € jednorazovo
    brandBundleDiscount: 0.1, // zľava pri identite + webe
  },
  videos: { min: 2, max: 16, default: 6 },
  days: { min: 1, max: 4, default: 1 },
  webOptions: [
    { id: "none", label: "Žiadny" },
    { id: "onepage", label: "Jednostránkový" },
    { id: "presentation", label: "Prezentačný" },
  ] as const,
  note: "Bez DPH, orientačný odhad.",
};

export const whyUs = {
  stats: [
    // value: číslo sa animuje; ak je null, zobrazí sa text z `display`
    { value: null, display: "[XX]", suffix: "", label: "natočených videí" },
    { value: null, display: "[XX]", suffix: "", label: "spokojných firiem" },
    { value: null, display: "[XX]", suffix: "", label: "zhliadnutí videí" },
    { value: 2, display: "2", suffix: "", label: "jazyky obsahu – SK a HU" },
  ] as { value: number | null; display: string; suffix: string; label: string }[],
  benefits: [
    {
      title: "Osobne na mieste",
      text: "Sme z Rožňavy. Prídeme k vám, nie len na videohovor.",
    },
    {
      title: "Dvojjazyčný obsah",
      text: "Videá a texty po slovensky aj po maďarsky – oslovíte celý región.",
    },
    {
      title: "Rýchle natáčanie",
      text: "Obsah na celý mesiac natočíme za jeden deň. Váš tím nezdržíme.",
    },
    {
      title: "Jasné ceny",
      text: "Balíky s pevnou cenou a kalkulačka priamo na webe. Žiadne prekvapenia.",
    },
  ],
};

export const testimonials = [
  {
    quote:
      "Konečne máme na Instagrame obsah, ktorý ľudia komentujú. Po prvom mesiaci sa nám začali ozývať noví hostia priamo cez správy.",
    name: "[MENO PRIEZVISKO]",
    role: "[FUNKCIA], [FIRMA] – penzión",
  },
  {
    quote:
      "Natáčanie zabralo jedno doobedie a videá sme mali o pár dní. Všetko jasne dohodnuté, bez zbytočného naťahovania.",
    name: "[MENO PRIEZVISKO]",
    role: "[FUNKCIA], [FIRMA] – reštaurácia",
  },
  {
    quote:
      "Oceňujem, že robia obsah aj po maďarsky. Oslovili sme zákazníkov, na ktorých sme predtým nedosiahli.",
    name: "[MENO PRIEZVISKO]",
    role: "[FUNKCIA], [FIRMA] – beauty salón",
  },
];

export const faq = [
  {
    q: "Ako dlho sa musím viazať?",
    a: "Pri mesačných balíkoch je minimálna spolupráca 3 mesiace. Je to čas, za ktorý sa dajú poctivo vyhodnotiť výsledky. Potom môžete pokračovať mesiac po mesiaci.",
  },
  {
    q: "Kto platí reklamu na Facebooku a Instagrame?",
    a: "Rozpočet na reklamu platíte priamo spoločnosti Meta zo svojej karty. My si účtujeme len prípravu a správu kampaní, takže máte nad výdavkami plnú kontrolu.",
  },
  {
    q: "Komu patria natočené videá?",
    a: "Hotové videá sú vaše a môžete ich používať kdekoľvek – na sieťach, webe aj v reklame. Bez ďalších poplatkov.",
  },
  {
    q: "Ako rýchlo budem mať prvé videá?",
    a: "Zvyčajne do 2 týždňov od konzultácie. Týždeň na scenáre, natáčací deň a 3–5 pracovných dní na strih.",
  },
  {
    q: "Natáčate aj mimo Rožňavy?",
    a: "Áno. Pravidelne jazdíme po celom Gemeri a do Košíc. Pri vzdialenejších miestach sa dohodneme na cestovných nákladoch vopred.",
  },
  {
    q: "Robíte obsah aj po maďarsky?",
    a: "Áno, obsah vieme pripraviť po slovensky, po maďarsky alebo dvojjazyčne – vrátane titulkov a textov k príspevkom.",
  },
  {
    q: "Musím byť pred kamerou?",
    a: "Nemusíte. Vieme točiť produkty, priestory, tím alebo nájsť formát, v ktorom sa budete cítiť pohodlne. Pomôžeme aj s trémou.",
  },
  {
    q: "Čo ak sa mi video nebude páčiť?",
    a: "Každé video dostanete na schválenie a v cene sú úpravy. Scenáre schvaľujete ešte pred natáčaním, takže prekvapenia nehrozia.",
  },
];

export const contact = {
  label: "Kontakt",
  title: ["Poďme natočiť", "niečo dobré."],
  text: "Napíšte nám pár viet o vašej firme. Ozveme sa do 24 hodín a dohodneme nezáväznú konzultáciu.",
  serviceOptions: [
    { id: "video", label: "Short form video" },
    { id: "social", label: "Správa sietí" },
    { id: "ads", label: "Meta reklama" },
    { id: "branding", label: "Branding" },
    { id: "web", label: "Web" },
    { id: "photo", label: "Foto a eventy" },
  ] as { id: ServiceId; label: string }[],
  budgets: ["do 300 €", "300–600 €", "600–1 000 €", "1 000 € +", "Neviem"],
  success: {
    title: "Ďakujeme, správa je na ceste!",
    text: "Ozveme sa vám do 24 hodín. Medzitým nás pokojne sledujte na Instagrame.",
  },
};
