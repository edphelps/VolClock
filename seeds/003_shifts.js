
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shifts').del()
    .then(function () {
      // Inserts seed entries
      return knex('shifts').insert([
        {id: 1, user_id: 3, role_id: 4, start: new Date(), end: new Date(), miles: 0},
        {id: 2, user_id: 5, role_id: 6, start: new Date(), end: new Date(), miles: 0},
        {id: 3, user_id: 2, role_id: 9, start: new Date(), end: new Date(), miles: 0},
        {id: 4, user_id: 4, role_id: 1, start: new Date(), end: new Date(), miles: 0},
        {id: 5, user_id: 1, role_id: 2, start: new Date(), end: new Date(), miles: 0}
      ]);
    });
};
