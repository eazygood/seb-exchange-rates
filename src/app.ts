import fastify from "fastify";
import { registerMysqlDatabase } from "./adapters/mysql-adapter";
import registerPublicRoutes from "./routes/public/public";
import knexPlugin from "./plugins/knex-plugin";
import registerInternalRoutes from "./routes/internal/internal";

export default fastify()
  .register(knexPlugin, {
    client: "mysql2",
    connection: {
      host: 'mysql',
      user: "user",
      password: "password",
      database: "db",
    },
  })
  .register(registerMysqlDatabase)
  .register(registerInternalRoutes, { prefix: 'internal'})
  .register(registerPublicRoutes, { prefix: 'public'});
