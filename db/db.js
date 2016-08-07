var production = require('../knexfile').production
var knex = require('knex')(production)

module.exports = {
  getUserInfoByRego: getUserInfoByRego,
  getUserInfoById: getUserInfoById,
  createUser: createUser,
  getPhone: getPhone,
  updateUser: updateUser,
  findById: findById,
  findByLogin: findByLogin
}

function getUserInfoByRego (rego) {
  return knex('cars')
          .join('profiles', 'cars.user_id','=', 'profiles.user_id')
          .where('rego', rego)
}

function getUserInfoById (id) {
  return knex('users')
    .join('profiles', 'users.id', '=', 'profiles.user_id')
    .join('cars', 'users.id', '=', 'cars.user_id')
    .where('users.id', id)
    .select('users.id', 'profiles.name', 'profiles.location', 'profiles.phone', 'cars.rego')
}

function createUser (name, phone, location, rego) {
  return knex('users')
    .insert({})
    .then(function (id) {
      return knex('profiles')
        .insert({name: name, phone: phone, location: location, user_id: id[0]})
    })
    .then(function (id){
      return knex('profiles')
        .select('user_id')
        .where('id', id[0])
    })
    .then(function (data) {
      return knex('cars')
      .insert({rego: rego, user_id: data[0].user_id})
    })
    .then(function(id){
      return knex('cars')
        .select('rego')
        .where('id', id[0])
    })
    .catch(function (err) {
      console.log(err)
    })
}

function getPhone (id) {
  return knex('profiles')
    .select('phone')
    .where('user_id', id)
}

function updateUser (id, name, phone, location, rego) {
  return knex('profiles')
    .update({name: name, phone: phone, location: location})
    .where('user_id', id)
    .then(function (data) {
      return knex('cars')
      .insert({rego: rego})
      .where('user_id', id)
    })
    .then(function(){
      return knex('cars')
        .select('user_id')
        .where('user_id', id)
    })
    .catch(function (err) {
      console.log(err)
    })
}

function findById (id) {
  return knex('users')
    .select('*')
    .where('id', id)
}

function findByLogin (login) {
  return knex('users')
    .select('*')
    .where('login', login)
}