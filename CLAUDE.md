@AGENTS.md
--------
# CLAUDE.md — Alexandra Abertamy

Kontext projektu pro Claude Code. Čti celé před prací na kódu. Piš odpovědi a commity česky, kód a identifikátory anglicky.

---

## 1) O projektu

Redesign webu **alexandra-abertamy.cz** + vlastní **CMS** + **rezervační systém** pro horskou chatu Alexandra (Hřebečná – Abertamy, Krušné hory, provoz od roku 1927). Freelance zakázka pro klientku Alexandru.

**Původní web:** onepage, bez blogu/akcí, bez reálné rezervace (jen kontaktní formulář), bez kalendáře obsazenosti. Tenhle projekt to celé nahrazuje.

### Klíčový insight (určuje celou logiku)
Alexandra **NENÍ hotel po pokojích — je to pronájem CELÉ chaty jako jednoho celku.**
- Minimální obsazenost **8 dospělých**, kapacita **15 hostů**, 5 pokojů.
- Energie a úklid se účtují za chatu, ne za pokoj.
- Kalendář obsazenosti = **1 zdroj (chata)**, rezervovaný na rozsah dat. Žádná dostupnost po pokojích.
- Rezervace = „obsadit chatu od–do". Termín je buď volný, nebo obsazený.

---

## 2) Tech stack

- **Framework:** Next.js (App Router) + TypeScript (strict)
- **Styling:** Tailwind CSS (v4, tokens v `@theme`)
- **Fonty:** `next/font/google` — self-hosted, subset `latin-ext` (KVŮLI ČESKÉ DIAKRITICE)
- **DB / Auth / Storage:** Supabase (Postgres, Supabase Auth pro admin, Storage na obrázky)
- **Kalendář UI:** react-day-picker
- **Datum:** date-fns
- **Ikony:** @tabler/icons-react
- **E-maily:** Resend
- **Cron (iCal sync, přechody stavů):** Supabase scheduled Edge Functions / pg_cron

### Příkazy
```bash
npm run dev        # vývoj
npm run build      # produkční build
npm run lint       # eslint
npm run start      # spuštění buildu
```

---

## 3) Konvence

- **TypeScript strict**, žádné `any`. Typuj přesně, sdílené typy do `src/types`.
- **Server komponenty** jako default; `"use client"` jen tam, kde je potřeba interaktivita.
- **Supabase:** používej `@supabase/ssr` (ne starý `auth-helpers`). Server client pro RSC/route handlery, browser client jen pro klientské komponenty.
- **Cenu VŽDY přepočítej na serveru** při vytvoření rezervace. Klientská kalkulačka je jen náhled, nikdy jí nevěř.
- **SEO:** blog a akce staticky (SSG/ISR), `generateMetadata`, strukturovaná data (LodgingBusiness pro chatu, Article pro blog).
- Barvy a fonty **jen přes tokeny** (viz Design system), žádné hardcodované hexy v komponentách.
- Texty drž oddělené (klidně `src/content` nebo z DB), ať jdou snadno upravovat.

### Doporučená struktura složek
```
src/
  app/
    (site)/            # veřejné stránky
      page.tsx         # Domů
      ubytovani/
      rezervace/
      akce-blog/
      kontakt/
    admin/             # CMS (chráněné Supabase Auth)
    api/               # route handlery (viz Endpointy)
  components/
  lib/
    supabase/          # server.ts, client.ts
    pricing.ts         # výpočet ceny
    availability.ts    # logika dostupnosti
    ical.ts            # export/import iCal
  content/             # texty stránek
  types/
```

---

## 4) Design system

Minimalistický, teplý, horská lodge (dřevo, kůže, jehličí). Hodně krémového prostoru, velké přírodní fotky, teplé světlo. Žádné stockové fotky lidí. Tón textů: přátelský, konkrétní, byznysový; krátké věty, jasné benefity, silná CTA. Sentence case, žádné ALL CAPS.

### Paleta
| Token | HEX | Role |
|---|---|---|
| chestnut | `#512100` | Primární — nav, nadpisy, hlavní tlačítka, footer |
| honey | `#B47E3C` | Akcent, hover, drobné zvýraznění |
| forest | `#2F4B3C` | Sekundární — obrysová tlačítka, štítky, ikony, odkazy |
| sage | `#8AA394` | Jemné detaily, oddělovače |
| cream | `#F7F4ED` | Hlavní pozadí webu |
| sand | `#E9E0CF` | Podklady sekcí, rámečky |
| ink | `#2A211A` | Základní text |

