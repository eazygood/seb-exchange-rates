import { Route, SeedFxRatesByDateQuery, SeedFxRatesByDateSchema } from "../../entities";
import { populateDbWithCurrency, populateDbWithExchangeRates } from "../../managers/seed-manager";

export const seedExchangeRates: Route<{}> = {
  method: "GET",
  url: "/seed",
  schema: {},
  async handler(req, reply) {
    await populateDbWithExchangeRates(req.server);
    await populateDbWithCurrency(req.server);

    reply.code(200).send({status: 'success'})
  },
};

export const seedExchangeRatesByDate: Route<{Querystring: SeedFxRatesByDateQuery}> = {
  method: "GET",
  url: "/seedByDate",
  schema: {
    querystring: SeedFxRatesByDateSchema,
  },
  async handler(req, reply) {
    await populateDbWithExchangeRates(req.server, req.query.date);
    // await populateDbWithCurrency(req.server);

    reply.code(200).send({status: 'success'})
  },
};