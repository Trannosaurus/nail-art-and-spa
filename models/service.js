const mongoose = require('mongoose')
const path = require('path')

const imageBasePath = 'uploads/serviceImages'

const serviceSchema = new mongoose.Schema({
  name: String,
  duration: Number,
  price: mongoose.Decimal128,
  serviceImageName: String
})

serviceSchema.virtual('imagePath').get(function(){
  if(this.serviceImageName != null){
    return path.join('/', imageBasePath, this.serviceImageName)
  }
})

module.exports.serviceSchema = serviceSchema
module.exports.Service = mongoose.model('Service', serviceSchema)
module.exports.imageBasePath = imageBasePath
