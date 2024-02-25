import fastifyCron from 'fastify-cron';
import { FastifyInstance } from 'fastify/types/instance';

export const registerCronJob = async (app: FastifyInstance) => {
    app.register(fastifyCron, {
        jobs: [
            {
                cronTime: '0 * * * *', // Runs every hour at 0 minutes
                onTick: () => {
                    // Your cron job logic goes here
                    console.log('Cron job executed!');
                },
            },
        ],
    });
}



