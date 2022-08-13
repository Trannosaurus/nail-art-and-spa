const mongoose = require('mongoose')
const {Service, serviceSchema} = require('./service.js')

const appointmentSchema = new mongoose.Schema({
  date : Date,
  technicians_id: [mongoose.ObjectId],
  customer_id: mongoose.ObjectId,
  services: [serviceSchema],
  duration: Number,
})

module.exports.appointmentSchema = appointmentSchema
module.exports.Appointment = mongoose.model('Appointment', appointmentSchema)
