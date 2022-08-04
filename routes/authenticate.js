const User = require('../models/user')

function authRegister(req, res, next) {
  User.findOne({email: req.body.email}, (err,user) => {
    if(err){
      console.error(err)
    }else{
      if(user == null){
        next()
        return
      }else{
        //todo send message to page email already in use
        console.log("email is in use")
        res.render('users/register.ejs')
      }
    }
  })
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

async function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    const user = await User.findById(req.session.passport.user)
    if(user.role === "technician"){
      console.log(user)
      return res.redirect('/technician')
    }else{
      return res.redirect('/')
    }
  }
  next()
}

function checkTechnician(req, res, next){
  User.findById(req.session.passport.user, (err,user) =>{
    if(user.role === "technician"){
      return next()
    }else{
      res.send('you do not have permission for this page')
    }
  })
}

function checkNotTechnician(req, res, next){
  User.findOne({email: req.body.email, role: "technician" }, (err,user) =>{
    if(user){
      res.redirect('/technician')
    }else{
      return next()
    }
  })
}


module.exports.authRegister = authRegister
module.exports.checkNotAuthenticated = checkNotAuthenticated
module.exports.checkAuthenticated = checkAuthenticated
module.exports.checkTechnician = checkTechnician
module.exports.checkNotTechnician = checkNotTechnician
