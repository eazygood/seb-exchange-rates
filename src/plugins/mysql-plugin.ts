import fastify, { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { fastifyMysql, MySQLOptions, MySQLPromiseConnection} from '@fastify/mysql';
// import { MigrationSource } from './migration-source';

// export { FastifyMySQLClient, MigrationSource };
// export * from '@pipedrive/mysql-knex';

declare module 'fastify' {
	interface FastifyInstance {
		mysql: MySQLPromiseConnection;
	}
}

// declare module '@pipedrive/fastify' {
// 	interface Context {
// 		mysql: FastifyMySQLClient;
// 	}
// }

// fastify.register(fp(async (fastify: FastifyInstance) => {
// 	fastify.decorate('mysql', MySQLPromiseConnection);
// 	fastify.addHook('onClose', async () => {
// 		try {
// 			fastify.mysql.connection.end
// 			await fastify.mysql.close();
// 		} catch (err) {
// 			fastify.log.error(err);
// 		}
// 	});
// }

const mysqlPlugin = async (fastify: FastifyInstance, options: MySQLOptions) => {
	fastify.register(fastifyMysql, options);
	// fastify.decorate('mysql', );

    // fastify.decorate('mysql', new MySQLPromiseConnection(fastify));

	// fastify.decorateWithGetter('mysql', {
	// 	getter() {
	// 		const value: FastifyMySQLClient = new FastifyMySQLClient(this);

	// 		Object.defineProperty(this, 'mysql', { value });

	// 		return value;
	// 	},
	// });

	fastify.addHook('onClose', async () => {
		fastify.mysql.connection.destroy();
	});
};

export default fp(mysqlPlugin, {
	name: 'mysql',
});
