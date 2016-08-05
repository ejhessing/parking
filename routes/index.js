var express = require('express')
var db = require('../db/db')

module.exports = {
  get: get,
  searchCar : searchCar,
  register: register,
  registerUser: registerUser
}

function get (req, res) {
  res.render('index')
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

function register (req, res) {
  res.render('register')
}

function registerUser (req, res) {
  var name = req.body.name
  var phone = req.body.phone
  var location = req.body.location
  var rego = req.body.rego

  db.createUser(name, phone, location, rego)
  .then(function (data) {
    return db.getUserInfo(data[0].rego)
  })
  .then(function (data) {
    res.render('profile', data[0])
  })
  .catch(function (err) {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
}
