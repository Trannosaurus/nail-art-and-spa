//configuring passport
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')
const Technician = require('./models/technician')
const bcrypt = require('bcrypt')

function initialize(passport) {
  //tries to find user, if none tries to find tech
  const authenticate= (email, password, done) => {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, {message:'No user with that email'}); }
      else{
        bcrypt.compare(password, user.password, (err,res)=>{
          if(err){
            console.log(err)
          }else if(!res){
            return done(null, false, {message: 'Incorrect Password'})
          }else{
            return done(null, user)
          }
        })
      }
    });
  }

  passport.use(new LocalStrategy({usernameField: 'email'}, authenticate))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, (id) => {
      user.find({id:id}, (err, user) => {
        if(err){
          console.log(err)
          return done(null,false)
        }else if (!user){
          return done(null,false)
        }else{
          return done(null,user)
        }
      })
    })
  })
}

module.exports = initialize
