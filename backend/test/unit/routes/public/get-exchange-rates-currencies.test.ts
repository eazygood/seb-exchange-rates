import { fastify, type FastifyInstance } from "fastify";
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

describe("GET /public/exchange-rates/currencies", () => {
  it("should get currency list", async () => {
    knex.table = () => ({
      select: () => [
        { currency: "EUR" },
        { currency: "USD" },
        { currency: "JPY" },
      ],
    });

    const exchageRates = await app.inject({
      method: "GET",
      url: "/public/exchange-rates/currencies",
    });

    expect(exchageRates.statusCode).toBe(200);
    expect(JSON.parse(exchageRates.body)).toEqual({ data: ["EUR", "USD", "JPY"] });
  });
});
