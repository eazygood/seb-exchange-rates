
## Homework task

### What was done by candidate

Used exchange rate page from lb.lt (EU) ✅
Selected currency shows exchange rate history in table ✅
Currency calculator ✅:

- Selection currency
- Entering amount
- Displays the amount in foreign currency
- Displays the rate at which it was calculated

Exchange rate automatically obtained every day (used cron job) ✅

Used technology by candidate ✅
- NodeJS 20 (lts/iron)
- Typescript
- Fastify
- Angular
- Docker

### How to run application

1. `docker` and `docker-compose` has to be installed on computer
2. Run command: `docker-compose down -v && docker-compose build && docker-compose up`
3. Angular app host: `http://localhost:4200`
4. Fastify app host: `http://0.0.0.0:5500`
5. Trigger endpoint with empty body: `POST http://0.0.0.0:5500/internal/exchange-rates/seed`, to populate initial data

## Public API

#### GET /public/exchange-rates/currencies

Show list of currency.

Response:

```json
{
 "data": {
  [
      "AED",
      "AFN",
      "ALL",
      "AMD",
      "..."
  ]
 }
}
✅ 200 OK
❌ 400
```

#### GET /public/exchange-rates

Show list of exchange rates.

With query parameter: `?latest=true`, endpoint return latest exchange rate data from DB.

Response:

```json
{
 "data": {
  "AUD":  [
   {
    "date":  "2024-01-12",
    "source_rate":  "1",
    "target_rate":  "1.6375"
   },
   {
    "date":  "2024-02-28",
    "source_rate":  "1",
    "target_rate":  "1.6639"
   },
   ...
  ],
   "BGN":  [
   {
    "date":  "2024-01-12",
    "source_rate":  "1",
    "target_rate":  "1.9558"
   },
   {
    "date":  "2024-02-28",
    "source_rate":  "1",
    "target_rate":  "1.9558"
   }
   ...
  ],
 }
}
✅ 200 OK
❌ 400
```

#### GET /public/exchange-rates/:currency

Show exchange rate by currency.

Response:

```json
{
 "data": {
  "AUD":  [
   {
    "date":  "2024-01-12",
    "source_rate":  "1",
    "target_rate":  "1.6375"
   },
  ]
 }
}
✅ 200 OK
❌ 400
```

## Internal API

#### POST /internal/exchange-rates/seed

Seeding db with exchange rate data and currency data

Request:

```json
{
 "date": "2024-01-12"
}
```

or empty body for seeding latest exchange rate data

Response:

```json
{
 "data": {
  "AUD":  [
   {
    "date":  "2024-01-12",
    "source_rate":  "1",
    "target_rate":  "1.6375"
   },
  ]
 }
}
✅ 200 OK
❌ 500
```
