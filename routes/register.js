const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


//get user
router.get('/login', async (req,res) =>{

})

//create user
router.post('/register', async (req,res) =>{
  //hashes password
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  //creates and saves user to db
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
  res.redirect('/login')
})

module.exports = router
