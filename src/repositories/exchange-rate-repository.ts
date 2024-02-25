import { FastifyInstance } from "fastify";
import { FxRatesDb, FxRatesJson } from "../entities";
import { DB_EXCHANGE_RATE_TABLE } from "../constants";

export const saveExchangeRates = async (app: FastifyInstance, exchangeRates: FxRatesDb) => {
  await app.knex
    .table(DB_EXCHANGE_RATE_TABLE)
    .insert(exchangeRates)
    .onConflict('posting_date')
    .ignore();
};

export const getFxRates = async (app: FastifyInstance): Promise<FxRatesDb[]> => {
  return await app.knex.table(DB_EXCHANGE_RATE_TABLE).select();
};

