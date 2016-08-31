var express = require('express')
var db = require('../db/db')
var qr = require('qr-image')
var credentials = require('../credentials')

var accountSid = credentials.accountSid || process.env.accountSid
var authToken = credentials.authToken || process.env.authToken

//var client = require('twilio')(accountSid, authToken);


module.exports = {
  get: get,
  profile: profile,
  searchCar : searchCar,
  register: register,
  sms: sms,
  update: update,
  updateUser: updateUser
}

function get (req, res) {
  res.render('index', {error: ''})
}

function profile (req, res) {
  var id = req.session.passport.user
  db.getUserInfoById(id)
    .then(function (users) {
      users[0].qr = qr.svgObject("https://parkie.herokuapp.com/sms/" + users[0].id)
      res.render('personalProfile', users[0])
    })
    .catch(function (err) {
      res.render('index', {error: 'Sorry, something went wrong'})
    })
}

function searchCar (req, res) {
  var rego = req.query.rego
  db.getUserInfoByRego(rego)
  .then( function (data) {
    data[0].qr = qr.svgObject("https://parkie.herokuapp.com/sms/" + data.user_id)
    res.render('userProfile', data[0])
  })
  .catch(function (err) {
    res.render('index', {error: 'No car with this rego number'})
  })
}

function register (req, res) {
  res.render('register')
}

function sms (req, res) {
  var id = req.params.id
  db.getPhone(id)
    .then(function (data) {
      client.messages.create({
          to: data[0].phone,
          from: phoneNumber,
          body: "Hi! can you please move your car?"
      }, function(err, message) {
        if (err) {
          console.log(err)
          return
        }
          res.render('success')
      })
    })
    .catch(function (err){
      res.render('index', {error: 'Sorry, something went wrong'})
    })
}

function update (req, res) {
  var id = req.session.passport.user
  db.getUserInfoById(id)
  .then(function (users) {
    req.session.location = users.location
    users[0].qr = qr.svgObject("https://parkie.herokuapp.com/sms/" + users[0].id)
    res.render('update', users[0])
  })
  .catch(function (err){
    res.render('index', {error: 'Sorry, something went wrong'})
  })
}

function updateUser (req, res) {
  var id = req.body.id
  var name = req.body.name
  var phone = req.body.phone
  var location = req.body.location || req.session.location
  var rego = req.body.rego
  db.updateUser(id, name, phone, location, rego)
    .then(function (data) {
      return db.getUserInfoById(data[0].user_id)
    })
    .then(function (users) {
      users[0].qr = qr.svgObject("https://parkie.herokuapp.com/sms/" + users[0].id)
      res.render('personalProfile', users[0])
    })
    .catch(function (err) {
      res.render('index', {error: 'Sorry, something went wrong'})
    })
}

function sms (req, res) {
  var id = req.params.id
  db.getPhone(id)
    .then(function (data) {
      client.messages.create({
          to: data[0].phone,
          from: "+12672972013",
          body: "Hi! can you please move your car?"
      }, function(err, message) {
        if (err) {
          res.render('index', {error: 'Sorry, something went wrong'})
          return
        }
          res.render('success')
      })
    })
    .catch(function (err){
      res.render('index', {error: 'Sorry, something went wrong'})
    })
}
