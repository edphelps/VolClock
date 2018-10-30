
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_roles').insert([
        {id: 1, user_id: 1, role_id: 1},
      ])
      .then(() => {
				 // Moves id column (PK) auto-incremented to correct value after inserts
				return knex.raw(`SELECT setval('users_roles_id_seq', (SELECT MAX(id) FROM users_roles))`)
			})
    })
}
