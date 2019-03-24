const {
    db,
    Users
  } = require('./dbconfig')
const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.get("/",(req,res)=>{
//     res.send("Hello");
// })
app.use("/",express.static(__dirname+'/public'))
const routes = {
    vendors:require("./routes/vendors"),
    users:require("./routes/users"),
    products:require("./routes/products"),
    cartitems:require("./routes/cartitems")
    // cartitems:require("./routes/cartitems")
}
app.use("/users",routes.users)
app.use("/products",routes.products)
app.use("/vendors",routes.vendors)
app.use("/cartitems",routes.cartitems)
// db.sync({alter:true})
// .then(()=>{
//     app.listen(8161,()=>{console.log("Server Started at port 8161")})
// }).catch(console.error)
app.listen(8160)