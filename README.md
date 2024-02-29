
## Homework task

### Task: exchange rate portal.

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

### What was done by candidate:
Used exchange rate page from lb.lt (EU) ✅
Selected currency shows exchange rate history in table ✅
Currency calculator ✅:
	- Selection currency
	- Entering amount
	- Displays the amount in foreign currency
	- Displays the rate at which it was calculated
Exchange rate automatically obtained every day (used cron job) ✅	
Used technology by candidate ✅
- Typescript 
- Fastify
- Angular 
- Docker

### How to run application
1. `Docker` and `docker-compose` has to be installed on computer
2. Run command: `docker-compose down -v && docker-compose build && docker-compose up`
3. Angular app host: `http://localhost:4200`
4. Fastify app host: `http://0.0.0.0:5500`


## Public API

#### GET /public/exchange-rates/currencies
Show list of currency.

Response:
```json
{
	data: {
		[
		    AED,
		    AFN,
		    ALL,
		    AMD
		    ...
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
	data: {
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
	data: {
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
	date: "2024-01-12"
}
```
or empty body for seeding latest exchange rate data

Response:
```json
{
	data: {
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