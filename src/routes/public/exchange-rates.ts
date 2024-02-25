import {
  ExchangeRateCurrencyParam,
  ExchangeRateCurrencyParamSchema,
  ExchnageRateCalculationBody,
  ExchnageRateCalculationBodySchema,
  Route,
} from "../../entities";
import {
  calculateRate,
  getFxRates,
  getFxRatesByCurrency,
} from "../../managers/fxrate-manager";
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

export const calculateExchangeRate: Route<{
  Body: ExchnageRateCalculationBody;
}> = {
  method: "POST",
  url: "/exchange-rates/calculate",
  schema: {
    body: ExchnageRateCalculationBodySchema,
  },
  async handler(req, reply) {
    if (!req.body || !req.body.source_currency || !req.body.target_currency) {
      return reply.code(404).send({ data: [], status: false });
    }

    const calculatedRates = await calculateRate(req.server, req.body);

    reply.code(200).send({ data: calculatedRates });
  },
};
