import { FastifyInstance } from "fastify";
import { FxRatesDb } from "../entities";
import { DB_EXCHANGE_RATE_TABLE } from "../constants";
import { getDateWithoutTime } from "../utils/datetime";

export const saveExchangeRates = async (app: FastifyInstance, exchangeRates: FxRatesDb) => {
  await app.knex
    .table(DB_EXCHANGE_RATE_TABLE)
    .insert(exchangeRates)
    .onConflict('posting_date')
    .ignore();
};

export const getFxRates = async (app: FastifyInstance, latest?: boolean): Promise<FxRatesDb[]> => {
  if (latest) {
    return await app.knex.table(DB_EXCHANGE_RATE_TABLE).select().where({ posting_date: getDateWithoutTime().toISOString()}).first();  
  }

  return await app.knex.table(DB_EXCHANGE_RATE_TABLE).select();
};

export const getFxRatesLatest = async (app: FastifyInstance): Promise<FxRatesDb> => {
  return await app.knex.table(DB_EXCHANGE_RATE_TABLE).select().where({ posting_date: getDateWithoutTime().toISOString()}).first();
};

