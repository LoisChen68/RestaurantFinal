const express = require('express')
const router = express.Router()

const passport = require('passport')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))


router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return User.create({
          name,
          email,
          password
        })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
      console.log('此Email已被註冊')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    })
})

router.get('/logout', (req, res) => {
  req.logout(req.user, err => {
    if (err) return next(err)
  })
  res.redirect('/users/login')
})

module.exports = router