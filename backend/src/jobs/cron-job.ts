import { FastifyInstance } from "fastify";
import { populateDbWithExchangeRates } from "../managers";

export default async function createCronJobs(app: FastifyInstance) {
    app.cron.createJob({
        name: 'fetch-fxrates',
        cronTime: '1 0 * * *', // Runs every day at 00:01
        // cronTime: "*/10 * * * * *", // Runs every 10 seconds
        onTick: async () => {
            await populateDbWithExchangeRates(app);
        },
    });
}
