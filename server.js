if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index.js')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout') //headers and footers to be reused
app.use(expressLayouts)
app.use(express.static('public')) //html js css files in a folder called public
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL) //never hardcode this
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)
