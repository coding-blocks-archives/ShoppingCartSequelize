const express = require('express')
const sequelize = require('sequelize')
const { CartItems, Products } = require('../db')

const route = express.Router()

route.get('/', async (req, res) => {
    const cartItems = await CartItems.findAll({
      include: [Products]
    })
    res.send(cartItems)
  })
  
route.post(
    '/',
    (req, res) => {
        CartItems.count({ where: { productId: req.body.id } })
        .then((count) => {
            if (count > 0) {
                return CartItems.update({ quantity: sequelize.literal('quantity + 1')}, { where: { productId: req.body.id } } )
            } else {
                return CartItems.create({
                    quantity: 1,
                    userId: 1,
                    productId: req.body.id
                })
            }
        })
        .then(() => {
            return CartItems.findOne({ 
                where: { productId: req.body.id },
                include: { model: Products } 
            })
            })
            .then((result) => {
                res.status(201).send(result)
            })
        })
        
        module.exports = route