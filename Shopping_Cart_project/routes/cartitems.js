const express = require("express")
const route = express.Router()
const { Users,Products,Cartitems } = require('../dbconfig')

route.get("/", async (req,res)=>{
  Cartitems.findAll({
    include:[{
      model:Users
    },{
      model:Products
    }]
  })
  .then((cartitems)=>{res.send(cartitems)})
})
route.post("/",async (req,res)=>{
  Cartitems.create({
      quantity:req.body.quantity,
      productId:req.body.productId,
      userId:req.body.userId
  }).then((cartitems)=>{
    res.send(cartitems)
  }).catch(console.error)
})
  
route.post("/delete",async (req,res)=>{
  Cartitems.destroy({
    where:{
      productId:req.body.productId
    }
  }).then((cartitems)=>{
    res.send("Delted")
  }).catch(console.error)
})
route.post("/deleteAll",async (req,res)=>{
  Cartitems.destroy({
    where:{
      
    }
  }).then((cartitems)=>{
    res.send("Delted")
  }).catch(console.error)
})

route.post("/update",async (req,res)=>{
  Cartitems.update({
    quantity:req.body.quantity
  },{
    where:{
      productId:req.body.productId
    }
  }).then((cartitems)=>{
    res.send("")
  }).catch(console.error)
})

module.exports = route