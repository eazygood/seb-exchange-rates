import fastify from "fastify";
import { getConfig, registerMysqlDatabase } from "./adapters/mysql-adapter";
import registerPublicRoutes from "./routes/public/public";
import knexPlugin from "./plugins/knex-plugin";
import registerInternalRoutes from "./routes/internal/internal";
import cors from "@fastify/cors";
import fastifyCron from "fastify-cron";
import createCronJobs from "./jobs/cron-job";

const f = fastify()

export default f
  .register(cors, {
    origin: "*",
    allowedHeaders: "GET",
  })
  .register(knexPlugin, getConfig())
  .register(fastifyCron, { jobs: [] })
  .register(registerMysqlDatabase)
  .register(registerInternalRoutes, { prefix: "internal" })
  .register(registerPublicRoutes, { prefix: "public" })
  .register(createCronJobs);
