
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 1, login: 'amandine', password: 'amandine'}),
        knex('users').insert({id: 2, login: 'erwin', password: 'erwin'}),
        knex('users').insert({id: 3, login: 'tim', password: 'tim'}),
        knex('users').insert({id: 4, login: 'prem', password: 'prem'})
      ]);
    });
};
