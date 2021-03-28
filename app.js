const express = require("express")
const path = require("path")
const app = express()
const port = 9300
require('./server/nodeMediaServer')
app.use(require('cors')())
app.use(express.json())
//访问静态文件
app.use('/static',express.static(path.join(__dirname,'./public')))
require('./routers/index')(app)
app.listen(port,()=>{
    console.log("服务已启动，"+port+"端口监听中...")
    console.log("请使用http://127.0.0.1:"+port+"访问")
})