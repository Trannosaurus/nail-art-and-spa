const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.use(express.urlencoded({extended: false}))

router.get('/', (req, res) => {
  res.render('users/login.ejs')
})

router.post('/', (req,res) =>{
  //find user
  //const user = User.find({name: /^luc/})
  console.log(user)
  /*const user = User.find({email: req.body.email}, (err,docs) =>{
    if(err){
      console.log(error)
    }else{
      console.log('email found')
      console.log("Here")
      console.log(user.name)
    }
  })
*/
  if(user == null){
    return res.status(400).send('Cannot find user')
  }
  /*
  try{
    bcrypt.compare(req.body.password, user.password, (err,res)=>{
      if(err){
        console.log(err)
      }else if(!res){
        console.log('Incorrect Password')
        res.render('Incorrect Password')
      }else{
        console.log('Correct password')
        res.render('Correct Password')
      }
    })
  }catch{

  }
  */
})

module.exports = router
