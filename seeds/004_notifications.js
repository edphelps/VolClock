
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notifications').del()
    .then(function () {
      // Inserts seed entries
      return knex('notifications').insert([
        {id: 1, user_id: 2, start_date: new Date('2016-11-10 00:00:00 UTC'), end_date: new Date('2016-11-24 00:00:00 UTC'), comment: "Riding orcas in Cape Town that week."},
        {id: 2, user_id: 4, start_date: new Date('2016-12-02 00:00:00 UTC'), end_date: new Date('2016-12-10 00:00:00 UTC'), comment: "Going on vacation."},
        {id: 3, user_id: 4, start_date: new Date('2016-11-30 00:00:00 UTC'), end_date: new Date('2016-11-30 00:00:00 UTC'), comment: "Trump rally."},
        {id: 4, user_id: 2, start_date: null, end_date: null, comment: "I'd like to start worknig in the backroom"},
        {id: 5, user_id: 2, start_date: new Date('2016-12-01 00:00:00 UTC'), end_date: new Date('2016-12-03 00:00:00 UTC'), comment: "Square dance convention for three days."},
        {id: 6, user_id: 2, start_date: null, end_date: null, comment: "Jim stopped by to see if we wanted a swingset. 720-555-1212"},
      ])
      .then(() => {
                 // Moves id column (PK) auto-incremented to correct value after inserts
                return knex.raw(`SELECT setval('notifications_id_seq', (SELECT MAX(id) FROM notifications))`)
            })
    });
};
