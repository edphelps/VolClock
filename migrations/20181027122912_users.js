exports.up = function(knex, Promise) {
	return knex.schema.createTable(`users`, function(table) {
		// TABLE COLUMN DEFINITIONS HERE
		table.increments().notNullable()
		table.varchar(`fname`, 255).notNullable()
		table.varchar(`lname`, 255).notNullable()
		table.varchar(`login_code`, 4).notNullable()
    table.integer(`miles_default`).defaultTo(0)
		table.timestamps(true, true)
	})
}
exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists(`users`)
}
