# 餐廳清單



# 介紹
簡易的餐廳清單，包含餐廳詳細資料和搜尋功能

# 功能
- 列出所有餐廳
- 點擊查看餐廳詳細資料
- 以餐廳名稱搜尋
- 新增餐廳功能
- 修改餐廳資料功能
- 刪除餐廳功能

# 環境配置需求
- node.js v16.16.0
- express v4.18.1
- express-handlebars v6.0.6
- mongoose v6.5.2
- MongoDB
- nodemon

# 開始使用
1.將專案clone到本機
   ```bash
$ git clone https://github.com/LoisChen68/RestaurantFinal.git
   ```
2.進入專案資料夾
   ```
$ cd shortURL
   ```
3.設定MONGO_URI
將下列連結中的alpha改為自己的使用者名稱,camp改為自己的使用者密碼

Mac設定如下
```
export MONGODB_URI="mongodb+srv://alpha:camp@cluster0.h1zdvoc.mongodb.net/URL?retryWrites=true&w=majority"
```
Windows設定如下：
```
set MONGODB_URI="mongodb+srv://alpha:camp@cluster0.h1zdvoc.mongodb.net/URL?retryWrites=true&w=majority"
```
4.確認已安裝node.js,npm套件,MongoDb雲端版,圖形化介面Robo3T

5.啟用伺服器執行app.js檔案
   ```bash
   npm run dev
   ```

6.當終端機出現下列字樣代表伺服器起動成功
```bash
Express is listening on the http://localhost:3000
mongodb connected!
 ```
7.開啟瀏覽器網址列輸入 http://localhost:3000 即可看到本專案的網頁呈現
