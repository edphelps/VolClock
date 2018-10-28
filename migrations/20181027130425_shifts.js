exports.up = function(knex, Promise) {
	return knex.schema.createTable('shifts', function(table) {
		// TABLE COLUMN DEFINITIONS HERE
		table.increments().primary
		table.integer('user_id').notNullable()
		table.integer('role_id').notNullable()
		// table.foreign('user_id').references('users.id').onDelete('CASCADE')
		// table.foreign('role_id').references('roles.id').onDelete('CASCADE')
    table.datetime('start').notNullable()
    table.datetime('end').notNullable()
		table.integer('miles').notNullable()
    // table.foreign('miles').references('users.miles_default').onDelete('CASCADE')
		table.timestamps(true, true)
	})
}
exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('shifts')
}
