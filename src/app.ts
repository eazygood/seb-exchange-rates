import fastify from "fastify";
import { registerMysqlDatabase } from "./adapters/mysql-adapter";
import registerPublicRoutes from "./routes/public/public";
import knexPlugin from "./plugins/knex-plugin";
import registerInternalRoutes from "./routes/internal/internal";
import cors from "@fastify/cors";

export default fastify()
  .register(cors, {
    origin: "*",
    allowedHeaders: "GET",
  })
  .register(knexPlugin, {
    client: "mysql2",
    connection: {
      host: "mysql",
      user: "user",
      password: "password",
      database: "db",
    },
  })
  .register(registerMysqlDatabase)
  .register(registerInternalRoutes, { prefix: "internal" })
  .register(registerPublicRoutes, { prefix: "public" });
