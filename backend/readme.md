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
#### Code coverage report
```
---------------------|---------|----------|---------|---------|--------------------
File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s  
---------------------|---------|----------|---------|---------|--------------------
All files            |   93.62 |    83.33 |   88.24 |   93.62 |                    
 driverRoutes        |     100 |       50 |     100 |     100 |                    
  app.js             |     100 |       50 |     100 |     100 | 36-38              
 driverRoutes/routes |      94 |      100 |   72.73 |      94 |                    
  index.js           |     100 |      100 |     100 |     100 |                    
  journeys.js        |   91.67 |      100 |   66.67 |   91.67 | 25                 
  reports.js         |   93.75 |      100 |   71.43 |   93.75 | 24,57              
 driverRoutes/src    |   90.32 |    80.95 |   95.24 |   90.32 |                    
  dbConnection.js    |   90.32 |    80.95 |   95.24 |   90.32 | 13,21,46,76,86,103 
---------------------|---------|----------|---------|---------|--------------------
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
