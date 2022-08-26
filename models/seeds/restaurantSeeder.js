if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('./restaurant.json').results
const userList = require('./userSeeds.json').userSeeds
const db = require('../../config/mongoose')
const restaurant = require('../restaurant')



db.once('open', () => {
  Promise.all(Array.from(userList, async user => {
    const { name, email, password, owner } = user
    const salt = await bcrypt
      .genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    return await User.create({
      name: user.name,
      email: user.email,
      password: hash
    })
      .then(user => {
        const restaurantOwner = owner.map(index => {
          const restaurant = restaurantList[index]
          restaurant.user_id = user._id
          return restaurant
        })
        return Restaurant.create(restaurantOwner)
      })
  }))
    .then(() => {
      console.log('done.')
      process.exit()
    })
})