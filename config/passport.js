const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const user = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    user.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: '使用者不存在' })
        }
        if (user.password !== password) {
          return done(null, false, { message: '帳號或密碼錯誤' })
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    user.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}