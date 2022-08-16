const mongoose = require('mongoose')
const {Service, serviceSchema} = require('./service.js')

const appointmentSchema = new mongoose.Schema({
  date : Date,
  time: String,
  technicians_id: [mongoose.ObjectId],
  customer_id: mongoose.ObjectId,
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  duration: Number,
  price: Number
})

module.exports.appointmentSchema = appointmentSchema
module.exports.Appointment = mongoose.model('Appointment', appointmentSchema)
