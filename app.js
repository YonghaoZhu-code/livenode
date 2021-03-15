const express = require("express")
const app = express()
const port = 9300
app.use(require('cors')())
app.use(express.json())
require('./routers/index')(app)
app.listen(port,()=>{
    console.log("服务已启动，"+port+"端口监听中...")
    console.log("请使用http://127.0.0.1:"+port+"访问")
})