
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('assignments').del()
    .then(() => {
      // Inserts seed entries
      return knex('assignments').insert([
        {id: 1, user_id: 2, role_id: 4, start_time: new Date('2000-01-01 14:00:00 UTC'), end_time: new Date('2000-01-01 14:30:00 UTC'), dow: 3},
        {id: 2, user_id: 2, role_id: 3, start_time: new Date('2000-01-01 9:15:00 UTC'), end_time: new Date('2000-01-01 12:30:00 UTC'), dow: 1},
      ])
      .then(() => {
        // Moves id column (PK) auto-incremented to correct value after inserts
        return knex.raw(`SELECT setval('assignments_id_seq', (SELECT MAX(id) FROM assignments))`)
        })
    });
};