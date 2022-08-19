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
  /*
  console.log("tech id: " + technician._id)
  console.log("date: " + date)
  console.log("time: " + time)
  console.log("customer_id: " + customer_id)
  console.log("duration: "  +duration)
  console.log("price: "  + price)
  console.log("services: " + services)

  const appointment = await Appointment.create({
    date: date,
    time:time,
    customer_id:customer_id,
    technician_id:technician._id,
    duration:duration,
    price:price,
    services:services
  })
  console.log(appointment)
  */
})

module.exports = router
/*
    <% technicians.forEach(technician => { %>
      //puts technician into dropdown
      const techOption = document.createElement("option")
      techOption.setAttribute("value","<%=technician.name%>")
      const node = document.createTextNode("<%=technician.name%>");
      techOption.appendChild(node); 
      const daysWorkingString = "<%=technician.daysWorking%>"
      const daysWorking = daysWorkingString.split(',')
      if(!daysWorking.includes(day)){
        console.log("not working this day")
        techOption.setAttribute("disabled","")
      }
      const servicesString ="<%=technician.services%>"
      const services = servicesString.split(',')
      if(!services.includes(cart[i].name)){
        console.log("cannot do this service")
        techOption.setAttribute("disabled","")
      }
      select.appendChild(techOption)
    <% }) %>
    let techOption = document.createElement("option")
    let daysWorkingString, servicesString;
    let daysWorking, services;
    <% technicians.forEach(technician => { %>
      //puts technician into dropdown
      techOption.setAttribute("value","<%=technician.name%>")
      techOption.innerHTML = "<%=technician.name%>"
      daysWorkingString = "<%=technician.daysWorking%>"
      daysWorking = daysWorkingString.split(',')
      if(!daysWorking.includes(day)){
        console.log("not working this day")
        techOption.setAttribute("disabled","")
      }
      servicesString ="<%=technician.services%>"
      services = servicesString.split(',')
      if(!services.includes(cart[i].name)){
        console.log("cannot do this service")
        techOption.setAttribute("disabled","")
      }
      select.appendChild(techOption)
    <% }) %>
  */
