# RecruitTasks

## I. Zadanie backendowe:

Jesteś kierowcą, potrzebujemy zapisywac informacje o przejazdach, ilość przejechanych kilometrów i koszt przejechania.

### Wymagania:
Stwórz API zgodnie z załączoną dokumentacją,
Użyj GITa do rozwoju proijektu.
Brak wymogu autoryzacji.
Napisane testy jednostkowe dla kodu.
Walidacja parametrów wejściowych.

### Wymagane endpointy:
1. Dodawanie przejazdu z parametrami:
- adres poczatkowy
- adres końcowy
- koszt przejazdu
- data

2. Pobieranie dziennego raportu:
- na wejściu data dla której przeliczyć
- na wyjściu suma ilości kilometrów oraz całkowity koszt

3. Pobieranie raportu pomiędzy określonymi datami:
- na wejściu daty początkowa oraz końcowa dla których pokzać raport
- na wyjściu suma ilości kilometrów oraz całkowity koszt
- na wyjściu średnia ilośc kilometów i koszt per dzień

---


## II. Zadanie frontendowe:
Tworzymy górną belkę nawigacyjną w SPA, na której będzie widoczne logo firmy oraz przycisk rozwijający popup-menu zależny od stanu zalogowania usera.
Gdy jesteśmy niezalogowani pokazujemy popup-menu z przyciskiem zaloguj, który wykona dowolny request post http (na dowolny adres) i przełączy stan na zalogowany.
Gdy jesteśmy zalogowani, na belce pokazujemy nazwę użytkownika a w popup-menu przycisk wyloguj, który po wykonanij requestu http przestawi stan na niezalogowany.

### Wymagania:
- webpack lub inny builder
- react
- less/scss
- opcjonalnie testy jednostkowe


### III. Zadanie frontendowe
Stwórz stronę internetową z wyznaczonym obszarem wielkosci 500x500px, który będzie zbierał punkty po których przesunięto wskaznik myszy.
1. Po kliknięciu obszaru zaczynamy zbierać punkty
2. Podczas przesuwania myszy zbieramy punkty
3. Po ponownym kliknięciu przerywamy i wypisujemy zebrane punkty pod obszarem

Wymagania
- brak 🙂
