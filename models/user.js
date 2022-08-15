const mongoose = require('mongoose')
const {serviceSchema, Service} = require('./service.js')
const {appointmentSchema, Appointment} = require('./appointment.js')

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
  services: [String],
  upcomingAppointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  pastAppointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  daysWorking: [String],
  role: [{ type: String, default: 'user' }]
})


module.exports = mongoose.model('User', userSchema)
