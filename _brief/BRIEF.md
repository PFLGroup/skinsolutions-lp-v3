# BRIEF v3 — Skin Solutions (JASNY / BIEL-DOMINUJĄCY, w stylu wzoru Estetic Point)

## Czym jest v3
To **re-skin gotowej wersji v2** (ta sama struktura wzorowana na Estetic Point: hero ze stat-odznakami, oferta, timeline wizyty, „co nas wyróżnia", technologie, cytat założycielki, cennik, opinie, Instagram, FAQ-akordeon, kontakt+mapa, CTA band, footer; te same haki JS; ten sam `protect()`; ta sama stopka PFL). **Zmieniasz WYŁĄCZNIE warstwę wizualną (skin) na JASNĄ, z przewagą bieli** — w stylu i kolorach strony-wzoru estetic-point.pl (biel + złoto + czerń), ale tak, by **dominowała biel** (jasno, przewiewnie, elegancko — „klinika premium, świeżo i czysto").

Pliki już są w `D:\Automatyzacje\Landing Page\Projekty\skinsolutions-lp-v3\` (skopiowane z v2, URL-e przepięte na v3).

## Paleta v3 (DECYZJA: styl/kolory wzoru, biel przeważa)
W `:root` (przebuduj pod jasny motyw):
- `--bg: #FFFFFF` i `--bg-soft: #F7F4EF` / `--cream: #F3EEE6` — **dominujące jasne tła** (biel jako główny „oddech" całej strony).
- `--gold: #D2AC67` (+ `--gold-deep: #B79354`) — **sygnaturowy akcent** (cienkie linie/ramki, przyciski, ikony, liczby, gwiazdki, podkreślenia, eyebrow). Kolor wzoru — wyraźnie obecny na bieli.
- `--ink: #14130F` / `#1A1814` — czerń/grafit = **tekst** i nieliczne ciemne elementy (np. footer, ewentualnie 1 CTA band) dla kontrastu „premium".
- `--line: #E7E0D4` — delikatne złoto-beżowe hairline’y/obwódki na bieli.
- Zieleń marki opcjonalnie jako bardzo drobny detal — priorytet to biel+złoto+czerń wzoru.
- **Kontrast WCAG AA**: tekst grafit `#1A1814` na bieli; złoto #D2AC67 TYLKO na duże nagłówki/akcenty/przyciski (na bieli złoto na drobnym tekście ma za niski kontrast — używaj grafitu; złoto jako ramka/tło przycisku z dobranym pod kontrast tekstem ciemnym/białym).

## Co zrobić (re-skin)
- **Przebuduj `assets/css/styles.css`** na motyw jasny: białe/kremowe tła sekcji (naprzemiennie biel↔kremowy zamiast czerni↔ciemny), karty na bieli z subtelnym cieniem + złotą obwódką/akcentem na hover, sekcje wcześniej „ciemne" (hero, CTA band, cytat) → przeprojektuj na jasne LUB pozostaw maks. 1–2 ciemne akcenty (np. footer ciemny, jeden CTA band ciemny) — reszta biała. Hero: jasne/zdjęciowe tło z DELIKATNYM jasnym overlay (biały→przezroczysty), tekst grafit czytelny; jeśli zdjęcie ciemne — rozjaśnij overlayem. Złote akcenty i cienkie złote linie jako sygnatura. Timeline: złota linia na bieli. FAQ: jasne karty, złoty znak +/−. Gwiazdki opinii złote.
- **`index.html`**: możesz dostosować modyfikatory klas sekcji (np. zamienić `--dark` na `--light`, poprawić overlay hero) ORAZ **zaktualizuj `theme-color`** w `<head>` na jasny (np. `#FFFFFF`/`#F7F4EF`) i **favicon** na złoto `#D2AC67` na jasnym tle. NIE zmieniaj treści, nagłówków, kotwic, danych, **stopki PFL**, tagu `<script>`, ani danych SEO (title/desc/canonical/OG/JSON-LD — zostają, URL już v3). Zachowaj wszystkie haki JS (`[data-reveal]`, `.counter`, `.faq__*`, `.mobile-cta`, `.is-scrolled`, `#primary-nav` itd.) i klasy stanów.
- **NIE ruszaj `assets/js/main.js`** (zawiera `protect()` + anti-rehost — modyfikacja grozi błędem/redirectem). Zachowaj CSS ochrony: `body{user-select:none}` + wyjątek dla pól (`input,textarea,[contenteditable]{user-select:text}`) + `img{user-drag:none}` — przenieś do nowego CSS.
- Obrazy: te same Unsplash (jasna, świetlista tonacja pasuje do bieli). Każdy kontener obrazu ma gradient (biel/krem/złoto) pod spodem (odporność na zepsute zdjęcie). Hero overlay jasny.

## Twarde wymagania (bez zmian wobec v2)
- Statyczny, ścieżki WZGLĘDNE. Hosting GH Pages `https://pflgroup.github.io/skinsolutions-lp-v3/`.
- Mobile-first responsywne, hamburger, a11y (1×h1, alt, aria, focus-visible, kontrast AA na bieli, prefers-reduced-motion), FAQ z klawiatury.
- Stopka PFL „© <rok> Copyright by PFL Group. Wszelkie prawa zastrzeżone." (link pflgroup.pl) — ZOSTAJE (jest w HTML). Ochrona anti-copy/anti-rehost — ZOSTAJE (CSS user-select + JS protect).
- `lang="pl"`, UTF-8, diakrytyka.

## Sukces
Jasny, świetlisty landing premium w stylu wzoru: **biel dominuje**, złoto #D2AC67 jako elegancki akcent, grafit jako tekst, nieliczne ciemne elementy dla kontrastu. Wrażenie: czysto, drogo, „klinika z najwyższej półki" — i lekko/świeżo (inaczej niż ciemne v2). Struktura/treść/SEO/ochrona/PFL bez zmian.

## ZWRÓĆ (dla orchestratora)
1. Co zmieniłeś (styles.css zakres; ewentualne klasy/atrybuty w index.html; theme-color/favicon).
2. Potwierdzenie: treść/kotwiki/haki JS/stopka PFL/SEO head NIENARUSZONE; main.js nietknięty; CSS ochrony zachowany.
3. Jak rozwiązałeś hero i sekcje wcześniej ciemne (na jasno).
4. Kontrast AA na bieli — jak zapewniony (zwłaszcza złoto).
5. Założenia/ryzyka.
