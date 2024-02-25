import _ from "lodash";
import { FastifyInstance } from "fastify";
import * as repositories from "../repositories";
import {
  CalculatedFxRate,
  ExchnageRateCalculationBody,
  FxRateByDateData,
  FxRatesDb,
  SourceTargetFxRateData,
  StucturedFxRates,
} from "../entities";

export const getFxRates = async (
  app: FastifyInstance
): Promise<FxRateByDateData> => {
  const fxRates: FxRatesDb[] = await repositories.getFxRates(app);
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

  const rates: StucturedFxRates[] = fxRates
    .map((rate) => JSON.parse(rate.rates))
    .flat()
    .filter((rate) => rate.target_currency === currency);

  return transformData(rates);
};

export const calculateRate = async (
  app: FastifyInstance,
  body: ExchnageRateCalculationBody
): Promise<CalculatedFxRate> => {
  const fxRates: FxRatesDb = await repositories.getFxRatesLatest(app);

  const sourceCurrency = body.source_currency;
  const targetCurrency = body.target_currency;
  const amount = parseFloat(body.amount);

  const parsedFxRates: StucturedFxRates[] = JSON.parse(fxRates.rates);

  const sourceRate: StucturedFxRates = _.chain(parsedFxRates)
    .filter((rate) => rate.target_currency === sourceCurrency)
    .head()
    .value();

  const targetRate: StucturedFxRates = _.chain(parsedFxRates)
    .filter((rate) => rate.target_currency === targetCurrency)
    .head()
    .value();

  // Calculate the source rate to EUR
  const sourceToEur = 1 / parseFloat(sourceRate.target_rate);

  // Convert source amount to EUR
  const amountInEur = amount * sourceToEur;

  // Convert amount in EUR to target amount
  const amountInTarget = amountInEur * parseFloat(targetRate.target_rate);

  return {
    source_rate: sourceRate.target_rate,
    target_rate: targetRate.target_rate,
    amount: String(amountInTarget),
  }
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
