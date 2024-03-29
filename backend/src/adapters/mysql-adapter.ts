import { FastifyInstance } from "fastify";
import path from "path";
import { Knex } from "knex";

export function getConfig() {
  return {
    client: "mysql2",
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
  }
}

export async function registerMysqlDatabase(
  app: FastifyInstance
): Promise<void> {
  await app.knex.raw("SELECT 1");

  await app.knex.migrate.latest({
    database: "db",
    directory: path.join(__dirname, "../migrations"),
  });
}

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
