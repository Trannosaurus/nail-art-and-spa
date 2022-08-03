const mongoose = require('mongoose')
const {serviceSchema, Service} = require('./service.js')
const {appointmentSchema, Appointment} = require('./appointment.js')

const technicianSchema = new mongoose.Schema({
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
  services: [serviceSchema],
  upcomingAppointments: [appointmentSchema], //array of appointmentid
  pastAppointments: [appointmentSchema],
  daysWorking: [String],
})

module.exports = mongoose.model('Technician', technicianSchema)
