const express = require('express')
const router = express.Router()
const passport = require('passport')

router.use(express.urlencoded({extended: false}))

router.get('/', (req, res) => {
  res.render('users/login.ejs')
})

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'login',
  failureFlash: true
}))

module.exports = router
