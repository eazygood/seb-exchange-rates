import { FastifyInstance } from "fastify";
import path from "path";
import { Knex } from "knex";

export async function registerMysqlDatabase(
  app: FastifyInstance
): Promise<void> {
  await app.knex.raw("SELECT 1");

  console.log("init migration");
  await app.knex.migrate.latest({
    database: "db",
    directory: path.join(__dirname, "../migrations"),
  });
  console.log("migratin done");
}

export const getConnection = async (app: FastifyInstance) => {};

export async function withinTransaction<T>({
  app,
  callback,
}: {
  app: FastifyInstance;
  callback: (trx: Knex.Transaction) => Promise<T>;
}): Promise<T> {
  const trx = await app.knex.transaction();

  try {
    const data = await callback(trx);

    await trx.commit();

    return data;
  } catch (err) {
    await trx.rollback();

    throw new Error("database commit failed");
  }
}
