# Chata Alexandra | Horská chata v Hřebečné u Abertam

![Mockup webu Alexandra Abertamy](/public/images/content/ab-redesign-mockup.png)

> 🌐 Náhled webu – moderní, responzivní, postavené v **Next.js**  

[🚀 Otevřít web](/)

> 🏔️ Redesign webu, vlastní CMS a rezervační systém pro soukromou horskou chatu v Krušných horách — postaveno v **Next.js 16** (App Router) + **TypeScript**.

---

## O projektu

Chata Alexandra stojí v Hřebečné u Abertam už od roku **1927**. Není to hotel po pokojích — pronajímá se **celá chata jako jeden celek** (min. 8 dospělých, kapacita až 15 hostů, 5 pokojů). Tenhle projekt nahrazuje původní jednostránkový web bez reálné rezervace za:

- 🌐 nový marketingový web (Domů · Ubytování · Rezervace & ceník · Akce & blog · Kontakt),
- 📅 vlastní **rezervační systém** (request-to-book, kalendář obsazenosti, automatický přepočet ceny, iCal sync s Booking.com),
- 🛠️ jednoduché **CMS** pro správu rezervací, akcí, blogu a ceníku, chráněné přes Supabase Auth.

---

## Tech stack

| Vrstva | Technologie |
|---|---|
| Framework | Next.js 16 (App Router), TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@theme`, design tokeny), `tailwind-merge` |
| Animace | GSAP + `@gsap/react`, Lenis (smooth scroll) |
| DB / Auth / Storage | Supabase (Postgres, Auth, Storage) |
| Kalendář a data | `react-day-picker`, `date-fns` |
| Ikony | `@phosphor-icons/react` |
| E-maily | Resend |
| Cron (iCal sync) | Supabase scheduled Edge Functions / `pg_cron` |

---

## Spuštění projektu

```bash
npm install
npm run dev        # vývojový server (http://localhost:3000)
npm run build       # produkční build
npm run start       # spuštění buildu
npm run lint        # eslint
```

---

## Struktura

```
app/                # routy (App Router)
components/
  buttons/          # sdílené UI komponenty (Button s variantami primary/secondary/tertiary/danger/light)
  layout/           # Navbar, HeroSection, wrappery (PageWrapper, RevealSection)
  animations/        # znovupoužitelné animační hooky (useRevealAnimation přes GSAP)
public/images/      # statická obrazová data
```

---

## Licence

Software byl vytvořen na zakázku a je plně ve vlastnictví klientky Alexandry, která má **neomezená práva** k jeho použití, modifikaci a distribuci, včetně komerčního a produkčního provozu.

Bez výslovného písemného souhlasu klientky není dovoleno tento software dále šířit, kopírovat ani používat třetími stranami.

Podrobnosti naleznete v souboru [LICENSE](LICENSE.txt).

---

**Autor:** Bob Čermák 🛠️

> ⚡ Vizuální styl vychází z teplé, "horské lodge" estetiky — dřevo, kůže, jehličí, hodně krémového prostoru a velké přírodní fotky, bez stockových fotek lidí.