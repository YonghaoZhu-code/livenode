const live=require('../models/Live')
module.exports={
  addLive,
  updataIslive,
  findLiver,
  onLive
}

//添加用户直播
 async function addLive({uid,imgUrl,title,publishUrl,playUrl,shopping}){
    await live.sync()
    const newlive=await live.create({uid,imgUrl,title,publishUrl,playUrl,shopping})
    return JSON.parse(JSON.stringify(newlive, null, 2))
 }
 //更新用户直播状态
 async function updataIslive({uid,islive}){
    await live.sync()
     const uplive=await live.update({islive},{
        where:{uid}
    })
    return JSON.parse(JSON.stringify(uplive, null, 2))
 }
 //寻找用户
//  async function findLiver(uuid){
//     const liver=await live.findAll({
//        where:{uuid}
//    })
//    return JSON.parse(JSON.stringify(liver, null, 2))
// }
async function findLiver(uid){
    await live.sync()
    const liver=await live.findOne({ where:{uid}})
   return liver
}

//寻找正在直播的用户
async function onLive(){
    await live.sync()
    const onlive=await live.findAll({
       where:{islive:true}
   })
   return JSON.parse(JSON.stringify(onlive, null, 2))
}