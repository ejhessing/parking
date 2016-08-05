var express = require('express')
var db = require('../db/db')
var qr = require('qr-image')

module.exports = {
  get: get,
  searchCar : searchCar
}

function get (req, res) {
  res.render('index')
}

function searchCar (req, res) {
  var rego = req.query.rego
  db.getUserInfo(rego)
  .then( function (data) {
    data[0].qr = qr.svgObject("http://www.trademe.co.nz")
    res.render('profile', data[0])
  })
  .catch(function (err) {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
}
