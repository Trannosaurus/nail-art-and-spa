const express = require('express')
const router = express.Router()

//all users
router.get('/', (req, res) => {
  res.render('users/index')
})

//create user
router.post('/', (req,res) => {
  res.send('Create')
})
module.exports = router
