const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//設定新增餐廳路由
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

  // const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body

  // return Restaurant.create({
  //   name,
  //   name_en,
  //   category,
  //   image,
  //   location,
  //   phone,
  //   google_map,
  //   rating,
  //   description
  // })
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))
})

//設定餐廳詳細頁面動態路由
router.get('/:id', (req, res) => {
  const restaurantId = req.params.id
  return Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
  // const restaurant = restaurantData.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  // res.render('show', { restaurant })
})

//設定餐廳編輯頁面
router.get('/:id/edit', (req, res) => {
  const restaurantId = req.params.id
  return Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
  // const restaurant = restaurantData.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  // res.render('show', { restaurant })
})

//將編輯過的餐廳資料回傳到資料庫
router.put('/:id', (req, res) => {
  const restaurantId = req.params.id
  Restaurant.findByIdAndUpdate(restaurantId, req.body)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(error => console.log(error))
})


//刪除餐廳路由
router.delete('/:id', (req, res) => {
  const restaurantId = req.params.id
  return Restaurant.findById(restaurantId)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router