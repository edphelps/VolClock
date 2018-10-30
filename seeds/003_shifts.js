
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shifts').del()
    .then(function () {
      // Inserts seed entries
      return knex('shifts').insert([
        {id: 1, user_id: 1, role_id: 4, start_time: new Date(), end_time: new Date(), miles: 3},
        {id: 2, user_id: 2, role_id: 3, start_time: new Date(), end_time: new Date(), miles: 4},
        {id: 3, user_id: 3, role_id: 2, start_time: new Date(), end_time: new Date(), miles: 5},
        {id: 4, user_id: 4, role_id: 1, start_time: new Date(), end_time: new Date(), miles: 6},
        {id: 5, user_id: 2, role_id: 4, start_time: new Date(), end_time: null,       miles: 4},
        {id: 6, user_id: 2, role_id: 5, start_time: new Date(), end_time: null,       miles: 4},
        {id: 7, user_id: 2, role_id: 6, start_time: new Date(), end_time: null,       miles: 4},
        {id: 8, user_id: 2, role_id: 7, start_time: new Date(), end_time: null,       miles: 4},
        {id: 9, user_id: 2, role_id: 8, start_time: new Date(), end_time: null,       miles: 4},
        {id: 10, user_id: 4, role_id: 8, start_time: new Date('2018-10-21 14:00:00 UTC'), end_time: new Date('2018-10-21 15:00:00 UTC'), miles: 4},
        {id: 11, user_id: 4, role_id: 8, start_time: new Date('2018-10-22 14:00:00 UTC'), end_time: new Date('2018-10-22 15:00:00 UTC'), miles: 4},
        {id: 12, user_id: 4, role_id: 8, start_time: new Date('2018-10-23 14:00:00 UTC'), end_time: new Date('2018-10-23 15:00:00 UTC'), miles: 4},
        {id: 13, user_id: 4, role_id: 8, start_time: new Date('2018-10-24 14:00:00 UTC'), end_time: new Date('2018-10-24 15:00:00 UTC'), miles: 4},
        {id: 14, user_id: 4, role_id: 8, start_time: new Date('2018-10-25 14:00:00 UTC'), end_time: new Date('2018-10-25 15:00:00 UTC'), miles: 4},
        {id: 15, user_id: 4, role_id: 8, start_time: new Date('2018-10-26 14:00:00 UTC'), end_time: new Date('2018-10-26 15:00:00 UTC'), miles: 4},
      ])
      .then(() => {
                 // Moves id column (PK) auto-incremented to correct value after inserts
                return knex.raw(`SELECT setval('shifts_id_seq', (SELECT MAX(id) FROM shifts))`)
            })
    });
};
