import { FastifyInstance } from "fastify";
import * as exchangeRates from './exchange-rates';

export default async function registerPublicRoutes(app: FastifyInstance) {
    app.route(exchangeRates.getExchangeRates);
    app.route(exchangeRates.getExchangeRatesByCurrency);
    app.route(exchangeRates.calculateExchangeRate);
    app.route(exchangeRates.getExchangeRatesCurrencies);
}