- Poměr ~60 % cream · 27 % chestnut · 10 % forest · 5 % honey.
- **honey drž kolem 5 %** (jen klíčová zvýraznění a hover), jinak ztratí sílu.
- **Primární CTA** = chestnut tlačítko + bílý text (vysoký kontrast). honey NEDÁVEJ na velká tlačítka s bílým textem (slabý kontrast).

### Tailwind v4 — `globals.css`
```css
@theme {
  --color-chestnut: #512100;
  --color-honey:    #B47E3C;
  --color-forest:   #2F4B3C;
  --color-sage:     #8AA394;
  --color-cream:    #F7F4ED;
  --color-sand:     #E9E0CF;
  --color-ink:      #2A211A;
  --font-serif: var(--font-fraunces);
  --font-sans:  var(--font-inter);
}
```

### Fonty — `layout.tsx`
```tsx
import { Fraunces, Inter } from "next/font/google";
const fraunces = Fraunces({ subsets: ["latin-ext"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin-ext"], variable: "--font-inter" });
// <html className={`${fraunces.variable} ${inter.variable}`}>
```
- **Nadpisy: Fraunces** (serif, nese „od roku 1927"). **Text: Inter** (sans, čitelnost).
- Váhy 400 běžná, 500/600 nadpisy. Alternativa all-sans: Geist na vše.

---

## 5) Struktura webu (5 stránek)

- **Domů** (`/`) — hero + availability widget + přehled + pro koho + recenze + teaser akcí/blogu + CTA
- **Ubytování** (`/ubytovani`) — o chatě + vybavení + pokoje + galerie
- **Rezervace & ceník** (`/rezervace`) — kalendář obsazenosti + kalkulačka + ceník + formulář + FAQ
- **Akce & blog** (`/akce-blog`) — hub s filtrem Vše / Akce / Tipy na výlety + detaily
- **Kontakt** (`/kontakt`) — O nás + kontaktní údaje + mapa + CTA

### Navigace
- **Horní lišta (sticky):** logo | Domů · Ubytování · Rezervace · Akce & blog · Kontakt | telefon +420 602 726 090 + CTA `Rezervovat`. Mobil: hamburger, `Rezervovat` zůstává vidět. Max 5 bodů.
- **Patička (3 sloupce):** logo + claim „Celá horská chata jen pro vás" + kontakt | navigace | Zásady ochrany osobních údajů · Facebook · © 2025 Alexandra Abertamy · powered by #BobCermak

---

## 6) Rezervační systém

Model = **request-to-book (poptávka s potvrzením)**, ne instant book.

### Stavy rezervace
```
pending ──(admin potvrdí)──▶ confirmed ──(po check-out, cron)──▶ completed
   │                             │
   ├─(admin zamítne)─▶ rejected  └─(zrušení)─▶ cancelled
```
- **pending** — čeká na potvrzení; soft-hold (drží termín např. 48 h přes `hold_expires_at`). V kalendáři 🟡.
- **confirmed** — tvrdě blokuje kalendář, spouští potvrzovací e-mail + iCal export. 🔴
- **rejected / cancelled** — uvolňují termín.
- **completed** — auto po dni odjezdu (cron), pro historii/statistiky.

### Logika dostupnosti
Termín `[check_in, check_out)` je volný, když se nepřekrývá s:
- `reservations` se `status = confirmed`
- `availability_blocks` (všechny)
- `reservations` se `status = pending` a `hold_expires_at > now()`

Overlap (půlotevřené intervaly, den odjezdu je volný pro dalšího):
```
existing.check_in < new.check_out  AND  existing.check_out > new.check_in
```
DB pojistka proti dvojité rezervaci (Postgres):
```sql
ALTER TABLE reservations
  ADD CONSTRAINT no_overlap_confirmed
  EXCLUDE USING gist (stay WITH &&)
  WHERE (status = 'confirmed');
```
Veřejný kalendář vrací jen obsazené rozsahy + barvu, **bez osobních dat hostů**.

### Výpočet ceny (`lib/pricing.ts`)
Vstup: `check_in, check_out, adults, children, infants, services[]`.
```
noci             = check_out − check_in
platící_dospělí  = max(adults, 8)          // minimální obsazenost
sezóna per noc   (stay může přejít přes 1.10. / 1.5. → mixuj po nocích)

1 Ubytování = Σ nocí [ platící_dospělí × sazba_dospělý(sezóna) + children × sazba_dítě ]
2 Energie   = Σ nocí energie(sezóna)              // 600 léto / 1000 zima, za chatu/noc
3 Povlečení = (adults + children) × noci × 80
4 Měst. poplatek = adults × noci × 30             // děti do 18 osvobozeny
5 Úklid     = 1200                                 // jednorázově
6 Služby    = sauna 2500 + spol.místnost 3000 + mazlíček 500×noci + postýlka 200

CELKEM = 1+2+3+4+5+6
Záloha  = round(CELKEM × 30 / 100)
```
Pravidla: `adults < 8` → účtuj jako 8 + hláška „Chatu pronajímáme min. pro 8 dospělých". `min_nights` (víkend/svátky) validace. Termín v `date_overrides.on_request` (Vánoce/Silvestr) → cenu nepočítej, ukaž „Cena na vyžádání".

### Ceník (data)
- Zima (1. 10.–30. 4.): dospělý 530 / dítě 3–12 let 370 (za os./noc)
- Léto (1. 5.–30. 9.): dospělý 480 / dítě 370
- Děti do 3 let zdarma. Vánoce/Silvestr na vyžádání.
- Energie: 600 (V–IX) / 1000 (X–IV) za chatu/noc. Povlečení 80/os./noc. Úklid 1200/pobyt. Měst. poplatek 30/os./noc.
- Služby: sauna 2500/pobyt, spol. místnost 3000/pobyt, mazlíček 500/noc, postýlka 200/pobyt.

---

## 7) Napojení na Booking.com (iCal, MVP)

Tvůj systém je **master / single source of truth**. Architekturu drž tak, aby šla později povýšit na Connectivity API (SaaS výhled).

- **Export** (`GET /api/ical/export.ics`): VCALENDAR s VEVENT pro každou `confirmed` rezervaci + každý block. Jen obsazené dny, ŽÁDNÁ jména/e-maily. URL se vloží v Booking Extranetu → Rates & Availability → Sync Calendars → Import.
- **Import** (cron ~30–60 min): projde `ical_feeds`, stáhne `.ics`, upsert do `availability_blocks` (`type = external_ical`, `external_uid` z UID eventu kvůli dedup/update, mazání zmizelých).
- **Caveaty:** není real-time (i pár hodin → riziko dvojité rezervace u last-minute); feed nese jen termíny, ne data hosta; Booking iCal povolí jen bez XML/channel manageru — pro 1 chatu OK.

---

## 8) Datový model (Supabase / Postgres)

**reservations** — id, status(enum), check_in, check_out, stay(daterange generated `[in,out)`), adults, children, infants, guest_name, guest_surname, guest_email, guest_phone, message, source(enum: web/phone/manual/booking/airbnb), price_total, price_breakdown(jsonb), selected_services(jsonb), deposit_amount, deposit_paid, hold_expires_at, gdpr_consent, consent_at, admin_note, created_at, updated_at, confirmed_at, cancelled_at.

**availability_blocks** — id, start_date, end_date, stay(daterange generated), type(enum: manual/maintenance/owner_stay/external_ical), source_feed_id(fk), external_uid, label, created_at, updated_at.

**ical_feeds** — id, name, url, active, last_synced_at, sync_status, created_at.

**pricing_settings** (jednořádková) — winter{adult,child,energy}, summer{adult,child,energy}, winter_range, summer_range, fees{bedding_per_person_night, final_cleaning, city_tax_per_adult_night}, min_adults(8), min_nights, deposit_percent(30).

**optional_services** — id, name, price, unit(enum: per_stay/per_night/per_person_night), active, sort_order.

**date_overrides** — id, start_date, end_date, type(enum: on_request/custom_price/closed), custom_adult_price, custom_child_price, note.

**blog_posts** — id, slug, title, excerpt, content, cover_image, category(enum: article/trip_tip), tags[], status(draft/published), published_at, meta_title, meta_description, created_at, updated_at.

**events** — id, slug, title, description, cover_image, start_date, end_date, price_label, package_details, status, published_at, created_at.

**reviews** — id, author_name, rating, text, source, source_url, featured, created_at.

**rooms** — id, name, capacity, count_available, image, description, sort_order.

**settings** — kontakt, sociální sítě, globální texty.

---

## 9) API endpointy

**Veřejné**
- `GET /api/availability?from=&to=` — obsazené rozsahy pro kalendář
- `GET /api/price?check_in=&check_out=&adults=&children=&services=` — rozpad ceny
- `POST /api/reservations` — vytvoří pending (validace dostupnosti + přepočet ceny na serveru)
- `GET /api/events` · `GET /api/events/:slug`
- `GET /api/posts` · `GET /api/posts/:slug`
- `GET /api/ical/export.ics`

**Admin (auth)**
- `GET /api/admin/reservations?status=`
- `PATCH /api/admin/reservations/:id` — confirm / reject / cancel (spouští e-maily + úpravu kalendáře)
- CRUD `…/blocks`, `…/events`, `…/posts`, `…/services`, `…/date-overrides`, `…/ical-feeds`
- `POST /api/admin/ical-feeds/:id/sync` — ruční sync
- `GET /api/admin/dashboard` — obsazenost, tržby, poptávky

---

## 10) E-maily (Resend)
- Hostovi: poptávka přijata (pending) → potvrzení (confirmed) s pokyny k záloze → příp. zamítnutí/zrušení.
- Provozovateli: nová poptávka (okamžitě).

---

## 11) Texty stránek (reference copy)

### Domů
- **Hero H1:** Celá horská chata jen pro vás
- **Hero podtitul:** Soukromá chata Alexandra v Hřebečné u Abertam. Až 15 hostů, vlastní sauna, plně vybavená kuchyň a klid Krušných hor — po celý rok. V provozu od roku 1927.
- **CTA:** Zkontrolovat volné termíny · Nezávazná poptávka · pod tím „Volných termínů tento měsíc: 6"
- **Trust bar:** Celá chata jen pro vás · Kapacita až 15 hostů · Tradice od roku 1927 · ⭐ Doporučují nás hosté na Googlu
- **Přehled H2:** Vše, co skupina potřebuje, pod jednou střechou — Pět útulných pokojů s vlastním sociálním zařízením, plně vybavená kuchyň s jídelnou a prostorná společenská místnost. K tomu vlastní sauna, ohniště s grilem a zahrada. Přijeďte a nechte starosti za sebou — o pohodlí je postaráno.
  - Vlastní sauna — Zasloužený odpočinek po dni na horách.
  - Plně vybavená kuchyň — Vařte si podle svého, nádobí i myčka jsou tu.
  - Společenská místnost — Prostor pro celou partu, oslavy i večerní posezení.
  - Ohniště a gril — Večery u ohně a domluvená pípa se sudem.
- **Kalendář H2:** Kdy máme volno? — Zelené dny jsou volné. Vyberte termín přímo v kalendáři a pošlete nezávaznou poptávku — do 24 hodin se ozveme.
- **Pro koho H2:** Ať přijíždíte s kýmkoli, tady se vejdete
  - Rodiny — Dost prostoru pro tři generace pod jednou střechou. Dětská postýlka k dispozici.
  - Srazy a oslavy — Společenská místnost, ohniště a domluvená pípa se sudem. Slavte, jak chcete.
  - Firmy — Teambuilding se saunou a klidem, kde vás nikdo neruší.
  - Sportovci — 80 km běžeckých tras a cyklostezky přímo od prahu chaty.
- **Recenze H2:** Co o nás říkají hosté — Nejlepší reklama je spokojený host.
  - „Skvělé místo, kam se rádi vracíme." — Jindřich
  - „Skromný, útulný penzion — sauna, krbovna, venkovní posezení s ohništěm a grilem. Domluvení pípy se sudem není problém." — Vladimír
  - „Nový provozovatel si dá záležet. Renovují saunu i společenskou místnost. Těšíme se na příště!" — Svetlana
- **Finální CTA H2:** Zamluvte si termín, než ho někdo předběhne — Chatu pronajímáme jako celek — jakmile je termín obsazený, je pryč.

### Ubytování
- **H1:** Ubytování na chatě Alexandra — Až 15 hostů v pěti plně zařízených pokojích. Každý pokoj má vlastní koupelnu, WC, TV/satelit a Wi-Fi zdarma.
- **O chatě H2:** Chata, kde se sejde celá parta — Chata Alexandra stojí v Hřebečné u Abertam už od roku 1927 a pod novým vedením prošla proměnou — renovovaná sauna, zvelebená společenská místnost a moderní vybavení. Uvnitř plně vybavená kuchyň s myčkou, jídelna a společenská místnost. Venku zahrada s ohništěm a grilem. Nekuřácký objekt, mazlíčci po domluvě.
- **Vybavení:** Uvnitř — Televize · Konvice · Lednička, myčka, nádobí · Sauna · Společenská místnost. Venku — Zahradní nábytek · Ohniště a gril. Navíc — Wi-Fi zdarma · Nekuřácký objekt · Parkování u chaty.
- **Pokoje H2:** Pět pokojů, celkem 15 lůžek — Všechny s vlastní koupelnou a WC, TV se satelitem a Wi-Fi. Postýlka na vyžádání.
  - Dvoulůžkový (1×) · Třílůžkový (3×) · Čtyřlůžkový s vanou (1×)

### Rezervace & ceník
- **H1:** Rezervace pobytu — Vyberte termín, spočítejte si cenu a odešlete nezávaznou poptávku. Do 24 hodin vám rezervaci potvrdíme e-mailem.
- **Tři kroky:** 1) Vyberte termín a hosty — cenu uvidíte hned. 2) Odešlete nezávaznou poptávku — termín zůstává volný, dokud ho společně nepotvrdíme. 3) Potvrdíme do 24 hodin — e-mail s potvrzením a pokyny k záloze.
  - Microcopy: Termín je definitivně váš až po našem potvrzení.
