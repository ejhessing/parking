var production = require('../knexfile').production
var knex = require('knex')(production)

module.exports = {
  getUserInfo: getUserInfo,
  createUser: createUser,
  getPhone: getPhone,
  updateUser: updateUser
}

function getUserInfo (rego) {
  return knex('cars')
          .join('profiles', 'cars.user_id','=', 'profiles.user_id')
          .where('rego', rego)
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
        .select('rego')
        .where('user_id', id)
    })
    .catch(function (err) {
      console.log(err)
    })
}
