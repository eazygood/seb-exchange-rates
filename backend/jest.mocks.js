const fp = require('fastify-plugin');

const knexPlugin = fp(async (fastify, options) => {
    console.log(options);
    const knex = { 
        raw: jest.fn(),
        destroy: jest.fn(),
        migrate: {
            latest: jest.fn(),
        },
        table: () => ({
            select: jest.fn(),
        })
    }

    fastify.decorate('knex', knex);
})

jest.mock('./src/plugins/knex-plugin', (() => {
  return knexPlugin;
}));
