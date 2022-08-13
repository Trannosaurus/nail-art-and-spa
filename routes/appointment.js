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
/*
<%- function showTechnicians(){ %>
  <% const technicians = <%= technicians %>
  <% console.log(technicians) %>
  <% const techLabel = document.createElement("label") %>
  <% const techInput = document.createElement("input") %>
  <% techInput.setAttribute("type","radio") %>
  <% const node = document.createTextNode("Technician"); %>
  <% techLabel.appendChild(node); %>
  <% const element = document.getElementById("technicianDiv"); %>
  <% element.appendChild(techLabel); %>
  <% element.appendChild(techInput); %>
<% } %>
*/
//checkAuthenticated add this back in after
router.get('/new', async (req,res) => {
  const technicians = await User.find({role: "technician"})
  const services = await Service.find({})
  res.render('appointments/new.ejs', 
    {technicians: technicians,
    services: services})
})
router.post('/new',  async (req,res) => {
  await Appointment.create({
    date: new Date(),
    technicians_id: req.body.technicians,
    //customer_id: req.session.passport.user,
    services: req.body.services,
  })
})

module.exports = router
