const express = require("express")
const route = express.Router()
const { db,Users } = require('../dbconfig')

route.get("/", async (req,res)=>{
  Users.findAll()
  .then((users)=>{res.send(users)})
})
route.post("/",async (req,res)=>{
  Users.create({
    id:req.body.id,
    name:req.body.name,
    password:req.body.password
  }).then((users)=>{
    res.send(users)
  }).catch(console.error)
})
route.post("/",async (req,res)=>{
  Users.destroy({
    where:{
      id:req.query.id
    }
  }).then((users)=>{
    res.send("Delted")
  }).catch(console.error)
})
  

module.exports = route