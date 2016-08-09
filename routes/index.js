var express = require('express')
var db = require('../db/db')
var qr = require('qr-image')
var db = require('../db/db')

// var accountSid = process.env.ACCOUNT_SID
// var authToken = process.env.AUTHTOKEN
// var phoneNumber = process.env.PHONE_NUMBER
//
// var client = require('twilio')(accountSid, authToken)

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
  res.render('index')
}

function profile (req, res) {
  var id = req.session.passport.user
  console.log(id)
  db.getUserInfoById(id)
    .then(function (users) {
      res.render('personalProfile', users[0])
    })
    .catch(function (err) {
      res.status(500).send('profile ' + 'DATABASE ERROR: ' + err.message)
    })
}

function searchCar (req, res) {
  var rego = req.query.rego
  db.getUserInfoByRego(rego)
  .then( function (data) {
    data[0].qr = qr.svgObject("https://eda-parking.herokuapp.com/sms/" + data.user_id)
    res.render('userProfile', data[0])
  })
  .catch(function (err) {
    res.status(500).send('searchCar ' + 'DATABASE ERROR: ' + err.message)
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
      res.status(500).send('err.message')
    })
}

function update (req, res) {
  var id = req.session.passport.user
  db.getUserInfoById(id)
  .then(function (data) {
    res.render('update', data[0])
  })
  .catch(function (err){
    res.status(500).send('update ' + 'DATABASE ERROR: ' + err.message)
  })
}

function updateUser (req, res) {
  var id = req.body.id
  var name = req.body.name
  var phone = req.body.phone
  var location = req.body.location
  var rego = req.body.rego
  db.updateUser(id, name, phone, location, rego)
  .then(function (data) {
    return db.getUserInfoById(data[0].user_id)
  })
  .then(function (data) {
    res.render('personalProfile', data[0])
  })
  .catch(function (err) {
    res.status(500).send('updateUser ' + 'DATABASE ERROR: ' + err.message)
  })
}
