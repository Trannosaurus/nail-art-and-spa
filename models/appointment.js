const mongoose = require('mongoose')
const {Service, serviceSchema} = require('./service.js')

const appointmentSchema = new mongoose.Schema({
  date : Date,
  technicianName: String,
  customerId: mongoose.ObjectId,
  services: [serviceSchema],
  duration: Number,
})

module.exports.appointmentSchema = appointmentSchema
module.exports.Appointment = mongoose.model('Appointment', appointmentSchema)
