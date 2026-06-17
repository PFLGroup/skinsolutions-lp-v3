# BRIEF v3 (REBUILD) — Skin Solutions w stylu strony-wzoru Estetic Point, biel-dominująca

## Kontekst i feedback
Poprzednie v3 było słabe (recolor v2 na biało, fonty Cormorant/Jost = modowa elegancja). User chce, by v3 **naprawdę wyglądało jak strona-wzór estetic-point.pl** (treatment landing premium-medyczny). To **przebudowa stylu wizualnego** — wierna emulacja DNA wzoru, z przewagą bieli.

## DNA wzoru (wyekstrahowane realnie z CSS Estetic Point — STOSUJ):
- **Typografia (klucz!):** nagłówki = **Roboto Slab** (slab-serif, weight 400–700 — daje „premium medyczny/edytorski" charakter); tekst/nav/przyciski/labelki = **Libre Franklin** (czysty grotesk-sans, 300 lekki body, 500/600 akcenty). Ładuj OBA z Google Fonts (`display=swap` + preconnect). To one budują ten wygląd — NIE używaj Cormorant/Playfair/Jost.
- **Komponent sygnaturowy: ICON-BOX** (wzór ma ich 14) — ikona (liniowa, w złotym/okrągłym akcencie) + nagłówek Roboto Slab + krótki tekst. Używaj go obficie: USP/korzyści, „jak działa/jak wygląda wizyta" (kroki), „co nas wyróżnia", technologie. Rzędy 3–4 icon-boxów.
- **Paleta (biel dominuje):** `--bg:#FFFFFF`, `--bg-soft:#F7F5F1` (dominujące jasne tła), **złoto `--gold:#D2AC67`** (sygnaturowy akcent: ikony, liczby, cienkie linie, przyciski, podkreślenia, gwiazdki), `--gold-deep:#B79354` (złoto na drobny tekst — kontrast AA), tekst `--ink:#14130F`/`#1A1814`. Maks. 2 ciemne akcenty (footer + 1 CTA band). Kontrast WCAG AA bezwzględnie.
- **Inne komponenty wzoru:** hero z dużym sloganem + **rząd odznak/statów korzyści**, **accordion FAQ**, **testimoniale (slider/karty)** z gwiazdkami, **sekcja wideo / „zobacz w praktyce"**, mocne **powtarzane CTA** (złote). 
- **Feel:** dużo bieli i powietrza, duże nagłówki Roboto Slab, złote akcenty/cienkie linie, czyste karty z subtelnym cieniem, profesjonalnie i „drogo" — ale czytelnie i nowocześnie (NIE ornamentalnie).

## Co zrobić (REBUILD index.html + styles.css w `D:\Automatyzacje\Landing Page\Projekty\skinsolutions-lp-v3\`)
- **Przebuduj `styles.css` od nowa** w DNA wzoru (Roboto Slab + Libre Franklin, biel-dominująca, icon-boxy, złote akcenty, ładne przyciski, dobry header/menu i stopka). 
- **`index.html`:** możesz przebudować markup sekcji, by wprowadzić komponenty wzoru (icon-boxy z ikonami SVG, hero ze statami, timeline kroków, testimoniale, video-teaser, FAQ accordion). Zachowaj treść z `_brief/CONTENT.md` (oferta 5 kategorii, cennik „od", NAP, cytaty Wrąbel/Sadza, Booksy). Wprowadź ikony jako inline SVG (liniowe, złote).
- **Wymień fonty w `<head>`**: usuń Cormorant/Jost, dodaj Libre Franklin + Roboto Slab (preconnect + display=swap). Zaktualizuj favicon na złoty na jasnym (jest OK) i theme-color (biały — jest OK).

## „ŁADNE PRZYCISKI" (user prosił osobno) — w stylu wzoru:
- Primary: złote wypełnienie `#D2AC67` (lub gradient soft→gold) + ciemny grafitowy tekst, Libre Franklin 600, uppercase, letter-spacing, łagodny radius (~6–8px, jak Elementor — NIE pełna piguła), subtelny cień, hover = pogłębienie/lift + cień. 
- Secondary/ghost: złota ramka + grafit tekst na bieli; na ciemnym CTA — biały tekst + złota ramka, fill na hover.
- Spójne padding/rozmiary; focus-visible widoczny (złoty ring). To zastępuje wcześniejszą prośbę „zrób ładne przyciski".

## Header/menu górne i stopka (user prosił „popraw dół i menu górne"):
- **Menu górne:** sticky, jasne, czyste; logo (Roboto Slab) + nav (Libre Franklin uppercase, mniejsze, z **animowanym złotym podkreśleniem** `::after` na hover/active) + złoty przycisk CTA „Umów wizytę". Scrolled state: subtelny cień + pełniejsze tło. Mobile: hamburger → panel.
- **Stopka:** ciemny grafit (dozwolony akcent), **wielokolumnowa na desktopie** (marka + Nawigacja + Kontakt + Obserwuj), złote nagłówki kolumn, hover linków, górna złota hairline; dolny pasek: © Skin Solutions + **stopka PFL** (zostaje) + nota stock. Zadbaj o odstępy i wyrównanie.

## MUSISZ zachować (NIE psuć):
- **Haki JS** (main.js zostaje nietknięty — działa na tych selektorach): `.js-nav-toggle`+`aria-expanded`+`#primary-nav`(`.is-open`), `.nav__toggle-bar`, `[data-reveal]`(`.is-visible`), `.counter[data-target="1000"]`, `#year` + `.js-year`, `#contact-form`+pola `#cf-name/#cf-email/#cf-phone/#cf-msg/#cf-consent`, `.site-header`(`.is-scrolled`), FAQ `.faq__item`/`.faq__q`(`button[aria-expanded][aria-controls]`)/`.faq__a`(`.is-open`), `.mobile-cta`(`.is-visible`), `body.nav-open`. Jeśli zmieniasz markup — ZACHOWAJ te klasy/atrybuty/id na odpowiednich elementach.
- **CSS ochrony:** `body{user-select:none}` + `::selection{transparent}` + wyjątek `input,textarea,[contenteditable]{user-select:text}` + `img{user-drag:none}`.
- **Stopka PFL:** `© <span class="js-year">2026</span> Copyright by <a href="https://www.pflgroup.pl" target="_blank" rel="noopener">PFL Group</a>. Wszelkie prawa zastrzeżone.`
- **SEO head:** title, meta description, canonical/OG/JSON-LD — URL = `https://pflgroup.github.io/skinsolutions-lp-v3/` (NIE zmieniaj). Możesz zmienić tylko link fontów + favicon/theme-color.
- **NIE ruszaj `assets/js/main.js`** (zawiera `protect()`+anti-rehost).
- Ścieżki WZGLĘDNE. Obrazy Unsplash (jasna tonacja), gradient pod kontenerami. `lang="pl"`, UTF-8, a11y (1×h1, alt, aria, focus-visible, prefers-reduced-motion), responsywne mobile-first.

## ZWRÓĆ (dla orchestratora)
1. Co przebudowałeś (HTML sekcje + CSS) i potwierdzenie fontów Roboto Slab+Libre Franklin.
2. Ile icon-boxów / w których sekcjach.
3. Potwierdzenie zachowania: haki JS, CSS ochrony, stopka PFL, SEO head (URL v3), main.js nietknięty.
4. Jak wyglądają przyciski + header/menu (podkreślenie) + stopka (kolumny).
5. Kontrast AA — jak zapewniony. Założenia/ryzyka.
