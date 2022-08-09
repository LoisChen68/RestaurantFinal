const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//設定首頁路由
router.get('/', (req, res) => {
  Restaurant.find() //find內可以傳參數
    .lean() //我們只需要乾淨的資料
    //find => lean => restaurants 資料陣列 => 傳到index => 呼叫資料表 restaurants
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

module.exports = router