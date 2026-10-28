# Upright – web

Jednostránkový web agentúry Upright (Next.js, TypeScript, Tailwind CSS, Motion, Lenis).

```bash
npm install
npm run dev     # vývoj na http://localhost:3000
npm run build   # statický web do priečinka out/
```

- **Texty, ceny, balíky a hodnoty kalkulačky:** `content/site.ts`
- **Sekcie:** `components/sections/*`, **UI prvky:** `components/ui/*`
- **Logo:** `public/logo/` (svetlá a tmavá verzia, ikona), favicon `app/icon.svg`
- **Placeholder vizuály 9:16:** `public/placeholders/` – nahraďte reálnymi fotkami/videami s rovnakým názvom
- **Odosielanie formulára:** `components/sections/Contact.tsx`, hľadajte `TODO: napojiť odosielanie`
- Placeholdery v hranatých zátvorkách (`[TELEFÓN]`, `[EMAIL]`, `[XX]`…) treba doplniť; doménu nastavte v `site.url`.
