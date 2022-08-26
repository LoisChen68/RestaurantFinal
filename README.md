# 餐廳清單

![Index page about Restaurant List](https://github.com/LoisChen68/RestaurantFinal/blob/main/public/imges/img.jpg?raw=true)
![Index page about Restaurant List](https://github.com/LoisChen68/RestaurantFinal/blob/main/public/imges/loginimg.jpg?raw=true)

# 介紹
簡易的餐廳清單，包含使用者登出登入功能，可創建屬於使用者的餐廳清單，並具有增刪改查的功能

# 功能
- 使用者可註冊並登入帳號
- 使用者註冊帳號時密碼經過雜湊處理不輕易洩漏密碼
- 使用者可使用facebook登入帳號
- 使用者可查看自己所建立的餐廳清單
- 點擊查看餐廳詳細資料
- 以餐廳名稱或類別搜尋
- 新增、修改、刪除餐廳功能

# 環境配置需求
- MongoDB
- nodemon

# 開始使用
1.將專案clone到本機
   ```bash
$ git clone https://github.com/LoisChen68/RestaurantFinal.git
   ```
2.進入專案資料夾
   ```bash
$ cd RestaurantFinal
   ```
3.安裝所需的依賴
   ```bash
$ npm install
   ```
4.根據 .env.example 在 .env文件中設置環境變量

5.使用種子資料
```bash
$ npm run seed
```
5.啟動伺服器
```bash
$ npm run dev
```
6.看到以下消息，代表執行成功
```bash
Express is listening on the http://localhost:3000
mongodb connected!
```
