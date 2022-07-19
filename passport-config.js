const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user.js')
const bcrypt = require('bcrypt')

async function initialize(passport){
  const authenticateUser = (email, password, done) => {
    const user = User.find({email: email})
    //check for user
    //return done(error,user,{message: })
    try{
      if(await bcrypt.compare(password,user.password, (err,result) =>{
        return done(null,user)
      })){
      }else{
        return done(null, false, {message: 'Password Incorrect'})
      }
    }catch(e){
      return done(e)
    }
  }
  passport.use(new LocalStrategy({usernameFeild: 'email'}, authenticateUser))
  passport.serializeUser((user, done) => done(null,user.id))
  passport.deserializeUser((id, done) => done(null, getUserById(id)))
}

module.exports = initialize
