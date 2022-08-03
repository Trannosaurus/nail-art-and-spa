if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index.js')
const serviceRouter = require('./routes/service.js')
//const technicianRouter = require('./routes/technician.js')

const initializePassport = require('./passport-config')
initializePassport(passport)

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout') //headers and footers to be reused
app.use(expressLayouts)
app.use(express.static('public')) //html js css files in a folder called public
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL) //never hardcode this
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/', indexRouter)
app.use('/service', serviceRouter)
//app.use('/technician', technicianRouter)

app.listen(process.env.PORT || 3000)
