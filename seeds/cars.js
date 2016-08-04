
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('cars').insert({id: 991, rego: 'HYG502', user_id:1}),
        knex('cars').insert({id: 992, rego: 'FFR954', user_id:2}),
        knex('cars').insert({id: 993, rego: 'CEU784', user_id:3}),
        knex('cars').insert({id: 994, rego: 'YR3423', user_id:4})
      ]);
    });
};
