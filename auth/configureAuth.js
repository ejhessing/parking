var db = require('../db/db')

module.exports = {
  loginStrategy: loginStrategy,
  registerStrategy: registerStrategy
}


function loginStrategy (username, password, done) {
  db.findByLogin(username)
    .then(function (users) {
      if (!users || !users[0]) {
        console.log('Incorrect username.')
        done(null, false, { message: 'Incorrect username.' })
      } else if (users[0].password !== password) {
        done(null, false, { message: 'Incorrect password.' })
      } else {
        done(null, users[0])
      }
    })
    .catch(function (err) {
      done(err)
    })
}

function registerStrategy (req, username, password, done) {
  console.log('entered registration strategy', username, password)
  function findOrCreateUser () {
    db.findByLogin(username)
      .then(function (users) {
        if (users && users[0]) {
        done(null, false, 
           console.log('User Already Exists'))
        } else {
          var name = req.body.name
          var phone = req.body.phone
          var location = req.body.location
          var rego = req.body.rego
          db.createUser(username, password, name, phone, location, rego)
            .then(function (users) {
              console.log(users)
              done(null, users[0])
            })
            .catch(function (err) {
              console.log('Error creating the user')
              done(err)
            })
        }
      })
      .catch(function (err) {
        console.log('Error in SignUp: '+err)
        done(err)
      })
  }
  // Delay the execution of findOrCreateUser and execute 
  // the method in the next tick of the event loop
  process.nextTick(findOrCreateUser)
}