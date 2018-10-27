exports.up = function(knex, Promise) {
	return knex.schema.createTable('shifts', function(table) {
		// TABLE COLUMN DEFINITIONS HERE
		table.increments().primary()
		table.integer('user_id').references('id').inTable('users').notNullable().onDelete('cascade')
		table.integer('role_id').references('id').inTable('roles').notNullable().onDelete('cascade')
		table.date('date_worked').notNullable()
    table.datetime('start').notNullable()
    table.datetime('end').notNullable()
    table.integer('miles').notNullable().defaultTo(0)
		table.timestamps(true, true)
	})
}
exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('shifts')
}