- **Kalendář:** 🟢 Volno · 🟡 Čeká na potvrzení · 🔴 Obsazeno. Poznámka: Chatu pronajímáme jako celek, min. pro 8 dospělých.
- **Kalkulačka H2:** Spočítejte si cenu pobytu — Zadejte termín a počet hostů, rovnou uvidíte celkovou cenu i rozpad. Microcopy: Žádná překvapení na místě. Cena zahrnuje energie, úklid i poplatky.
- **FAQ:** minimální obsazenost / kdy je rezervace závazná / mazlíčci / check-in-out / parkování / strava.

### Akce & blog
- **H1:** Novinky a tipy z Krušnohoří — filtr Vše / Akce / Tipy na výlety.
- **Akce:** Běžkařský víkend · Silvestr na chatě · Firemní teambuilding s wellness · Houbařská sezóna (každá s CTA „Poptat tento termín").
- **Tipy na výlety:** 10 výletů z Hřebečné · Běžky 80 km tras · Důl Mauritius (V–IX) · Muzea Abertam · Cyklovýlety (Pernink–Potůčky 25 km, Velichov–Potůčky 56 km) · Historie chaty od 1927 (každý s CTA „Naplánujte si pobyt").

### Kontakt (+ O nás)
- **O nás:** Chata Alexandra stojí v Hřebečné u Abertam už od roku 1927. Pod novým vedením prošla proměnou — renovovanou saunou počínaje a zvelebenou společenskou místností konče. Cíl: aby se u nás rodiny, party i kolegové cítili jako doma a odjížděli s chutí se vrátit.
- **Kontakt:** Pohraničníků 44/198, Abertamy – Hřebečná · +420 602 726 090 · e-mail [doplnit] · Facebook [odkaz] · mapa.
- **CTA H2:** Máte dotaz nebo chcete rezervovat? — Zavolejte, napište, nebo pošlete nezávaznou poptávku.

---

## 12) Byznysová logika (proč to takhle)
- Kalkulačka ceny = transparentnost → víc dokončených poptávek (konkurence ji většinou nemá).
- Kalendář i na homepage → důvěra + urgence.
- Jasný 3krokový proces → host se nebojí odeslat.
- CTA `Zkontrolovat volné termíny` opakovaně na každé sekci.
- Pozice „celá chata jen pro vás" → cílí na skupiny = vyšší hodnota rezervace.
- Min. 8 osob komunikuj jasně → méně nerelevantních poptávek.
- Blog + akce → SEO + návratnost + celoroční provoz.

---

## 13) Doplnit před spuštěním (od klientky)
- [ ] E-mailová adresa
- [ ] Časy check-in / check-out
- [ ] Reálné fotky (chata, sauna, pokoje, zahrada, okolí)
- [ ] Odkaz na Facebook
- [ ] Dynamický počet volných termínů do hero (z kalendáře)