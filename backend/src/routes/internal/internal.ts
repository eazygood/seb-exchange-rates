import { FastifyInstance } from "fastify";
import { seedExchangeRates } from "./seed";
import { healtCheck } from "./health-check";

export default async function registerInternalRoutes(app: FastifyInstance) {
    app.route(healtCheck);
    app.route(seedExchangeRates);
}