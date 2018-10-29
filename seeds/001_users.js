
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, fname: 'Cassi', lname: 'Bailey', login_code: '6562', miles_default: 10},
        {id: 2, fname: 'Riley', lname: 'Burns', login_code: '1234', miles_default: 15},
        {id: 3, fname: 'Bennet', lname: 'Omalu', login_code: '1235', miles_default: 8},
        {id: 4, fname: 'Kanye', lname: 'West', login_code: '0000', miles_default: 6},
      ])
      .then(() => {
				 // Moves id column (PK) auto-incremented to correct value after inserts
				return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`)
			})
    })
}
