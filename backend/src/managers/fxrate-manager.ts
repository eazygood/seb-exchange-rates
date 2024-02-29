import _ from "lodash";
import { FastifyInstance } from "fastify";
import * as repositories from "../repositories";
import {
  FxRateByDateData,
  FxRatesDb,
  SourceTargetFxRateData,
  StucturedFxRates,
} from "../entities";

export const getFxRates = async (
  app: FastifyInstance,
  latest?: boolean,
): Promise<FxRateByDateData> => {
  const fxRates: FxRatesDb[] = await repositories.getFxRates(app, latest);
  const rates: StucturedFxRates[] = fxRates
    .map((rate) => JSON.parse(rate.rates))
    .flat();

  return transformData(rates);
};

export const getFxRatesByCurrency = async (
  app: FastifyInstance,
  currency: string
): Promise<FxRateByDateData> => {
  const fxRates: FxRatesDb[] = await repositories.getFxRates(app);

  const rates =_.chain(fxRates)
    .map((rate) => JSON.parse(rate.rates))
    .flatten()
    .filter((rate) => rate.target_currency === currency)
    .orderBy('exchange_date', 'desc')
    .value()

  return transformData(rates);
};

function transformData(data: StucturedFxRates[]): FxRateByDateData {
  // Group the data by target_currency
  const groupedData = _.groupBy(data, "target_currency");

  // Map over the grouped data and transform each group
  const transformedData: { [currency: string]: SourceTargetFxRateData[] } =
    _.mapValues(groupedData, (group) => {
      // Remove duplicates based on exchange_date
      const uniqueGroup = _.uniqBy(group, "exchange_date");

      // Transform the group into the desired format
      return _.map(uniqueGroup, (item) => ({
        date: item.exchange_date,
        source_rate: item.source_rate,
        target_rate: item.target_rate,
      }));
    });

  return transformedData;
}
