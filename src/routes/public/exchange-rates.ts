import { Route } from "../../entities";
import { getFxRates } from "../../managers/fxrate-manager";
import { getCurrencies } from "../../repositories/currencies-repository";

export const getExchangeRates: Route<{}> = {
  method: "GET",
  url: "/exchange-rates",

  async handler(req, reply) {
    const fxRates = await getFxRates(req.server);
    const currencies = await getCurrencies(req.server);

    reply.code(200).send({ data: fxRates, size: fxRates.length, currencies });
  },
};
