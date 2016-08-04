var express = require('express')
var db = require('../db/db')

module.exports = {
  get: get,
  profile: profile,
  searchCar : searchCar


function get (req, res) {
  knex('users')
  .select()
  .then(function (users) {
    res.render('index', { users: users })
  })
  .catch(function (err) {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })

}

function searchCar (req, res) {
  var rego = req.query.rego
  db.getUserInfo(rego)
  .then( function (data) {
    res.render('profile', data[0])
  })
  .catch(function (err) {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })

}

function searchCar (req, res) {

}
