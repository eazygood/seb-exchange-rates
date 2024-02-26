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
import app from "../app";

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

  const rates: StucturedFxRates[] = fxRates
    .map((rate) => JSON.parse(rate.rates))
    .flat()
    .filter((rate) => rate.target_currency === currency);

  return transformData(rates);
};

export const calculateRate = async (
  app: FastifyInstance,
  body: ExchnageRateCalculationBody
): Promise<CalculatedFxRate | null> => {
  const fxRates: FxRatesDb = await repositories.getFxRatesLatest(app);

  console.log(fxRates);

  if (_.isEmpty(fxRates)) {
    return null;
  }

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

  if (!sourceRate || !targetRate) {
    return null;
  }

  // 1 EUR = source rate and 1 EUR = target rate
  const sourceCurrencyRateToEUR = parseFloat(sourceRate.target_rate);
  const targetCurrencyRateToEUR = parseFloat(targetRate.target_rate);

  const exchangeRate = targetCurrencyRateToEUR / sourceCurrencyRateToEUR;

  // Calculate the source rate to EUR
  // const sourceToEur = 1 / parseFloat(sourceRate.target_rate);

  // Convert source amount to EUR
  const amountInEUR = amount * exchangeRate;

  // Convert amount in EUR to target amount
  // const amountInTarget = amountInEur * parseFloat(targetRate.target_rate);

  return {
    source_rate: sourceRate.target_rate,
    target_rate: targetRate.target_rate,
    rate: String(exchangeRate),
    amount: String(amountInEUR),
  };
};

// 1 EUR = 1.30 AUD
// 1 EUR = 1.23 JPY
// To calculate the exchange rate from AUD to JPY, we need to convert AUD to EUR and then EUR to JPY.

// Convert AUD to EUR:

// 1 AUD = 1 / 1.30 EUR
// Convert EUR to JPY:

// 1 EUR = 1.23 JPY
// Now, to convert 10 AUD to JPY:

// Convert 10 AUD to EUR: 10 / 1.30 = 7.6923 EUR
// Convert 7.6923 EUR to JPY: 7.6923 * 1.23 = 9.4615 JPY

// The calculated exchange rate in this case is approximately 1.23 JPY for 1 AUD.
// This means that for every 1 Australian Dollar (AUD), 
// you would receive approximately 1.23 Japanese Yen (JPY) based on the provided exchange rates.

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
