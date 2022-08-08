const express = require('express')
const mongoose = require('mongoose')

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


//載入handlebars
const exphbs = require('express-handlebars')

//載入餐廳.json
const restaurantData = require('./restaurant.json').results

//設定模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//設定靜態檔案
app.use(express.static('public'))


//設定首頁路由
app.get('/', (req, res) => {
  res.render('index', { restaurantData })
})

//設定餐廳詳細頁面動態路由
app.get('/restaurant/:restaurant_id', (req, res) => {
  const restaurant = restaurantData.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
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