exports.up = function (knex, Promise) {
  return knex.schema.createTable('profiles', function (table) {
    table.increments('id').primary()
    table.string('name')
    table.string('phone')
    table.string('location')
    table.integer('user_id')
    // table.foreign('user_id').references('id').inTable('users')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('profiles')
}
