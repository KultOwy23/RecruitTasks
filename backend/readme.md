# I. Zadanie backendowe:

Jesteś kierowcą, potrzebujemy zapisywac informacje o przejazdach, ilość przejechanych kilometrów i koszt przejechania.

## Wymagania:
- [x] Użyj GITa do rozwoju proijektu
- [x] Stwórz API zgodnie z załączoną dokumentacją  (Node.js + Express)
  - [x] Brak wymogu autoryzacji.
- [x] Napisane testy jednostkowe dla kodu ([Mocha](https://www.npmjs.com/package/mocha) + [Chai](https://www.npmjs.com/package/chai), Test coverage: [nyc](https://www.npmjs.com/package/nyc))
- [x] Walidacja parametrów wejściowych. ([express-validator](https://www.npmjs.com/package/express-validator))

## Wymagane endpointy:
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
