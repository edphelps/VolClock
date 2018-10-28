exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_roles', (table) => {
    table.increments()
    table.integer('user_id').notNullable()
    table.integer('role_id').notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.foreign('role_id').references('roles.id').onDelete('CASCADE')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users_roles')

};
