
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 1}),
        knex('users').insert({id: 2}),
        knex('users').insert({id: 3}),
        knex('users').insert({id: 4})
      ]);
    });
};
