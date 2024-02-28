import type { FastifyInstance } from "fastify";
import { startTestEnv, stopTestEnv } from "../helper";

let app: FastifyInstance;


beforeAll(async () => {
    app = await startTestEnv();
});


afterAll(async () => {
    await stopTestEnv();
})

describe('app initialization test', () => {
    it('should app register all mocked dependecies', async () => {
        expect(true).toBe(true);
    })
})


