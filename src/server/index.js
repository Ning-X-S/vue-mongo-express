const port = 7001
const express = require('express')
const app = express()
const api = require('./api')
const infor = require('./infor')
// const fs = require('fs')
// const path = require('path')
const bodyParser = require('body-parser')

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const cors = require('cors')
// app.use(cors({ origin: '*' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(api)
app.use(infor)

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
// app.use(express.static(path.resolve(__dirname, '../dist')))
// 因为是单页应用 所有请求都走/dist/index.html
// app.get('*', function (req, res) {
//   const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf-8')
//   res.send(html)
// })


// 监听8088端口
app.listen(port)
console.log(`success listen: ${port}`)
