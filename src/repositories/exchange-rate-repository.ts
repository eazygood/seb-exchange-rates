import { FastifyInstance } from "fastify";
import { FxRates, FxRatesJson } from "../entities";
import { DB_EXCHANGE_RATE_TABLE } from "../constants";

export const saveExchangeRates = async (app: FastifyInstance, exchangeRates: FxRates) => {
  await app.knex
    .table(DB_EXCHANGE_RATE_TABLE)
    .insert(exchangeRates)
    .onConflict('posting_date')
    .ignore();
};

export const getFxRates = async (app: FastifyInstance): Promise<FxRatesJson[]> => {
  const rows =  await app.knex.table(DB_EXCHANGE_RATE_TABLE).select();

  return rows.map((row: FxRates) => ({
    rates: JSON.parse(row.rates),
    posting_date: row.posting_date,
  }));
};

