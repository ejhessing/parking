exports.up = function (knex, Promise) {
  return knex.schema.createTable('profiles', function (table) {
    table.increments('id').primary()
    table.string('name')
    table.string('phone')
    table.string('location')
    // table.integer('user_id')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('profiles')
}
