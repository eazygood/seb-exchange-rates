import { FastifyInstance } from "fastify";
import { DB_CURRENCIES_TABLE } from "../constants";
import { Currency } from "../entities/currencies";

export const saveCurrencies = async (
  app: FastifyInstance,
  currencies: { currency: Currency }[],
): Promise<void> => {
  await app.knex
    .table(DB_CURRENCIES_TABLE)
    .insert(currencies)
    .onConflict("currency")
    .ignore();
};

export const getCurrencies = async (
  app: FastifyInstance,
): Promise<Currency[]> => {
  const rows = await app.knex
    .table(DB_CURRENCIES_TABLE)
    .select('currency');

  return rows.map(row => row.currency)
};
