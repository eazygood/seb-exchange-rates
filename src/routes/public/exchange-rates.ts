import {
  ExchangeRateCurrencyParam,
  ExchangeRateCurrencyParamSchema,
  ExchangeRatesQuery,
  ExchangeRatesQuerySchema,
  Route,
} from "../../entities";
import {
  getFxRates,
  getFxRatesByCurrency,
} from "../../managers/fxrate-manager";
import { getCurrencies } from "../../repositories/currencies-repository";

export const getExchangeRates: Route<{ Querystring: ExchangeRatesQuery }> = {
  method: "GET",
  url: "/exchange-rates",
  schema: {
    querystring: ExchangeRatesQuerySchema,
  },
  async handler(req, reply) {
    const fxRates = await getFxRates(req.server, req.query.latest);

    reply.code(200).send({ data: fxRates, size: fxRates.length });
  },
};

export const getExchangeRatesByCurrency: Route<{
  Params: ExchangeRateCurrencyParam;
}> = {
  method: "GET",
  url: "/exchange-rates/:currency",
  schema: {
    params: ExchangeRateCurrencyParamSchema,
  },
  async handler(req, reply) {
    if (!req.params.currency) {
      return reply.code(404).send({ data: [], status: false });
    }

    const fxRates = await getFxRatesByCurrency(req.server, req.params.currency);

    reply.code(200).send({ data: fxRates, size: fxRates.length });
  },
};

export const getExchangeRatesCurrencies: Route<{}> = {
  method: "GET",
  url: "/exchange-rates/currencies",
  async handler(req, reply) {
    const currencies = await getCurrencies(req.server);

    reply.code(200).send({ data: currencies });
  },
};
