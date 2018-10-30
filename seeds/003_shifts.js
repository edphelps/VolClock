
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shifts').del()
    .then(function () {
      // Inserts seed entries
      return knex('shifts').insert([
        {id: 1, user_id: 1, role_id: 4, start_time: new Date(), end_time: new Date(), miles: 3},
      ])
      .then(() => {
                 // Moves id column (PK) auto-incremented to correct value after inserts
                return knex.raw(`SELECT setval('shifts_id_seq', (SELECT MAX(id) FROM shifts))`)
            })
    });
};
