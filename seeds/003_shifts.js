
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shifts').del()
    .then(function () {
      // Inserts seed entries
      return knex('shifts').insert([
        {id: 1, user_id: 1, role_id: 4, start_time: new Date('2018-10-10 15:30:00 UTC'), end_time: new Date('2018-10-10 17:45:00 UTC'), miles: 3},
        {id: 2, user_id: 2, role_id: 3, start_time: new Date('2018-10-11 14:00:00 UTC'), end_time: new Date('2018-10-11 22:00:00 UTC'), miles: 4},
        {id: 3, user_id: 3, role_id: 2, start_time: new Date('2018-10-12 14:00:00 UTC'), end_time: new Date('2018-10-12 19:00:00 UTC'), miles: 5},
        {id: 4, user_id: 4, role_id: 1, start_time: new Date('2018-10-13 16:45:00 UTC'), end_time: new Date('2018-10-13 21:15:00 UTC'), miles: 6},
        {id: 5, user_id: 2, role_id: 4, start_time: new Date('2018-10-14 14:00:00 UTC'), end_time: new Date('2018-10-14 16:00:00 UTC'), miles: 4},
        {id: 6, user_id: 2, role_id: 5, start_time: new Date('2018-10-15 14:00:00 UTC'), end_time: new Date('2018-10-15 17:00:00 UTC'), miles: 4},
        {id: 7, user_id: 2, role_id: 6, start_time: new Date('2018-10-16 14:00:00 UTC'), end_time: new Date('2018-10-16 22:00:00 UTC'), miles: 4},
        {id: 8, user_id: 2, role_id: 7, start_time: new Date('2018-10-17 17:00:00 UTC'), end_time: new Date('2018-10-17 14:00:00 UTC'), miles: 4},
        {id: 9, user_id: 2, role_id: 8, start_time: new Date('2018-10-18 14:00:00 UTC'), end_time: new Date('2018-10-18 21:00:00 UTC'), miles: 4},
        {id: 10, user_id: 2, role_id: 8, start_time: new Date('2018-10-19 14:00:00 UTC'), end_time: new Date('2018-10-19 15:00:00 UTC'), miles: 4},
        {id: 11, user_id: 2, role_id: 8, start_time: new Date('2017-10-20 14:00:00 UTC'), end_time: new Date('2017-10-20 15:00:00 UTC'), miles: 4},
        {id: 12, user_id: 2, role_id: 8, start_time: new Date('2017-10-21 15:30:00 UTC'), end_time: new Date('2017-10-21 19:00:00 UTC'), miles: 4},
        {id: 13, user_id: 2, role_id: 8, start_time: new Date('2018-10-22 14:00:00 UTC'), end_time: new Date('2018-10-22 15:00:00 UTC'), miles: 4},
        {id: 14, user_id: 2, role_id: 8, start_time: new Date('2018-10-23 14:00:00 UTC'), end_time: new Date('2018-10-23 15:00:00 UTC'), miles: 4},
        {id: 15, user_id: 2, role_id: 8, start_time: new Date('2018-10-24 14:00:00 UTC'), end_time: new Date('2018-10-24 15:00:00 UTC'), miles: 4},
        {id: 16, user_id: 4, role_id: 8, start_time: new Date('2017-10-25 14:30:00 UTC'), end_time: new Date('2017-10-25 23:30:00 UTC'), miles: 4},
        {id: 17, user_id: 4, role_id: 8, start_time: new Date('2017-10-26 14:00:00 UTC'), end_time: new Date('2017-10-26 18:00:00 UTC'), miles: 4},
        {id: 18, user_id: 4, role_id: 8, start_time: new Date('2017-10-27 14:00:00 UTC'), end_time: new Date('2017-10-27 21:00:00 UTC'), miles: 4},
        {id: 19, user_id: 1, role_id: 8, start_time: new Date('2016-10-28 14:00:00 UTC'), end_time: new Date('2016-10-28 19:00:00 UTC'), miles: 4},
        {id: 20, user_id: 1, role_id: 8, start_time: new Date('2016-10-29 16:45:00 UTC'), end_time: new Date('2016-10-29 20:00:00 UTC'), miles: 4},
        {id: 21, user_id: 1, role_id: 8, start_time: new Date('2016-10-30 14:00:00 UTC'), end_time: new Date('2016-10-30 22:00:00 UTC'), miles: 4},
        {id: 22, user_id: 2, role_id: 8, start_time: new Date('2016-10-30 14:00:00 UTC'), end_time: new Date('2016-10-30 22:00:00 UTC'), miles: 4},
        {id: 23, user_id: 2, role_id: 6, start_time: new Date('2016-10-30 14:00:00 UTC'), end_time: new Date('2016-10-30 22:00:00 UTC'), miles: 4},
        {id: 24, user_id: 2, role_id: 5, start_time: new Date('2016-10-30 14:00:00 UTC'), end_time: new Date('2016-10-30 22:00:00 UTC'), miles: 4},
        {id: 25, user_id: 2, role_id: 8, start_time: new Date('2016-10-30 14:00:00 UTC'), end_time: new Date('2016-10-30 22:00:00 UTC'), miles: 4},
      ])
      .then(() => {
                 // Moves id column (PK) auto-incremented to correct value after inserts
                return knex.raw(`SELECT setval('shifts_id_seq', (SELECT MAX(id) FROM shifts))`)
            })
    });
};
