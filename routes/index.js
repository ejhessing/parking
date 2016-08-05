var express = require('express')
var db = require('../db/db')
var qr = require('qr-image')
var db = require('../db/db')

var accountSid = process.env.ACCOUNT_SID
var authToken = process.env.AUTHTOKEN
var phoneNumber = process.env.PHONE_NUMBER

var client = require('twilio')(accountSid, authToken)

module.exports = {
  get: get,
  searchCar : searchCar,
  register: register,
  registerUser: registerUser,
  sms: sms
}

function get (req, res) {
  res.render('index')
}

function searchCar (req, res) {
  var rego = req.query.rego
  db.getUserInfo(rego)
  .then( function (data) {
    data[0].qr = qr.svgObject("https://eda-parking.herokuapp.com/sms/" + data[0].user_id)
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
