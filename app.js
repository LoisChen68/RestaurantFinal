const express = require('express')
const app = express()
const port = 3000

//載入handlebars
const exphbs = require('express-handlebars')

//設定模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//設定首頁路由
app.get('/', (req, res) => {
  res.render('index')
})

//設定監聽
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})