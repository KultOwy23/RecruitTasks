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

## Rozwiazanie

### Konfiguracja
Jako, ze aplikacja korzysta z [Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/overview), przed uruchomieniem aplikacji/testow nalezy wygenerowac API KEY. 

Instrukcje jak wygenerowac potrzebne rzeczy, mozna znalezc [tutaj](https://developers.google.com/maps/documentation/distance-matrix/get-api-key).

Majac wygenerowany `API_KEY`, nalezy zapisac go w pliku `.env`, w folderze projektu.

Po sklonowaniu repozytorium, nalezy wykonac nastepujace kroki

```bash
$ cd DIR_OF_REPO/backend/driverRoutes
$ nano .env
```
Plik `.env`, powinien wygladac nastepujaco

```
GOOGLE_MAPS_API_KEY=[[API_KEY]]
```

### Testy
```bash
npm test
```


### API

#### Dodawanie przejazdu:
```
./journeys
```
* Method: **POST**
* Input parameters: 
  ```js
    {
      date: Date,
      originAddress: String (i.e 'San Diego, CA')
      destinationAddress: String (i.e. 'San Francisco, CA')
      price: Decimal
    }
  ```
* Response:
  ```js
    {
      message: 'Saved journey!', // Fixed message
      distance: Number // Calculated distance between origin and destination address
    }
  ```

#### Pobieranie raportow - raport dzienny
```
./reports/daily
```
* Method: **GET**
* Input parameters: 
  ```js
    {
      date: Date,
    }
  ```
* Response:
  ```js
    {
      totalPrice: Number, // Summarized price of all journeys for date
      totalDistance: Number, // Summarized distance of all journeys for date
    }
  ```

#### Pobieranie raportow - raport pomiedzy datami
```
./reports/daterange
```
* Method: **GET**
* Input parameters: 
  ```js
    {
      startDate: Date,
      endDate: Date
    }
  ```
* Response:
  ```js
    {
      totalPrice: Number, // Summarized price of all journeys for the date range
      totalDistance: Number, // Summarized distance of all journeys for the date range
      avgPrice: Number, // Average journey price in the date range
      avgDistance: Number, // Average journey distance in the date range
    }
  ```

### Sprawdz online
Applikacja powinna byc dostepna pod adresem [http://18.191.8.83:3000/](http://18.191.8.83:3000/)
