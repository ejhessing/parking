var development = require('../knexfile').development
var knex = require('knex')(development)

module.exports = {
  getUserInfo: getUserInfo
}

function getUserInfo (rego) {
  return knex('cars')
          .join('profiles', 'cars.user_id','=', 'profiles.user_id')
          .where('rego', rego)
}
