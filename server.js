const express = require('express')
const { db } = require('./db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(__dirname + '/public'))

const routes = {
  vendors: require('./routes/vendors'),
  products: require('./routes/products'),
  users: require('./routes/users'),
}

app.use('/vendors', routes.vendors)
app.use('/products', routes.products)
app.use('/users', routes.users)

db.sync({ alter: true })
  .then(() => {
    app.listen(9876, () => {
      console.log('Server started on http://localhost:9876')
    })
  })
  .catch(console.error)
