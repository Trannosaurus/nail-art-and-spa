const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/register', (req,res) =>{
  res.render('users/register.ejs')
})

function auth(req, res, next) {
  console.log("Authenticating user")
  User.findOne({email: req.body.email}, (err,user) => {
    if(err){
      console.error(err)
    }else{
      if(user == null){
        next()
        return
      }else{
        console.log("This email has already been used")
        res.send("This email has already been used")
        //TODO display message to screen
      }
    }
  })
}
//create user
router.post('/register', auth, async (req,res) =>{
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
      console.log(newUser)
    }
  });
  res.redirect('/login')
})


router.get('/login', (req,res) =>{
  res.render('users/login.ejs')
})

//TODO when creating user password is not saved
router.post('/login', async (req,res) =>{
  User.findOne({email: req.body.email}, async (err,user) => {
    if(err){
      console.error(err)
    }else{
      console.log("user: " + user)
      try{
        // Load hash from your password DB.
        console.log("Body Password: " + req.body.password)
        console.log("User Password: " + user.password)
        const compare = await bcrypt.compare(req.body.password, user.password, function(err, result) {
          if(err){
            console.error(err)
          }else if(result){
            console.log("logged in")
            res.redirect('/')
            //TODO code for login
          }else{
            console.log('Incorrect Password')
            //TODO redirect to login with same email
          }
        })
      }catch{
        res.status(500).send()
      }
    }
  })
})

module.exports = router
