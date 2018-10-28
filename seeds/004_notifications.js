
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notifications').del()
    .then(function () {
      // Inserts seed entries
      return knex('notifications').insert([
        {id: 1, start: new Date(), end: new Date(), comment: "Riding orcas in Cape Town that week."},
        {id: 2, start: new Date(), end: new Date(), comment: "Going on vacation."},
        {id: 3, start: new Date(), end: new Date(), comment: "Trump rally."},
        {id: 4, start: new Date(), end: new Date(), comment: "Square dance convention for three days."},
        {id: 5, start: new Date(), end: new Date(), comment: "BURNING MAN."}
      ]);
    });
};
