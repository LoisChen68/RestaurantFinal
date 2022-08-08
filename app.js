const express = require('express')
const mongoose = require('mongoose')

//載入body-parser
const bodyParser = require('body-parser')

//載入handlebars
const exphbs = require('express-handlebars')

//載入建立好的restaurant
const Restaurant = require('./models/restaurant')
const restaurant = require('./models/restaurant')

const app = express()
const port = 3000
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// //載入餐廳.json
// const restaurantData = require('./restaurant.json').results

//設定模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//使用 bodyParser，解析資料類型
app.use(bodyParser.urlencoded({ extended: true }))

//設定靜態檔案
app.use(express.static('public'))


//設定首頁路由
app.get('/', (req, res) => {
  Restaurant.find() //find內可以傳參數
    .lean() //我們只需要乾淨的資料
    //find => lean => restaurants 資料陣列 => 傳到index => 呼叫資料表 restaurants
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

//設定新增餐廳路由
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
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
app.get('/restaurants/:id', (req, res) => {
  const restaurantId = req.params.id
  return Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
  // const restaurant = restaurantData.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  // res.render('show', { restaurant })
})

//設定餐廳編輯頁面
app.get('/restaurants/:id/edit', (req, res) => {
  const restaurantId = req.params.id
  return Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
  // const restaurant = restaurantData.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  // res.render('show', { restaurant })
})

//將編輯過的餐廳資料回傳到資料庫
app.post('/restaurants/:id/edit', (req, res) => {
  const restaurantId = req.params.id
  Restaurant.findByIdAndUpdate(restaurantId, req.body)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(error => console.log(error))
})

//設定餐廳編輯頁面
app.get('/restaurants/:id/edit', (req, res) => {
  const restaurantId = req.params.id
  return Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
  // const restaurant = restaurantData.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  // res.render('show', { restaurant })
})

//將編輯過的餐廳資料回傳到資料庫
app.post('/restaurants/:id/edit', (req, res) => {
  const restaurantId = req.params.id
  Restaurant.findByIdAndUpdate(restaurantId, req.body)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/delete', (req, res) => {
  const restaurantId = req.params.id
  return Restaurant.findById(restaurantId)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


//設定搜尋功能
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const filterRestaurant = restaurantData.filter(data => {
    return data.name.trim().toLowerCase().includes(keyword) ||
      data.category.includes(keyword)
  })
  res.render('index', { restaurantData: filterRestaurant, keyword })
})

//設定監聽
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})