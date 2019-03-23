const { Users,Products,Cartitems } = require('../dbconfig')
  
  db.sync()
    .then(() => Users.findAll())
    .then((user) => {
      console.log(user)
    })
    .catch(console.error)