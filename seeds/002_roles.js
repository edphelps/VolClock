
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {id: 1, role: 'Cashier'},
        {id: 2, role: 'Floor'},
        {id: 3, role: 'Hardgoods'},
        {id: 4, role: 'Backroom'},
        {id: 5, role: 'Shoes'},
        {id: 6, role: 'Boutique'},
        {id: 7, role: 'Activewear'},
        {id: 8, role: 'Electronics'},
        {id: 9, role: 'Clothing'},
        {id: 10, role: 'Books'},
        {id: 11, role: 'Cards'},
        {id: 12, role: 'Linens'},
        {id: 13, role: 'Toys'},
        {id: 14, role: 'Other'}
      ]);
    });
};
