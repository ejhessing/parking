var bodyParser = require('body-parser')
var express = require('express')
var hbs = require('express-handlebars')
var path = require('path')

var index = require('./routes/index')

var PORT = process.env.PORT || 3030

var app = express()
app.use(express.static('public'));
app.engine('hbs', hbs())
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded({ extended: true }))

//POSTGRES
// var pg = require('pg')
// var client = new pg.Client();
//
// var config = {
//   user: 'selkie',
//   database: 'parking',
//   password: 'academy',
//   port: 5432,
//   max: 10,
//   idleTimeoutMillis: 30000,
// }
//
// var pool = new pg.Pool(config)


app.get('/', index.get)

app.get('/searchCar', index.searchCar)

app.get('/register', index.register)

app.post('/registerUser', index.registerUser)

app.get('/sms/:id', index.sms)

app.get('/update/:rego', index.update)

app.post('/updateUser', index.updateUser)

app.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
