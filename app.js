const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const hbs = require('express-handlebars')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', hbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}))


app.use(methodOverride('_method'))

app.use(routes)

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})