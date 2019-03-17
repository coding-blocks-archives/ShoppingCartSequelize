const express = require('express')
const { Vendors, Products } = require('../db')

const route = express.Router()

route.get('/', async (req, res) => {

  let includes = []
  if (req.query.include === 'products') {
    includes.push({
      model: Products,
      attributes: ['id', 'name']
    })
  }

  const vendors = await Vendors.findAll({
    include: includes
  })

  res.send(vendors)

})

route.post('/', async (req, res) => {

  const newVendor = await Vendors.create({
    name: req.body.name
  })

  res.send(newVendor)
})

module.exports = route
