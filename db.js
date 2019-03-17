const Sequelize = require('sequelize')

const db = new Sequelize({
  dialect: 'mysql',
  database: 'sampledb4',
  username: 'sampleuser4',
  password: 'samplepass4'
})

const Vendors = db.define('vendor', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

const Products = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
})

Vendors.hasMany(Products)
Products.belongsTo(Vendors)

const Users = db.define('user', {
  name: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  city: Sequelize.STRING(30),
})

const CartItems = db.define('cartitem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
})

CartItems.belongsTo(Users)
Users.hasMany(CartItems)

CartItems.belongsTo(Products)
Products.hasMany(CartItems)

module.exports = {
  db,

  Users, Products, Vendors,
  CartItems
}
