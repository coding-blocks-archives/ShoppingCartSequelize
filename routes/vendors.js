const express = require('express')
const { Vendors } = require('../db')

const route = express.Router()

route.get('/', async (req, res) => {

  const vendors = await Vendors.findAll()

  res.send(vendors)

})

route.post('/', async (req, res) => {

  const newVendor = await Vendors.create({
    name: req.body.name
  })

  res.send(newVendor)
})

module.exports = route
