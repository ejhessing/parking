exports.up = function (knex, Promise) {
  return knex.schema.createTable('cars', function (table) {
    table.increments('id').primary()
    table.string('rego')
    table.integer('user_id').references('users.id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('cars')
}
