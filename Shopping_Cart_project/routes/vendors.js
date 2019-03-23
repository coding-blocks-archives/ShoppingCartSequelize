const express = require("express")
const route = express.Router()
const { Vendors,Products} = require('../dbconfig')

route.get("/", async (req,res)=>{
  Vendors.findAll({
  })
  .then((vendors)=>{res.send(vendors)})
})
route.get("/", async (req,res)=>{
  Vendors.findAll({
    where:{
      name:req.body.name
    }
  })
  .then((vendors)=>{res.send(vendors)})
})
route.post("/",async (req,res)=>{
  Vendors.create({
    id:req.body.id,
    name:req.body.name,
    password:req.body.password
  }).then((vendors)=>{
    res.send(vendors)
  }).catch(console.error)
})

route.post("/delete",async (req,res)=>{
  Vendors.destroy({
    where:{
      name:req.body.name,
      password:req.body.password
    }
  }).then((vendors)=>{
    res.send("Delted")
  }).catch(console.error)
})
  

module.exports = route