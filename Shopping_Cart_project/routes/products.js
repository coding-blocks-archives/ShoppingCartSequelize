const express = require("express")
const route = express.Router()
const { db,Products,Vendors} = require('../dbconfig')

route.get("/", async (req,res)=>{
  Products.findAll({
    include:[{
      model:Vendors,
      where :{id:req.query.id}
    }]
  })
  .then((products)=>{res.send(products)})
})
route.get("/all", async (req,res)=>{
  Products.findAll({include:[{
    model:Vendors,
  }],
  where:{
    id:req.query.id
  }
})
  .then((products)=>{res.send(products)})
})
route.get("/allProd", async (req,res)=>{
  Products.findAll({include:[{
    model:Vendors,
  }],
})
  .then((products)=>{res.send(products)})
})

route.post("/",async (req,res)=>{
  db.sync().then(()=>Products.create({
    id:req.body.id,
    name:req.body.name,
    manufacturer:req.body.manufacturer,
    vendorId:req.body.vendorId,
    price:req.body.price
  }))
  .then((products)=>{
    res.send(products)
  }).catch(console.error)
})

route.post("/delete",async (req,res)=>{
  Products.destroy({
    where:{
      vendorId:req.body.vendorId,
      id:req.body.id
    }
  }).then((products)=>{
    res.send("Delted")
  }).catch(console.error)
})

  

module.exports = route