const sq = require('sequelize')
const path = require('path')
const db = new sq({
    dialect:'sqlite',
    storage: path.join(__dirname+'/test.db')

})
const Users = db.define('users', {
    id:{
        type:sq.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:sq.STRING,
        allowNull:false,    
        unique:true 
    },
    password:{
        type:sq.STRING,
        allowNull:false,     
    }
})

const Vendors = db.define('vendors',{
    id:{
        type:sq.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:sq.STRING,
        allowNull:false,    
        unique:true 
    },
    password:{
        type:sq.STRING,
        allowNull:false,     
    }
})

const Products = db.define('products',{
    id:{
        type:sq.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:sq.STRING,
        allowNull:false,    
        unique:true 
    },
    manufacturer:{
        type:sq.STRING,
        allowNull:false,    
        // unique:true 
    },
    price:{
        type:sq.INTEGER,
        allowNull:false,
    }
})

const Cartitems = db.define('cartItem',{
    quantity:{
        type:sq.INTEGER,
        allowNull:false,
        defaultValue:1
    },
})
Vendors.hasMany(Products)
Products.belongsTo(Vendors)

Products.hasMany(Cartitems)
Cartitems.belongsTo(Products)

Users.hasMany(Cartitems)
Cartitems.belongsTo(Users)

db.sync().then(()=>{console.log("Database has been created")})
module.exports = {db,Users,Vendors,Products,Cartitems}