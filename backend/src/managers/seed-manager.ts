import { FastifyInstance } from "fastify/types/instance";
import { withinTransaction } from "../adapters/mysql-adapter";
import { saveExchangeRates } from "../repositories/exchange-rate-repository";
import { getDateWithoutTime } from "../utils/datetime";
import { saveCurrencies } from "../repositories/currencies-repository";
import xmlToJson from "../utils/xml-to-json";
import { ExternalFxRates, Rate, StucturedFxRates } from "../entities";

const EXCHNAGE_RATE_URL =
  "https://www.lb.lt/webservices/FxRates/FxRates.asmx/getCurrentFxRates";

const EXCHNAGE_RATE_BY_DATE_URL =
  "https://www.lb.lt/webservices/FxRates/FxRates.asmx/getFxRates";

export const populateDbWithExchangeRates = async (
  app: FastifyInstance,
  date?: string
) => {
  const body = date ? `tp=EU&dt=${date}` : "tp=EU";
  const url = date ? EXCHNAGE_RATE_BY_DATE_URL : EXCHNAGE_RATE_URL;

  const response = await fetch(url, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body,
  });

  const xml = await response.text();
  const exchangeRatesJson = (await xmlToJson(xml)) as ExternalFxRates;

  const fxrates: StucturedFxRates[] = exchangeRatesJson.FxRates.FxRate.map(
    (rate: Rate) => {
      const date = rate.Dt;
      const [source, target] = rate.CcyAmt;
      const { Ccy: sourceCurreny, Amt: sourceRate } = source;
      const { Ccy: targetCurrency, Amt: targetRate } = target;

      return {
        source_currency: sourceCurreny,
        target_currency: targetCurrency,
        source_rate: sourceRate,
        target_rate: targetRate,
        exchange_date: date,
      };
    }
  );

  const postingDate = getDateWithoutTime(date).toISOString();

  const defaultEurCurrency = {
    source_currency: "EUR",
    target_currency: "EUR",
    source_rate: "1",
    target_rate: "1",
    exchange_date: postingDate,
  };

  fxrates.push(defaultEurCurrency);

  const ratesToSave = {
    rates: JSON.stringify(fxrates),
    posting_date: postingDate,
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
