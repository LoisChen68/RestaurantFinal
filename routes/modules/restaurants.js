const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//設定新增餐廳路由
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const user_id = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  const errors = []

  if (!name || !category || !image || !location || !phone || !google_map || !rating) {
    errors.push({ message: '缺少必填資料。' })
  }

  if (errors.length) {
    return res.render('new', {
      errors,
      name_en,
      category,
      image,
      location,
      phone,
      google_map,
      rating,
      description
    })
  }

  Restaurant.create({ ...req.body, user_id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//設定餐廳詳細頁面動態路由
router.get('/:id', (req, res) => {
  const _id = req.params.id

  Restaurant.findOne({ _id })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//設定餐廳編輯頁面
router.get('/:id/edit', (req, res, next) => {
  const user_id = req.user._id
  const _id = req.params.id

  Restaurant.findOne({ _id, user_id })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//將編輯過的餐廳資料回傳到資料庫
router.put('/:id', (req, res, next) => {
  const user_id = req.user._id
  const _id = req.params.id

  Restaurant.findOneAndUpdate({ _id, user_id }, req.body)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})


//刪除餐廳路由
router.delete('/:id', (req, res) => {
  const user_id = req.user._id
  const _id = req.params.id

  Restaurant.findOneAndDelete({ _id })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router