const express = require('express')

//載入body-parser
const bodyParser = require('body-parser')

//載入method-override
const methodOverride = require('method-override')

//載入handlebars
const exphbs = require('express-handlebars')

//引用路由器
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

// //載入餐廳.json
// const restaurantData = require('./restaurant.json').results

//設定模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//使用 bodyParser，解析資料類型
app.use(bodyParser.urlencoded({ extended: true }))

//使用methodOverride
app.use(methodOverride('_method'))

app.use(routes)

//設定靜態檔案
app.use(express.static('public'))



//設定監聽
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})