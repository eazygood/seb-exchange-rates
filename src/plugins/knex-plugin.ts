import { MySQLOptions } from '@fastify/mysql';
import fastify, { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import Knex = require('knex');
// const knex = require('fastify-knexjs');


declare module 'fastify' {
	interface FastifyInstance {
		knex: Knex.Knex
	}
}
const knexPlugin = async (fastify: FastifyInstance, options: any ) => {
    const knex = Knex(options);
    fastify.decorate('knex', knex);
	
	fastify.addHook('onClose', async () => {
		await fastify.knex.destroy();
	});
};

export default fp(knexPlugin, {
	name: 'knex',
});
