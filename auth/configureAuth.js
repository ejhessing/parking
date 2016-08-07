var db = require('../db/db')

module.exports = {
  loginStrategy: loginStrategy,
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

