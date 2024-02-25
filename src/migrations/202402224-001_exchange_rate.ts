import { Knex } from "knex";

export async function up(knex: Knex) {
	return knex.schema.createTable('exchange_rates', (table) => {
		table.bigIncrements('id').primary();
		table.text('rates').notNullable();
		table.datetime('posting_date').notNullable().unique().index('idx_posting_date');
		table.timestamps(true, true); 
	});
}

export async function down(knex: Knex) {
	return knex.schema.dropTableIfExists('exchange_rates');
}
