const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Technician = require('../models/technician')
const {serviceSchema, Service, imageBasePath} = require('../models/service')

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
      const technician = await Technician.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          services: req.body.services,
          daysWorking: req.body.days
      })
      res.redirect('/login')
    }
  });
}) 

//display upcoming appointments
router.get('/', (req,res) => {
  res.send("uppcomming appointnments")
})

//create blocks
router.post('/', (req,res) => {
  res.send("blocks")
})

module.exports = router
