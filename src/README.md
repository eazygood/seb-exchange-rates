Homework task description:

-------Task: exchange rate portal.

 Write a web application with such functionality:

1. Central bank exchange rates page. Exchange rates from the Bank of Lithuania are displayed here: <https://www.lb.lt/webservices/FxRates/en/>.
2. After selecting a specific currency, its exchange rate history is displayed (chart or table).
3. Currency calculator. The amount is entered, the currency is selected, the program displays the amount in foreign currency and the rate at which it was calculated.

Used technology guidelines:

- Preferences for back end:
-- Java 8+, maven.
-- Exchange rates must be automatically obtained every day (eg using job scheduling library like Quartz).
-- Use an open-source lightweight database like H2 for data storage.
-- Preferences for frontend: any UI framework.
-- Preferences for frontend: Angular.

Used technology by candidate:

- Typescript
- Angular
- Docker


### Public API

## GET api/v1/currency/:currency

Query parameter
```
currency: string
```

Response:
```json
[
    {
        "eu": {
            "EUR": 1,
            "AUD": 1.6,
        },
        "datetime": "2024-02-23"
    },
    ...
]
```


1. create mysql register
2. create routes
3. create cron job
4. create managers
5. create repositories
6. create models
7. parser chooser ok

1. Central bank exchange rates page. Exchange rates from the Bank of Lithuania are displayed here: https://www.lb.lt/webservices/FxRates/en/.
2. After selecting a specific currency, its exchange rate history is displayed (chart or table).
3. Currency calculator. The amount is entered, the currency is selected, the program displays the amount in foreign currency and the rate at which it was calculated.

GET exchange-rates/:currency
getFxRateByCurrency

POST exhange-rates
body {
    source_currency: string
    target_currency: string
}

response {
    rate: string
    amount: string
}
calculateCurrency
