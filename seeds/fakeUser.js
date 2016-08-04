
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('profiles').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('profiles').insert({id: 45, name: 'Mandy', phone: "+642040380053", location: "Lecture Theater", user_id: 1}),
        knex('profiles').insert({id: 46, name: 'Erwin', phone: "+64274488884", location: "Toilet", user_id: 2}),
        knex('profiles').insert({id: 47, name: 'Timmeh', phone: "+642102233646", location: "Yoga Room", user_id: 3}),
        knex('profiles').insert({id: 48, name: 'Prem', phone: "+64212506028", location: "Kitchen", user_id: 4})
      ]);
    });
};
