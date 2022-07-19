const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.get('/', (req, res) => {
  res.render('users/register.ejs')
})

//creating user
router.post('/', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10, () =>{

  })
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
  newUser.save()
  res.redirect('/')
})

module.exports = router
