exports.up = function (knex, Promise) {
  return knex.schema.createTable('cars', function (table) {
    table.increments('id').primary()
    table.string('rego')
    table.integer('user_id')
    // table.foreign('user_id').references('id').inTable('users')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('cars')
}
