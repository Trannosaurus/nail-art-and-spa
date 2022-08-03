const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()
const {serviceSchema, Service, imageBasePath} = require('../models/service')
const uploadPath = path.join('public', imageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype))
  }
})

router.get('/new', (req,res) => {
  res.render('services/new.ejs')
})

router.post('/new', upload.single('image'), async (req,res) => {
  const fileName = req.file != null ? req.file.filename : null
  const newService = await Service.create({
    name: req.body.name,
    duration: req.body.duration,
    price: req.body.price,
    serviceImageName: fileName
  })
  console.log(newService)
})

router.get('/', (req,res) => {
  Service.find((err,services) =>{
    res.render('services/index',{services:services})
  })
})
module.exports = router
