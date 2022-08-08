const express = require('express')
const mongoose = require('mongoose')

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