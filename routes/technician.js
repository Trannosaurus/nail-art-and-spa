const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const {serviceSchema, Service, imageBasePath} = require('../models/service')
const {checkTechnician, checkAuthenticated} = require('./authenticate.js')

//form for creating new technician
router.get('/new', (req,res) => {
  Service.find((err,services) =>{
    res.render('technicians/new.ejs', {services:services})
  })
})

//create new technician
router.post('/new', async (req,res) => {
  await bcrypt.hash(req.body.password, 10, async(err, hash) => {
    if(err){
      console.error("error" + err)
    }else{
      const technician = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          services: req.body.services,
          daysWorking: req.body.days,
          role: 'technician'
      })
      res.redirect('/login')
    }
  });
}) 

//display upcoming appointments
router.get('/', checkAuthenticated, checkTechnician, (req,res) => {
  User.findById(req.session.passport.user, (err,user) =>{
    console.log(user.upcomingAppointments)
    res.render('technicians/index.ejs', {upcomingAppointments: user.upcomingAppointments})
  })
})

//create blocks
router.post('/', checkAuthenticated, checkTechnician, (req,res) => {
  res.send("blocks")
})

module.exports = router
