var bodyParser = require('body-parser')
var express = require('express')
var hbs = require('express-handlebars')
var path = require('path')
var passport = require('passport')
var expressSession = require('express-session')
var LocalStrategy = require('passport-local').Strategy

var index = require('./routes/index')
var db = require('./db/db')
var configureAuth = require('./auth/configureAuth')

var PORT = process.env.PORT || 3030
var SESSION_KEY = process.env.SESSION_KEY || "Miaou"

var app = express()

app.use(expressSession({secret: SESSION_KEY}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done) {
  done(null, user.id)
})
 
passport.deserializeUser(function(id, done) {
  db.findById(id)
    .then(function (users) {
      done(null, users[0])
    })
    .catch(function (err) {
      done(err)
    })
})

passport.use('login', new LocalStrategy(configureAuth.loginStrategy))
passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  }, configureAuth.registerStrategy))


app.use(express.static('public'))
app.engine('hbs', hbs())
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', index.get)

app.post('/login', passport.authenticate('login', {
  successRedirect: '/profile',
  failureRedirect: '/'
}))

app.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/')
})

app.get('/profile', index.profile)

app.get('/searchCar', index.searchCar)

app.get('/register', index.register)

app.post('/registerUser', passport.authenticate('signup', {
  successRedirect: '/profile',
  failureRedirect: '/register'
}))

app.get('/sms/:id', index.sms)

app.get('/update', index.update)

app.post('/updateUser', index.updateUser)

app.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
