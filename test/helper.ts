import { FastifyInstance } from 'fastify';

let app: FastifyInstance;

export async function startTestEnv(): Promise<FastifyInstance> {
	const app = require('../src/app').default;

	await app.ready();

	return app;
}

export async function stopTestEnv(): Promise<void> {
    await app?.close();
}

export function getDefaultKnexPluginParams() {
	return {
		raw: jest.fn(),
        destroy: jest.fn(),
        migrate: {
            latest: jest.fn(),
        },
		table: {},
	}
}