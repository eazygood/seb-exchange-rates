import { FastifyInstance } from "fastify";
import * as exchangeRates from './exchange-rates';
import { healtCheck } from "../internal/health-check";

export default async function registerPublicRoutes(app: FastifyInstance) {
    app.route(exchangeRates.getExchangeRates);
}