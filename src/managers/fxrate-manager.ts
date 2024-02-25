import { FastifyInstance } from "fastify";
import { withinTransaction } from "../adapters/mysql-adapter";
import * as repositories from "../repositories";

import { FxRatesJson } from "../entities";

export const getFxRates = async (
  app: FastifyInstance
): Promise<FxRatesJson[]> => {
  return await withinTransaction<FxRatesJson[]>({
    app,
    callback: async () => {
      return await repositories.getFxRates(app);
    },
  });
};
