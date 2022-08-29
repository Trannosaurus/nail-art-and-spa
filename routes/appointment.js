const express = require('express')
const router = express.Router()
const {Appointment} = require('../models/appointment')
const User = require('../models/user')
const {serviceSchema, Service, imageBasePath} = require('../models/service')
const{
  authRegister, 
  checkAuthenticated, 
  checkNotAuthenticated,
  checkNotTechnician
} = require('./authenticate.js')

/*
router.get('/', checkNotAuthenticated, (req, res) => {
  res.render('appointment.ejs')
})
router.post('/', checkAuthenticated, (req, res) => {
  const appointment = new Appointment({
  })
  res.redirect('index')
})
*/
//checkAuthenticated add this back in after
router.get('/new', checkAuthenticated, async (req,res) => {
  const technicians = await User.find({role: "technician"}).lean()
  const services = await Service.find({})
  res.render('appointments/new.ejs', 
    {technicians: technicians,
    services: services})
})
router.get('/test', async (req,res) => {
  res.render('appointments/test.ejs')
})
router.post('/new', checkAuthenticated, async (req,res) => {
  const technician = await User.findOne({name: req.body.technicians})
  const date = new Date(req.body.date)
  const time = req.body.timeSlot
  const customer_id = req.session.passport.user
  const duration = req.body.cartTotalDuration
  const price = req.body.cartTotalPrice
  const servicesString = req.body.services
  const servicesArray = servicesString.split(',')
  const services = servicesArray.slice(0,servicesArray.length-1)
})

module.exports = router
