
exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', function(table) {
    table.increments().primary()
    table.varchar('role', 255).notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('roles')
}
