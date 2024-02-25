import { FastifyInstance } from "fastify";
import { withinTransaction } from "../adapters/mysql-adapter";
import * as repositories from "../repositories";

import { CurrencyData, FxRatesDb, FxRatesJson } from "../entities";

export const getFxRates = async (
  app: FastifyInstance
): Promise<CurrencyData> => {
  const fxRates: FxRatesDb[] = await repositories.getFxRates(app);

  const rates: CurrencyData[] = fxRates.map((rate) => JSON.parse(rate.rates));

  return processData(rates);
};

export function processData(data: CurrencyData[]): CurrencyData {
  const result: any = {};

  data.forEach((obj) => {
    Object.entries(obj).forEach(
      ([currency, currencyData]: [string, CurrencyData]) => {
        if (!result[currency]) {
          result[currency] = {};
        }
        Object.entries(currencyData).forEach(
          ([date, values]: [
            string,
            { source_value: string; target_value: string }
          ]) => {
            result[currency][date] = values;
          }
        );
      }
    );
  });

  return result;
}
