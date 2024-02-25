import { FastifyInstance } from "fastify/types/instance";
import { withinTransaction } from "../adapters/mysql-adapter";
import { saveExchangeRates } from "../repositories/exchange-rate-repository";
import { getDateWithoutTime } from "../utils/datetime";
import { saveCurrencies } from "../repositories/currencies-repository";
import xmlToJson from "../utils/xml-to-json";
import { CurrencyData, SourceTargetCurrencyMap, StucturedFxRates } from "../entities";
import { mapToObject } from "../utils/process-data";

const EXCHNAGE_RATE_URL =
  'https://www.lb.lt/webservices/FxRates/FxRates.asmx/getCurrentFxRates';

const EXCHNAGE_RATE_BY_DATE_URL = 'https://www.lb.lt/webservices/FxRates/FxRates.asmx/getFxRates';

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

export const populateDbWithExchangeRates = async (app: FastifyInstance, date?: string) => {
  const body = date ? `tp=EU&dt=${date}` : 'tp=EU';
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

  const fxrates: StucturedFxRates[] = exchangeRatesJson.FxRates.FxRate.map((rate: Rate) => {
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

  console.log(JSON.stringify(fxrates));

  const structurizedCurrencyData = structurizeFxRates(fxrates);
  console.log(JSON.stringify(structurizedCurrencyData));

  const ratesToSave = {
    rates: JSON.stringify(structurizedCurrencyData),
    posting_date: getDateWithoutTime(date).toISOString(),
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

export const structurizeFxRates = (fxRates: StucturedFxRates[]) => {
  const data = fxRates.reduce(
    (acc: Map<string, Map<string, SourceTargetCurrencyMap>>, curr: StucturedFxRates) => {
      const targetCurrencyMap = acc.get(curr.target_currency);

      const sourceTargetData = {
        source_value: curr.source_rate,
        target_value: curr.target_rate,
      };

      if (!targetCurrencyMap) {
        const newTargetCurrencyMap = new Map();
        newTargetCurrencyMap.set(curr.exchange_date, sourceTargetData);

        acc.set(curr.target_currency, newTargetCurrencyMap);

        return acc;
      }

      if (!targetCurrencyMap.has(curr.exchange_date)) {
        targetCurrencyMap.set(curr.exchange_date, sourceTargetData);

        return acc;
      }

      return acc;
    },
    new Map<string, Map<string, SourceTargetCurrencyMap>>()
  );

  return mapToObject<string, Map<string, SourceTargetCurrencyMap>, CurrencyData>(data);
};


// fetch("https://www.lb.lt/webservices/FxRates/FxRates.asmx/getFxRates", {
//   "headers": {
//     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//     "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
//     "cache-control": "max-age=0",
//     "content-type": "application/x-www-form-urlencoded",
//     "sec-ch-ua": "\"Chromium\";v=\"121\", \"Not A(Brand\";v=\"99\"",
//     "sec-ch-ua-arch": "\"arm\"",
//     "sec-ch-ua-bitness": "\"64\"",
//     "sec-ch-ua-full-version": "\"121.0.6167.160\"",
//     "sec-ch-ua-full-version-list": "\"Chromium\";v=\"121.0.6167.160\", \"Not A(Brand\";v=\"99.0.0.0\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-model": "\"\"",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-ch-ua-platform-version": "\"14.3.1\"",
//     "sec-fetch-dest": "document",
//     "sec-fetch-mode": "navigate",
//     "sec-fetch-site": "same-origin",
//     "sec-fetch-user": "?1",
//     "upgrade-insecure-requests": "1"
//   },
//   "referrer": "https://www.lb.lt/webservices/FxRates/FxRates.asmx?op=getFxRates",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "tp=EU&dt=2024-01-30",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });