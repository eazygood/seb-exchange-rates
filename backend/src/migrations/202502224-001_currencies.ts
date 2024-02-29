import { Knex } from "knex";

export async function up(knex: Knex) {
	return knex.schema.createTable('currencies', (table) => {
		table.bigIncrements('id').primary();
		table.string('currency', 50).notNullable().unique();
		table.timestamps(true, true); 
	});
}

export async function down(knex: Knex) {
	return knex.schema.dropTableIfExists('currencies');
}