import { FastifyInstance } from "fastify/types/instance";
import { withinTransaction } from "../adapters/mysql-adapter";
import { saveExchangeRates } from "../repositories/exchange-rate-repository";
import { getDateWithoutTime } from "../utils/datetime";
import { saveCurrencies } from "../repositories/currencies-repository";
import xmlToJson from "../utils/xml-to-json";

const EXCHNAGE_RATE_URL =
  "https://www.lb.lt/webservices/FxRates/FxRates.asmx/getCurrentFxRates";

interface CcyAmt {
  Ccy: string;
  Amt: string;
}
interface Rate {
  Tp: String;
  Dt: string;
  CcyAmt: CcyAmt[];
}

interface ExternalFxRate {
  $: { xmlns: string };
  FxRate: Rate[];
}
interface ExternalFxRates {
  FxRates: ExternalFxRate;
}

export const populateDbWithExchangeRates = async (app: FastifyInstance) => {
  const response = await fetch(EXCHNAGE_RATE_URL, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: "tp=EU",
  });
  const xml = await response.text();
  const exchangeRatesJson = (await xmlToJson(xml)) as ExternalFxRates;

  const fxrates = exchangeRatesJson.FxRates.FxRate.map((rate: Rate) => {
    const date = rate.Dt;
    const [from, to] = rate.CcyAmt;
    const { Ccy: fromCurreny, Amt: fromRate } = from;
    const { Ccy: toCurrency, Amt: toRate } = to;

    return {
      source_currency: fromCurreny,
      target_currency: toCurrency,
      source_rate: fromRate,
      target_rate: toRate,
      exchange_date: date,
    };
  });

  const ratesToSave = {
    rates: JSON.stringify(fxrates),
    posting_date: getDateWithoutTime().toISOString(),
  };

  await withinTransaction({
    app,
    callback: async () => {
      await saveExchangeRates(app, ratesToSave);
    },
  });
};

export const populateDbWithCurrency = async (app: FastifyInstance) => {
  const response = await fetch(EXCHNAGE_RATE_URL, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: "tp=EU",
  });
  const xml = await response.text();
  const exchangeRatesJson = (await xmlToJson(xml)) as ExternalFxRates;

  const currencies = exchangeRatesJson.FxRates.FxRate.map((rate: Rate) => {
    const [_, to] = rate.CcyAmt;
    const { Ccy: currency } = to;

    return {
      currency,
    };
  });

  const uniqueCurrencies = [...new Set(currencies)];
  uniqueCurrencies.push({ currency: "EUR" });

  await saveCurrencies(app, uniqueCurrencies);
};
