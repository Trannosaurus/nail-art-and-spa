const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mongoose =  require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const User = require('../models/user')

router.get('/', (req, res) => {
  res.render('users/register.ejs')
})

//creating user
router.post('/', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10, () =>{

  })
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
    /*
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      await newUser.save()
    */

  const user = User.findById('61e03a5300a859a95fa2e724')
  console.log(user)
  
  res.redirect('/login')
})

module.exports = router
