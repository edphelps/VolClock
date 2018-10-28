exports.up = function(knex, Promise) {
	return knex.schema.createTable('notifications', function(table) {
		// TABLE COLUMN DEFINITIONS HERE
		table.increments().primary()
		table.integer('user_id').notNullable()
		table.foreign('user_id').references('users.id').onDelete('cascade')
    table.datetime('start').notNullable()
    table.datetime('end').notNullable()
    table.varchar('comment', 255).defaultTo('')
		table.timestamps(true, true)
	})
}
exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('notifications')
}
