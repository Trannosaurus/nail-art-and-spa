const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const passport = require('passport')

router.get('/', checkAuthenticated, (req, res) => {
  res.render('index')
})

router.get('/register',checkNotAuthenticated, (req,res) =>{
  res.render('users/register.ejs')
})

function auth(req, res, next) {
  User.findOne({email: req.body.email}, (err,user) => {
    if(err){
      console.error(err)
    }else{
      if(user == null){
        next()
        return
      }else{
        res.send("This email has already been used")
        //TODO display message to screen
      }
    }
  })
}
//create user
router.post('/register',checkNotAuthenticated, auth, async (req,res) =>{
  //hashes password
  await bcrypt.hash(req.body.password, 10, async(err, hash) => {
    if(err){
      console.error("error" + err)
    }else{
      //creates and saves user to db
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      })
    }
  });
  res.redirect('/login')
})


router.get('/login',checkNotAuthenticated, (req,res) =>{
  res.render('users/login.ejs')
})

router.post('/login',checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

//log out user
router.delete('/logout', (req, res) => {
  req.logOut( (err) =>{
    if (err) { return next(err); }})
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

module.exports = router
