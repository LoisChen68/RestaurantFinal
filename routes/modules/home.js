const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')


//設定首頁路由
router.get('/', (req, res) => {
  const user_id = req.user._id
  Restaurant.find({ user_id })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

//設定搜尋功能
router.get('/search', (req, res) => {
  const user_id = req.user._id
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find({ user_id })
    .lean()
    .then(restaurantData => {
      const filterRestaurant = restaurantData.filter(data => {
        return data.name.trim().toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      })
      res.render('index', { restaurants: filterRestaurant, keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router