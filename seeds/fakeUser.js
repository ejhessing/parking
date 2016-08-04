
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 45, name: 'person1', phone: "021561348", location: "eda"}),
        knex('users').insert({id: 46, name: 'person2', phone: "021561348", location: "eda"}),
        knex('users').insert({id: 47, name: 'person3', phone: "021561348", location: "eda"})
      ]);
    });
};
