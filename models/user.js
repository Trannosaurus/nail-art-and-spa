const mongoose = require('mongoose')
const {appointmentSchema} = require('./appointment.js')

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  upcomingAppointments: [appointmentSchema], //array of appointmentid
  pastAppointments: [appointmentSchema]
})


module.exports = mongoose.model('User', userSchema)
