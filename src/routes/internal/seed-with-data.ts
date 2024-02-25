import { Route } from "../../entities";
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
