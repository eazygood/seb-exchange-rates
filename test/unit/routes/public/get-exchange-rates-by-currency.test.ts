import { FastifyInstance } from "fastify";
import {
    getDefaultKnexPluginParams,
    startTestEnv,
    stopTestEnv,
} from "../../../helper";
import fp from "fastify-plugin";

let app: FastifyInstance;
let knex = getDefaultKnexPluginParams();

const knexPlugin = fp(async (fastify: any, options: any) => {
    fastify.decorate("knex", knex);
});

jest.mock("../../../../src/plugins/knex-plugin", () => {
    return knexPlugin;
});

beforeAll(async () => {
    app = await startTestEnv();
});

beforeEach(async () => {
    jest.resetAllMocks();
});

afterAll(async () => {
    await stopTestEnv();
});

describe('endpoints /public/exchange-rates calls', () => {
    describe("GET /public/exchange-rates/", () => {
        it("should response with exchange rates data", async () => {
            const data = [
                {
                    source_currency: "EUR",
                    target_currency: "RSD",
                    source_rate: "1",
                    target_rate: "117.201880",
                    exchange_date: "2023-01-22",
                },
                {
                    source_currency: "EUR",
                    target_currency: "RSD",
                    source_rate: "1",
                    target_rate: "116.201880",
                    exchange_date: "2023-01-21",
                },
                {
                    source_currency: "EUR",
                    target_currency: "RSD",
                    source_rate: "1",
                    target_rate: "115.201880",
                    exchange_date: "2023-01-20",
                },
                {
                    source_currency: "EUR",
                    target_currency: "JPY",
                    source_rate: "1",
                    target_rate: "120",
                    exchange_date: "2023-01-20",
                },
            ];

            knex.table = () => ({
                select: () => {
                    return [{ rates: JSON.stringify(data), posting_date: "2024-01-20" }];
                },
            });

            const exchangeRates = await app.inject({
                method: "GET",
                url: "/public/exchange-rates",
            });

            expect(exchangeRates.statusCode).toBe(200);
            expect(JSON.parse(exchangeRates.body)).toEqual({
                data: {
                    RSD: [
                        { date: '2023-01-22', source_rate: '1', target_rate: '117.201880' },
                        { date: '2023-01-21', source_rate: '1', target_rate: '116.201880' },
                        { date: '2023-01-20', source_rate: '1', target_rate: '115.201880' }
                    ],
                    JPY: [{ date: '2023-01-20', source_rate: '1', target_rate: '120' }]
                },
            });
        });
    });

    describe("GET /public/exchange-rates/:currency", () => {
        it("should return 404 not found", async () => {
            const exchangeRates = await app.inject({
                method: "GET",
                url: "/public/exchange-rates/",
            });

            expect(exchangeRates.statusCode).toEqual(404);
        });
        it("should response exchange rates by currency", async () => {
            const data = [
                {
                    source_currency: "EUR",
                    target_currency: "RSD",
                    source_rate: "1",
                    target_rate: "117.201880",
                    exchange_date: "2023-01-22",
                },
                {
                    source_currency: "EUR",
                    target_currency: "RSD",
                    source_rate: "1",
                    target_rate: "116.201880",
                    exchange_date: "2023-01-21",
                },
                {
                    source_currency: "EUR",
                    target_currency: "RSD",
                    source_rate: "1",
                    target_rate: "115.201880",
                    exchange_date: "2023-01-20",
                },
                {
                    source_currency: "EUR",
                    target_currency: "JPY",
                    source_rate: "1",
                    target_rate: "120",
                    exchange_date: "2023-01-20",
                },
            ];

            knex.table = () => ({
                select: () => {
                    return [{ rates: JSON.stringify(data), posting_date: "2024-01-20" }];
                },
            });

            const exchangeRates = await app.inject({
                method: "GET",
                url: "/public/exchange-rates/RSD",
            });

            expect(exchangeRates.statusCode).toBe(200);
            expect(JSON.parse(exchangeRates.body)).toEqual({
                data: {
                    RSD: [
                        { date: "2023-01-22", source_rate: "1", target_rate: "117.201880" },
                        { date: "2023-01-21", source_rate: "1", target_rate: "116.201880" },
                        { date: "2023-01-20", source_rate: "1", target_rate: "115.201880" },
                    ],
                },
            });
        });
    });
})
