import {
  Route,
  SeedFxRatesByDateQuery,
  SeedFxRatesByDateSchema,
} from "../../entities";
import {
  populateDbWithCurrency,
  populateDbWithExchangeRates,
} from "../../managers/seed-manager";

export const seedExchangeRates: Route<{ Body: SeedFxRatesByDateQuery }> = {
  method: "POST",
  url: "/exchange-rates/seed",
  schema: {
    // querystring: SeedFxRatesByDateSchema,
    body: SeedFxRatesByDateSchema

  },
  async handler(req, reply) {
    await populateDbWithExchangeRates(req.server, req.body?.date);
    await populateDbWithCurrency(req.server);

    reply.code(200).send({ status: "success" });
  },
};