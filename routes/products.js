const express = require('express')
const { Products, Vendors } = require('../db')

const route = express.Router()

route.get('/', async (req, res) => {
  res.send(await Products.findAll({
    include: [Vendors]
  }))
})

route.post('/', async (req, res) => {

  const newProd = await Products.create({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    vendorId: req.body.vendorId
  })

  res.status(201).send(newProd)

})

module.exports = route
