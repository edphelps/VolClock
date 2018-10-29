
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notifications').del()
    .then(function () {
      // Inserts seed entries
      return knex('notifications').insert([
        {id: 1, user_id: 2, start_date: new Date(), end_date: new Date(), comment: "Riding orcas in Cape Town that week."},
        {id: 2, user_id: 3, start_date: new Date(), end_date: new Date(), comment: "Going on vacation."},
        {id: 3, user_id: 4, start_date: new Date(), end_date: new Date(), comment: "Trump rally."},
        {id: 4, user_id: 1, start_date: new Date(), end_date: new Date(), comment: "Square dance convention for three days."},
      ])
      .then(() => {
                 // Moves id column (PK) auto-incremented to correct value after inserts
                return knex.raw(`SELECT setval('notifications_id_seq', (SELECT MAX(id) FROM notifications))`)
            })
    });
};
