const WebSocket=require('ws')
const wss = new WebSocket.Server({port:8383},()=>{
    console.log('ws服务器已开启，端口8383')
})
let rooms=new Map()
wss.on('connection', function connection(user,req) {
    console.log(req.url+'房间正在建立连接')
    //根据直播间id作为房间名
    let room=req.url
    //加入房间
    joinroom(room,user)
    user.on('message',(msg)=>{
        //同一个房间广播消息
      rooms.get(room).forEach(user => {
        if (user.readyState === WebSocket.OPEN) {
            user.send(msg)
          }
      })
    })
  })

  //处理加入房间
  function joinroom(room,user){
      //如果不存在房间，则创建
       if(!rooms.has(room)){
       rooms.set(room,[])
        //添加用户到该房间
         rooms.get(room).push(user)
    }
        else{
            //添加用户到该房间
            rooms.get(room).push(user)
        }
  }

    
